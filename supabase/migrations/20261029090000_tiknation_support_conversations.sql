create table if not exists public.support_messages (
  id uuid primary key default gen_random_uuid(),
  ticket_id uuid not null references public.support_tickets(id) on delete cascade,
  sender_id uuid not null references auth.users(id),
  sender_role text not null check (sender_role in ('user','staff','system')),
  message text not null check (char_length(trim(message)) between 1 and 2000),
  is_internal boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists support_messages_ticket_created_idx
  on public.support_messages(ticket_id, created_at);
alter table public.support_messages enable row level security;
revoke all on public.support_messages from anon, authenticated;
grant all on public.support_messages to service_role;
