-- Expand private sign-in telemetry to cover email and username authentication.
alter table public.tiknation_security_events
  drop constraint if exists tiknation_security_events_event_type_check;
alter table public.tiknation_security_events
  add constraint tiknation_security_events_event_type_check
  check (event_type = any (array[
    'username_login_failed',
    'username_login_succeeded',
    'username_login_throttled',
    'email_login_failed',
    'email_login_succeeded',
    'email_login_throttled'
  ]::text[]));

-- Replace overlapping permissive post-read rules. Permissive SELECT policies
-- are ORed together, so a broad published-post rule could bypass the
-- deactivation filter. Keep owner access, public published access only for
-- active accounts, and make the block rule restrictive for authenticated users.
drop policy if exists "Hide deactivated creator posts" on public.creator_posts;
drop policy if exists "creator_posts_public_read" on public.creator_posts;
create policy "creator_posts_public_read"
on public.creator_posts
for select
to anon, authenticated
using (
  user_id = (select auth.uid())
  or (
    status = 'published'
    and not exists (
      select 1
      from public.profiles p
      where p.id = creator_posts.user_id
        and p.deactivated_at is not null
    )
  )
);

drop policy if exists "Blocked users cannot view creator posts" on public.creator_posts;
create policy "Blocked users cannot view creator posts"
on public.creator_posts
as restrictive
for select
to authenticated
using (not (select private.is_blocked_with_user(creator_posts.user_id)));
