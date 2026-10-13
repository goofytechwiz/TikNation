-- TikNation Live beta foundation.
-- Deliberately does not alter existing signup behavior or production data by itself.
-- Apply only after reviewing the draft PR and configuring LiveKit secrets.

create table if not exists public.live_creator_access (
  creator_id uuid primary key references auth.users(id) on delete cascade,
  status text not null default 'invited'
    check (status in ('invited', 'approved', 'revoked')),
  invited_by uuid references auth.users(id) on delete set null,
  invited_at timestamptz not null default now(),
  approved_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists public.live_sessions (
  id uuid primary key default gen_random_uuid(),
  creator_id uuid not null references auth.users(id) on delete cascade,
  room_name text not null unique,
  title text not null check (char_length(title) between 1 and 100),
  status text not null default 'live'
    check (status in ('live', 'ended')),
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists live_sessions_one_live_per_creator
  on public.live_sessions (creator_id)
  where status = 'live';

create index if not exists live_sessions_live_started_idx
  on public.live_sessions (started_at desc)
  where status = 'live';

create table if not exists public.live_chat_messages (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.live_sessions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  message text not null check (char_length(message) between 1 and 500),
  created_at timestamptz not null default now()
);

create index if not exists live_chat_messages_session_created_idx
  on public.live_chat_messages (session_id, created_at);

create table if not exists public.live_stream_reports (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.live_sessions(id) on delete cascade,
  reporter_id uuid not null references auth.users(id) on delete cascade,
  reason text not null check (char_length(reason) between 2 and 80),
  details text check (details is null or char_length(details) <= 1000),
  status text not null default 'pending'
    check (status in ('pending', 'reviewed', 'dismissed', 'action_taken')),
  created_at timestamptz not null default now(),
  reviewed_by uuid references auth.users(id) on delete set null,
  reviewed_at timestamptz,
  unique (session_id, reporter_id)
);

create index if not exists live_stream_reports_status_created_idx
  on public.live_stream_reports (status, created_at desc);

-- Server-only rolling-window events for basic chat/report abuse throttling.
create table if not exists public.live_action_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid not null references auth.users(id) on delete cascade,
  action text not null check (action in ('chat', 'report')),
  created_at timestamptz not null default now()
);
create index if not exists live_action_events_actor_action_created_idx
  on public.live_action_events (actor_id, action, created_at desc);
create index if not exists live_action_events_created_idx
  on public.live_action_events (created_at);

alter table public.live_creator_access enable row level security;
alter table public.live_sessions enable row level security;
alter table public.live_chat_messages enable row level security;
alter table public.live_stream_reports enable row level security;
alter table public.live_action_events enable row level security;

-- Explicitly keep all Live tables inaccessible to anonymous clients and limit
-- signed-in client access to the two intended read-only surfaces.
revoke all privileges on table public.live_creator_access from anon, authenticated;
revoke all privileges on table public.live_sessions from anon, authenticated;
revoke all privileges on table public.live_chat_messages from anon, authenticated;
revoke all privileges on table public.live_stream_reports from anon, authenticated;
revoke all privileges on table public.live_action_events from anon, authenticated;
grant all privileges on table public.live_creator_access to service_role;
grant all privileges on table public.live_sessions to service_role;
grant all privileges on table public.live_chat_messages to service_role;
grant all privileges on table public.live_stream_reports to service_role;
grant all privileges on table public.live_action_events to service_role;

-- No client policies on access grants, session lifecycle, or reports:
-- those operations are performed by the authenticated Edge Function only.
-- Authenticated viewers can read active streams and active-stream chat.
drop policy if exists "Signed-in users can view live sessions" on public.live_sessions;
create policy "Signed-in users can view live sessions"
  on public.live_sessions for select to authenticated
  using (status = 'live');

drop policy if exists "Signed-in users can read chat for live sessions" on public.live_chat_messages;
create policy "Signed-in users can read chat for live sessions"
  on public.live_chat_messages for select to authenticated
  using (
    exists (
      select 1 from public.live_sessions s
      where s.id = live_chat_messages.session_id and s.status = 'live'
    )
  );

grant select on public.live_sessions to authenticated;
grant select on public.live_chat_messages to authenticated;

-- Atomic rolling-window limiter. A transaction-scoped advisory lock per actor/action
-- prevents concurrent requests from all passing the same count check.
create or replace function public.tiknation_live_consume_rate_limit(
  p_actor_id uuid,
  p_action text,
  p_limit integer,
  p_window_seconds integer
) returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  event_count integer;
  lock_key bigint;
begin
  if p_actor_id is null
     or p_action not in ('chat', 'report')
     or p_limit < 1
     or p_window_seconds < 1
     or p_window_seconds > 86400 then
    raise exception 'Invalid rate limit arguments';
  end if;

  lock_key := pg_catalog.hashtextextended(p_actor_id::text || ':' || p_action, 0);
  perform pg_catalog.pg_advisory_xact_lock(lock_key);

  delete from public.live_action_events
    where created_at < pg_catalog.now() - interval '24 hours';

  insert into public.live_action_events (actor_id, action)
    values (p_actor_id, p_action);

  select pg_catalog.count(*)::integer into event_count
    from public.live_action_events
    where actor_id = p_actor_id
      and action = p_action
      and created_at >= pg_catalog.now() - pg_catalog.make_interval(secs => p_window_seconds);

  return event_count > p_limit;
end;
$$;

revoke all on function public.tiknation_live_consume_rate_limit(uuid, text, integer, integer) from public, anon, authenticated;
grant execute on function public.tiknation_live_consume_rate_limit(uuid, text, integer, integer) to service_role;

-- Supabase service-role Edge Function calls bypass RLS and must perform explicit
-- user/session/approval checks before every write. The service role is never sent
-- to the browser.
