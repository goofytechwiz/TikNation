-- TikNation Gifts: secure test-only wallet and gift ledger
create table if not exists public.gift_wallets (
  user_id uuid primary key references auth.users(id) on delete cascade,
  balance integer not null default 0 check (balance >= 0),
  starter_granted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.gift_transactions (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references auth.users(id) on delete cascade,
  recipient_id uuid not null references auth.users(id) on delete cascade,
  gift_code text not null check (gift_code in ('heart_pulse','magic_spark','creator_crown','infinity_crystal')),
  coin_cost integer not null check (coin_cost in (5,10,50,100)),
  request_id uuid not null,
  created_at timestamptz not null default now(),
  constraint gift_transactions_not_self check (sender_id <> recipient_id),
  constraint gift_transactions_sender_request_unique unique (sender_id, request_id)
);

create index if not exists gift_transactions_recipient_created_idx
  on public.gift_transactions (recipient_id, created_at desc);
create index if not exists gift_transactions_sender_created_idx
  on public.gift_transactions (sender_id, created_at desc);

alter table public.gift_wallets enable row level security;
alter table public.gift_transactions enable row level security;

drop policy if exists "Users can view their own gift wallet" on public.gift_wallets;
create policy "Users can view their own gift wallet"
  on public.gift_wallets for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can view gifts they sent or received" on public.gift_transactions;
create policy "Users can view gifts they sent or received"
  on public.gift_transactions for select to authenticated
  using ((select auth.uid()) = sender_id or (select auth.uid()) = recipient_id);

revoke all on public.gift_wallets from anon, authenticated;
grant select on public.gift_wallets to authenticated;
revoke all on public.gift_transactions from anon, authenticated;
grant select on public.gift_transactions to authenticated;
grant all on public.gift_wallets, public.gift_transactions to service_role;

create or replace function public.ensure_test_gift_wallet(p_user_id uuid)
returns integer
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  v_balance integer;
begin
  if p_user_id is null or not exists (select 1 from auth.users where id = p_user_id) then
    raise exception 'invalid_user';
  end if;
  insert into public.gift_wallets (user_id, balance, starter_granted)
  values (p_user_id, 500, true)
  on conflict (user_id) do update
    set balance = case when public.gift_wallets.starter_granted then public.gift_wallets.balance else public.gift_wallets.balance + 500 end,
        starter_granted = true,
        updated_at = now();
  select balance into v_balance from public.gift_wallets where user_id = p_user_id;
  return v_balance;
end;
$$;

create or replace function public.send_test_gift(
  p_sender_id uuid, p_recipient_id uuid, p_gift_code text, p_request_id uuid
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  v_cost integer;
  v_balance integer;
  v_existing public.gift_transactions%rowtype;
  v_gift_id uuid;
begin
  if p_sender_id is null or p_recipient_id is null or p_request_id is null then raise exception 'invalid_request'; end if;
  if p_sender_id = p_recipient_id then raise exception 'cannot_gift_self'; end if;
  if not exists (select 1 from public.profiles where id = p_recipient_id) then raise exception 'recipient_profile_not_found'; end if;
  if exists (
    select 1 from public.user_blocks
    where (blocker_id = p_sender_id and blocked_id = p_recipient_id)
       or (blocker_id = p_recipient_id and blocked_id = p_sender_id)
  ) then raise exception 'gifting_unavailable'; end if;

  v_cost := case p_gift_code when 'heart_pulse' then 5 when 'magic_spark' then 10 when 'creator_crown' then 50 when 'infinity_crystal' then 100 else null end;
  if v_cost is null then raise exception 'invalid_gift'; end if;

  select * into v_existing from public.gift_transactions where sender_id = p_sender_id and request_id = p_request_id;
  if found then
    return jsonb_build_object('success', true, 'duplicate', true, 'gift_id', v_existing.id,
      'gift_code', v_existing.gift_code, 'coin_cost', v_existing.coin_cost,
      'balance', (select balance from public.gift_wallets where user_id = p_sender_id));
  end if;

  perform public.ensure_test_gift_wallet(p_sender_id);
  insert into public.gift_wallets (user_id, balance, starter_granted)
  values (p_recipient_id, 0, false) on conflict (user_id) do nothing;

  select balance into v_balance from public.gift_wallets where user_id = p_sender_id for update;
  if v_balance < v_cost then raise exception 'insufficient_test_coins'; end if;
  update public.gift_wallets set balance = balance - v_cost, updated_at = now()
    where user_id = p_sender_id returning balance into v_balance;
  insert into public.gift_transactions (sender_id, recipient_id, gift_code, coin_cost, request_id)
    values (p_sender_id, p_recipient_id, p_gift_code, v_cost, p_request_id) returning id into v_gift_id;
  return jsonb_build_object('success', true, 'duplicate', false, 'gift_id', v_gift_id,
    'gift_code', p_gift_code, 'coin_cost', v_cost, 'balance', v_balance);
end;
$$;

revoke all on function public.ensure_test_gift_wallet(uuid) from public, anon, authenticated;
grant execute on function public.ensure_test_gift_wallet(uuid) to service_role;
revoke all on function public.send_test_gift(uuid, uuid, text, uuid) from public, anon, authenticated;
grant execute on function public.send_test_gift(uuid, uuid, text, uuid) to service_role;
