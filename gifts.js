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

async function sendTikNationGift(recipientId, giftCode) {
  const panel = document.getElementById("publicCreatorGiftPanel");
  const status = document.getElementById("publicCreatorGiftStatus");
  if (!currentUser) { openAuthModal("signin"); return; }
  if (recipientId === currentUser.id) return;
  if (!window.crypto || !window.crypto.randomUUID) {
    if (status) status.textContent = "Please update your browser before sending gifts.";
    return;
  }
  const buttons = panel ? Array.from(panel.querySelectorAll(".gift-choice")) : [];
  buttons.forEach(button => button.disabled = true);
  if (status) { status.className = "gift-status"; status.textContent = "Sending test gift…"; }
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
      if (giftCode === "creator_crown" || giftCode === "infinity_crystal") panel.classList.add("gift-signature");
    }
    const names = { heart_pulse: "Heart Pulse", magic_spark: "Magic Spark", creator_crown: "Creator’s Crown", infinity_crystal: "Infinity Crystal" };
    if (status) { status.className = "gift-status success"; status.textContent = "✨ " + (names[giftCode] || "Gift") + " sent! Test gifts have no cash value."; }
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
    const names = { heart_pulse: "💗 Heart Pulse", magic_spark: "✨ Magic Spark", creator_crown: "👑 Creator’s Crown", infinity_crystal: "💎 Infinity Crystal" };
    const rows = data.history || [];
    historyNode.innerHTML = rows.length ? rows.map(item => {
      const other = item.other_user || {};
      const name = escapeHtml(other.display_name || other.username || "TikNation creator");
      const date = escapeHtml(new Date(item.created_at).toLocaleDateString());
      const direction = item.direction === "sent" ? "Sent to " : "Received from ";
      const amount = Number(item.coin_cost || 0);
      return '<div class="gift-history-item"><span><strong>' + direction + name + '</strong><br><span class="gift-panel-copy">' + (names[item.gift_code] || "Gift") + ' · ' + date + '</span></span><strong>' + (item.direction === "sent" ? "−" : "+") + amount + ' test coins</strong></div>';
    }).join("") : '<p class="gift-panel-copy">No gifts yet. Your gift history will appear here.</p>';
  } catch (error) {
    balance.textContent = "Test coin balance unavailable";
    summary.textContent = error.message || "Gift activity could not be loaded.";
  } finally {
    if (refresh) refresh.disabled = false;
  }
}
