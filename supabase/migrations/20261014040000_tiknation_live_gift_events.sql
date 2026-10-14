create table if not exists public.live_gift_events (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.live_sessions(id) on delete cascade,
  transaction_id uuid not null unique references public.gift_transactions(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  recipient_id uuid not null references auth.users(id) on delete cascade,
  gift_code text not null check (gift_code in ('heart_pulse','melody_note','magic_spark','heartbeat_beat','mystic_portal','creator_crown','symphony','dragon_spirit','galaxy_gift','infinity_crystal')),
  coin_cost integer not null check (coin_cost > 0),
  created_at timestamptz not null default now()
);
create index if not exists live_gift_events_session_created_idx on public.live_gift_events (session_id, created_at desc);
alter table public.live_gift_events enable row level security;
comment on table public.live_gift_events is 'Live-only gift announcements; read and write through the authenticated tiknation-gifts Edge Function using service role.';
