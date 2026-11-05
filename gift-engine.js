(function () {
  "use strict";
  if (window.TikNationGiftEngine) return;

  var css = [
    "#tiknation-gift-engine{position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;overflow:hidden;pointer-events:none;padding:12px;box-sizing:border-box;background:radial-gradient(ellipse,rgba(17,25,62,.45),rgba(0,0,0,.88));opacity:1}",
    "#tiknation-gift-engine .ge-card{position:relative;width:min(94vw,760px);min-height:min(66vh,520px);display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;box-sizing:border-box;border:2px solid var(--ge-accent);border-radius:30px;background:radial-gradient(ellipse at 50% 55%,var(--ge-glow),#080b20 72%);box-shadow:0 0 55px var(--ge-glow),inset 0 0 60px rgba(140,120,255,.18);animation:ge-enter .7s cubic-bezier(.16,1,.3,1) both}",
    "#tiknation-gift-engine .ge-ring{position:absolute;width:min(58vw,360px);aspect-ratio:1;border:3px solid var(--ge-accent);border-radius:50%;box-shadow:0 0 30px var(--ge-accent),inset 0 0 30px var(--ge-accent);animation:ge-ring 2.6s ease-out infinite}",
    "#tiknation-gift-engine .ge-emoji{position:relative;z-index:2;font-size:clamp(90px,22vw,190px);line-height:1.2;filter:drop-shadow(0 0 22px var(--ge-accent));animation:ge-hero 2.8s cubic-bezier(.2,.8,.2,1) both}",
    "#tiknation-gift-engine .ge-title{position:relative;z-index:3;margin-top:14px;padding:0 12px;color:#fff;text-align:center;font-size:clamp(22px,5vw,42px);font-weight:1000;letter-spacing:.08em;text-transform:uppercase;text-shadow:0 0 20px var(--ge-accent)}",
    "#tiknation-gift-engine .ge-message{position:relative;z-index:3;margin:10px 14px 0;color:#e5edff;text-align:center;font-size:clamp(13px,2.5vw,18px)}",
    "#tiknation-gift-engine .ge-particle{position:absolute;left:50%;top:50%;color:var(--ge-accent);font-size:clamp(18px,4vw,34px);text-shadow:0 0 14px currentColor;animation:ge-particle 3s ease-out both;animation-delay:var(--delay)}",
    "#tiknation-gift-engine[data-style=dragon],#tiknation-gift-engine[data-style=dragonrevenge]{--ge-accent:#ff9b55;--ge-glow:rgba(255,90,25,.48)}",
    "#tiknation-gift-engine[data-style=galaxy],#tiknation-gift-engine[data-style=infinity],#tiknation-gift-engine[data-style=portal]{--ge-accent:#c5a2ff;--ge-glow:rgba(116,65,255,.5)}",
    "#tiknation-gift-engine[data-style=storm],#tiknation-gift-engine[data-style=lightning],#tiknation-gift-engine[data-style=burst]{--ge-accent:#bceaff;--ge-glow:rgba(65,155,255,.5)}",
    "#tiknation-gift-engine[data-style=crown],#tiknation-gift-engine[data-style=treasure]{--ge-accent:#ffe08a;--ge-glow:rgba(255,174,40,.5)}",
    "#tiknation-gift-engine[data-style=notes],#tiknation-gift-engine[data-style=pulse],#tiknation-gift-engine[data-style=grand]{--ge-accent:#ff9bd7;--ge-glow:rgba(255,65,190,.45)}",
    "#tiknation-gift-engine[data-style=ice],#tiknation-gift-engine[data-style=clouds]{--ge-accent:#8af3ff;--ge-glow:rgba(45,200,255,.48)}",
    "@keyframes ge-enter{from{opacity:0;transform:scale(.55) translateY(40px);filter:blur(8px)}to{opacity:1;transform:scale(1);filter:blur(0)}}",
    "@keyframes ge-ring{0%{opacity:0;transform:scale(.15)}35%{opacity:1}100%{opacity:0;transform:scale(1.7)}}",
    "@keyframes ge-hero{0%{opacity:0;transform:translateY(100px) scale(.2) rotate(-20deg)}45%{opacity:1;transform:translateY(-14px) scale(1.18) rotate(7deg)}75%{transform:translateY(0) scale(.96)}100%{transform:scale(1)}}",
    "@keyframes ge-particle{0%{opacity:0;transform:translate(-50%,-50%) scale(.2)}18%{opacity:1}100%{opacity:0;transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) rotate(260deg) scale(.25)}}",
    "@media(prefers-reduced-motion:reduce){#tiknation-gift-engine *{animation-duration:.01ms!important;animation-iteration-count:1!important}}"
  ].join("\n");

  function install() {
    if (document.getElementById("tiknation-gift-engine-style")) return;
    var style = document.createElement("style");
    style.id = "tiknation-gift-engine-style";
    style.textContent = css;
    document.head.appendChild(style);
  }

  function render(gift, options) {
    if (!gift || !document.body) return false;
    options = options || {};
    install();
    var previous = document.getElementById("tiknation-gift-engine");
    if (previous) previous.remove();

    var overlay = document.createElement("div");
    overlay.id = "tiknation-gift-engine";
    overlay.dataset.style = String(gift.style || "spark").toLowerCase().replace(/[^a-z0-9_-]/g, "");
    overlay.style.setProperty("--ge-accent", "#7eeaff");
    overlay.style.setProperty("--ge-glow", "rgba(60,190,255,.45)");

    var card = document.createElement("div");
    card.className = "ge-card";
    var ring = document.createElement("div");
    ring.className = "ge-ring";
    var emoji = document.createElement("div");
    emoji.className = "ge-emoji";
    emoji.textContent = gift.emoji || "🎁";
    var title = document.createElement("div");
    title.className = "ge-title";
    title.textContent = gift.name || "TikNation Gift";
    var message = document.createElement("div");
    message.className = "ge-message";
    message.textContent = gift.message || "A gift has arrived!";
    card.append(ring, emoji, title, message);

    var symbols = ["✦", "✧", "✶", "•", "✷", "⋆"];
    for (var i = 0; i < 24; i++) {
      var particle = document.createElement("span");
      var angle = Math.PI * 2 * i / 24;
      var distance = 120 + (i % 5) * 42;
      particle.className = "ge-particle";
      particle.textContent = symbols[i % symbols.length];
      particle.style.setProperty("--dx", Math.cos(angle) * distance + "px");
      particle.style.setProperty("--dy", Math.sin(angle) * distance + "px");
      particle.style.setProperty("--delay", (i % 8) * .04 + "s");
      card.appendChild(particle);
    }

    overlay.appendChild(card);
    document.body.appendChild(overlay);
    var duration = Math.max(2200, Number(options.duration) || 4800);
    window.setTimeout(function () {
      if (!overlay.isConnected) return;
      overlay.style.transition = "opacity .4s ease";
      overlay.style.opacity = "0";
      window.setTimeout(function () { overlay.remove(); }, 430);
    }, duration);
    return true;
  }

  var queue = [];
  var playing = false;
  function next() {
    var item = queue.shift();
    if (!item) { playing = false; return; }
    playing = true;
    try { render(item.gift, item.options); }
    catch (error) { console.error("TikNation gift render error:", error); }
    window.setTimeout(function () { next(); }, Math.max(2600, Number(item.options.duration) || 4800) + 500);
  }
  function show(gift, options) {
    if (!gift || !document.body) return false;
    queue.push({ gift: gift, options: options || {} });
    if (!playing) next();
    return true;
  }

  window.TikNationGiftEngine = Object.freeze({ show: show });
})();