const TIKNATION_GIFT_CATALOG = {
  phantom_train: {
    name: "The Phantom Train",
    emoji: "🚂",
    category: "Legendary",
    cost: 175,
    sound: [110, 165, 220],
    style: "phantomtrain",
    message: "The last train leaves at midnight."
  },
  storm_of_the_world: {
    name: "Storm of the World",
    emoji: "⛈️",
    category: "Epic",
    cost: 100,
    sound: [55, 82, 110, 165],
    style: "storm",
    message: "The sky has awakened."
  }
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

async function playTikNationGiftSound(gift) {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    if (!tikNationGiftAudioContext) tikNationGiftAudioContext = new AudioContextClass();
    const context = tikNationGiftAudioContext;
    if (context.state === "suspended") await context.resume();
    if (context.state !== "running") return;
    const now = context.currentTime;

    if (gift.style === "phantomtrain") {
      // Steam pressure, wheel-and-rail rhythm, a distant whistle and a crossing bell.
      const duration = 8.2;
      const length = Math.floor(context.sampleRate * duration);
      const buffer = context.createBuffer(1, length, context.sampleRate);
      const samples = buffer.getChannelData(0);
      for (let i = 0; i < length; i++) samples[i] = (Math.random() * 2 - 1) * (0.65 + 0.35 * Math.sin(i / context.sampleRate * 2.1));

      const steam = context.createBufferSource();
      const steamFilter = context.createBiquadFilter();
      const steamGain = context.createGain();
      steam.buffer = buffer;
      steamFilter.type = "lowpass";
      steamFilter.frequency.setValueAtTime(260, now);
      steamFilter.frequency.linearRampToValueAtTime(1150, now + 1.8);
      steamFilter.frequency.exponentialRampToValueAtTime(380, now + 7.8);
      steamGain.gain.setValueAtTime(0.0001, now);
      steamGain.gain.linearRampToValueAtTime(0.16, now + 0.45);
      steamGain.gain.setValueAtTime(0.12, now + 4.8);
      steamGain.gain.exponentialRampToValueAtTime(0.0001, now + 8.0);
      steam.connect(steamFilter); steamFilter.connect(steamGain); steamGain.connect(context.destination);
      steam.start(now); steam.stop(now + 8.1);

      // Low mechanical engine rumble under the steam and wheel rhythm.
      const engine = context.createOscillator();
      const engineGain = context.createGain();
      const engineFilter = context.createBiquadFilter();
      engine.type = "sawtooth";
      engine.frequency.setValueAtTime(48, now);
      engine.frequency.linearRampToValueAtTime(63, now + 3.5);
      engine.frequency.linearRampToValueAtTime(52, now + 7.6);
      engineFilter.type = "lowpass"; engineFilter.frequency.value = 105;
      engineGain.gain.setValueAtTime(0.0001, now);
      engineGain.gain.linearRampToValueAtTime(0.035, now + 0.7);
      engineGain.gain.setValueAtTime(0.03, now + 6.8);
      engineGain.gain.exponentialRampToValueAtTime(0.0001, now + 7.9);
      engine.connect(engineFilter); engineFilter.connect(engineGain); engineGain.connect(context.destination);
      engine.start(now); engine.stop(now + 8.0);

      // Rolling iron wheels and rail joints: uneven paired clacks, gradually accelerating.
      for (let i = 0; i < 18; i++) {
        const at = now + 0.45 + i * (0.34 - Math.min(i, 12) * 0.009);
        const clack = context.createOscillator();
        const clackGain = context.createGain();
        const clackFilter = context.createBiquadFilter();
        clack.type = "triangle";
        clack.frequency.setValueAtTime(92 + (i % 3) * 18, at);
        clack.frequency.exponentialRampToValueAtTime(38, at + 0.13);
        clackFilter.type = "lowpass"; clackFilter.frequency.value = 230;
        clackGain.gain.setValueAtTime(0.0001, at);
        clackGain.gain.linearRampToValueAtTime(0.075, at + 0.012);
        clackGain.gain.exponentialRampToValueAtTime(0.0001, at + 0.17);
        clack.connect(clackFilter); clackFilter.connect(clackGain); clackGain.connect(context.destination);
        clack.start(at); clack.stop(at + 0.18);
      }

      // A single distant steam whistle, with a breathy harmonic rather than a musical loop.
      [440, 660].forEach((frequency, index) => {
        const whistle = context.createOscillator();
        const whistleGain = context.createGain();
        const whistleFilter = context.createBiquadFilter();
        whistle.type = "sine";
        whistle.frequency.setValueAtTime(frequency, now + 2.2);
        whistle.frequency.linearRampToValueAtTime(frequency * 1.045, now + 3.0);
        whistle.frequency.linearRampToValueAtTime(frequency * 0.91, now + 4.3);
        whistleFilter.type = "lowpass"; whistleFilter.frequency.value = 1500;
        whistleGain.gain.setValueAtTime(0.0001, now + 2.2);
        whistleGain.gain.linearRampToValueAtTime(index ? 0.018 : 0.042, now + 2.65);
        whistleGain.gain.setValueAtTime(index ? 0.015 : 0.034, now + 3.6);
        whistleGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.55);
        whistle.connect(whistleFilter); whistleFilter.connect(whistleGain); whistleGain.connect(context.destination);
        whistle.start(now + 2.2); whistle.stop(now + 4.6);
      });

      // One small crossing bell at the end of the approach.
      [784, 1175].forEach((frequency, index) => {
        const bell = context.createOscillator();
        const bellGain = context.createGain();
        bell.type = "sine"; bell.frequency.setValueAtTime(frequency, now + 6.0);
        bellGain.gain.setValueAtTime(0.0001, now + 6.0);
        bellGain.gain.linearRampToValueAtTime(index ? 0.018 : 0.035, now + 6.025);
        bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 7.1);
        bell.connect(bellGain); bellGain.connect(context.destination);
        bell.start(now + 6.0); bell.stop(now + 7.15);
      });
      return;
    }

    if (gift.style === "storm_of_the_world") {
      // A layered cinematic wing rush, rising fire roar and ember crackle.
      const length = Math.floor(context.sampleRate * 4.8);
      const buffer = context.createBuffer(1, length, context.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length);
      const noise = context.createBufferSource();
      const filter = context.createBiquadFilter();
      const gain = context.createGain();
      noise.buffer = buffer; filter.type = "lowpass";
      filter.frequency.setValueAtTime(420, now);
      filter.frequency.exponentialRampToValueAtTime(1750, now + 1.25);
      filter.frequency.exponentialRampToValueAtTime(360, now + 4.5);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.13, now + 0.45);
      gain.gain.linearRampToValueAtTime(0.2, now + 1.7);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.65);
      noise.connect(filter); filter.connect(gain); gain.connect(context.destination);
      noise.start(now); noise.stop(now + 4.7);
      [0.18, 1.18, 2.28].forEach((delay, index) => {
        const wing = context.createBufferSource(), wingFilter = context.createBiquadFilter(), wingGain = context.createGain();
        wing.buffer = buffer; wingFilter.type = "bandpass";
        wingFilter.frequency.setValueAtTime(680 - index * 80, now + delay);
        wingFilter.frequency.exponentialRampToValueAtTime(180, now + delay + 0.7);
        wingGain.gain.setValueAtTime(0.0001, now + delay);
        wingGain.gain.linearRampToValueAtTime(0.11, now + delay + 0.13);
        wingGain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.78);
        wing.connect(wingFilter); wingFilter.connect(wingGain); wingGain.connect(context.destination);
        wing.start(now + delay); wing.stop(now + delay + 0.8);
      });
      const roar = context.createOscillator(), roarFilter = context.createBiquadFilter(), roarGain = context.createGain();
      roar.type = "sawtooth"; roar.frequency.setValueAtTime(78, now + 0.6);
      roar.frequency.exponentialRampToValueAtTime(38, now + 3.9);
      roarFilter.type = "lowpass"; roarFilter.frequency.value = 210;
      roarGain.gain.setValueAtTime(0.0001, now + 0.6);
      roarGain.gain.linearRampToValueAtTime(0.09, now + 1.0);
      roarGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.0);
      roar.connect(roarFilter); roarFilter.connect(roarGain); roarGain.connect(context.destination);
      roar.start(now + 0.6); roar.stop(now + 4.05);
      return;
    }

    if (gift.style === "meteor") {
      // A low, filtered roar, rising fire hiss, then a deep cinematic impact.
      const boom = context.createOscillator();
      const boomGain = context.createGain();
      const boomFilter = context.createBiquadFilter();
      boom.type = "sawtooth";
      boom.frequency.setValueAtTime(92, now);
      boom.frequency.exponentialRampToValueAtTime(31, now + 1.45);
      boomFilter.type = "lowpass";
      boomFilter.frequency.setValueAtTime(190, now);
      boomFilter.frequency.exponentialRampToValueAtTime(72, now + 1.5);
      boomGain.gain.setValueAtTime(0.0001, now);
      boomGain.gain.linearRampToValueAtTime(0.13, now + 0.12);
      boomGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.65);
      boom.connect(boomFilter); boomFilter.connect(boomGain); boomGain.connect(context.destination);
      boom.start(now); boom.stop(now + 1.7);

      const fire = context.createOscillator();
      const fireGain = context.createGain();
      const fireFilter = context.createBiquadFilter();
      fire.type = "sawtooth";
      fire.frequency.setValueAtTime(520, now);
      fire.frequency.exponentialRampToValueAtTime(125, now + 1.8);
      fireFilter.type = "lowpass";
      fireFilter.frequency.setValueAtTime(1500, now);
      fireFilter.frequency.exponentialRampToValueAtTime(260, now + 1.9);
      fireGain.gain.setValueAtTime(0.0001, now);
      fireGain.gain.linearRampToValueAtTime(0.035, now + 0.2);
      fireGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.95);
      fire.connect(fireFilter); fireFilter.connect(fireGain); fireGain.connect(context.destination);
      fire.start(now); fire.stop(now + 2);

      [1.42, 1.49, 1.57].forEach((delay, index) => {
        const crack = context.createOscillator();
        const crackGain = context.createGain();
        crack.type = "square";
        crack.frequency.setValueAtTime([170, 115, 78][index], now + delay);
        crackGain.gain.setValueAtTime(0.0001, now + delay);
        crackGain.gain.linearRampToValueAtTime([0.07, 0.055, 0.04][index], now + delay + 0.015);
        crackGain.gain.exponentialRampToValueAtTime(0.0001, now + delay + 0.2);
        crack.connect(crackGain); crackGain.connect(context.destination);
        crack.start(now + delay); crack.stop(now + delay + 0.22);
      });
      return;
    }

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
    script.src = "./gift-engine.js?v=phantom-train-right-facing-rebuild-20261108c";
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
      duration: gift.style === "phantomtrain" ? 11000 : gift.style === "storm_of_the_world" ? 9200 : gift.style === "meteor" ? 7800 : gift.style === "grand" ? 7600 : 4300
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
