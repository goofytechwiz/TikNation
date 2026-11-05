const TIKNATION_GIFT_CATALOG = {
  heart_pulse: { name: "Heart Pulse", emoji: "💗", category: "Musical", cost: 5, sound: [523, 659, 784, 988], style: "pulse", message: "A little love, carried by a warm melody." },
  melody_note: { name: "Melody Note", emoji: "🎵", category: "Musical", cost: 5, sound: [659, 784, 988], style: "notes", message: "A tiny melody for your world." },
  symphony: { name: "Symphony", emoji: "🎼", category: "Musical", cost: 50, sound: [523, 659, 784, 1047], style: "grand", message: "A little grand finale." },
  magic_spark: { name: "Magic Spark", emoji: "✨", category: "Magical", cost: 10, sound: [784, 1175], style: "spark", message: "A spark of possibility." },
  mystic_portal: { name: "Mystic Portal", emoji: "🌀", category: "Magical", cost: 25, sound: [392, 587, 784], style: "portal", message: "Open a doorway to wonder." },
  dragon_spirit: { name: "Dragon Spirit", emoji: "🐉", category: "Magical", cost: 75, sound: [196, 293, 392, 587], style: "dragon", message: "Unleash a legendary spirit." },
  galaxy_gift: { name: "Galaxy Gift", emoji: "🌌", category: "Magical", cost: 100, sound: [220, 330, 440, 660, 880], style: "galaxy", message: "A whole galaxy, just for you." },
  thunder_clap: { name: "Thunder Clap", emoji: "⚡", category: "Special Effects", cost: 25, sound: [196, 392, 587, 784], style: "burst", message: "A lightning-charged moment!" },
  prism_wave: { name: "Prism Wave", emoji: "🌈", category: "Visual Effects", cost: 50, sound: [523, 659, 880, 1047, 1319], style: "prism", message: "A wave of color across your world." },
  mystery_reveal: { name: "Mystery Reveal", emoji: "🎁", category: "Surprises", cost: 25, sound: [392, 523, 784, 1047], style: "surprise", message: "Surprise! What wonder will appear next." },
  creator_crown: { name: "Creator’s Crown", emoji: "👑", category: "Legendary", cost: 50, sound: [523, 659, 784], style: "crown", message: "Celebrate the creator." },
  infinity_crystal: { name: "Infinity Crystal", emoji: "💎", category: "Legendary", cost: 150, sound: [392, 523, 659, 784, 1047], style: "infinity", message: "A gift beyond the ordinary." }
,
  dragon_ball: { name: "Dragon Ball", emoji: "🔮", category: "Magical", cost: 75, sound: [294, 440, 587, 880], style: "dragon", message: "A mysterious dragon orb erupts with golden energy." },
  changing_face: { name: "Changing Face", emoji: "🎭", category: "Surprises", cost: 25, sound: [659, 784, 523, 880], style: "surprise", message: "A face-changing mask spins through a magical transformation." },
  clouds_of_mystery: { name: "Clouds of Mystery", emoji: "☁️", category: "Magical", cost: 50, sound: [392, 523, 659, 784, 988], style: "clouds", message: "Mystic clouds swirl across the live stage." },
  hammer_of_pain: { name: "Hammer of Pain", emoji: "🔨", category: "Special Effects", cost: 50, sound: [110, 82, 55, 73], style: "hammer", message: "A giant cartoon hammer slams down with a comic shockwave." },
  thunder_ass: { name: "Thunder Ass", emoji: "⚡🍑", category: "Special Effects", cost: 69, sound: [196, 392, 196, 587], style: "thunderass", message: "A silly thunderclap and peach-shaped lightning burst across the screen." },
  storm_of_the_world: { name: "Storm of the World", emoji: "🌪️", category: "Special Effects", cost: 100, sound: [110, 165, 220, 330, 165], style: "storm", message: "A massive storm sweeps across the live stage." },
  lightning_bolts_of_doom: { name: "Lightning Bolts of Doom", emoji: "⚡💀", category: "Special Effects", cost: 125, sound: [880, 440, 988, 494, 1175], style: "lightning", message: "Crackling bolts strike in a dramatic finale." },
  book_of_death: { name: "Book of Death", emoji: "📕☠️", category: "Legendary", cost: 150, sound: [196, 147, 110, 73], style: "book", message: "A cursed book opens and releases shadowy magic." },
  dream_makers: { name: "The Dream Makers", emoji: "✨🧚", category: "Magical", cost: 100, sound: [523, 659, 784, 1047, 1319], style: "dreammakers", message: "A team of dream makers appears and builds a glowing dream." },
  phoenix_rebirth: { name: "Phoenix Rebirth", emoji: "🔥🪽", category: "Legendary", cost: 175, sound: [392, 523, 659, 784, 1047, 1319], style: "phoenix", message: "A phoenix rises from glowing flames." },
  treasure_explosion: { name: "Treasure Explosion", emoji: "💎💰", category: "Legendary", cost: 150, sound: [587, 740, 988, 1175, 1480], style: "treasure", message: "A treasure chest bursts open with sparkling riches." },
  meteor_mayhem: { name: "Meteor Mayhem", emoji: "☄️", category: "Special Effects", cost: 125, sound: [880, 440, 220, 110, 55], style: "meteor", message: "A blazing meteor streaks across the live screen." },
  portal_party: { name: "Portal Party", emoji: "🌀🎉", category: "Magical", cost: 100, sound: [392, 587, 784, 1175, 1568], style: "portalparty", message: "A colorful portal opens with a burst of energy." },
  blast_from_my_ass: { name: "Blast from My Ass", emoji: "💨🍑", category: "Special Effects", cost: 69, sound: [110, 73, 55, 82], style: "blastass", message: "A ridiculous cartoon smoke blast fills the screen." },
  asshole_of_death: { name: "The Asshole of Death", emoji: "☠️🍑", category: "Legendary", cost: 199, sound: [73, 55, 41, 110], style: "deathass", message: "A cursed portal erupts and launches a cartoon skeleton." },
  golden_throne: { name: "The Golden Throne", emoji: "🚽👑", category: "Legendary", cost: 125, sound: [392, 523, 659, 784], style: "throne", message: "A golden throne crashes in with a royal fanfare." },
  chicken_of_doom: { name: "Chicken of Doom", emoji: "🐔💀", category: "Special Effects", cost: 75, sound: [784, 392, 784, 988], style: "chicken", message: "A furious chicken storms across the stage in a feather frenzy." },
  cheesepocalypse: { name: "The Cheesepocalypse", emoji: "🧀☄️", category: "Special Effects", cost: 99, sound: [330, 440, 554, 659, 440], style: "cheese", message: "A giant cheese meteor crashes in a cheesy explosion." },
  skeleton_disco: { name: "Skeleton Disco", emoji: "💀🪩", category: "Musical", cost: 100, sound: [659, 784, 988, 1175, 1397, 1175], style: "skeleton", message: "A dancing skeleton takes over with a neon light show." },
  dragons_revenge: { name: "The Dragon's Revenge", emoji: "🐉🔥", category: "Legendary", cost: 200, sound: [196, 293, 392, 587, 784], style: "dragonrevenge", message: "The dragon returns with a fiery entrance and energy blast." }
  ,stinky_fart_or_death: { name: "Stinky Fart or Death", emoji: "💨💀", category: "Special Effects", cost: 69, sound: [110, 73, 55, 82], style: "stinkdeath", message: "Toxic green stink clouds burst across the stage before a dramatic skull appears." },
  madafaka_rattle: { name: "Madafaka Rattle", emoji: "🦴🖕", category: "Special Effects", cost: 69, sound: [180, 95, 210, 80, 240, 100], style: "rattlebone", message: "A skeletal middle finger snaps upright with a loud, comic bone-rattling shake." },
  toxic_cloud: { name: "Toxic Cloud", emoji: "☣️💚", category: "Special Effects", cost: 49, sound: [95, 72, 110, 58], style: "toxiccloud", message: "A giant toxic-green cloud rolls across the stage with a swarm of silly buzzing flies." },
  bone_breaker: { name: "Bone Breaker", emoji: "💀👎", category: "Special Effects", cost: 49, sound: [180, 95, 210, 80, 240], style: "bonebreaker", message: "A skeletal hand rattles into view and delivers the ultimate cartoon thumbs-down." },
  knockout: { name: "Knockout!", emoji: "🥊💥", category: "Special Effects", cost: 69, sound: [130, 90, 65, 220], style: "knockout", message: "A giant boxing glove flies in with a comic impact and a burst of stars." },
  cant_breathe: { name: "Can't Breathe", emoji: "😂💀", category: "Special Effects", cost: 69, sound: [660, 880, 740, 988, 660], style: "cantbreathe", message: "A laughing skull shakes with unstoppable laughter and bursts into cartoon tears." }
};
window.TIKNATION_GIFT_CATALOG = TIKNATION_GIFT_CATALOG;

