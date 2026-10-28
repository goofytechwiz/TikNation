/* TikNation Horror Mirror — Dust & Awakening enhancement.
   Effects are generated in this browser. Camera frames are not uploaded. */
(() => {
  const stage = document.getElementById('stage');
  if (!stage || stage.dataset.hauntingReady === '1') return;
  stage.dataset.hauntingReady = '1';

  const style = document.createElement('style');
  style.textContent =
    '.haunt-dust{position:absolute;z-index:10;inset:0;pointer-events:none;overflow:hidden;opacity:.9;mask-image:linear-gradient(transparent,#000 14%,#000 90%,transparent)}' +
    '.haunt-speck{position:absolute;top:-12px;border-radius:50%;background:#e1d8c6;box-shadow:0 0 5px #e8ddca88;opacity:0;animation:dustFall var(--duration,12s) linear var(--delay,0s) infinite}' +
    '@keyframes dustFall{0%{transform:translate3d(0,-2vh,0);opacity:0}12%{opacity:var(--alpha,.5)}80%{opacity:var(--alpha,.5)}100%{transform:translate3d(var(--drift,18px),112vh,0);opacity:0}}' +
    '.haunt-film{position:absolute;z-index:8;inset:18px 14px 14px;border-radius:18% 18% 2px 2px/3% 3% 2px 2px;pointer-events:none;opacity:0;background:linear-gradient(115deg,#d8d0c21a,#766b5b0d 30%,#e4d9c61c 60%,#08070c20);transition:opacity 1.8s ease;mix-blend-mode:screen}' +
    '.stage.haunt-dirty .haunt-film{opacity:0}.haunt-film:before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 28% 36%,#d8d0c2a8 0 1px,transparent 2px),radial-gradient(ellipse at 72% 59%,#d8d0c288 0 1px,transparent 2px),radial-gradient(ellipse at 52% 19%,#d8d0c288 0 1px,transparent 2px);background-size:47px 51px,61px 57px,73px 63px;opacity:.48}' +
    '.haunt-wipe{position:absolute;z-index:11;inset:18px 14px 14px;border-radius:18% 18% 2px 2px/3% 3% 2px 2px;pointer-events:auto;touch-action:none;cursor:crosshair}' +
    '.haunt-handprint{position:absolute;left:50%;top:47%;width:104px;height:126px;transform:translate(-50%,-50%) scale(.72) rotate(-9deg);opacity:0;transition:opacity .8s ease,transform .8s ease;filter:drop-shadow(0 0 8px #b5a6d433)}' +
    '.haunt-handprint:before{content:"";position:absolute;left:25px;top:38px;width:58px;height:73px;border-radius:45% 45% 38% 38%;background:#d7d0bf18;border:2px solid #d7d0bf44;box-shadow:inset 0 0 13px #d7d0bf12}' +
    '.haunt-handprint:after{content:"";position:absolute;left:24px;top:1px;width:12px;height:48px;border-radius:12px;background:#d7d0bf20;border:2px solid #d7d0bf44;box-shadow:17px -7px 0 -1px #d7d0bf20,17px -7px 0 1px #d7d0bf44,34px -3px 0 -1px #d7d0bf20,34px -3px 0 1px #d7d0bf44,51px 7px 0 -2px #d7d0bf20,51px 7px 0 0 #d7d0bf44,-10px 36px 0 -1px #d7d0bf20,-10px 36px 0 1px #d7d0bf44}' +
    '.stage.haunt-hand .haunt-handprint{opacity:.9;transform:translate(-50%,-50%) scale(1) rotate(-9deg)}' +
    '.haunt-controls{display:flex;gap:10px;flex-wrap:wrap;margin:0 0 12px}.haunt-controls button{flex:1;min-width:145px}.haunt-controls .haunt-start{border:1px solid #c2b0ff88;background:linear-gradient(110deg,#242033,#101019);color:#f4efff}' +
    '.stage.haunt-flicker{animation:hauntFlicker .17s steps(2,end) 5}@keyframes hauntFlicker{0%,100%{filter:brightness(1)}35%{filter:brightness(.18) contrast(1.8)}70%{filter:brightness(1.55) contrast(1.4)}}' +
    '.stage.haunt-creak:before{animation:frameCreak .16s steps(2,end) 8}@keyframes frameCreak{0%,100%{transform:translateX(0)}25%{transform:translateX(-2px)}75%{transform:translateX(2px)}}' +
    '.haunt-message{position:absolute;z-index:12;left:8%;right:8%;top:43%;text-align:center;font-weight:900;letter-spacing:.12em;font-size:clamp(1rem,4vw,1.6rem);color:#e8e1f5;text-shadow:0 0 10px #c1aaff,0 2px 6px #000;opacity:0;transform:scale(.96);pointer-events:none}' +
    '.stage.haunt-warning .haunt-message{opacity:1;animation:hauntText 2.8s ease both}@keyframes hauntText{0%,100%{opacity:0}15%,78%{opacity:1}50%{letter-spacing:.17em;transform:scale(1.03)}}' +
    '.stage.haunt-lunge{animation:hauntLunge .85s cubic-bezier(.2,.8,.2,1) both}.stage.haunt-lunge .presence{opacity:1!important;transform:translateY(8%) scale(1.85)!important;filter:contrast(1.5) brightness(1.45)!important;transition:transform .65s cubic-bezier(.1,.8,.2,1),filter .2s}.stage.haunt-lunge .head:after{opacity:1;filter:brightness(2)}' +
    '@keyframes hauntLunge{0%{transform:translate(0,0) scale(1);filter:brightness(1)}18%{transform:translate(-2px,1px) scale(1.015);filter:brightness(.2)}38%{transform:translate(2px,-1px) scale(1.025);filter:brightness(1.8)}62%{transform:translate(0,0) scale(1.12);filter:brightness(1.4)}100%{transform:translate(0,0) scale(1);filter:brightness(.05)}}' +
    '.stage.haunt-blackout:after{background:#020106;inset:0;border:0;border-radius:0;box-shadow:none;animation:hauntBlackout 3.6s ease both}@keyframes hauntBlackout{0%,15%{opacity:1}35%,70%{opacity:.92}100%{opacity:1}}' +
    '@media(prefers-reduced-motion:reduce){.haunt-speck,.stage.haunt-flicker,.stage.haunt-lunge,.stage.haunt-warning .haunt-message{animation:none!important}.haunt-film,.haunt-handprint{transition:none}}' +
    '.haunt-scare-overlay{position:absolute;z-index:9;inset:0;pointer-events:none;opacity:0;transition:opacity 1.8s ease;mix-blend-mode:screen;background:radial-gradient(ellipse at 69% 36%,#b0002024 0,transparent 23%),radial-gradient(ellipse at 72% 53%,#6b001a20 0,transparent 31%),linear-gradient(132deg,transparent 0 39%,#d7d0df18 39.2%,transparent 39.7% 100%),linear-gradient(48deg,transparent 0 61%,#d7d0df14 61.2%,transparent 61.6% 100%)}' +
    '.haunt-scare-overlay:before{content:"";position:absolute;inset:0;opacity:0;background:radial-gradient(ellipse 9px 4px at 69% 34%,#ff2638 0 28%,#a00020 58%,transparent 100%),radial-gradient(ellipse 9px 4px at 77% 34%,#ff2638 0 28%,#a00020 58%,transparent 100%),radial-gradient(ellipse at 73% 35%,#d0002b22 0,transparent 12%);filter:drop-shadow(0 0 7px #ff002f);transition:opacity .8s ease;animation:scareEyes 3.8s ease-in-out infinite}' +
    '.stage.awake .haunt-scare-overlay{opacity:.85}' +
    '.stage.awake .haunt-scare-overlay:before{opacity:.9}' +
    '.stage.haunt-lunge .haunt-scare-overlay{opacity:1;filter:contrast(1.6) brightness(1.5)}.stage.haunt-lunge .haunt-scare-overlay:before{opacity:1;animation-duration:.35s}' +
    '.haunt-reaching-hands{position:absolute;z-index:14;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;opacity:0;transform:translateY(22%) scale(.72);transform-origin:50% 65%;filter:drop-shadow(0 0 9px #000) drop-shadow(0 0 5px #6d001b);transition:opacity .3s ease,transform .65s cubic-bezier(.12,.78,.18,1)}' +
    '.stage.haunt-hands-reach .haunt-reaching-hands{opacity:1;transform:translateY(3%) scale(1)}' +
    '.stage.haunt-hands-grab .haunt-reaching-hands{opacity:1;transform:translateY(-2%) scale(1.28);filter:drop-shadow(0 0 20px #ff002f) brightness(1.25)}' +
    '.haunt-reaching-hands .haunt-face{opacity:0;transform:translateY(22px) scale(.88);transform-origin:180px 190px;transition:opacity .5s ease,transform .7s ease;filter:drop-shadow(0 0 9px #b9002c)}' +
    '.stage.haunt-hands-reach .haunt-reaching-hands .haunt-face,.stage.haunt-hands-grab .haunt-reaching-hands .haunt-face{opacity:1;transform:translateY(0) scale(1)}' +
    '.stage.haunt-hands-grab .haunt-reaching-hands .haunt-face{animation:hauntFaceLunge .35s ease-out both}' +
    '@keyframes hauntFaceLunge{0%{transform:translateY(0) scale(1)}55%{transform:translateY(28px) scale(1.3)}100%{transform:translateY(8px) scale(1.12)}}' +
    '.haunt-reaching-hands .arm{fill:url(#hauntArm);stroke:#514454;stroke-width:1.5;stroke-linejoin:round}' +
    '.haunt-reaching-hands .claw{fill:url(#hauntClaw);stroke:#776478;stroke-width:1.2;stroke-linejoin:round}' +
    '.haunt-reaching-hands .crack{fill:none;stroke:#d7d0e8;stroke-width:1.4;stroke-linecap:round;opacity:0;filter:drop-shadow(0 0 3px #b5aaff)}' +
    '.stage.haunt-hands-reach .haunt-reaching-hands .crack{opacity:.8;animation:hauntGlassCrack .8s ease-out both}' +
    '@keyframes hauntGlassCrack{0%{opacity:0;stroke-dasharray:0 120}40%{opacity:1}100%{opacity:.55;stroke-dasharray:120 0}}' +
    '@media(prefers-reduced-motion:reduce){.haunt-reaching-hands{transition:none}.stage.haunt-hands-reach .haunt-reaching-hands .crack{animation:none;opacity:.7}}' +
    '.stage.haunt-blackout .haunt-scare-overlay{opacity:0!important}' +
    '@keyframes scareEyes{0%,38%,44%,100%{opacity:.85}40%,42%{opacity:.12}70%{opacity:.55}}' +

    '.stage.fx-haunted:after{content:"";position:absolute;inset:0;pointer-events:none;z-index:7;background:radial-gradient(ellipse at 50% 40%,transparent 25%,#10001599 100%);box-shadow:inset 0 0 45px #5d003c55;animation:fxHaunted 5s ease-in-out infinite}' +
    '@keyframes fxHaunted{0%,100%{opacity:.45}50%{opacity:.9}}' +
    '.stage.fx-bloodmoon:after{content:"";position:absolute;inset:0;pointer-events:none;z-index:7;background:radial-gradient(circle at 50% 34%,#b0003022,transparent 48%),linear-gradient(180deg,#26000820,transparent 65%);mix-blend-mode:screen}' +
    '.stage.fx-static:after{content:"";position:absolute;inset:0;pointer-events:none;z-index:7;background:repeating-linear-gradient(0deg,#fff0 0 3px,#d7c8ff18 4px,#fff0 5px);animation:fxStatic .16s steps(2,end) infinite}' +
    '@keyframes fxStatic{0%{transform:translateY(-2px)}100%{transform:translateY(2px)}}' +
    '@media(prefers-reduced-motion:reduce){.stage.fx-haunted:after,.stage.fx-static:after{animation:none}}' +
  document.head.appendChild(style);

  const reachingHands = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  reachingHands.setAttribute('viewBox', '0 0 360 640');
  reachingHands.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  reachingHands.setAttribute('class', 'haunt-reaching-hands');
  reachingHands.setAttribute('aria-hidden', 'true');
  reachingHands.innerHTML = '<defs><linearGradient id="hauntArm" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#403541"/><stop offset=".38" stop-color="#17121b"/><stop offset=".76" stop-color="#050407"/><stop offset="1" stop-color="#000"/></linearGradient><linearGradient id="hauntClaw" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#574957"/><stop offset=".45" stop-color="#17111a"/><stop offset="1" stop-color="#020103"/></linearGradient></defs>' +
    '<g class="crack"><path d="M180 215 L160 185 166 157 145 130 M160 185 L130 190 111 173 M166 157 L190 143 204 115 M190 143 L222 150 239 135 M180 215 L198 238 193 263 M160 185 L143 214 121 226"/></g>' +
    '<g class="haunt-face"><path d="M139 193 Q130 148 153 122 Q180 96 207 122 Q230 148 221 193 L209 224 Q180 251 151 224Z" fill="#09070c" stroke="#493541" stroke-width="2"/><path d="M148 168 Q163 151 174 169 Q161 179 148 168Z M186 169 Q198 151 212 168 Q199 179 186 169Z" fill="#ff173d"/><ellipse cx="161" cy="167" rx="3" ry="5" fill="#fff0e8"/><ellipse cx="199" cy="167" rx="3" ry="5" fill="#fff0e8"/><path d="M151 207 Q180 192 209 207 L202 225 Q180 237 158 225Z" fill="#020103" stroke="#6d2638" stroke-width="2"/><path d="M160 208 L166 220 172 207 178 222 185 207 192 220 200 208" fill="none" stroke="#d9c8d0" stroke-width="3"/></g>' +
    '<g class="arm"><path d="M40 650 Q35 560 47 488 Q54 435 73 388 L105 329 Q116 309 133 323 Q145 335 132 355 L111 401 105 451 118 492 131 650Z"/><path d="M320 650 Q325 560 313 488 Q306 435 287 388 L255 329 Q244 309 227 323 Q215 335 228 355 L249 401 255 451 242 492 229 650Z"/></g>' +
    '<g class="claw"><path d="M89 425 Q73 407 61 382 L39 344 Q31 329 40 321 Q49 315 58 332 L81 359 70 319 Q66 300 78 297 Q91 296 95 316 L108 356 102 311 Q101 292 114 291 Q127 292 127 312 L132 354 137 325 Q141 308 153 313 Q164 318 157 337 L146 385 Q139 414 120 436Z"/><path d="M271 425 Q287 407 299 382 L321 344 Q329 329 320 321 Q311 315 302 332 L279 359 290 319 Q294 300 282 297 Q269 296 265 316 L252 356 258 311 Q259 292 246 291 Q233 292 233 312 L228 354 223 325 Q219 308 207 313 Q196 318 203 337 L214 385 Q221 414 240 436Z"/></g>' +
    '<g fill="#d5c6cf" opacity=".72"><path d="M42 325 L49 330 43 334Z"/><path d="M79 301 L85 309 79 312Z"/><path d="M115 295 L120 304 114 307Z"/><path d="M318 325 L311 330 317 334Z"/><path d="M281 301 L275 309 281 312Z"/><path d="M245 295 L240 304 246 307Z"/></g>';
  stage.appendChild(reachingHands);

  const scareOverlay = document.createElement('div');
  scareOverlay.className = 'haunt-scare-overlay';
  scareOverlay.setAttribute('aria-hidden', 'true');
  stage.appendChild(scareOverlay);

  const dust = document.createElement('div');
  dust.className = 'haunt-dust';
  dust.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 54; i++) {
    const p = document.createElement('i');
    p.className = 'haunt-speck';
    p.style.left = (Math.random() * 100) + '%';
    p.style.width = p.style.height = (1 + Math.random() * 3) + 'px';
    p.style.setProperty('--duration', (8 + Math.random() * 13) + 's');
    p.style.setProperty('--delay', (-Math.random() * 18) + 's');
    p.style.setProperty('--drift', (-32 + Math.random() * 64) + 'px');
    p.style.setProperty('--alpha', (.18 + Math.random() * .42).toFixed(2));
    dust.appendChild(p);
  }
  stage.appendChild(dust);

  const film = document.createElement('div');
  film.className = 'haunt-film';
  film.setAttribute('aria-hidden', 'true');
  stage.appendChild(film);
  const dustCanvas = document.createElement('canvas');
  dustCanvas.style.cssText = 'position:absolute;z-index:12;inset:18px 14px 14px;width:calc(100% - 28px);height:calc(100% - 32px);pointer-events:auto;touch-action:none;cursor:crosshair;border-radius:18% 18% 2px 2px/3% 3% 2px 2px;';
  dustCanvas.setAttribute('aria-hidden','true');
  stage.appendChild(dustCanvas);
  const dustCtx = dustCanvas.getContext('2d');
  function paintDust() {
    const rect = dustCanvas.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 2);
    dustCanvas.width = Math.max(1, Math.round(rect.width*dpr));
    dustCanvas.height = Math.max(1, Math.round(rect.height*dpr));
    dustCtx.setTransform(dpr,0,0,dpr,0,0);
    dustCtx.clearRect(0,0,rect.width,rect.height);
    if (!dirty) return;
    dustCtx.fillStyle = 'rgba(175,160,139,.38)';
    dustCtx.fillRect(0,0,rect.width,rect.height);
    for (let i=0;i<260;i++) {
      dustCtx.fillStyle = 'rgba(225,216,198,'+(0.08+Math.random()*.28)+')';
      dustCtx.beginPath();
      dustCtx.arc(Math.random()*rect.width,Math.random()*rect.height,Math.random()*1.8+.35,0,Math.PI*2);
      dustCtx.fill();
    }
  }
  function eraseDust(x,y) {
    const rect=dustCanvas.getBoundingClientRect();
    const dpr=Math.min(window.devicePixelRatio||1,2);
    dustCtx.save();
    dustCtx.setTransform(dpr,0,0,dpr,0,0);
    dustCtx.globalCompositeOperation='destination-out';
    dustCtx.beginPath();
    dustCtx.arc(x-rect.left,y-rect.top,38,0,Math.PI*2);
    dustCtx.fill();
    dustCtx.restore();
  }
  window.addEventListener('resize',()=>{if(dirty)paintDust()});
  const hand = document.createElement('div');
  hand.className = 'haunt-handprint';
  hand.setAttribute('aria-hidden', 'true');
  stage.appendChild(hand);
  const wipe = dustCanvas;
  wipe.setAttribute('aria-label', 'Swipe or rub the mirror to wipe away dust');
  wipe.title = 'Swipe to wipe away the dust';
  const message = document.createElement('div');
  message.className = 'haunt-message';
  message.textContent = "DON'T LOOK BEHIND YOU";
  message.setAttribute('aria-hidden', 'true');
  stage.appendChild(message);

  const controls = document.createElement('div');
  controls.className = 'haunt-controls';
  controls.innerHTML = '<button type="button" class="haunt-start" id="hauntAwaken">Awaken the mirror</button><button type="button" id="hauntDust">Gather the dust</button><button type="button" id="hauntSound">Sound: On</button><button type="button" id="hauntFX">Effects: Cycle</button>';
  stage.insertAdjacentElement('afterend', controls);

  const status = document.getElementById('status');
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let audioContext = null, sequenceRunning = false, wiped = 0, dirty = false, wipeStartedAt = 0, revealTimer = null;
  const WIPE_MIN_DURATION_MS = 20000;
  function say(text) { if (status) status.textContent = text; }
  function getAudio() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!audioContext) audioContext = new AC();
    if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
    return audioContext;
  }
  function creak() {
    if (!soundEnabled) return;
    const ctx = getAudio(); if (!ctx) return;
    const now = ctx.currentTime, length = 1.55;
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * length), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length) * .45;
    const noise = ctx.createBufferSource(); noise.buffer = buffer;
    const filter = ctx.createBiquadFilter(); filter.type = 'bandpass';
    filter.frequency.setValueAtTime(340, now); filter.frequency.exponentialRampToValueAtTime(95, now + 1.2); filter.Q.value = 3.8;
    const gain = ctx.createGain(); gain.gain.setValueAtTime(.001, now); gain.gain.exponentialRampToValueAtTime(.22, now + .12); gain.gain.exponentialRampToValueAtTime(.001, now + length);
    const osc = ctx.createOscillator(); osc.type = 'sawtooth'; osc.frequency.setValueAtTime(83, now); osc.frequency.exponentialRampToValueAtTime(42, now + 1.3);
    const og = ctx.createGain(); og.gain.setValueAtTime(.001, now); og.gain.linearRampToValueAtTime(.045, now + .2); og.gain.exponentialRampToValueAtTime(.001, now + 1.35);
    noise.connect(filter); filter.connect(gain); gain.connect(ctx.destination); osc.connect(og); og.connect(ctx.destination);
    noise.start(now); noise.stop(now + length); osc.start(now); osc.stop(now + 1.4);
  }
  function hit() {
    if (!soundEnabled) return;
    const ctx = getAudio(); if (!ctx) return;
    const now = ctx.currentTime, osc = ctx.createOscillator(), gain = ctx.createGain();
    osc.type = 'sawtooth'; osc.frequency.setValueAtTime(115, now); osc.frequency.exponentialRampToValueAtTime(38, now + .42);
    gain.gain.setValueAtTime(.001, now); gain.gain.exponentialRampToValueAtTime(.36, now + .025); gain.gain.exponentialRampToValueAtTime(.001, now + .62);
    osc.connect(gain); gain.connect(ctx.destination); osc.start(now); osc.stop(now + .65);
  }

  function whisper() {
    if (!soundEnabled) return;
    const ctx = getAudio(); if (!ctx) return;
    const now = ctx.currentTime, length = 2.1;
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * length), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const fadeIn = Math.min(1, i / (ctx.sampleRate * .25));
      const fadeOut = Math.min(1, (data.length - i) / (ctx.sampleRate * .35));
      data[i] = (Math.random() * 2 - 1) * fadeIn * fadeOut * .22;
    }
    const source = ctx.createBufferSource(); source.buffer = buffer;
    const filter = ctx.createBiquadFilter(); filter.type = 'bandpass';
    filter.frequency.setValueAtTime(900, now);
    filter.frequency.linearRampToValueAtTime(1450, now + .7);
    filter.frequency.linearRampToValueAtTime(620, now + length);
    filter.Q.value = 1.4;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(.001, now);
    gain.gain.linearRampToValueAtTime(.12, now + .35);
    gain.gain.setValueAtTime(.09, now + 1.1);
    gain.gain.exponentialRampToValueAtTime(.001, now + length);
    source.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    source.start(now); source.stop(now + length);
  }

  function breath() {
    if (!soundEnabled) return;
    const ctx = getAudio(); if (!ctx) return;
    const now = ctx.currentTime, length = 2.6;
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * length), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const pulse = .45 + .55 * Math.sin((i / ctx.sampleRate) * Math.PI * 1.15);
      data[i] = (Math.random() * 2 - 1) * pulse * .28;
    }
    const source = ctx.createBufferSource(); source.buffer = buffer;
    const filter = ctx.createBiquadFilter(); filter.type = 'lowpass';
    filter.frequency.setValueAtTime(420, now);
    filter.frequency.linearRampToValueAtTime(180, now + length);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(.001, now);
    gain.gain.linearRampToValueAtTime(.11, now + .45);
    gain.gain.setValueAtTime(.08, now + 1.25);
    gain.gain.exponentialRampToValueAtTime(.001, now + length);
    source.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    source.start(now); source.stop(now + length);
  }

  function footsteps() {
    if (!soundEnabled) return;
    const ctx = getAudio(); if (!ctx) return;
    [0, .48, .96, 1.44].forEach((offset, index) => {
      const now = ctx.currentTime + offset;
      const osc = ctx.createOscillator(), gain = ctx.createGain();
      const filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 190;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(index % 2 ? 68 : 82, now);
      osc.frequency.exponentialRampToValueAtTime(34, now + .19);
      gain.gain.setValueAtTime(.001, now);
      gain.gain.exponentialRampToValueAtTime(index === 3 ? .17 : .11, now + .025);
      gain.gain.exponentialRampToValueAtTime(.001, now + .24);
      osc.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
      osc.start(now); osc.stop(now + .26);
    });
  }

  let soundEnabled = true, fxMode = 0;
  const soundButton = document.getElementById('hauntSound');
  const fxButton = document.getElementById('hauntFX');
  const fxModes = [
    {name:'FX: Haunted', cls:'fx-haunted'},
    {name:'FX: Blood Moon', cls:'fx-bloodmoon'},
    {name:'FX: Static', cls:'fx-static'},
    {name:'FX: Off', cls:''}
  ];
  soundButton.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundButton.textContent = soundEnabled ? 'Sound: On' : 'Sound: Off';
    say(soundEnabled ? 'Sound effects enabled.' : 'Sound effects muted.');
    if (soundEnabled) creak();
  });
  fxButton.addEventListener('click', () => {
    stage.classList.remove(...fxModes.map(m=>m.cls).filter(Boolean));
    fxMode = (fxMode + 1) % fxModes.length;
    if (fxModes[fxMode].cls) stage.classList.add(fxModes[fxMode].cls);
    fxButton.textContent = fxModes[fxMode].name;
    say('Visual effect set to ' + fxModes[fxMode].name.replace('FX: ','') + '.');
    if (soundEnabled) creak();
  });
  const originalGetAudio = getAudio;

  function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

  document.getElementById('hauntDust').addEventListener('click', () => {
    const button = document.getElementById('hauntDust');
    if (dirty) {
      // This button must never erase progress. Keep rubbing the glass to finish.
      say('Keep rubbing the mirror with your finger. Your wiping marks will stay until the glass is clean.');
      return;
    }
    dirty = true;
    wiped = 0;
    wipeStartedAt = Date.now();
    if (revealTimer) { clearTimeout(revealTimer); revealTimer = null; }
    lastPoint = null;
    stage.querySelectorAll('[data-haunt-wipe-mark]').forEach(mark => mark.remove());
    stage.classList.add('haunt-dirty');
    stage.style.touchAction = 'none';
    paintDust();
    stage.classList.remove('haunt-hand');
    button.textContent = 'Keep wiping…';
    say('Rub the mirror with your finger. Lift and start another stroke whenever you need — progress will stay.');
    creak();
  });

  let lastPoint = null;
  function wipeAt(x, y) {
    if (!dirty) return;
    if (lastPoint) {
      const dx=x-lastPoint.x, dy=y-lastPoint.y, distance=Math.hypot(dx,dy);
      wiped += distance;
      const steps=Math.max(1,Math.ceil(distance/12));
      for(let i=1;i<=steps;i++) eraseDust(lastPoint.x+dx*i/steps,lastPoint.y+dy*i/steps);
    } else eraseDust(x,y);
    lastPoint={x,y};
    if (wiped > 520 && !revealTimer) {
      const remaining = Math.max(0, WIPE_MIN_DURATION_MS - (Date.now() - wipeStartedAt));
      say(remaining > 0
        ? 'Keep wiping… the glass is slowly clearing. You have at least 20 seconds to wipe.'
        : 'The dust clears away. A handprint appears from the other side of the glass…');
      revealTimer = setTimeout(() => {
        revealTimer = null;
        if (!dirty || wiped <= 520) return;
        dirty = false; wiped = 0; lastPoint = null; wipeStartedAt = 0;
        dustCtx.clearRect(0,0,dustCanvas.width,dustCanvas.height);
        stage.classList.remove('haunt-dirty'); stage.style.touchAction = ''; stage.classList.add('haunt-hand');
        document.getElementById('hauntDust').textContent='Gather the dust';
        say('The dust clears away. A handprint appears from the other side of the glass…'); creak();
        setTimeout(()=>{if(!sequenceRunning)say('Something is standing on the other side.');},2300);
      }, remaining);
    }
  }
  stage.addEventListener('pointerdown',e=>{if(!dirty||e.pointerType==='touch')return;const r=dustCanvas.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)return;if(e.cancelable)e.preventDefault();lastPoint=null;if(stage.setPointerCapture)stage.setPointerCapture(e.pointerId);wipeAt(e.clientX,e.clientY);});
  stage.addEventListener('pointermove',e=>{if(!dirty||e.pointerType==='touch'||!e.buttons)return;if(e.cancelable)e.preventDefault();wipeAt(e.clientX,e.clientY);});
  stage.addEventListener('pointerup',()=>{lastPoint=null;});
  stage.addEventListener('pointercancel',()=>{lastPoint=null;});
  stage.addEventListener('touchstart',e=>{if(!dirty||!e.touches.length)return;const t=e.touches[0],r=dustCanvas.getBoundingClientRect();if(t.clientX<r.left||t.clientX>r.right||t.clientY<r.top||t.clientY>r.bottom)return;if(e.cancelable)e.preventDefault();lastPoint=null;wipeAt(t.clientX,t.clientY);},{passive:false});
  stage.addEventListener('touchmove',e=>{if(!dirty||!e.touches.length)return;if(e.cancelable)e.preventDefault();const t=e.touches[0];wipeAt(t.clientX,t.clientY);},{passive:false});
  stage.addEventListener('touchend',()=>{lastPoint=null;},{passive:true});
  stage.addEventListener('touchcancel',()=>{lastPoint=null;},{passive:true});

  document.getElementById('hauntAwaken').addEventListener('click', async () => {
    if (sequenceRunning) return;
    sequenceRunning = true;
    stage.classList.remove('haunt-flicker','haunt-creak','haunt-warning','haunt-lunge','haunt-blackout','haunt-hands-reach','haunt-hands-grab','haunt-redflash');
    stage.classList.add('awake','haunt-dirty'); stage.classList.remove('haunt-hand');
    stage.querySelectorAll('[data-haunt-wipe-mark]').forEach(mark => mark.remove());
    dirty = true; wiped = 0; lastPoint = null; stage.style.touchAction = 'none'; paintDust();
    document.getElementById('hauntAwaken').disabled = true;
    document.getElementById('hauntAwaken').textContent = 'The mirror is awake…';
    document.getElementById('hauntDust').textContent = 'Wipe the glass';
    say('The glass is clouding over. Listen carefully…'); creak();
    await wait(reduceMotion ? 600 : 2600); if (!sequenceRunning) return;
    say('Something is moving behind the dust… footsteps are getting closer.'); stage.classList.add('haunt-creak'); footsteps(); creak();
    await wait(reduceMotion ? 400 : 1800); if (!sequenceRunning) return;
    stage.classList.add('haunt-flicker'); say('The mirror is flickering…');
    await wait(reduceMotion ? 500 : 1400); if (!sequenceRunning) return;
    stage.classList.add('haunt-warning'); say("Don't look behind you."); whisper();
    await wait(reduceMotion ? 500 : 1800); if (!sequenceRunning) return;
    stage.classList.add('haunt-hands-reach'); say('Something is reaching through the glass…'); creak(); breath();
    await wait(reduceMotion ? 350 : 1000); if (!sequenceRunning) return;
    stage.classList.remove('haunt-warning'); stage.classList.add('haunt-hands-grab','haunt-lunge','haunt-redflash'); hit(); say('IT IS REACHING FOR YOU. IT GOT OUT.');
    await wait(reduceMotion ? 600 : 1100); if (!sequenceRunning) return;
    stage.classList.add('haunt-blackout');
    await wait(reduceMotion ? 700 : 1800); if (!sequenceRunning) return;
    stage.classList.remove('haunt-blackout','haunt-lunge','haunt-redflash','haunt-flicker','haunt-creak','haunt-hands-reach','haunt-hands-grab');
    stage.classList.add('haunt-hand'); stage.classList.remove('haunt-dirty');
    message.textContent = 'IT’S STILL IN THERE'; stage.classList.add('haunt-warning');
    say('A final creak echoes from the darkness. IT’S STILL IN THERE.'); creak();
    await wait(3000);
    stage.classList.remove('haunt-warning'); sequenceRunning = false;
    document.getElementById('hauntAwaken').disabled = false;
    document.getElementById('hauntAwaken').textContent = 'Awaken the mirror again';
    say('The mirror is quiet. For now.');
  });
})();