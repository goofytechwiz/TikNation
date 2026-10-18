-- TikNation Live: creator-controlled follower-only chat.
-- Public viewing remains open; only sending chat requires following the creator.
alter table public.live_sessions
  add column if not exists follower_only_chat boolean not null default false;