let tikNationGiftAudioContext = null;

function unlockTikNationGiftAudio() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!tikNationGiftAudioContext) tikNationGiftAudioContext = new AudioContextClass();
    if (tikNationGiftAudioContext.state === "suspended") void tikNationGiftAudioContext.resume().catch(() => {});
  } catch (_ignored) {}
}
document.addEventListener("pointerdown", unlockTikNationGiftAudio, { passive: true });
document.addEventListener("keydown", unlockTikNationGiftAudio);

async function invokeTikNationGifts(payload) {
  if (!currentUser) throw new Error("Please sign in to use Gifts.");
  const result = await supabaseClient.functions.invoke("tiknation-gifts", { body: payload });
  if (result.error) {
    let message = result.error.message || "Gifts could not connect.";
    try {
      if (result.error.context && typeof result.error.context.json === "function") {
        const body = await result.error.context.json();
        if (body && body.error) message = body.error;
      }
    } catch (_ignored) {}
    throw new Error(message);
  }
  if (result.data && result.data.error) throw new Error(result.data.error);
  return result.data;
}

async function refreshPublicGiftBalance() {
  const node = document.getElementById("publicCreatorGiftBalance");
  if (!node || !currentUser) return;
  try {
    const data = await invokeTikNationGifts({ action: "balance" });
    node.textContent = "🪙 " + Number(data.balance || 0).toLocaleString() + " test coins";
  } catch (error) {
    node.textContent = "Test coin balance unavailable";
    const status = document.getElementById("publicCreatorGiftStatus");
    if (status) { status.className = "gift-status error"; status.textContent = error.message; }
  }
}

