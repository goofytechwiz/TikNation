-- TikNation Gifts: add musical, magical, and legendary test gifts.
alter table public.gift_transactions drop constraint if exists gift_transactions_gift_code_check;
alter table public.gift_transactions drop constraint if exists gift_transactions_coin_cost_check;
alter table public.gift_transactions
  add constraint gift_transactions_gift_code_check
  check (gift_code in ('heart_pulse','magic_spark','creator_crown','infinity_crystal','melody_note','heartbeat_beat','symphony','mystic_portal','dragon_spirit','galaxy_gift'));
alter table public.gift_transactions
  add constraint gift_transactions_coin_cost_check
  check (coin_cost in (5,10,25,50,75,100,150));

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

  v_cost := case p_gift_code
    when 'heart_pulse' then 5
    when 'melody_note' then 5
    when 'magic_spark' then 10
    when 'heartbeat_beat' then 10
    when 'mystic_portal' then 25
    when 'creator_crown' then 50
    when 'symphony' then 50
    when 'dragon_spirit' then 75
    when 'galaxy_gift' then 100
    when 'infinity_crystal' then 150
    else null end;
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

revoke all on function public.send_test_gift(uuid, uuid, text, uuid) from public, anon, authenticated;
grant execute on function public.send_test_gift(uuid, uuid, text, uuid) to service_role;
