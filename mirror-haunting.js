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
    '.haunt-handprint{position:absolute;left:65%;top:62%;width:104px;height:126px;transform:translate(-50%,-50%) scale(.72) rotate(-9deg);opacity:0;transition:opacity .8s ease,transform .8s ease;filter:drop-shadow(0 0 8px #b5a6d433)}' +
    '.haunt-handprint:before{content:"";position:absolute;left:25px;top:38px;width:58px;height:73px;border-radius:45% 45% 38% 38%;background:#d7d0bf18;border:2px solid #d7d0bf44;box-shadow:inset 0 0 13px #d7d0bf12}' +
    '.haunt-handprint:after{content:"";position:absolute;left:24px;top:1px;width:12px;height:48px;border-radius:12px;background:#d7d0bf20;border:2px solid #d7d0bf44;box-shadow:17px -7px 0 -1px #d7d0bf20,17px -7px 0 1px #d7d0bf44,34px -3px 0 -1px #d7d0bf20,34px -3px 0 1px #d7d0bf44,51px 7px 0 -2px #d7d0bf20,51px 7px 0 0 #d7d0bf44,-10px 36px 0 -1px #d7d0bf20,-10px 36px 0 1px #d7d0bf44}' +
    '.stage.haunt-hand .haunt-handprint{opacity:.9;transform:translate(-50%,-50%) scale(1) rotate(-9deg)}' +
    '.haunt-controls{display:flex;gap:10px;flex-wrap:wrap;margin:0 0 12px}.haunt-controls button{flex:1;min-width:145px}.haunt-controls .haunt-start{border:1px solid #c2b0ff88;background:linear-gradient(110deg,#242033,#101019);color:#f4efff}' +
    '.stage.haunt-flicker{animation:hauntFlicker .17s steps(2,end) 5}@keyframes hauntFlicker{0%,100%{filter:brightness(1)}35%{filter:brightness(.18) contrast(1.8)}70%{filter:brightness(1.55) contrast(1.4)}}' +
    '.stage.haunt-creak:before{animation:frameCreak .16s steps(2,end) 8}@keyframes frameCreak{0%,100%{transform:translateX(0)}25%{transform:translateX(-2px)}75%{transform:translateX(2px)}}' +
    '.haunt-message{position:absolute;z-index:12;left:8%;right:8%;top:22%;text-align:center;font-weight:900;letter-spacing:.12em;font-size:clamp(1rem,4vw,1.6rem);color:#e8e1f5;text-shadow:0 0 10px #c1aaff,0 2px 6px #000;opacity:0;transform:scale(.96);pointer-events:none}' +
    '.stage.haunt-warning .haunt-message{opacity:1;animation:hauntText 2.8s ease both}@keyframes hauntText{0%,100%{opacity:0}15%,78%{opacity:1}50%{letter-spacing:.17em;transform:scale(1.03)}}' +
    '.stage.haunt-warning .haunt-message{color:#fff4f7;text-shadow:0 0 5px #fff,0 0 16px #ff174c,0 0 34px #d00032,0 3px 8px #000;animation:hauntText 2.8s ease both,warningPulse 1.1s ease-in-out infinite}' +
    '@keyframes warningPulse{0%,100%{filter:brightness(.9);text-shadow:0 0 5px #fff,0 0 14px #ff174c,0 0 28px #d00032,0 3px 8px #000}50%{filter:brightness(1.35);text-shadow:0 0 8px #fff,0 0 22px #ff174c,0 0 44px #d00032,0 3px 8px #000}}' +
    '.stage.haunt-redflash:before{animation:redWarningFlash .22s ease-out 1;background:radial-gradient(ellipse at 50% 50%,#ff174c66 0, #a0002430 38%,transparent 75%)}' +
    '@keyframes redWarningFlash{0%{opacity:0}35%{opacity:1}100%{opacity:0}}' +
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
    '.haunt-reflection-echo{z-index:13!important;opacity:0!important;filter:blur(3px) drop-shadow(0 0 12px #5c1439)!important;transform:translate(0,10%) scale(.96)!important;transition:opacity 1.1s ease,transform 1.35s cubic-bezier(.2,.7,.2,1)!important;mix-blend-mode:screen}' +
    '.stage.haunt-hands-reach .haunt-reflection-echo{opacity:.2!important;transform:translate(-4px,5%) scale(1.015)!important}' +
    '.stage.awake .haunt-reflection-echo{opacity:.075!important;transform:translate(0,4%) scale(.985)!important;animation:livingReflection 7s ease-in-out infinite alternate;transition:opacity 1.8s ease,transform 2.4s ease!important}' +
    '.stage.awake .haunt-reflection-echo .haunt-face{opacity:.32;animation:reflectionWatch 6s ease-in-out infinite alternate}' +
    '.stage.awake.haunt-staring .haunt-reflection-echo{opacity:.14!important;filter:blur(1.6px) drop-shadow(0 0 17px #a00035)!important;transform:translate(0,2%) scale(1.012)!important;transition:opacity 1.4s ease,filter 1.4s ease,transform 1.4s ease!important}' +
    '.stage.awake.haunt-staring .haunt-reflection-echo .haunt-face{opacity:.68;filter:drop-shadow(0 0 16px #d0003c) brightness(1.35);animation:reflectionStare 2.8s ease-in-out infinite alternate}' +
    '@keyframes reflectionStare{0%{opacity:.45;filter:drop-shadow(0 0 7px #8b0030)}100%{opacity:.9;filter:drop-shadow(0 0 19px #ff174c) brightness(1.45)}}' +
    '.stage.haunt-warning .haunt-reflection-echo{opacity:.22!important;transform:translate(0,1%) scale(1.04)!important}' +
    '@keyframes livingReflection{0%{translate:-1px 1px;scale:.985}45%{translate:2px -1px;scale:1.005}100%{translate:-2px -2px;scale:1.015}}' +
    '@keyframes reflectionWatch{0%,100%{filter:drop-shadow(0 0 4px #5b1638);opacity:.2}50%{filter:drop-shadow(0 0 12px #a00035) brightness(1.35);opacity:.48}}' +
    '@media(prefers-reduced-motion:reduce){.stage.awake .haunt-reflection-echo,.stage.awake .haunt-reflection-echo .haunt-face{animation:none!important}}' +
    '.stage.haunt-hands-grab .haunt-reflection-echo{opacity:.34!important;transform:translate(8px,-1%) scale(1.24)!important;filter:blur(4px) drop-shadow(0 0 18px #a00035)!important}' +
    '.stage.haunt-lunge .haunt-reflection-echo{opacity:.08!important;transform:translate(-10px,2%) scale(1.32)!important;transition-duration:.12s!important}' +
    '.haunt-reflection-echo .haunt-face{transition-delay:.28s!important}' +
    '.stage.haunt-warning .haunt-reflection-echo{animation:hauntEchoGlitch .22s steps(2,end) 4}' +
    '.stage.haunt-hands-grab .haunt-reflection-echo .haunt-face{transition-delay:.08s!important}' +
    '.stage.haunt-hands-reach .haunt-reflection-echo .haunt-face{animation:hauntEchoBreath 2.4s ease-in-out .45s infinite alternate}' +
    '.stage.haunt-hands-grab .haunt-reflection-echo .haunt-face{animation:hauntEchoFlare .28s ease-out both}' +
    '@keyframes hauntEchoBreath{0%{filter:drop-shadow(0 0 3px #5b1638);opacity:.45}100%{filter:drop-shadow(0 0 16px #c0003a) brightness(1.25);opacity:1}}' +
    '@keyframes hauntEchoFlare{0%{filter:drop-shadow(0 0 5px #5b1638)}55%{filter:drop-shadow(0 0 24px #ff1744) brightness(1.8)}100%{filter:drop-shadow(0 0 10px #a00035) brightness(1.1)}}' +
    '@keyframes hauntEchoGlitch{0%,100%{filter:blur(3px) drop-shadow(0 0 12px #5c1439)}50%{filter:blur(1px) drop-shadow(0 0 20px #c10038) brightness(1.8)}}' +
    '.stage.haunt-blackout .haunt-reflection-echo{opacity:0!important}' +
    '.stage.haunt-emerge .presence{opacity:1!important;transform:translate(-2%,4%) scale(1.32)!important;filter:contrast(1.35) brightness(1.15) drop-shadow(0 0 16px #a00035)!important;transition:transform 1.1s cubic-bezier(.16,.72,.2,1),filter .8s ease!important}' +
    '.stage.haunt-emerge .haunt-reflection-echo{opacity:.42!important;filter:blur(1.5px) drop-shadow(0 0 22px #b0003b)!important;transform:translate(0,-1%) scale(1.12)!important;transition:opacity .7s ease,transform 1s cubic-bezier(.16,.72,.2,1)!important}' +
    '.stage.haunt-emerge .haunt-ripple{opacity:.9;animation:hauntRipple .9s ease-out infinite}' +
    '.stage.haunt-emerge .haunt-shatter-lines{opacity:.7;stroke:#e4e0ec;animation:hauntShiver .22s steps(2,end) infinite}' +
    '.stage.haunt-emerge:after{border-color:#ff315477;box-shadow:inset 0 0 45px #ff17442b,0 0 28px #a0003566;animation:omenPulse .45s ease-in-out infinite}' +
    '@media(prefers-reduced-motion:reduce){.stage.haunt-emerge .presence,.stage.haunt-emerge .haunt-reflection-echo{transition:none!important}}' +
    '.stage.haunt-hands-reach .haunt-reaching-hands{opacity:1;transform:translateY(3%) scale(1)}' +
    '.stage.haunt-hands-grab .haunt-reaching-hands{opacity:1;transform:translateY(-2%) scale(1.28);filter:drop-shadow(0 0 20px #ff002f) brightness(1.25)}' +
    '.haunt-ripple{opacity:0;transform-origin:180px 180px;pointer-events:none}' +
    '.stage.haunt-hands-reach .haunt-ripple,.stage.haunt-hands-grab .haunt-ripple{opacity:1;animation:hauntRipple 1.5s ease-out infinite}' +
    '.stage.haunt-hands-grab .haunt-ripple{animation-duration:.7s;stroke:#ff173f}' +
    '@keyframes hauntRipple{0%{transform:scale(.72);opacity:0;stroke-width:5}24%{opacity:.72}100%{transform:scale(1.32);opacity:0;stroke-width:1}}' +
    '.haunt-edge-grip{opacity:0;stroke:#a99aa8;stroke-width:3;stroke-linecap:round;fill:none;filter:drop-shadow(0 0 3px #ff1744)}' +
    '.stage.haunt-hands-reach .haunt-edge-grip,.stage.haunt-hands-grab .haunt-edge-grip{opacity:1;animation:hauntGrip .55s ease-out both}' +
    '.stage.haunt-hands-grab .haunt-edge-grip{stroke:#ff2548;stroke-width:4;filter:drop-shadow(0 0 8px #ff003c)}' +
    '@keyframes hauntGrip{0%{opacity:0;stroke-dasharray:0 70}100%{opacity:1;stroke-dasharray:70 0}}' +
    '.haunt-shatter-lines{opacity:0;pointer-events:none;stroke:#e4e0ec;stroke-width:1.3;fill:none;filter:drop-shadow(0 0 2px #b8d9ff)}' +
    '.stage.haunt-hands-reach .haunt-shatter-lines{opacity:.42;animation:hauntShiver .18s steps(2,end) infinite}' +
    '.stage.haunt-hands-grab .haunt-shatter-lines{opacity:.9;stroke:#ff6177;stroke-width:1.8}' +
    '@keyframes hauntShiver{0%,100%{transform:translate(0,0)}50%{transform:translate(1px,-1px)}}' +
    '.stage.haunt-hands-grab{animation:hauntMirrorShake .09s steps(2,end) 7}' +
    '@keyframes hauntMirrorShake{0%,100%{translate:0 0}25%{translate:-3px 1px}75%{translate:3px -1px}}' +
    '.haunt-reaching-hands .haunt-face{opacity:0;transform:translateY(22px) scale(.88);transform-origin:180px 190px;transition:opacity .5s ease,transform .7s ease;filter:drop-shadow(0 0 9px #b9002c)}' +
    '.stage.haunt-hands-reach .haunt-reaching-hands .haunt-face,.stage.haunt-hands-grab .haunt-reaching-hands .haunt-face{opacity:1;transform:translateY(0) scale(1)}' +
    '.stage.haunt-hands-grab .haunt-reaching-hands .haunt-face{animation:hauntFaceLunge .35s ease-out both}' +
    '@keyframes hauntFaceLunge{0%{transform:translateY(0) scale(1)}55%{transform:translateY(28px) scale(1.3)}100%{transform:translateY(8px) scale(1.12)}}' +
    '.haunt-reaching-hands .arm{fill:url(#hauntArm);stroke:#514454;stroke-width:1.5;stroke-linejoin:round}' +
    '.haunt-reaching-hands .claw{fill:url(#hauntClaw);stroke:#776478;stroke-width:1.2;stroke-linejoin:round}' +
    '.haunt-reaching-hands .crack{fill:none;stroke:#d7d0e8;stroke-width:1.4;stroke-linecap:round;opacity:0;filter:drop-shadow(0 0 3px #b5aaff)}' +
    '.stage.haunt-hands-reach .haunt-reaching-hands .crack{opacity:.8;animation:hauntGlassCrack .8s ease-out both}' +
    '@keyframes hauntGlassCrack{0%{opacity:0;stroke-dasharray:0 120}40%{opacity:1}100%{opacity:.55;stroke-dasharray:120 0}}' +
    '@media(prefers-reduced-motion:reduce){.haunt-reaching-hands,.haunt-reflection-echo,.haunt-reflection-echo .haunt-face{transition:none!important;animation:none!important}.haunt-reflection-echo{filter:none!important}.stage.haunt-hands-reach .haunt-reaching-hands .crack{animation:none;opacity:.7}.stage.haunt-hands-reach .haunt-ripple,.stage.haunt-hands-grab .haunt-ripple{animation:none;opacity:.18}.stage.haunt-hands-reach .haunt-edge-grip,.stage.haunt-hands-grab .haunt-edge-grip{animation:none;opacity:1}.stage.haunt-hands-reach .haunt-shatter-lines,.stage.haunt-hands-grab .haunt-shatter-lines{animation:none}.stage.haunt-hands-grab{animation:none}}' +
    '.stage.haunt-blackout .haunt-scare-overlay{opacity:0!important}' +
    '.haunt-mist{position:absolute;z-index:5;inset:0;overflow:hidden;pointer-events:none;opacity:0;transition:opacity 1.8s ease;mix-blend-mode:screen;background:linear-gradient(180deg,transparent 35%,#9aa0c00b 58%,#a9a0c01c 75%,transparent 100%)}' +
    '.stage.awake .haunt-mist{opacity:1}' +
    '.haunt-mist:before,.haunt-mist:after{content:"";position:absolute;left:-30%;width:160%;height:42%;border-radius:50%;filter:blur(18px);background:linear-gradient(90deg,transparent,#a8a2c018 28%,#d4d0e51c 50%,#8b789f18 72%,transparent);animation:hauntMistDrift 13s ease-in-out infinite alternate}' +
    '.haunt-mist:before{top:47%;transform:rotate(-7deg)}.haunt-mist:after{top:63%;opacity:.7;animation-duration:19s;animation-direction:alternate-reverse}' +
    '@keyframes hauntMistDrift{0%{translate:-5% 0;scale:.92 1;opacity:.35}100%{translate:8% -9%;scale:1.08 1.15;opacity:.9}}' +
    '.stage.haunt-warning .haunt-mist{opacity:.35;filter:hue-rotate(105deg)}.stage.haunt-lunge .haunt-mist{opacity:.08;transition:opacity .12s ease}' +
    '.stage.haunt-blackout .haunt-mist{opacity:0!important}' +
    '@media(prefers-reduced-motion:reduce){.haunt-mist:before,.haunt-mist:after{animation:none}.haunt-mist{transition:none}}' +
    '.haunt-presence-light{position:absolute;z-index:6;inset:0;pointer-events:none;opacity:0;background:radial-gradient(circle 110px at var(--haunt-x,50%) var(--haunt-y,48%),#9b6dff22,transparent 72%);mix-blend-mode:screen;transition:opacity .5s ease}' +
    '.stage.awake .haunt-presence-light{opacity:1}' +
    '.haunt-presence-light:after{content:"";position:absolute;left:var(--haunt-x,50%);top:var(--haunt-y,48%);width:18px;height:18px;transform:translate(-50%,-50%);border-radius:50%;background:#e7d7ff;opacity:0;box-shadow:0 0 16px 7px #a56aff66;transition:opacity .25s ease}' +
    '.stage.awake .haunt-presence-light:after{opacity:.38}' +
    '.haunt-omen{position:absolute;z-index:8;inset:0;pointer-events:none;opacity:0;background:radial-gradient(ellipse 14% 30% at 50% 47%,#030207e8 0 35%,transparent 78%);filter:blur(5px);transform:scale(.7);transition:opacity .25s ease,transform .6s ease}' +
    '.stage.haunt-warning .haunt-omen{opacity:.85;transform:scale(1)}' +
    '.stage.haunt-lunge .haunt-omen{opacity:0;transform:scale(1.8)}' +
    '.haunt-omen:before,.haunt-omen:after{content:"";position:absolute;top:40%;width:9px;height:4px;border-radius:50%;background:#ff123d;box-shadow:0 0 10px 3px #ff003b;opacity:0}' +
    '.haunt-omen:before{left:47%;transform:rotate(-8deg)}.haunt-omen:after{right:47%;transform:rotate(8deg)}' +
    '.stage.haunt-warning .haunt-omen:before,.stage.haunt-warning .haunt-omen:after{opacity:.95;animation:omenBlink 3.2s steps(2,end) infinite}' +
    '@keyframes omenBlink{0%,42%,48%,100%{opacity:.95}44%,46%{opacity:0}}' +
    '@media(prefers-reduced-motion:reduce){.haunt-presence-light,.haunt-omen{transition:none}.stage.haunt-warning .haunt-omen:before,.stage.haunt-warning .haunt-omen:after{animation:none}}' +
    '.haunt-aura{position:absolute;z-index:7;inset:0;pointer-events:none;overflow:hidden;opacity:0;transition:opacity 1.4s ease;background:radial-gradient(ellipse at 50% 50%,transparent 40%,#10001455 72%,#020106cc 100%)}' +
    '.stage.awake .haunt-aura{opacity:1}' +
    '.haunt-aura:before{content:"";position:absolute;inset:5% 7%;border:1px solid #8c72b833;border-radius:48% 48% 3px 3px;box-shadow:inset 0 0 34px #5e214022,0 0 28px #a6003822;animation:hauntAuraPulse 5s ease-in-out infinite}' +
    '.haunt-aura:after{content:"ᚱ   ✦   ᛟ   ✧   ᚷ   ✦   ᛉ";position:absolute;left:0;right:0;top:9%;text-align:center;letter-spacing:.65em;font-size:clamp(10px,2.3vw,17px);color:#c6a4ed66;text-shadow:0 0 12px #9d4dff;opacity:0;transition:opacity 2s ease}' +
    '.stage.awake .haunt-aura:after{opacity:.8;animation:hauntRunes 8s linear infinite}' +
    '@keyframes hauntAuraPulse{0%,100%{opacity:.28;transform:scale(.99)}50%{opacity:.8;transform:scale(1.015)}}' +
    '@keyframes hauntRunes{0%,100%{letter-spacing:.65em;filter:hue-rotate(0deg)}50%{letter-spacing:.9em;filter:hue-rotate(45deg)}}' +
    '.haunt-ember{position:absolute;bottom:-12px;width:3px;height:3px;border-radius:50%;background:#ff5369;box-shadow:0 0 5px 2px #ff163c99,0 0 14px #ff163c66;opacity:0;animation:hauntEmberRise var(--duration,7s) linear var(--delay,0s) infinite;animation-play-state:paused}' +
    '.stage.awake .haunt-ember{animation-play-state:running}' +
    '@keyframes hauntEmberRise{0%{transform:translate3d(0,0,0) scale(.4);opacity:0}15%{opacity:.8}75%{opacity:.55}100%{transform:translate3d(var(--drift,18px),-110%,0) scale(1.4);opacity:0}}' +
    '.stage.haunt-redflash .haunt-aura{background:radial-gradient(ellipse at 50% 50%,#ff002f28,transparent 62%)}' +
    '@media(prefers-reduced-motion:reduce){.haunt-aura:before,.stage.awake .haunt-aura:after,.haunt-ember{animation:none!important}.haunt-aura,.haunt-aura:after{transition:none}}' +
    '@keyframes scareEyes{0%,38%,44%,100%{opacity:.85}40%,42%{opacity:.12}70%{opacity:.55}}' +

    '.stage.fx-haunted:after{content:"";position:absolute;inset:0;pointer-events:none;z-index:7;background:radial-gradient(ellipse at 50% 40%,transparent 25%,#10001599 100%);box-shadow:inset 0 0 45px #5d003c55;animation:fxHaunted 5s ease-in-out infinite}' +
    '@keyframes fxHaunted{0%,100%{opacity:.45}50%{opacity:.9}}' +
    '.stage.fx-bloodmoon:after{content:"";position:absolute;inset:0;pointer-events:none;z-index:7;background:radial-gradient(circle at 50% 34%,#b0003022,transparent 48%),linear-gradient(180deg,#26000820,transparent 65%);mix-blend-mode:screen}' +
    '.stage.fx-static:after{content:"";position:absolute;inset:0;pointer-events:none;z-index:7;background:repeating-linear-gradient(0deg,#fff0 0 3px,#d7c8ff18 4px,#fff0 5px);animation:fxStatic .16s steps(2,end) infinite}' +
    '@keyframes fxStatic{0%{transform:translateY(-2px)}100%{transform:translateY(2px)}}' +
    '@media(prefers-reduced-motion:reduce){.stage.fx-haunted:after,.stage.fx-static:after{animation:none}}';
  document.head.appendChild(style);

  // Full-screen mirror impact: branching fractures, then glass fragments burst outward.
  const shatterStyle = document.createElement('style');
  shatterStyle.textContent =
    '.haunt-glass-shatter{position:absolute;z-index:40;inset:0;width:100%;height:100%;pointer-events:none;opacity:0;overflow:visible;transition:opacity .08s ease}' +
    '.stage.haunt-glass-break .haunt-glass-shatter{opacity:1}' +
    '.haunt-glass-shatter .fractures{fill:none;stroke:#f2f0ff;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 0 3px #d9e8ff) drop-shadow(0 0 8px #fff)}' +
    '.haunt-glass-shatter .fractures path{stroke-dasharray:520;stroke-dashoffset:520;animation:glassFracture .38s cubic-bezier(.1,.8,.2,1) forwards}' +
    '.haunt-glass-shatter .fractures path:nth-child(2n){animation-delay:.045s}.haunt-glass-shatter .fractures path:nth-child(3n){animation-delay:.085s}' +
    '@keyframes glassFracture{to{stroke-dashoffset:0}}' +
    '.haunt-glass-shatter .shards{transform-origin:50% 50%}' +
    '.haunt-glass-shatter .shards polygon{fill:url(#glassShard);stroke:#f4f1ff;stroke-width:1.2;opacity:0;filter:drop-shadow(0 0 5px #d7e6ff);transform-box:fill-box;transform-origin:center;animation:glassBurst .82s cubic-bezier(.12,.7,.18,1) forwards}' +
    '.haunt-glass-shatter .shards polygon:nth-child(2n){animation-delay:.035s}.haunt-glass-shatter .shards polygon:nth-child(3n){animation-delay:.075s}' +
    '@keyframes glassBurst{0%{opacity:0;transform:translate(0,0) rotate(0) scale(.2)}12%{opacity:.95}100%{opacity:0;transform:translate(var(--sx),var(--sy)) rotate(var(--sr)) scale(.8)}}' +
    '.stage.haunt-glass-break{animation:glassImpact .48s cubic-bezier(.2,.8,.2,1) both}' +
    '@keyframes glassImpact{0%,100%{translate:0 0}15%{translate:-7px 3px}32%{translate:6px -4px}52%{translate:-4px -2px}72%{translate:2px 2px}}' +
    '@media(prefers-reduced-motion:reduce){.haunt-glass-shatter .fractures path{animation:none;stroke-dashoffset:0}.haunt-glass-shatter .shards polygon{animation:none;opacity:.3}.stage.haunt-glass-break{animation:none}}';
  document.head.appendChild(shatterStyle);
  const glassShatter = document.createElement('div');
  glassShatter.className = 'haunt-glass-shatter';
  glassShatter.setAttribute('aria-hidden','true');
  glassShatter.innerHTML = '<svg viewBox="0 0 360 640" preserveAspectRatio="none" width="100%" height="100%"><defs><linearGradient id="glassShard" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".85"/><stop offset=".48" stop-color="#b9d5f5" stop-opacity=".32"/><stop offset="1" stop-color="#fff" stop-opacity=".06"/></linearGradient></defs><g class="fractures"><path d="M180 320 L158 278 125 254 139 214 104 185 117 145 82 112"/><path d="M180 320 L211 287 245 276 253 232 291 207 278 165 319 128"/><path d="M180 320 L147 338 111 330 83 360 47 354 18 390"/><path d="M180 320 L218 345 249 337 281 367 319 360 350 394"/><path d="M180 320 L171 367 145 399 159 442 130 477 142 520"/><path d="M180 320 L202 366 232 393 220 435 255 467 245 514"/><path d="M180 320 L180 270 166 235 183 201 171 166 185 126 178 82"/><path d="M180 320 L180 370 195 405 179 443 196 481 184 523 192 570"/><path d="M180 320 L130 302 97 281 60 290 28 268"/><path d="M180 320 L231 305 268 286 304 298 340 276"/></g><g class="shards"><polygon points="180,320 158,278 211,287" style="--sx:-90px;--sy:-170px;--sr:-42deg"/><polygon points="180,320 211,287 245,276" style="--sx:110px;--sy:-155px;--sr:55deg"/><polygon points="180,320 147,338 111,330" style="--sx:-160px;--sy:25px;--sr:-70deg"/><polygon points="180,320 218,345 249,337" style="--sx:165px;--sy:45px;--sr:75deg"/><polygon points="180,320 171,367 145,399" style="--sx:-90px;--sy:175px;--sr:48deg"/><polygon points="180,320 202,366 232,393" style="--sx:100px;--sy:180px;--sr:-55deg"/><polygon points="180,320 166,235 183,201" style="--sx:-35px;--sy:-210px;--sr:95deg"/><polygon points="180,320 195,405 179,443" style="--sx:25px;--sy:220px;--sr:-95deg"/></g></svg>';
  stage.appendChild(glassShatter);

  const creatureStyle = document.createElement('style');
  creatureStyle.textContent =
    '.haunt-reaching-hands .haunt-face{filter:drop-shadow(0 0 8px #8d163b) drop-shadow(0 0 22px #24000d);transform-origin:180px 180px}' +
    '.stage.haunt-hands-grab .haunt-reaching-hands .haunt-face{transform:translateY(8px) scale(1.42)!important;filter:drop-shadow(0 0 15px #ff123d) drop-shadow(0 0 34px #650018);animation:hauntFaceLunge .24s cubic-bezier(.12,.8,.18,1) both}' +
    '@keyframes hauntFaceLunge{0%{transform:translateY(0) scale(.9)}42%{transform:translateY(34px) scale(1.62)}68%{transform:translateY(4px) scale(1.35)}100%{transform:translateY(8px) scale(1.42)}}' +
    '.stage.haunt-last-look .haunt-reflection-echo{opacity:.88!important;filter:blur(.3px) drop-shadow(0 0 24px #d0003c)!important;transform:translate(0,-2%) scale(1.42)!important;transition:opacity .16s ease,transform .32s cubic-bezier(.12,.8,.18,1)!important}' +
    '.stage.haunt-last-look .haunt-reflection-echo .haunt-face{opacity:1!important;filter:drop-shadow(0 0 18px #ff174c) brightness(1.35);animation:lastLookPulse .42s steps(2,end) 3}' +
    '@keyframes lastLookPulse{0%,100%{opacity:.85}50%{opacity:1;filter:drop-shadow(0 0 30px #ff174c) brightness(1.8)}}' +
    '.stage.haunt-last-look .haunt-handprint{opacity:0!important}' +
    '@media(prefers-reduced-motion:reduce){.stage.haunt-last-look .haunt-reflection-echo,.stage.haunt-last-look .haunt-reflection-echo .haunt-face{transition:none!important;animation:none!important}}';
  document.head.appendChild(creatureStyle);

  const reachingHands = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  reachingHands.setAttribute('viewBox', '0 0 360 640');
  reachingHands.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  reachingHands.setAttribute('class', 'haunt-reaching-hands');
  reachingHands.setAttribute('aria-hidden', 'true');
  reachingHands.innerHTML = '<defs><linearGradient id="hauntArm" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#403541"/><stop offset=".38" stop-color="#17121b"/><stop offset=".76" stop-color="#050407"/><stop offset="1" stop-color="#000"/></linearGradient><linearGradient id="hauntClaw" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#574957"/><stop offset=".45" stop-color="#17111a"/><stop offset="1" stop-color="#020103"/></linearGradient></defs>' +
    '<g class="crack"><path d="M180 215 L160 185 166 157 145 130 M160 185 L130 190 111 173 M166 157 L190 143 204 115 M190 143 L222 150 239 135 M180 215 L198 238 193 263 M160 185 L143 214 121 226"/></g>' +
    '<g class="haunt-ripple" fill="none" stroke="#b9eaff" stroke-width="2"><ellipse cx="180" cy="180" rx="48" ry="62"/><ellipse cx="180" cy="180" rx="70" ry="88"/><ellipse cx="180" cy="180" rx="90" ry="112"/></g>' +
    '<g class="haunt-edge-grip"><path d="M28 105 Q39 95 48 109 L57 125 M32 118 Q44 108 53 124 L61 139 M330 105 Q321 95 312 109 L303 125 M326 118 Q314 108 305 124 L297 139"/></g>' +
    '<g class="haunt-shatter-lines"><path d="M180 180 L154 151 L163 127 M180 180 L211 151 L202 124 M180 180 L155 207 L129 215 M180 180 L207 208 L229 235 M154 151 L131 145 L119 127 M211 151 L236 144 L246 126 M155 207 L147 236 L128 249 M207 208 L214 239 L234 252"/></g>' +
    '<g class="haunt-face"><path d="M139 211 Q121 174 132 132 Q139 100 164 91 Q183 78 205 96 Q237 115 231 165 L220 211 205 246 181 266 153 246Z" fill="#08060b" stroke="#51404d" stroke-width="3"/><path d="M139 145 Q147 106 177 103 Q207 96 224 130 L215 147 198 136 183 145 166 134 151 151Z" fill="#17111b" stroke="#725365" stroke-width="2"/><path d="M142 169 Q155 145 176 163 Q164 184 143 179Z" fill="#020105" stroke="#7b243e" stroke-width="2"/><path d="M185 162 Q205 143 221 165 L217 181 Q198 185 185 162Z" fill="#020105" stroke="#7b243e" stroke-width="2"/><ellipse cx="161" cy="166" rx="5" ry="8" fill="#ff183f" filter="url(#hauntGlow)"/><ellipse cx="205" cy="165" rx="4" ry="7" fill="#ff183f" filter="url(#hauntGlow)"/><path d="M180 171 L169 202 183 198 190 210 198 179Z" fill="#050308" stroke="#39232f" stroke-width="2"/><path d="M148 211 Q176 192 216 207 L222 235 Q202 255 178 251 Q154 246 143 231Z" fill="#010104" stroke="#76243b" stroke-width="2"/><path d="M151 211 L160 229 168 213 177 234 186 212 195 232 204 211 214 225" fill="none" stroke="#d8c8d0" stroke-width="4"/><path d="M154 239 Q180 250 210 235" fill="none" stroke="#a33a53" stroke-width="2"/><path d="M143 118 Q118 97 124 72 M217 111 Q242 87 236 62 M148 244 Q130 264 119 286 M209 245 Q230 265 243 284" fill="none" stroke="#120d16" stroke-width="8" stroke-linecap="round"/><path d="M143 118 Q118 97 124 72 M217 111 Q242 87 236 62" fill="none" stroke="#725365" stroke-width="1.5" opacity=".65"/></g>' +
    '<g class="arm"><path d="M40 650 Q35 560 47 488 Q54 435 73 388 L105 329 Q116 309 133 323 Q145 335 132 355 L111 401 105 451 118 492 131 650Z"/><path d="M320 650 Q325 560 313 488 Q306 435 287 388 L255 329 Q244 309 227 323 Q215 335 228 355 L249 401 255 451 242 492 229 650Z"/></g>' +
    '<g class="claw"><path d="M89 425 Q73 407 61 382 L39 344 Q31 329 40 321 Q49 315 58 332 L81 359 70 319 Q66 300 78 297 Q91 296 95 316 L108 356 102 311 Q101 292 114 291 Q127 292 127 312 L132 354 137 325 Q141 308 153 313 Q164 318 157 337 L146 385 Q139 414 120 436Z"/><path d="M271 425 Q287 407 299 382 L321 344 Q329 329 320 321 Q311 315 302 332 L279 359 290 319 Q294 300 282 297 Q269 296 265 316 L252 356 258 311 Q259 292 246 291 Q233 292 233 312 L228 354 223 325 Q219 308 207 313 Q196 318 203 337 L214 385 Q221 414 240 436Z"/></g>' +
    '<g fill="#d5c6cf" opacity=".72"><path d="M42 325 L49 330 43 334Z"/><path d="M79 301 L85 309 79 312Z"/><path d="M115 295 L120 304 114 307Z"/><path d="M318 325 L311 330 317 334Z"/><path d="M281 301 L275 309 281 312Z"/><path d="M245 295 L240 304 246 307Z"/></g>';
  const reflectionEcho = reachingHands.cloneNode(true);
  reflectionEcho.setAttribute('class', 'haunt-reaching-hands haunt-reflection-echo');
  reflectionEcho.setAttribute('aria-hidden', 'true');
  stage.appendChild(reflectionEcho);
  stage.appendChild(reachingHands);

  const mist = document.createElement('div');
  mist.className = 'haunt-mist';
  mist.setAttribute('aria-hidden', 'true');
  stage.appendChild(mist);
  const presenceLight = document.createElement('div');
  presenceLight.className = 'haunt-presence-light';
  presenceLight.setAttribute('aria-hidden', 'true');
  stage.appendChild(presenceLight);
  const omen = document.createElement('div');
  omen.className = 'haunt-omen';
  omen.setAttribute('aria-hidden', 'true');
  stage.appendChild(omen);
  let hauntPointerFrame = 0, stareTimer = null;
  function disturbTheStare() {
    stage.classList.remove('haunt-staring');
    if (stareTimer) clearTimeout(stareTimer);
    if (!reduceMotion && stage.classList.contains('awake')) {
      stareTimer = setTimeout(() => {
        if (stage.classList.contains('awake') && !stage.classList.contains('haunt-blackout') && !stage.classList.contains('haunt-lunge')) {
          stage.classList.add('haunt-staring');
        }
      }, 1800);
    }
  }
  stage.addEventListener('pointermove', e => {
    disturbTheStare();
    if (hauntPointerFrame) return;
    hauntPointerFrame = requestAnimationFrame(() => {
      const rect = stage.getBoundingClientRect();
      const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
      stage.style.setProperty('--haunt-x', x.toFixed(1) + '%');
      stage.style.setProperty('--haunt-y', y.toFixed(1) + '%');
      hauntPointerFrame = 0;
    });
  }, {passive:true});
  const aura = document.createElement('div');
  aura.className = 'haunt-aura';
  aura.setAttribute('aria-hidden', 'true');
  for (let i = 0; i < 24; i++) {
    const ember = document.createElement('i');
    ember.className = 'haunt-ember';
    ember.style.left = (4 + Math.random() * 92) + '%';
    ember.style.setProperty('--duration', (5 + Math.random() * 7) + 's');
    ember.style.setProperty('--delay', (-Math.random() * 12) + 's');
    ember.style.setProperty('--drift', (-28 + Math.random() * 56) + 'px');
    aura.appendChild(ember);
  }
  stage.appendChild(aura);

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
  controls.innerHTML = '<button type="button" class="haunt-start" id="hauntAwaken">Awaken the mirror</button><button type="button" id="hauntDust">Gather the dust</button><button type="button" id="hauntSound">Sound: Off</button><button type="button" id="hauntFX">Effects: Cycle</button>';
  stage.insertAdjacentElement('afterend', controls);

  const status = document.getElementById('status');
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let audioContext = null, sequenceRunning = false, wiped = 0, dirty = false, wipeStartedAt = 0, revealTimer = null;
  const WIPE_MIN_DURATION_MS = 20000;
  function say(text) { if (status) status.textContent = text; }
  function whisperBed(duration = 1.8, intensity = 0.12) {
    if (!soundEnabled) return;
    const ctx = getAudio(); if (!ctx) return;
    const now = ctx.currentTime;
    const length = Math.max(.7, duration);
    const count = Math.floor(ctx.sampleRate * length);
    const buffer = ctx.createBuffer(1, count, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < count; i++) {
      const fadeIn = Math.min(1, i / (ctx.sampleRate * .16));
      const fadeOut = Math.min(1, (count - i) / (ctx.sampleRate * .42));
      data[i] = (Math.random() * 2 - 1) * fadeIn * fadeOut * .7;
    }
    const source = ctx.createBufferSource(); source.buffer = buffer;
    const filter = ctx.createBiquadFilter(); filter.type = 'bandpass';
    filter.frequency.setValueAtTime(720, now);
    filter.frequency.exponentialRampToValueAtTime(260, now + length);
    filter.Q.value = 1.15;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(.001, now);
    gain.gain.linearRampToValueAtTime(intensity, now + .2);
    gain.gain.setValueAtTime(intensity * .72, now + Math.max(.25, length - .45));
    gain.gain.exponentialRampToValueAtTime(.001, now + length);
    source.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    source.start(now); source.stop(now + length);
  }
  // Prerecorded horror voice: the uploaded 32-second recording replaces robotic device speech.
  const apparitionVoice = new Audio('./freesound_community-horror-whisper-voice-angry-29738.mp3');
  apparitionVoice.preload = 'auto';
  apparitionVoice.volume = 0.92;
  let apparitionVoiceStarted = false;
  function speakEvil(text, pitch = 0.76, rate = 0.82) {
    if (!soundEnabled || apparitionVoiceStarted) return;
    apparitionVoiceStarted = true;
    try {
      apparitionVoice.currentTime = 0;
      const playback = apparitionVoice.play();
      if (playback && typeof playback.catch === 'function') playback.catch(() => {
        apparitionVoiceStarted = false;
      });
    } catch (_) { apparitionVoiceStarted = false; }
  }
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
    const now = ctx.currentTime, length = 1.45;
    // A softer, filtered glass groan: remove the low sawtooth layer that sounded like an electronic buzz.
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * length), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      const fade = Math.pow(1 - i / data.length, 1.5);
      data[i] = (Math.random() * 2 - 1) * fade * .22;
    }
    const noise = ctx.createBufferSource(); noise.buffer = buffer;
    const filter = ctx.createBiquadFilter(); filter.type = 'bandpass';
    filter.frequency.setValueAtTime(520, now);
    filter.frequency.exponentialRampToValueAtTime(190, now + 1.15);
    filter.Q.value = 2.2;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(.001, now);
    gain.gain.linearRampToValueAtTime(.10, now + .16);
    gain.gain.exponentialRampToValueAtTime(.001, now + length);
    noise.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
    noise.start(now); noise.stop(now + length);
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

  // Start fully muted; sounds only play after the Sound button is enabled.
  let soundEnabled = false, fxMode = 0;
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
    // Keep this control completely silent: toggling audio must not trigger a scare sound.
    if (!soundEnabled) {
      try { apparitionVoice.pause(); apparitionVoice.currentTime = 0; } catch (_) {}
      try { if (window.speechSynthesis) window.speechSynthesis.cancel(); } catch (_) {}
      apparitionVoiceStarted = false;
    }
  });
  fxButton.addEventListener('click', () => {
    stage.classList.remove(...fxModes.map(m=>m.cls).filter(Boolean));
    fxMode = (fxMode + 1) % fxModes.length;
    if (fxModes[fxMode].cls) stage.classList.add(fxModes[fxMode].cls);
    fxButton.textContent = fxModes[fxMode].name;
    say('Visual effect set to ' + fxModes[fxMode].name.replace('FX: ','') + '.');
    // Visual controls stay silent; sound effects belong to the scare sequence only.
  });
  const originalGetAudio = getAudio;

  function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

  const dustButton = document.getElementById('hauntDust');
  // Let the normal click handler initialize the dust-wiping interaction.
  dustButton.addEventListener('click', () => {
    const button = dustButton;
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
    // Keep the Gather the dust button silent; horror audio starts only at the reveal.
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
        say('The dust clears away. A handprint appears from the other side of the glass…');
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
    // Awaken stays silent unless the user explicitly turns Sound on.
    apparitionVoiceStarted = false;
    disturbTheStare();
    sequenceRunning = true;
    stage.classList.remove('haunt-flicker','haunt-creak','haunt-warning','haunt-lunge','haunt-blackout','haunt-emerge','haunt-hands-reach','haunt-hands-grab','haunt-redflash','haunt-staring','haunt-last-look');
    stage.classList.add('awake','haunt-dirty'); stage.classList.remove('haunt-hand');
    stage.querySelectorAll('[data-haunt-wipe-mark]').forEach(mark => mark.remove());
    dirty = true; wiped = 0; lastPoint = null; stage.style.touchAction = 'none'; paintDust();
    document.getElementById('hauntAwaken').disabled = true;
    document.getElementById('hauntAwaken').textContent = 'The mirror is awake…';
    document.getElementById('hauntDust').textContent = 'Wipe the glass';
    say('The glass is clouding over. Listen carefully…');
    if (soundEnabled) { speakEvil('Can you hear me?', 0.52, 0.72); creak(); }
    await wait(reduceMotion ? 600 : 2600); if (!sequenceRunning) return;
    say('Something is moving behind the dust… footsteps are getting closer.'); speakEvil('You should never have opened the mirror.', 0.48, 0.72); stage.classList.add('haunt-creak'); footsteps(); creak();
    await wait(reduceMotion ? 400 : 1800); if (!sequenceRunning) return;
    // Let the reflection stare silently for a beat before the next scare.
    stage.classList.add('haunt-staring');
    say('…Something is watching you.');
    await wait(reduceMotion ? 250 : 1250); if (!sequenceRunning) return;
    stage.classList.add('haunt-flicker'); say('The mirror is flickering…');
    await wait(reduceMotion ? 500 : 1400); if (!sequenceRunning) return;
    stage.classList.remove('haunt-staring');
    stage.classList.add('haunt-warning'); say("Don't look behind you."); speakEvil("Don't turn around.", 0.42, 0.7); whisper();
    await wait(reduceMotion ? 500 : 2100); if (!sequenceRunning) return;
    // The reflection visibly presses forward before the hands break through.
    await wait(reduceMotion ? 100 : 650); if (!sequenceRunning) return;
    stage.classList.add('haunt-emerge'); say('The reflection is pressing against the glass…');
    if (soundEnabled) creak();
    await wait(reduceMotion ? 180 : 1050); if (!sequenceRunning) return;
    stage.classList.add('haunt-hands-reach'); say('Something is reaching through the glass…'); speakEvil('Let me out.', 0.5, 0.68); creak(); breath();
    await wait(reduceMotion ? 350 : 1550); if (!sequenceRunning) return;
    // Hold the reaching pose briefly so the lunge feels intentional rather than rushed.
    await wait(reduceMotion ? 100 : 450); if (!sequenceRunning) return;
    stage.classList.remove('haunt-warning'); stage.classList.add('haunt-hands-grab','haunt-lunge','haunt-redflash','haunt-glass-break'); hit(); say('IT IS REACHING FOR YOU. IT GOT OUT.'); speakEvil('GET OUT!', 0.35, 0.92);
    await wait(reduceMotion ? 600 : 1050); if (!sequenceRunning) return;
    stage.classList.add('haunt-blackout');
    await wait(reduceMotion ? 700 : 1800); if (!sequenceRunning) return;
    stage.classList.remove('haunt-blackout','haunt-lunge','haunt-redflash','haunt-flicker','haunt-creak','haunt-emerge','haunt-hands-reach','haunt-hands-grab','haunt-glass-break');
    stage.classList.add('haunt-hand','haunt-last-look'); stage.classList.remove('haunt-dirty');
    message.textContent = 'IT’S STILL IN THERE'; stage.classList.add('haunt-warning');
    say('A final creak echoes from the darkness. IT’S STILL IN THERE.'); speakEvil('I am still here.', 0.38, 0.62); creak();
    await wait(3000);
    stage.classList.remove('haunt-warning','haunt-last-look'); sequenceRunning = false;
    document.getElementById('hauntAwaken').disabled = false;
    document.getElementById('hauntAwaken').textContent = 'Awaken the mirror again';
    say('The mirror is quiet. For now.');
  });

  // Hidden ending: tap the mirror three times after the scare has finished.
  let secretTapTimes = [];
  let secretEndingShown = false;
  const secretStyle = document.createElement('style');
  secretStyle.textContent =
    '.stage.haunt-secret{filter:none!important;box-shadow:inset 0 0 70px #6e001d,0 0 32px #8d001f!important;transition:box-shadow 1.4s ease!important}' +
    '.stage.haunt-secret:before{background:linear-gradient(#180008,#08030a)!important;box-shadow:inset 0 0 55px #8c0028!important;transition:background 1.4s ease,box-shadow 1.4s ease!important}' +
    '.stage.haunt-secret:after{border-color:#ff315488!important;box-shadow:inset 0 0 70px #a00035aa,0 0 35px #ff003c!important}' +
    '.stage.haunt-secret .haunt-message{opacity:1!important;color:#fff!important;font-size:clamp(1.1rem,5vw,1.8rem);line-height:1.35;text-shadow:0 0 5px #fff,0 0 14px #ff174c,0 0 26px #b0002c;animation:none!important;transform:none!important;letter-spacing:.04em!important;transition:none!important}' +
    '@keyframes secretReveal{0%,100%{opacity:0;transform:scale(.9)}12%,82%{opacity:1;transform:scale(1.04)}45%{letter-spacing:.2em;transform:scale(1)}}';
  document.head.appendChild(secretStyle);
  stage.addEventListener('click', () => {
    if (!stage.classList.contains('awake') || dirty || sequenceRunning || stage.classList.contains('haunt-blackout') || secretEndingShown) return;
    const now = Date.now();
    secretTapTimes = secretTapTimes.filter(t => now - t < 2800);
    secretTapTimes.push(now);
    if (secretTapTimes.length < 3) return;
    secretTapTimes = [];
    secretEndingShown = true;
    stage.classList.remove('haunt-warning','haunt-flicker','haunt-redflash','haunt-staring');
    stage.classList.add('haunt-secret');
    message.textContent = 'YOU FOUND WHAT WAS LEFT BEHIND';
    // Lock the reveal itself against any earlier warning/flicker animation rules.
    Object.assign(message.style, {position:'absolute', left:'8%', right:'8%', top:'50%', opacity:'1', color:'#fff', animation:'none', transition:'none', transform:'translateY(-50%)', letterSpacing:'.04em', lineHeight:'1.35', textShadow:'0 0 5px #fff, 0 0 14px #ff174c, 0 0 26px #b0002c'});
    say('The reflection smiles after you stop moving. You found what was left behind.');
    // Keep the secret message readable; do not fade or flicker it away.
    setTimeout(() => {
      stage.classList.remove('haunt-secret');
      message.removeAttribute('style');
      secretEndingShown = false;
      say('The mirror is quiet. For now.');
    }, 9000);
  });
})();