function playTikNationGiftSound(gift) {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!tikNationGiftAudioContext) tikNationGiftAudioContext = new AudioContextClass();
    const context = tikNationGiftAudioContext;
    if (context.state === "suspended") context.resume().catch(() => {});
    const now = context.currentTime;

    if (gift.style === "storm") {
      [0, 0.38, 1.85, 2.15].forEach((delay, index) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        const filter = context.createBiquadFilter();
        oscillator.type = index === 2 ? "sawtooth" : "triangle";
        oscillator.frequency.setValueAtTime([58, 72, 42, 55][index], now + delay);
        oscillator.frequency.exponentialRampToValueAtTime([34, 40, 28, 32][index], now + delay + 1.2);
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(index === 2 ? 260 : 150, now + delay);
        gain.gain.setValueAtTime(0.0001, now + delay);
        gain.gain.exponentialRampToValueAtTime(index === 2 ? 0.16 : 0.09, now + delay + 0.09);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 1.35);
        oscillator.connect(filter); filter.connect(gain); gain.connect(context.destination);
        oscillator.start(now + delay); oscillator.stop(now + delay + 1.4);
      });
      return;
    }
    if (gift.style === "stinkdeath") {
      [0,0.12,0.24,0.42].forEach((delay,index)=>{
        const oscillator=context.createOscillator(), gain=context.createGain();
        oscillator.type=index===2?"square":"sawtooth";
        oscillator.frequency.setValueAtTime([110,73,55,82][index],now+delay);
        gain.gain.setValueAtTime(0.0001,now+delay);
        gain.gain.exponentialRampToValueAtTime(0.09,now+delay+0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001,now+delay+0.14);
        oscillator.connect(gain);gain.connect(context.destination);
        oscillator.start(now+delay);oscillator.stop(now+delay+0.15);
      });
      return;
    }
    if (gift.style === "toxiccloud") {
      [0,0.13,0.27,0.43,0.58].forEach((delay,index)=>{
        const oscillator=context.createOscillator(), gain=context.createGain();
        oscillator.type=index%2?"square":"sawtooth";
        oscillator.frequency.setValueAtTime([95,72,110,58,88][index],now+delay);
        gain.gain.setValueAtTime(0.0001,now+delay);
        gain.gain.exponentialRampToValueAtTime(0.065,now+delay+0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001,now+delay+0.13);
        oscillator.connect(gain);gain.connect(context.destination);
        oscillator.start(now+delay);oscillator.stop(now+delay+0.14);
      });
      return;
    }
    if (gift.style === "bonebreaker") {
      [0,0.07,0.14,0.22,0.31].forEach((delay,index)=>{
        const oscillator=context.createOscillator(), gain=context.createGain();
        oscillator.type=index%2?"square":"triangle";
        oscillator.frequency.setValueAtTime([180,95,210,80,240][index],now+delay);
        gain.gain.setValueAtTime(0.0001,now+delay);
        gain.gain.exponentialRampToValueAtTime(0.075,now+delay+0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001,now+delay+0.075);
        oscillator.connect(gain);gain.connect(context.destination);
        oscillator.start(now+delay);oscillator.stop(now+delay+0.08);
      });
      return;
    }
    if (gift.style === "knockout") {
      [0,0.12,0.24].forEach((delay,index)=>{
        const oscillator=context.createOscillator(), gain=context.createGain();
        oscillator.type=index===1?"square":"sawtooth";
        oscillator.frequency.setValueAtTime([130,90,65][index],now+delay);
        oscillator.frequency.exponentialRampToValueAtTime([65,45,38][index],now+delay+0.16);
        gain.gain.setValueAtTime(0.0001,now+delay);
        gain.gain.exponentialRampToValueAtTime(0.11,now+delay+0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001,now+delay+0.18);
        oscillator.connect(gain);gain.connect(context.destination);
        oscillator.start(now+delay);oscillator.stop(now+delay+0.19);
      });
      return;
    }
    if (gift.style === "cantbreathe") {
      [0,0.14,0.28,0.42,0.56].forEach((delay,index)=>{
        const oscillator=context.createOscillator(), gain=context.createGain();
        oscillator.type="triangle";
        oscillator.frequency.setValueAtTime([660,880,740,988,660][index],now+delay);
        gain.gain.setValueAtTime(0.0001,now+delay);
        gain.gain.exponentialRampToValueAtTime(0.07,now+delay+0.025);
        gain.gain.exponentialRampToValueAtTime(0.0001,now+delay+0.16);
        oscillator.connect(gain);gain.connect(context.destination);
        oscillator.start(now+delay);oscillator.stop(now+delay+0.17);
      });
      return;
    }
    if (gift.style === "rattlebone") {
      [0, 0.055, 0.11, 0.18, 0.25, 0.33].forEach((delay, index) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = index % 2 ? "square" : "sawtooth";
        oscillator.frequency.setValueAtTime([180, 95, 210, 80, 240, 100][index], now + delay);
        gain.gain.setValueAtTime(0.0001, now + delay);
        gain.gain.exponentialRampToValueAtTime(0.075, now + delay + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.07);
        oscillator.connect(gain); gain.connect(context.destination);
        oscillator.start(now + delay); oscillator.stop(now + delay + 0.075);
      });
      return;
    }
    if (gift.style === "grand") {
      const progression = [
        {t:0.00, f:[130.81,196.00,261.63,329.63]},
        {t:0.85, f:[146.83,220.00,293.66,369.99]},
        {t:1.70, f:[164.81,246.94,329.63,392.00]},
        {t:2.55, f:[174.61,261.63,349.23,440.00]},
        {t:3.40, f:[196.00,293.66,392.00,493.88]},
        {t:4.25, f:[174.61,261.63,349.23,440.00]},
        {t:5.10, f:[196.00,293.66,392.00,523.25]},
        {t:6.00, f:[261.63,329.63,392.00,523.25]}
      ];
      progression.forEach((chord,step)=>{
        chord.f.forEach((frequency,voice)=>{
          const oscillator=context.createOscillator(),gain=context.createGain(),filter=context.createBiquadFilter();
          oscillator.type=voice===0?"triangle":voice===3?"sine":"sawtooth";
          oscillator.frequency.setValueAtTime(frequency,now+chord.t);
          filter.type="lowpass";filter.frequency.setValueAtTime(voice===0?420:voice===3?1800:1100,now+chord.t);
          const peak=voice===0?0.055:voice===3?0.022:0.016;
          gain.gain.setValueAtTime(0.0001,now+chord.t);
          gain.gain.linearRampToValueAtTime(peak,now+chord.t+0.12);
          gain.gain.setValueAtTime(peak*0.82,now+chord.t+0.48);
          gain.gain.exponentialRampToValueAtTime(0.0001,now+chord.t+0.82);
          oscillator.connect(filter);filter.connect(gain);gain.connect(context.destination);
          oscillator.start(now+chord.t);oscillator.stop(now+chord.t+0.85);
        });
      });
      return;
    }
    const notes = gift.sound || [660, 880];
    notes.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = gift.style === "dragon" || gift.style === "pulse" ? "triangle" : "sine";
      oscillator.frequency.setValueAtTime(frequency, now + index * 0.12);
      gain.gain.setValueAtTime(0.0001, now + index * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.10, now + index * 0.12 + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.12 + 0.28);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now + index * 0.12);
      oscillator.stop(now + index * 0.12 + 0.30);
    });
  } catch (_ignored) {
    // Sound is an enhancement; gifts still work if audio is unavailable.
  }
}

