-- TikNation community controls: additive schema draft.
-- Review and test before applying to the production Supabase project.
-- This migration intentionally does not change the currently working Live function.

-- Existing follows table already has RLS and a self-follow check.
-- Read-only production preflight confirmed there are currently no duplicate pairs.
-- Re-run the duplicate-pair query before applying this migration elsewhere.
create unique index if not exists follows_follower_following_unique
  on public.follows (follower_id, following_id);

-- A user's post and notification mutes are independent.
create table if not exists public.user_mutes (
  muter_id uuid not null references auth.users(id) on delete cascade,
  muted_id uuid not null references auth.users(id) on delete cascade,
  mute_posts boolean not null default true,
  mute_notifications boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (muter_id, muted_id),
  constraint user_mutes_no_self check (muter_id <> muted_id),
  constraint user_mutes_has_choice check (mute_posts or mute_notifications)
);

alter table public.user_mutes enable row level security;
revoke all on public.user_mutes from anon;
grant select, insert, update, delete on public.user_mutes to authenticated;
drop policy if exists "Users view their mute preferences" on public.user_mutes;
create policy "Users view their mute preferences"
  on public.user_mutes for select to authenticated
  using ((select auth.uid()) = muter_id);
drop policy if exists "Users create their own mute preferences" on public.user_mutes;
create policy "Users create their own mute preferences"
  on public.user_mutes for insert to authenticated
  with check ((select auth.uid()) = muter_id);
drop policy if exists "Users update their own mute preferences" on public.user_mutes;
create policy "Users update their own mute preferences"
  on public.user_mutes for update to authenticated
  using ((select auth.uid()) = muter_id)
  with check ((select auth.uid()) = muter_id);
drop policy if exists "Users delete their own mute preferences" on public.user_mutes;
create policy "Users delete their own mute preferences"
  on public.user_mutes for delete to authenticated
  using ((select auth.uid()) = muter_id);

-- Per-creator alerts. Following someone must not silently subscribe to every alert.
create table if not exists public.creator_notification_preferences (
  user_id uuid not null references auth.users(id) on delete cascade,
  creator_id uuid not null references auth.users(id) on delete cascade,
  live_alerts boolean not null default false,
  post_alerts boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (user_id, creator_id),
  constraint creator_notification_preferences_no_self check (user_id <> creator_id)
);

alter table public.creator_notification_preferences enable row level security;
revoke all on public.creator_notification_preferences from anon;
grant select, insert, update, delete on public.creator_notification_preferences to authenticated;
drop policy if exists "Users view their creator alert preferences" on public.creator_notification_preferences;
create policy "Users view their creator alert preferences"
  on public.creator_notification_preferences for select to authenticated
  using ((select auth.uid()) = user_id);
drop policy if exists "Users create their creator alert preferences" on public.creator_notification_preferences;
create policy "Users create their creator alert preferences"
  on public.creator_notification_preferences for insert to authenticated
  with check ((select auth.uid()) = user_id);
drop policy if exists "Users update their creator alert preferences" on public.creator_notification_preferences;
create policy "Users update their creator alert preferences"
  on public.creator_notification_preferences for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
drop policy if exists "Users delete their creator alert preferences" on public.creator_notification_preferences;
create policy "Users delete their creator alert preferences"
  on public.creator_notification_preferences for delete to authenticated
  using ((select auth.uid()) = user_id);


-- Idempotency receipts prevent repeated client requests from spamming post alerts.
create table if not exists public.creator_notification_deliveries (
  post_id uuid not null references public.creator_posts(id) on delete cascade,
  recipient_id uuid not null references auth.users(id) on delete cascade,
  notification_type text not null check (notification_type = 'creator_post'),
  created_at timestamptz not null default now(),
  primary key (post_id, recipient_id, notification_type)
);
alter table public.creator_notification_deliveries enable row level security;
revoke all on public.creator_notification_deliveries from anon, authenticated;
grant all on public.creator_notification_deliveries to service_role;
-- The trusted notification Edge Function uses the service role; clients cannot inspect or edit receipts.

-- Durable Live timeouts / bans. Read/write only via the authenticated server-side
-- tiknation-live Edge Function using the service role; never expose to client roles.
create table if not exists public.live_moderation_actions (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.live_sessions(id) on delete cascade,
  creator_id uuid not null references auth.users(id) on delete cascade,
  target_user_id uuid not null references auth.users(id) on delete cascade,
  action_type text not null check (action_type in ('chat_mute', 'timeout', 'remove', 'creator_live_block')),
  reason text,
  starts_at timestamptz not null default now(),
  expires_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now(),
  constraint live_moderation_no_self check (creator_id <> target_user_id),
  constraint live_moderation_valid_expiry check (expires_at is null or expires_at > starts_at)
);

create index if not exists live_moderation_active_target_idx
  on public.live_moderation_actions (session_id, target_user_id, expires_at)
  where revoked_at is null;
create index if not exists live_moderation_creator_target_idx
  on public.live_moderation_actions (creator_id, target_user_id, expires_at)
  where revoked_at is null;

alter table public.live_moderation_actions enable row level security;
revoke all on public.live_moderation_actions from anon, authenticated;
grant all on public.live_moderation_actions to service_role;
-- No client-facing policies by design. The trusted Edge Function must verify
-- the caller owns the session before writing moderation actions and enforce
-- active actions before join/chat/token issuance.

-- Note: existing user_blocks and notifications tables are reused; do not create
-- duplicate replacements. Backend code still needs to enforce blocks/mutes and
-- notification preferences in all relevant read/write paths.
