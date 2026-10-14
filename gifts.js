const TIKNATION_GIFT_CATALOG = {
  heart_pulse: { name: "Heart Pulse", emoji: "💗", category: "Musical", cost: 5, sound: [523, 659], style: "pulse", message: "A little love, with a heartbeat." },
  melody_note: { name: "Melody Note", emoji: "🎵", category: "Musical", cost: 5, sound: [659, 784, 988], style: "notes", message: "A tiny melody for your world." },
  heartbeat_beat: { name: "Heartbeat Beat", emoji: "🥁", category: "Musical", cost: 10, sound: [110, 110, 220], style: "pulse", message: "Feel the rhythm." },
  symphony: { name: "Symphony", emoji: "🎼", category: "Musical", cost: 50, sound: [523, 659, 784, 1047], style: "grand", message: "A little grand finale." },
  magic_spark: { name: "Magic Spark", emoji: "✨", category: "Magical", cost: 10, sound: [784, 1175], style: "spark", message: "A spark of possibility." },
  mystic_portal: { name: "Mystic Portal", emoji: "🌀", category: "Magical", cost: 25, sound: [392, 587, 784], style: "portal", message: "Open a doorway to wonder." },
  dragon_spirit: { name: "Dragon Spirit", emoji: "🐉", category: "Magical", cost: 75, sound: [196, 293, 392, 587], style: "dragon", message: "Unleash a legendary spirit." },
  galaxy_gift: { name: "Galaxy Gift", emoji: "🌌", category: "Magical", cost: 100, sound: [220, 330, 440, 660, 880], style: "galaxy", message: "A whole galaxy, just for you." },
  creator_crown: { name: "Creator’s Crown", emoji: "👑", category: "Legendary", cost: 50, sound: [523, 659, 784], style: "crown", message: "Celebrate the creator." },
  infinity_crystal: { name: "Infinity Crystal", emoji: "💎", category: "Legendary", cost: 150, sound: [392, 523, 659, 784, 1047], style: "infinity", message: "A gift beyond the ordinary." }
};

let tikNationGiftAudioContext = null;

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

function showTikNationGiftEffect(gift) {
  const reduced = document.body.classList.contains("tn-reduce-motion") ||
    (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const old = document.getElementById("tikNationGiftCelebration");
  if (old) old.remove();
  const overlay = document.createElement("div");
  overlay.id = "tikNationGiftCelebration";
  overlay.className = "gift-celebration gift-celebration-" + gift.style + (reduced ? " gift-celebration-reduced" : "");
  overlay.setAttribute("role", "status");
  overlay.setAttribute("aria-live", "polite");
  const safeName = escapeHtml(gift.name);
  const safeMessage = escapeHtml(gift.message);
  overlay.innerHTML = '<div class="gift-celebration-orbit" aria-hidden="true"></div><div class="gift-celebration-content"><span class="gift-celebration-emoji" aria-hidden="true">' + gift.emoji + '</span><strong>' + safeName + '</strong><span>' + safeMessage + '</span><small>TIKNATION GIFT · TEST COINS ONLY</small></div>';
  document.body.appendChild(overlay);
  if (!reduced) {
    for (let i = 0; i < 18; i++) {
      const particle = document.createElement("span");
      particle.className = "gift-celebration-particle";
      particle.textContent = ["✦", "·", "✧", "✶"][i % 4];
      particle.style.setProperty("--particle-index", String(i));
      overlay.appendChild(particle);
    }
  }
  window.setTimeout(() => overlay.remove(), reduced ? 1600 : 2600);
  playTikNationGiftSound(gift);
}

async function sendTikNationGift(recipientId, giftCode) {
  const panel = document.getElementById("publicCreatorGiftPanel");
  const status = document.getElementById("publicCreatorGiftStatus");
  if (!currentUser) { openAuthModal("signin"); return; }
  if (recipientId === currentUser.id) return;
  const gift = TIKNATION_GIFT_CATALOG[giftCode];
  if (!gift) {
    if (status) { status.className = "gift-status error"; status.textContent = "That gift is not available yet."; }
    return;
  }
  if (!window.crypto || !window.crypto.randomUUID) {
    if (status) status.textContent = "Please update your browser before sending gifts.";
    return;
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
  } catch (error) {
    if (status) { status.className = "gift-status error"; status.textContent = error.message || "Gift could not be sent."; }
  } finally {
    buttons.forEach(button => button.disabled = false);
  }
}

async function loadTikNationGiftDashboard() {
  const balance = document.getElementById("creatorGiftBalance");
  const summary = document.getElementById("creatorGiftSummary");
  const historyNode = document.getElementById("creatorGiftHistory");
  const refresh = document.getElementById("refreshGiftHistoryButton");
  if (!balance || !summary || !historyNode || !currentUser) return;
  if (refresh) refresh.disabled = true;
  try {
    const values = await Promise.all([
      invokeTikNationGifts({ action: "balance" }),
      invokeTikNationGifts({ action: "history" })
    ]);
    balance.textContent = "🪙 " + Number(values[0].balance || 0).toLocaleString() + " test coins";
    const data = values[1];
    summary.textContent = "Received " + Number(data.received_count || 0) + " gifts · " + Number(data.received_test_coins || 0).toLocaleString() + " test coins received. Not real earnings.";
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
  } catch (error) {
    balance.textContent = "Test coin balance unavailable";
    summary.textContent = error.message || "Gift activity could not be loaded.";
  } finally {
    if (refresh) refresh.disabled = false;
  }
}