function ensureTikNationGiftEngine() {
  if (window.TikNationGiftEngine) return Promise.resolve(window.TikNationGiftEngine);
  if (window.tikNationGiftEnginePromise) return window.tikNationGiftEnginePromise;
  window.tikNationGiftEnginePromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "./gift-engine.js?v=20261105-skeleton-disco-fog-v6";
    script.onload = () => window.TikNationGiftEngine ? resolve(window.TikNationGiftEngine) : reject(new Error("Gift engine did not initialize."));
    script.onerror = () => reject(new Error("Gift animation engine could not load."));
    document.head.appendChild(script);
  });
  return window.tikNationGiftEnginePromise;
}

function showTikNationGiftEffect(gift) {
  ensureTikNationGiftEngine().then(engine => {
    engine.show(gift, {
      meta: "TIKNATION GIFT · TEST COINS ONLY",
      onSound: () => playTikNationGiftSound(gift),
      duration: gift.style === "grand" ? 7600 : 4300
    });
  }).catch(error => console.error("TikNation gift effect unavailable:", error));
}

async function sendTikNationGift(recipientId, giftCode) {
  const panel = document.getElementById("publicCreatorGiftPanel");
  const status = document.getElementById("publicCreatorGiftStatus");
  if (!currentUser) { openAuthModal("signin"); return false; }
  if (recipientId === currentUser.id) { if (status) { status.className = "gift-status error"; status.textContent = "You cannot send a gift to yourself."; } return false; }
  const gift = TIKNATION_GIFT_CATALOG[giftCode];
  if (!gift) {
    if (status) { status.className = "gift-status error"; status.textContent = "That gift is not available yet."; }
    return false;
  }
  if (!window.crypto || !window.crypto.randomUUID) {
    if (status) status.textContent = "Please update your browser before sending gifts.";
    return false;
  }
  const buttons = panel ? Array.from(panel.querySelectorAll(".gift-choice")) : [];
  buttons.forEach(button => button.disabled = true);
  if (status) { status.className = "gift-status"; status.textContent = "Sending " + gift.name + "…"; }
  try {
    const data = await invokeTikNationGifts({
      action: "send", recipient_id: recipientId, gift_code: giftCode,
      request_id: window.crypto.randomUUID()
    });
    const balance = document.getElementById("publicCreatorGiftBalance");
    if (balance) balance.textContent = "🪙 " + Number(data.balance || 0).toLocaleString() + " test coins remaining";
    if (panel) {
      panel.classList.remove("gift-flash", "gift-signature");
      void panel.offsetWidth;
      panel.classList.add("gift-flash");
      if (["creator_crown", "infinity_crystal", "symphony", "dragon_spirit", "galaxy_gift"].includes(giftCode)) panel.classList.add("gift-signature");
    }
    showTikNationGiftEffect(gift);
    if (status) { status.className = "gift-status success"; status.textContent = "✨ " + gift.name + " sent! Test gifts have no cash value."; }
    // Keep the sender's Creator Wallet history in sync after a successful send.
    await loadTikNationGiftDashboard();
    return true;
  } catch (error) {
    if (status) { status.className = "gift-status error"; status.textContent = error.message || "Gift could not be sent."; }
    return false;
  } finally {
    buttons.forEach(button => button.disabled = false);
  }
}

