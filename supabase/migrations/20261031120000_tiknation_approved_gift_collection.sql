-- Add the approved TikNation gift collection while preserving every existing gift.
alter table public.gift_transactions drop constraint if exists gift_transactions_gift_code_check;
alter table public.gift_transactions add constraint gift_transactions_gift_code_check check (gift_code in (
  'heart_pulse','magic_spark','creator_crown','infinity_crystal','melody_note','heartbeat_beat','symphony','mystic_portal','dragon_spirit','galaxy_gift','thunder_clap','prism_wave','mystery_reveal',
  'dragon_ball',
  'changing_face',
  'clouds_of_mystery',
  'hammer_of_pain',
  'thunder_ass',
  'storm_of_the_world',
  'lightning_bolts_of_doom',
  'book_of_death',
  'dream_makers',
  'phoenix_rebirth',
  'treasure_explosion',
  'meteor_mayhem',
  'disco_raccoon',
  'portal_party',
  'blast_from_my_ass',
  'asshole_of_death',
  'golden_throne',
  'chicken_of_doom',
  'cheesepocalypse',
  'skeleton_disco',
  'dragons_revenge'
));

create or replace function public.send_test_gift(
  p_sender_id uuid, p_recipient_id uuid, p_gift_code text, p_request_id uuid
) returns jsonb language plpgsql security definer set search_path = pg_catalog, public as $$
declare v_cost integer; v_balance integer; v_existing public.gift_transactions%rowtype; v_gift_id uuid;
begin
  if p_sender_id is null or p_recipient_id is null or p_request_id is null then raise exception 'invalid_request'; end if;
  if p_sender_id = p_recipient_id then raise exception 'cannot_gift_self'; end if;
  if not exists (select 1 from public.profiles where id = p_recipient_id) then raise exception 'recipient_profile_not_found'; end if;
  if exists (select 1 from public.user_blocks where (blocker_id=p_sender_id and blocked_id=p_recipient_id) or (blocker_id=p_recipient_id and blocked_id=p_sender_id)) then raise exception 'gifting_unavailable'; end if;
  v_cost := case p_gift_code
    when 'heart_pulse' then 5 when 'melody_note' then 5 when 'magic_spark' then 10 when 'heartbeat_beat' then 10
    when 'mystic_portal' then 25 when 'thunder_clap' then 25 when 'mystery_reveal' then 25
    when 'creator_crown' then 50 when 'symphony' then 50 when 'prism_wave' then 50
    when 'dragon_spirit' then 75 when 'galaxy_gift' then 100 when 'infinity_crystal' then 150
    when 'dragon_ball' then 75
    when 'changing_face' then 25
    when 'clouds_of_mystery' then 50
    when 'hammer_of_pain' then 50
    when 'thunder_ass' then 69
    when 'storm_of_the_world' then 100
    when 'lightning_bolts_of_doom' then 125
    when 'book_of_death' then 150
    when 'dream_makers' then 100
    when 'phoenix_rebirth' then 175
    when 'treasure_explosion' then 150
    when 'meteor_mayhem' then 125
    when 'disco_raccoon' then 75
    when 'portal_party' then 100
    when 'blast_from_my_ass' then 69
    when 'asshole_of_death' then 199
    when 'golden_throne' then 125
    when 'chicken_of_doom' then 75
    when 'cheesepocalypse' then 99
    when 'skeleton_disco' then 100
    when 'dragons_revenge' then 200
    else null end;
  if v_cost is null then raise exception 'invalid_gift'; end if;
  select * into v_existing from public.gift_transactions where sender_id=p_sender_id and request_id=p_request_id;
  if found then return jsonb_build_object('success',true,'duplicate',true,'gift_id',v_existing.id,'gift_code',v_existing.gift_code,'coin_cost',v_existing.coin_cost,'balance',(select balance from public.gift_wallets where user_id=p_sender_id)); end if;
  perform public.ensure_test_gift_wallet(p_sender_id);
  insert into public.gift_wallets(user_id,balance,starter_granted) values(p_recipient_id,0,false) on conflict(user_id) do nothing;
  select balance into v_balance from public.gift_wallets where user_id=p_sender_id for update;
  if v_balance < v_cost then raise exception 'insufficient_test_coins'; end if;
  update public.gift_wallets set balance=balance-v_cost,updated_at=now() where user_id=p_sender_id returning balance into v_balance;
  insert into public.gift_transactions(sender_id,recipient_id,gift_code,coin_cost,request_id) values(p_sender_id,p_recipient_id,p_gift_code,v_cost,p_request_id) returning id into v_gift_id;
  return jsonb_build_object('success',true,'duplicate',false,'gift_id',v_gift_id,'gift_code',p_gift_code,'coin_cost',v_cost,'balance',v_balance);
end; $$;
revoke all on function public.send_test_gift(uuid,uuid,text,uuid) from public,anon,authenticated;
grant execute on function public.send_test_gift(uuid,uuid,text,uuid) to service_role;
