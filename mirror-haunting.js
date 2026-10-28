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
    '.stage.haunt-dirty .haunt-film{opacity:.74}.haunt-film:before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse at 28% 36%,#d8d0c2a8 0 1px,transparent 2px),radial-gradient(ellipse at 72% 59%,#d8d0c288 0 1px,transparent 2px),radial-gradient(ellipse at 52% 19%,#d8d0c288 0 1px,transparent 2px);background-size:47px 51px,61px 57px,73px 63px;opacity:.48}' +
    '.haunt-wipe{position:absolute;z-index:11;inset:18px 14px 14px;border-radius:18% 18% 2px 2px/3% 3% 2px 2px;pointer-events:auto;touch-action:pan-y;cursor:crosshair}' +
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
    '@media(prefers-reduced-motion:reduce){.haunt-speck,.stage.haunt-flicker,.stage.haunt-lunge,.stage.haunt-warning .haunt-message{animation:none!important}.haunt-film,.haunt-handprint{transition:none}}';
  document.head.appendChild(style);

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
  const hand = document.createElement('div');
  hand.className = 'haunt-handprint';
  hand.setAttribute('aria-hidden', 'true');
  stage.appendChild(hand);
  const wipe = document.createElement('div');
  wipe.className = 'haunt-wipe';
  wipe.setAttribute('aria-label', 'Swipe or rub the mirror to wipe away dust');
  wipe.title = 'Swipe to wipe away the dust';
  stage.appendChild(wipe);
  const message = document.createElement('div');
  message.className = 'haunt-message';
  message.textContent = "DON'T LOOK BEHIND YOU";
  message.setAttribute('aria-hidden', 'true');
  stage.appendChild(message);

  const controls = document.createElement('div');
  controls.className = 'haunt-controls';
  controls.innerHTML = '<button type="button" class="haunt-start" id="hauntAwaken">Awaken the mirror</button><button type="button" id="hauntDust">Gather the dust</button>';
  stage.insertAdjacentElement('afterend', controls);

  const status = document.getElementById('status');
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let audioContext = null, sequenceRunning = false, wiped = 0, dirty = false;
  function say(text) { if (status) status.textContent = text; }
  function getAudio() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!audioContext) audioContext = new AC();
    if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
    return audioContext;
  }
  function creak() {
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
    const ctx = getAudio(); if (!ctx) return;
    const now = ctx.currentTime, osc = ctx.createOscillator(), gain = ctx.createGain();
    osc.type = 'sawtooth'; osc.frequency.setValueAtTime(115, now); osc.frequency.exponentialRampToValueAtTime(38, now + .42);
    gain.gain.setValueAtTime(.001, now); gain.gain.exponentialRampToValueAtTime(.36, now + .025); gain.gain.exponentialRampToValueAtTime(.001, now + .62);
    osc.connect(gain); gain.connect(ctx.destination); osc.start(now); osc.stop(now + .65);
  }
  function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

  document.getElementById('hauntDust').addEventListener('click', () => {
    dirty = !dirty; stage.classList.toggle('haunt-dirty', dirty); stage.classList.toggle('haunt-hand', dirty);
    document.getElementById('hauntDust').textContent = dirty ? 'Wipe the glass' : 'Gather the dust';
    if (dirty) { wiped = 0; say('Dust gathers across the glass. Swipe the mirror to clear a path…'); creak(); }
    else { say('The glass is clearer… but the handprint remains in the reflection.'); creak(); }
  });

  let lastPoint = null;
  function wipeAt(x, y) {
    if (!dirty) return;
    if (lastPoint) wiped += Math.hypot(x - lastPoint.x, y - lastPoint.y);
    lastPoint = {x:x,y:y};
    const rect = stage.getBoundingClientRect(), mark = document.createElement('i');
    mark.style.cssText = 'position:absolute;z-index:10;pointer-events:none;left:'+(x-rect.left)+'px;top:'+(y-rect.top)+'px;width:62px;height:62px;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,#111018aa 0,#11101855 38%,transparent 72%);';
    stage.appendChild(mark);
    if (wiped > 360) {
      stage.classList.remove('haunt-dirty'); stage.classList.add('haunt-hand'); dirty = false;
      document.getElementById('hauntDust').textContent = 'Gather the dust';
      say('You wiped away the dust. A handprint is appearing from the other side of the glass…'); creak();
      setTimeout(() => { if (!sequenceRunning) say('Something is standing on the other side.'); }, 2300);
    }
  }
  wipe.addEventListener('pointerdown', e => { lastPoint = null; if (wipe.setPointerCapture) wipe.setPointerCapture(e.pointerId); wipeAt(e.clientX,e.clientY); });
  wipe.addEventListener('pointermove', e => { if (e.buttons || e.pointerType === 'touch') wipeAt(e.clientX,e.clientY); });
  wipe.addEventListener('pointerup', () => { lastPoint = null; });
  wipe.addEventListener('pointercancel', () => { lastPoint = null; });

  document.getElementById('hauntAwaken').addEventListener('click', async () => {
    if (sequenceRunning) return;
    sequenceRunning = true;
    stage.classList.remove('haunt-flicker','haunt-creak','haunt-warning','haunt-lunge','haunt-blackout');
    stage.classList.add('awake','haunt-dirty'); stage.classList.remove('haunt-hand');
    dirty = true; wiped = 0;
    document.getElementById('hauntAwaken').disabled = true;
    document.getElementById('hauntAwaken').textContent = 'The mirror is awake…';
    document.getElementById('hauntDust').textContent = 'Wipe the glass';
    say('The glass is clouding over. Listen carefully…'); creak();
    await wait(reduceMotion ? 600 : 2600); if (!sequenceRunning) return;
    say('Something is moving behind the dust.'); stage.classList.add('haunt-creak'); creak();
    await wait(reduceMotion ? 400 : 1800); if (!sequenceRunning) return;
    stage.classList.add('haunt-flicker'); say('The mirror is flickering…');
    await wait(reduceMotion ? 500 : 1400); if (!sequenceRunning) return;
    stage.classList.add('haunt-warning'); say("Don't look behind you.");
    await wait(reduceMotion ? 700 : 2600); if (!sequenceRunning) return;
    stage.classList.remove('haunt-warning'); stage.classList.add('haunt-lunge'); hit(); say('IT GOT OUT.');
    await wait(reduceMotion ? 600 : 1100); if (!sequenceRunning) return;
    stage.classList.add('haunt-blackout');
    await wait(reduceMotion ? 700 : 1800); if (!sequenceRunning) return;
    stage.classList.remove('haunt-blackout','haunt-lunge','haunt-flicker','haunt-creak');
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