async function loadTikNationGiftDashboard() {
  const balance = document.getElementById("creatorGiftBalance");
  const summary = document.getElementById("creatorGiftSummary");
  const historyNode = document.getElementById("creatorGiftHistory");
  const refresh = document.getElementById("refreshGiftHistoryButton");
  if (!balance || !summary || !historyNode || !currentUser) return false;
  if (refresh) refresh.disabled = true;
  try {
    const values = await Promise.all([
      invokeTikNationGifts({ action: "balance" }),
      invokeTikNationGifts({ action: "history" })
    ]);
    balance.textContent = "🪙 " + Number(values[0].balance || 0).toLocaleString() + " test coins";
    const data = values[1];
    summary.textContent = "Received " + Number(data.received_count || 0) + " gifts · " + Number(data.received_test_coins || 0).toLocaleString() + " test-coin gift value. Not real earnings.";
    const rows = data.history || [];
    historyNode.innerHTML = rows.length ? rows.map(item => {
      const other = item.other_user || {};
      const name = escapeHtml(other.display_name || other.username || "TikNation creator");
      const date = escapeHtml(new Date(item.created_at).toLocaleDateString());
      const direction = item.direction === "sent" ? "Sent to " : "Received from ";
      const amount = Number(item.coin_cost || 0);
      const gift = TIKNATION_GIFT_CATALOG[item.gift_code];
      const label = gift ? gift.emoji + " " + gift.name : "🎁 Gift";
      return '<div class="gift-history-item"><span><strong>' + direction + name + '</strong><br><span class="gift-panel-copy">' + escapeHtml(label) + ' · ' + date + '</span></span><strong>' + (item.direction === "sent" ? "−" : "+") + amount + ' test coins</strong></div>';
    }).join("") : '<p class="gift-panel-copy">No gifts yet. Your gift history will appear here.</p>';
    return true;
  } catch (error) {
    balance.textContent = "Test coin balance unavailable";
    summary.textContent = error.message || "Gift activity could not be loaded.";
    return false;
  } finally {
    if (refresh) refresh.disabled = false;
  }
}


