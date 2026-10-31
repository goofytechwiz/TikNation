alter table public.gift_transactions
  drop constraint if exists gift_transactions_coin_cost_check;
alter table public.gift_transactions
  add constraint gift_transactions_coin_cost_check
  check (coin_cost = any (array[5,10,25,49,50,69,75,99,100,125,150,175,199,200]::integer[]));

alter table public.gift_transactions
  drop constraint if exists gift_transactions_gift_code_check;
alter table public.gift_transactions
  add constraint gift_transactions_gift_code_check
  check (gift_code = any (array['heart_pulse','melody_note','heartbeat_beat','symphony','magic_spark','mystic_portal','dragon_spirit','galaxy_gift','thunder_clap','prism_wave','mystery_reveal','creator_crown','infinity_crystal','dragon_ball','changing_face','clouds_of_mystery','hammer_of_pain','thunder_ass','storm_of_the_world','lightning_bolts_of_doom','book_of_death','dream_makers','phoenix_rebirth','treasure_explosion','meteor_mayhem','disco_raccoon','portal_party','blast_from_my_ass','asshole_of_death','golden_throne','chicken_of_doom','cheesepocalypse','skeleton_disco','dragons_revenge','stinky_fart_or_death','madafaka_rattle','toxic_cloud','bone_breaker','knockout','cant_breathe']::text[]));

alter table public.live_gift_events
  drop constraint if exists live_gift_events_gift_code_check;
alter table public.live_gift_events
  add constraint live_gift_events_gift_code_check
  check (gift_code = any (array['heart_pulse','melody_note','heartbeat_beat','symphony','magic_spark','mystic_portal','dragon_spirit','galaxy_gift','thunder_clap','prism_wave','mystery_reveal','creator_crown','infinity_crystal','dragon_ball','changing_face','clouds_of_mystery','hammer_of_pain','thunder_ass','storm_of_the_world','lightning_bolts_of_doom','book_of_death','dream_makers','phoenix_rebirth','treasure_explosion','meteor_mayhem','disco_raccoon','portal_party','blast_from_my_ass','asshole_of_death','golden_throne','chicken_of_doom','cheesepocalypse','skeleton_disco','dragons_revenge','stinky_fart_or_death','madafaka_rattle','toxic_cloud','bone_breaker','knockout','cant_breathe']::text[]));