/* Deliver received gifts to the creator immediately while TikNation is open. */
let tikNationGiftRealtimeChannel = null;
let tikNationGiftRealtimeUserId = null;

function startTikNationGiftRealtime(userId) {
  if (!userId || !supabaseClient || !supabaseClient.channel) return;
  if (tikNationGiftRealtimeUserId === userId && tikNationGiftRealtimeChannel) return;
  if (tikNationGiftRealtimeChannel) {
    try { supabaseClient.removeChannel(tikNationGiftRealtimeChannel); } catch (_ignored) {}
    tikNationGiftRealtimeChannel = null;
  }
  tikNationGiftRealtimeUserId = userId;
  tikNationGiftRealtimeChannel = supabaseClient
    .channel("tiknation-gift-receipts-" + userId)
    .on("postgres_changes", {
      event: "INSERT",
      schema: "public",
      table: "gift_transactions",
      filter: "recipient_id=eq." + userId
    }, async (event) => {
      const row = event && event.new;
      if (!row || row.recipient_id !== userId || row.sender_id === userId) return;
      const gift = TIKNATION_GIFT_CATALOG[row.gift_code];
      if (!gift) return;
      try {
        const { data: sender } = await supabaseClient.from("profiles")
          .select("display_name,username").eq("id", row.sender_id).maybeSingle();
        const senderName = sender && (sender.display_name || sender.username)
          ? (sender.display_name || "@" + sender.username)
          : "A TikNation creator";
        // While the recipient is broadcasting, the LIVE page displays the
        // richer live_gift_events celebration. Avoid stacking a second overlay.
        const liveFeed = document.getElementById("liveGiftFeed");
        const isActivelyShowingLive = liveFeed?.dataset.liveSessionActive === "true";
        if (!isActivelyShowingLive) showTikNationGiftEffect(gift);
        const dashboard = document.getElementById("creatorGiftDashboard");
        if (dashboard) {
          const summary = document.getElementById("creatorGiftSummary");
          if (summary) summary.textContent = "🎁 " + senderName + " sent you " + gift.name + "! Your test coins were credited.";
          await loadTikNationGiftDashboard();
        }
        const balance = document.getElementById("publicCreatorGiftBalance");
        if (balance) await refreshPublicGiftBalance();
      } catch (error) {
        console.error("Incoming TikNation gift update failed:", error);
      }
    })
    .subscribe((status) => {
      if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
        console.warn("TikNation gift receipt updates are temporarily unavailable.");
      }
    });
}

function initTikNationGiftRealtime() {
  if (typeof supabaseClient === "undefined" || !supabaseClient || !supabaseClient.auth) return;
  supabaseClient.auth.getSession().then(({ data }) => {
    const userId = data && data.session && data.session.user && data.session.user.id;
    if (userId) startTikNationGiftRealtime(userId);
  }).catch(() => {});
  supabaseClient.auth.onAuthStateChange((_event, session) => {
    const userId = session && session.user && session.user.id;
    if (userId) {
      startTikNationGiftRealtime(userId);
    } else {
      if (tikNationGiftRealtimeChannel) {
        try { supabaseClient.removeChannel(tikNationGiftRealtimeChannel); } catch (_ignored) {}
      }
      tikNationGiftRealtimeChannel = null;
      tikNationGiftRealtimeUserId = null;
    }
  });
}

initTikNationGiftRealtime();
