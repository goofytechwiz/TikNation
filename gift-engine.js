(function(){
"use strict";
// Always install the newest engine build; prevents a stale preloaded engine from blocking fixes.
let css="#tiknation-gift-engine{--accent:#7eeaff;position:fixed!important;inset:0!important;z-index:2147483647!important;display:grid!important;place-items:center!important;overflow:hidden!important;pointer-events:none!important;padding:12px!important;box-sizing:border-box!important;background:radial-gradient(ellipse,rgba(16,24,60,.35),rgba(0,0,0,.82))!important;opacity:1!important}#tiknation-gift-engine .stage{position:relative;isolation:isolate;display:grid;place-items:center;text-align:center;width:min(94vw,780px);min-height:min(68vh,540px);padding:24px 16px;box-sizing:border-box;border:1px solid var(--accent);border-radius:28px;background:radial-gradient(ellipse,rgba(72,58,145,.32),rgba(6,10,29,.96) 70%);box-shadow:0 0 38px color-mix(in srgb,var(--accent),transparent 65%),inset 0 0 55px rgba(120,100,255,.13);animation:ge-in .65s cubic-bezier(.16,1,.3,1) both}#tiknation-gift-engine .stage:before,#tiknation-gift-engine .stage:after{content:'';position:absolute;inset:9%;border:1px solid color-mix(in srgb,var(--accent),transparent 45%);border-radius:50%;transform:scaleX(1.3);animation:ge-orbit 5s linear infinite;z-index:-1}#tiknation-gift-engine .stage:after{inset:18%;animation-direction:reverse;animation-duration:7s}#tiknation-gift-engine .ring{position:absolute;width:min(55vw,350px);aspect-ratio:1;border:2px solid var(--accent);border-radius:50%;box-shadow:0 0 22px var(--accent),inset 0 0 22px var(--accent);animation:ge-ring 2.2s ease-out both}#tiknation-gift-engine .hero{position:relative;z-index:2;font-size:clamp(76px,17vw,154px);line-height:1.2;filter:drop-shadow(0 0 18px var(--accent));animation:ge-hero 2.6s cubic-bezier(.16,1,.3,1) both;white-space:nowrap}#tiknation-gift-engine .title{position:relative;z-index:2;margin-top:12px;color:white;font-size:clamp(19px,4vw,32px);font-weight:900;letter-spacing:.08em;text-transform:uppercase;text-shadow:0 0 15px var(--accent);animation:ge-text .7s .2s both}#tiknation-gift-engine .message{position:relative;z-index:2;max-width:560px;margin:9px auto 0;color:#dce9ff;font-size:clamp(13px,2.5vw,17px);line-height:1.5;animation:ge-text .7s .35s both}#tiknation-gift-engine .meta{position:relative;z-index:2;margin-top:17px;color:var(--accent);font-size:10px;font-weight:800;letter-spacing:.18em;animation:ge-text .7s .45s both}#tiknation-gift-engine .particle{position:absolute;left:50%;top:50%;color:var(--accent);font-size:20px;text-shadow:0 0 12px currentColor;animation:ge-particle 2.5s cubic-bezier(.12,.7,.2,1) both;animation-delay:var(--delay)}#tiknation-gift-engine[data-style=dragon],#tiknation-gift-engine[data-style=dragonrevenge]{--accent:#ff9b55}#tiknation-gift-engine[data-style=deathass],#tiknation-gift-engine[data-style=stinkdeath],#tiknation-gift-engine[data-style=toxiccloud]{--accent:#b9ff65}#tiknation-gift-engine[data-style=galaxy],#tiknation-gift-engine[data-style=infinity],#tiknation-gift-engine[data-style=phoenix]{--accent:#c5a2ff}#tiknation-gift-engine[data-style=lightning],#tiknation-gift-engine[data-style=burst],#tiknation-gift-engine[data-style=meteor]{--accent:#fff17b}#tiknation-gift-engine[data-style=notes],#tiknation-gift-engine[data-style=grand],#tiknation-gift-engine[data-style=raccoon],#tiknation-gift-engine[data-style=skeleton]{--accent:#ff9bd7}#tiknation-gift-engine[data-style=pulse]{--accent:#ff263d}#tiknation-gift-engine[data-style=portal],#tiknation-gift-engine[data-style=portalparty]{--accent:#9b9cff}#tiknation-gift-engine[data-style=dragon] .hero,#tiknation-gift-engine[data-style=dragonrevenge] .hero{animation-name:ge-dragon}#tiknation-gift-engine[data-style=deathass] .hero{animation-name:ge-throne}#tiknation-gift-engine[data-style=meteor] .hero,#tiknation-gift-engine[data-style=treasure] .hero,#tiknation-gift-engine[data-style=hammer] .hero,#tiknation-gift-engine[data-style=knockout] .hero{animation-name:ge-impact}#tiknation-gift-engine[data-style=notes] .hero,#tiknation-gift-engine[data-style=raccoon] .hero,#tiknation-gift-engine[data-style=skeleton] .hero{animation-name:ge-dance}#tiknation-gift-engine[data-style=portal] .ring,#tiknation-gift-engine[data-style=portalparty] .ring{animation-name:ge-portal}@keyframes ge-in{from{opacity:0;transform:scale(.75) translateY(25px);filter:blur(8px)}to{opacity:1;transform:scale(1);filter:blur(0)}}@keyframes ge-orbit{to{transform:rotate(360deg) scaleX(1.3)}}@keyframes ge-ring{0%{opacity:0;transform:scale(.1)}35%{opacity:1}100%{opacity:0;transform:scale(1.8)}}@keyframes ge-portal{0%{opacity:0;transform:scale(.05) rotate(-90deg)}35%{opacity:1}100%{opacity:0;transform:scale(1.9) rotate(180deg)}}@keyframes ge-hero{0%{opacity:0;transform:translateY(90px) scale(.25) rotate(-18deg)}45%{opacity:1;transform:translateY(-12px) scale(1.15) rotate(5deg)}70%{transform:translateY(0) scale(.96)}100%{transform:scale(1)}}@keyframes ge-dragon{0%{opacity:0;transform:translateX(-100vw) scale(.2) rotate(-14deg)}50%{opacity:1;transform:translateX(10px) scale(1.15) rotate(4deg)}100%{transform:translateX(0) scale(1)}}@keyframes ge-throne{0%{opacity:0;transform:translateY(-100vh) rotate(35deg) scale(.2)}55%{opacity:1;transform:translateY(10px) rotate(-8deg) scale(1.15)}100%{transform:none}}@keyframes ge-impact{0%{opacity:0;transform:translate(80vw,-80vh) rotate(180deg) scale(.2)}65%{opacity:1;transform:translate(-8px,8px) rotate(-12deg) scale(1.2)}100%{transform:none}}@keyframes ge-dance{0%,100%{transform:none}20%{transform:translateY(-24px) rotate(-14deg)}40%{transform:rotate(14deg)}60%{transform:translateY(-18px) rotate(-10deg)}80%{transform:rotate(10deg)}}@keyframes ge-text{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}@keyframes ge-particle{0%{opacity:0;transform:translate(-50%,-50%) scale(.2)}15%{opacity:1}100%{opacity:0;transform:translate(calc(-50% + var(--dx)),calc(-50% + var(--dy))) rotate(260deg) scale(.3)}}@media(max-width:600px){#tiknation-gift-engine .stage{width:96vw;min-height:56vh;padding:18px 12px}#tiknation-gift-engine .hero{font-size:clamp(68px,22vw,118px)}}/* Gift celebrations retain motion so the full-screen scene never becomes a static poster. */"+
String.raw`#tiknation-gift-engine[data-style=storm]{background:transparent!important;padding:0!important}#tiknation-gift-engine .storm-world{position:absolute;inset:0;overflow:hidden;background:linear-gradient(#10172b 0%,#252e42 38%,#101827 72%,#070b14 100%);isolation:isolate}#tiknation-gift-engine .storm-cloud{position:absolute;left:-25%;width:150%;height:45%;top:4%;border-radius:50%;background:radial-gradient(ellipse at 30% 65%,#657080 0%,#394454 24%,#202b3c 58%,transparent 72%);filter:blur(15px);animation:ge-cloud 7s ease-in-out infinite alternate}#tiknation-gift-engine .storm-cloud.c2{top:12%;left:-15%;opacity:.9;transform:scale(1.15);animation-duration:9s;animation-direction:alternate-reverse}#tiknation-gift-engine .storm-cloud.c3{top:24%;left:-30%;opacity:.65;transform:scale(.9);animation-duration:6s}#tiknation-gift-engine .storm-rain{position:absolute;inset:-20% 0 0;background-image:repeating-linear-gradient(104deg,transparent 0 18px,rgba(190,220,255,.55) 19px,transparent 21px 38px);background-size:90px 150px;opacity:.0;animation:ge-rain .24s linear infinite;mask-image:linear-gradient(transparent,#000 18%,#000)}#tiknation-gift-engine .storm-bolt{position:absolute;top:8%;left:53%;width:30%;height:70%;opacity:0;filter:drop-shadow(0 0 12px #d8efff);animation:ge-bolt 4.5s steps(1,end) infinite}#tiknation-gift-engine .storm-bolt.second{left:22%;top:17%;width:20%;height:58%;animation-delay:1.8s;transform:scaleX(-1)}#tiknation-gift-engine .storm-horizon{position:absolute;bottom:-8%;left:-10%;width:120%;height:38%;background:radial-gradient(ellipse at 50% 0%,rgba(115,142,172,.3),transparent 68%),linear-gradient(transparent,#050910 70%);border-radius:50%}#tiknation-gift-engine .storm-title{position:absolute;z-index:5;bottom:9%;left:0;right:0;text-align:center;color:#fff;font-size:clamp(22px,5vw,44px);font-weight:1000;letter-spacing:.12em;text-shadow:0 0 20px #9bcaff,0 3px 8px #000;animation:ge-storm-title 1s both}#tiknation-gift-engine .storm-caption{display:block;margin-top:9px;font-size:11px;letter-spacing:.2em;color:#c9e4ff}#tiknation-gift-engine .storm-flash{position:absolute;inset:0;background:#d9ecff;opacity:0;animation:ge-flash 4.5s steps(1,end) infinite}#tiknation-gift-engine .storm-world:after{content:"";position:absolute;inset:0;background:radial-gradient(ellipse,transparent 25%,rgba(0,0,0,.52) 100%);pointer-events:none}@keyframes ge-cloud{from{transform:translateX(-8%) scale(1)}to{transform:translateX(9%) scale(1.12)}}@keyframes ge-rain{0%{opacity:.5;transform:translateY(-3%)}100%{opacity:.78;transform:translateY(8%)}}@keyframes ge-bolt{0%,8%,12%,100%{opacity:0}9%,10%{opacity:1}11%{opacity:.2}12%{opacity:0}}@keyframes ge-flash{0%,8%,12%,100%{opacity:0}9%{opacity:.22}10%{opacity:0}11%{opacity:.12}12%{opacity:0}}@keyframes ge-storm-title{from{opacity:0;transform:translateY(30px);letter-spacing:.3em}to{opacity:1;transform:none;letter-spacing:.12em}}`;

css += String.raw`
#tiknation-gift-engine .gift-world{position:absolute;inset:0;overflow:hidden;display:grid;place-items:center;isolation:isolate;background:#080b19}
#tiknation-gift-engine .gift-world:before{content:"";position:absolute;inset:-20%;background:radial-gradient(ellipse at 50% 65%,var(--world-glow),transparent 55%),radial-gradient(ellipse at 50% 110%,rgba(0,0,0,.9),transparent 60%);animation:world-breathe 3s ease-in-out infinite alternate}
#tiknation-gift-engine .world-halo{position:absolute;width:min(76vw,650px);aspect-ratio:1;border:2px solid var(--world-line);border-radius:50%;box-shadow:0 0 30px var(--world-glow),inset 0 0 50px var(--world-glow);animation:world-halo 5s linear infinite}
#tiknation-gift-engine .world-hero{position:absolute;z-index:3;top:38%;left:50%;transform:translate(-50%,-50%);font-size:clamp(90px,20vw,190px);line-height:1;filter:drop-shadow(0 0 25px var(--world-glow));white-space:nowrap;animation:world-hero 4.8s cubic-bezier(.2,.75,.25,1) both}
#tiknation-gift-engine .world-side{position:absolute;z-index:2;top:43%;font-size:clamp(46px,10vw,100px);filter:drop-shadow(0 0 20px var(--world-glow));animation:world-side 4s ease-in-out infinite}
#tiknation-gift-engine .world-side.left{left:8%;animation-delay:-1s}#tiknation-gift-engine .world-side.right{right:8%;animation-delay:-2.2s}
#tiknation-gift-engine .world-ground{position:absolute;z-index:1;left:-10%;right:-10%;bottom:-24%;height:55%;border-radius:50%;background:radial-gradient(ellipse,var(--world-glow),transparent 68%);filter:blur(15px);animation:world-ground 2.5s ease-in-out infinite alternate}
#tiknation-gift-engine .world-beam{position:absolute;z-index:1;left:50%;top:0;width:2px;height:90%;background:linear-gradient(transparent,var(--world-line),transparent);box-shadow:0 0 35px 10px var(--world-glow);transform-origin:top;animation:world-beam 2s ease-in-out infinite alternate}
#tiknation-gift-engine .world-title{position:absolute;z-index:5;bottom:12%;left:4%;right:4%;text-align:center;color:white;font-weight:1000;font-size:clamp(22px,5vw,46px);letter-spacing:.1em;text-shadow:0 0 22px var(--world-glow),0 3px 9px #000;text-transform:uppercase;animation:ge-storm-title .8s both}
#tiknation-gift-engine .world-message{display:block;margin-top:10px;color:#eef5ff;font-size:clamp(12px,2.5vw,17px);letter-spacing:.05em;font-weight:600;text-transform:none}
#tiknation-gift-engine .world-particle{position:absolute;z-index:2;left:50%;top:52%;font-size:clamp(18px,4vw,32px);animation:world-particle 3.8s ease-out infinite;animation-delay:var(--delay);filter:drop-shadow(0 0 8px var(--world-glow))}
#tiknation-gift-engine .gift-world[data-world=fire]{--world-glow:#ff6b20;--world-line:#ffd06c;background:radial-gradient(ellipse at 50% 85%,#a52a12,#32101b 42%,#080713 82%)}
#tiknation-gift-engine .gift-world[data-world=cosmic]{--world-glow:#956bff;--world-line:#c7b6ff;background:radial-gradient(ellipse at 50% 50%,#30206b,#080b24 65%,#02030b)}
#tiknation-gift-engine .gift-world[data-world=stormlight]{--world-glow:#a7dfff;--world-line:#e4f5ff;background:linear-gradient(#10172d,#172b48 55%,#030812)}
#tiknation-gift-engine .gift-world[data-world=magic]{--world-glow:#b68cff;--world-line:#f1d8ff;background:radial-gradient(ellipse at 50% 50%,#46206d,#100d2b 65%,#05040c)}
#tiknation-gift-engine .gift-world[data-world=gold]{--world-glow:#ffca58;--world-line:#fff0ad;background:radial-gradient(ellipse at 50% 75%,#8d4c13,#33200c 50%,#09070a)}
#tiknation-gift-engine .gift-world[data-world=ice]{--world-glow:#65eaff;--world-line:#d5fbff;background:radial-gradient(ellipse at 50% 65%,#176b89,#10233f 48%,#040914)}
#tiknation-gift-engine .gift-world[data-world=party]{--world-glow:#ff76d8;--world-line:#ffe17a;background:repeating-conic-gradient(from 0deg at 50% 50%,#251047 0 12deg,#101a3a 12deg 24deg,#3d1748 24deg 36deg)}
#tiknation-gift-engine .gift-world[data-world=shadow]{--world-glow:#9bff86;--world-line:#d7ffc7;background:radial-gradient(ellipse at 50% 75%,#344a28,#101b1a 50%,#020609)}
#tiknation-gift-engine .gift-world[data-world=impact]{--world-glow:#ff9d50;--world-line:#fff2b0;background:radial-gradient(ellipse at 50% 65%,#74321d,#25101a 48%,#05050c)}
#tiknation-gift-engine .gift-world[data-world=prism]{--world-glow:#a7eaff;--world-line:#fff;background:conic-gradient(from 0deg at 50% 50%,#321b5b,#174b67,#4a235b,#174b67,#321b5b)}
@keyframes world-breathe{to{transform:scale(1.15) rotate(8deg);opacity:.7}}@keyframes world-halo{to{transform:rotate(360deg) scale(.82)}}
@keyframes world-hero{0%{opacity:0;transform:translate(-50%,90%) scale(.15) rotate(-24deg)}35%{opacity:1;transform:translate(-50%,-58%) scale(1.18) rotate(8deg)}60%{transform:translate(-50%,-48%) scale(.96)}100%{transform:translate(-50%,-50%) scale(1)}}
@keyframes world-side{0%,100%{transform:translateY(10px) rotate(-12deg) scale(.85)}50%{transform:translateY(-55px) rotate(14deg) scale(1.18)}}
@keyframes world-ground{to{transform:scale(1.25);opacity:.6}}@keyframes world-beam{to{transform:rotate(24deg);opacity:.35}}
@keyframes world-particle{0%{opacity:0;transform:translate(-50%,20vh) scale(.3) rotate(0)}15%{opacity:1}100%{opacity:0;transform:translate(calc(-50% + var(--x)),-65vh) scale(1.1) rotate(240deg)}}
`;
/* The frame-driven scene owns these transforms. Disable the older CSS keyframes that override inline frame updates. */
css += String.raw`
#tiknation-gift-engine .world-hero,
#tiknation-gift-engine .world-halo,
#tiknation-gift-engine .world-ground,
#tiknation-gift-engine .world-beam,
#tiknation-gift-engine .world-side,
#tiknation-gift-engine .world-particle{animation:none!important}
`;
css += String.raw`
#tiknation-gift-engine:has(.dragon-v2){background:transparent!important}#tiknation-gift-engine .dragon-v2{position:absolute;inset:0;overflow:hidden;background:transparent!important;isolation:isolate}
#tiknation-gift-engine .dragon-v2:before{content:none!important;display:none!important}
#tiknation-gift-engine .dragon-flight-v2{position:absolute;z-index:4;left:50%;top:40%;font-size:clamp(130px,34vw,300px);line-height:1;filter:drop-shadow(0 0 28px #ff6a24);animation:dragon-flight-v2 4.2s cubic-bezier(.2,.65,.25,1) both}
#tiknation-gift-engine .dragon-fire-v2{position:absolute;z-index:3;left:50%;top:43%;width:min(85vw,780px);height:150px;transform:translate(-5%,-50%);border-radius:50%;background:radial-gradient(ellipse,#fff8b2 0%,#ffc04a 15%,#ff5a1e 38%,rgba(255,50,15,.25) 62%,transparent 72%);filter:blur(5px);transform-origin:left center;animation:dragon-fire-v2 .65s ease-in-out infinite alternate}
#tiknation-gift-engine .dragon-blast-v2{position:absolute;z-index:2;left:8%;right:8%;top:46%;height:3px;background:linear-gradient(90deg,transparent,#fff1a2,#ff6b22,transparent);box-shadow:0 0 30px 12px #ff5b1e;animation:dragon-blast-v2 .8s ease-in-out infinite alternate}
#tiknation-gift-engine .dragon-ember-v2{position:absolute;z-index:5;left:var(--left);bottom:-8%;width:var(--size);height:var(--size);border-radius:50%;background:#ffb44f;box-shadow:0 0 12px 4px #ff5b22;animation:dragon-ember-v2 var(--speed) linear infinite;animation-delay:var(--delay)}
#tiknation-gift-engine .dragon-title-v2{position:absolute;z-index:6;left:0;right:0;bottom:9%;text-align:center;color:#fff;font-weight:1000;font-size:clamp(25px,6vw,54px);letter-spacing:.13em;text-shadow:0 0 24px #ff6a24,0 3px 8px #000;animation:dragon-title-v2 .8s ease-out both}
#tiknation-gift-engine .dragon-title-v2 small{display:block;margin-top:10px;font-size:12px;letter-spacing:.25em;color:#ffd5a4}
@keyframes dragon-flight-v2{0%{opacity:0;transform:translate(-160vw,70vh) scale(.22) rotate(-24deg)}35%{opacity:1;transform:translate(-50%,-40%) scale(1.08) rotate(8deg)}58%{transform:translate(-50%,-54%) scale(.98) rotate(-5deg)}75%{transform:translate(-50%,-46%) scale(1.03) rotate(3deg)}100%{opacity:1;transform:translate(-50%,-50%) scale(1) rotate(0)}}
@keyframes dragon-fire-v2{from{opacity:.45;scale:.82 1}to{opacity:1;scale:1.12 1.35}}
@keyframes dragon-blast-v2{from{opacity:.25;transform:scaleX(.65)}to{opacity:1;transform:scaleX(1.1)}}
@keyframes dragon-ground-v2{to{opacity:.35;transform:scale(1.18)}}
@keyframes dragon-ember-v2{0%{opacity:0;transform:translate3d(0,0,0) scale(.4)}15%{opacity:1}100%{opacity:0;transform:translate3d(var(--drift),-115vh,0) scale(1.2)}}
@keyframes dragon-title-v2{from{opacity:0;transform:translateY(35px);letter-spacing:.35em}to{opacity:1;transform:none;letter-spacing:.13em}}

#tiknation-gift-engine .dragon-flight-v2{width:min(94vw,900px);height:auto;left:50%;top:39%;font-size:0;line-height:0;filter:drop-shadow(0 0 22px #ff6a24);animation:dragon-flight-v3 4.2s cubic-bezier(.2,.65,.25,1) both}
#tiknation-gift-engine .dragon-svg-v3{display:block;width:100%;height:auto;overflow:visible}
#tiknation-gift-engine .dragon-wing-far{transform-origin:430px 310px;animation:dragon-wing-far-v3 .72s ease-in-out infinite alternate}
#tiknation-gift-engine .dragon-wing-near{transform-origin:430px 310px;animation:dragon-wing-near-v3 .72s ease-in-out infinite alternate}
#tiknation-gift-engine .dragon-breath{transform-origin:860px 260px;animation:dragon-breath-v3 .32s ease-in-out infinite alternate}
@keyframes dragon-flight-v3{0%{opacity:0;transform:translate(-160vw,70vh) scale(.22) rotate(-18deg)}35%{opacity:1;transform:translate(-50%,-40%) scale(1.08) rotate(5deg)}60%{transform:translate(-50%,-52%) scale(1) rotate(-2deg)}100%{opacity:1;transform:translate(-50%,-50%) scale(1)}}
@keyframes dragon-flight-v5{0%{opacity:0;transform:translate(-160vw,-50%) scale(.68) rotate(2deg)}8%{opacity:1}48%{opacity:1;transform:translate(-50%,-50%) scale(1) rotate(0)}92%{opacity:1}100%{opacity:0;transform:translate(160vw,-50%) scale(.68) rotate(-2deg)}}
@keyframes dragon-wing-far-v3{from{transform:rotate(-18deg)}to{transform:rotate(24deg)}}
@keyframes dragon-wing-near-v3{from{transform:rotate(20deg)}to{transform:rotate(-22deg)}}
@keyframes dragon-breath-v3{from{opacity:.55;transform:scaleX(.72) scaleY(.8)}to{opacity:1;transform:scaleX(1.2) scaleY(1.18)}}


#tiknation-gift-engine .dragon-flight-v2{width:min(98vw,1100px);top:38%;filter:drop-shadow(0 18px 24px rgba(0,0,0,.65)) drop-shadow(0 0 20px rgba(255,104,30,.42))}
#tiknation-gift-engine .dragon-flight-v2{animation:dragon-flight-v5 5.2s linear both!important;will-change:transform,opacity}
#tiknation-gift-engine .dragon-svg-v4{display:block;width:100%;height:auto;overflow:visible}
#tiknation-gift-engine .dragon-wing-far{transform-origin:490px 385px;animation:dragon-wing-far-v4 .9s cubic-bezier(.45,0,.55,1) infinite alternate}
#tiknation-gift-engine .dragon-wing-near{transform-origin:490px 390px;animation:dragon-wing-near-v4 .9s cubic-bezier(.45,0,.55,1) infinite alternate}
#tiknation-gift-engine .dragon-flame-v4{transform-origin:980px 292px;animation:dragon-flame-v4 .22s ease-in-out infinite alternate}
#tiknation-gift-engine .dragon-breath{transform-origin:980px 292px;animation:dragon-breath-v4 .28s ease-in-out infinite alternate}
@keyframes dragon-wing-far-v4{from{transform:rotate(-9deg) scaleY(.91)}to{transform:rotate(13deg) scaleY(1.06)}}
@keyframes dragon-wing-near-v4{from{transform:rotate(12deg) scaleY(1.08)}to{transform:rotate(-10deg) scaleY(.92)}}
@keyframes dragon-flame-v4{from{transform:scaleX(.86) scaleY(.82);filter:brightness(.9)}to{transform:scaleX(1.12) scaleY(1.16);filter:brightness(1.35)}}
@keyframes dragon-breath-v4{from{opacity:.65;transform:scaleX(.82)}to{opacity:1;transform:scaleX(1.16)}}

`;

/* Clean presentation for every gift: preserve the gift animation, remove the floating scene dressing. */
css += String.raw`
#tiknation-gift-engine{background:transparent!important}
#tiknation-gift-engine .stage{background:transparent!important;border:0!important;box-shadow:none!important}
#tiknation-gift-engine .stage:before,
#tiknation-gift-engine .stage:after,
#tiknation-gift-engine .ring,
#tiknation-gift-engine .particle{display:none!important;content:none!important}
#tiknation-gift-engine .gift-world{background:transparent!important}
#tiknation-gift-engine .gift-world:before,
#tiknation-gift-engine .world-halo,
#tiknation-gift-engine .world-side,
#tiknation-gift-engine .world-ground,
#tiknation-gift-engine .world-beam,
#tiknation-gift-engine .world-particle{display:none!important;content:none!important}
#tiknation-gift-engine[data-style=storm]{background:transparent!important}
#tiknation-gift-engine .storm-world{background:transparent!important}
#tiknation-gift-engine .storm-cloud,
#tiknation-gift-engine .storm-rain,
#tiknation-gift-engine .storm-horizon,
#tiknation-gift-engine .storm-flash,
#tiknation-gift-engine .storm-world:after{display:none!important;content:none!important}
`;

css += String.raw`
#tiknation-gift-engine{background:transparent!important;padding:0!important}
#tiknation-gift-engine .cinema-stage{position:absolute;inset:0;overflow:hidden;display:grid;place-items:center;background:transparent}
#tiknation-gift-engine .cinema-art{position:absolute;width:min(78vw,520px);height:auto;overflow:visible;filter:drop-shadow(0 22px 28px rgba(0,0,0,.72));animation:cinema-enter 1.05s cubic-bezier(.16,1,.3,1) both}
#tiknation-gift-engine .cinema-object{transform-origin:0 0;animation:cinema-hover 4.8s ease-in-out infinite}
#tiknation-gift-engine .cinema-title{position:absolute;left:5%;right:5%;bottom:10%;text-align:center;color:#fff;font-size:clamp(21px,5vw,42px);font-weight:900;letter-spacing:.06em;text-shadow:0 3px 12px #000,0 0 18px rgba(255,255,255,.18)}
#tiknation-gift-engine .cinema-title small{display:block;margin-top:8px;font-size:clamp(12px,2.5vw,16px);font-weight:500;letter-spacing:.02em;color:#e7eaf2}
#tiknation-gift-engine .cinema-mote{position:absolute;left:50%;top:50%;width:4px;height:4px;border-radius:50%;background:#fff;box-shadow:0 0 12px 3px rgba(255,255,255,.55);opacity:0;animation:cinema-drift 3.5s ease-out var(--wait) infinite}
@keyframes cinema-enter{0%{opacity:0;transform:translate3d(-70vw,22vh,0) scale(.45) rotate(-16deg)}68%{opacity:1;transform:translate3d(2vw,-2vh,0) scale(1.04) rotate(2deg)}100%{opacity:1;transform:translate3d(0,0,0) scale(1) rotate(0)}}
@keyframes cinema-hover{0%,100%{transform:translateY(0) rotate(-.5deg)}50%{transform:translateY(-9px) rotate(.5deg)}}
@keyframes cinema-drift{0%{opacity:0;transform:translate3d(0,12vh,0) scale(.4)}15%{opacity:.8}100%{opacity:0;transform:translate3d(var(--mx),var(--my),0) scale(.1)}}
@media(prefers-reduced-motion:reduce){#tiknation-gift-engine .cinema-art,#tiknation-gift-engine .cinema-object,#tiknation-gift-engine .cinema-mote{animation:none!important}}

#tiknation-gift-engine .music-stage{position:absolute;inset:0;overflow:hidden;background:transparent!important;display:grid;place-items:center}
#tiknation-gift-engine .music-hero{position:absolute;left:50%;top:46%;font-size:clamp(112px,27vw,230px);line-height:1;transform:translate(-50%,-50%);filter:drop-shadow(0 8px 18px rgba(0,0,0,.65));animation:music-arrive 1.15s cubic-bezier(.16,1,.3,1) both}
#tiknation-gift-engine .music-note{position:absolute;left:var(--sx);top:var(--sy);font-size:clamp(34px,8vw,76px);line-height:1;color:var(--note-color);text-shadow:0 3px 12px rgba(0,0,0,.7);animation:music-travel var(--dur) cubic-bezier(.2,.7,.2,1) var(--delay) both}
#tiknation-gift-engine .music-title{position:absolute;left:5%;right:5%;bottom:12%;text-align:center;color:white;font-size:clamp(22px,5vw,44px);font-weight:1000;letter-spacing:.1em;text-transform:uppercase;text-shadow:0 3px 12px #000;animation:ge-text .7s .25s both}
#tiknation-gift-engine .music-title small{display:block;margin-top:9px;font-size:11px;letter-spacing:.22em;color:#ffe4f5}
@keyframes music-arrive{0%{opacity:0;transform:translate(-50%,80vh) scale(.25) rotate(-20deg)}65%{opacity:1;transform:translate(-50%,-54%) scale(1.12) rotate(5deg)}100%{opacity:1;transform:translate(-50%,-50%) scale(1) rotate(0)}}
@keyframes music-travel{0%{opacity:0;transform:translate3d(0,45vh,0) rotate(-18deg) scale(.35)}18%{opacity:1}78%{opacity:1}100%{opacity:0;transform:translate3d(var(--dx),-55vh,0) rotate(24deg) scale(1.15)}}`;

/* Heat Pulse: a true double-beat heartbeat, not a floating/bobbing motion. */
css += String.raw`
#tiknation-gift-engine[data-style=pulse] .cinema-art{animation:heat-core-glow 1.15s ease-in-out infinite}
@keyframes heat-core-glow{0%,100%{filter:drop-shadow(0 0 8px rgba(255,48,65,.5))}9%,29%{filter:drop-shadow(0 0 30px rgba(255,38,55,1)) drop-shadow(0 0 58px rgba(190,0,25,.72))}18%,43%{filter:drop-shadow(0 0 12px rgba(255,48,65,.58))}}

#tiknation-gift-engine[data-style=pulse] .cinema-stage:before{content:"";position:absolute;left:50%;top:45%;width:min(42vw,260px);aspect-ratio:1;border:2px solid rgba(255,105,115,.62);border-radius:50%;transform:translate(-50%,-50%) scale(.72);box-shadow:0 0 28px rgba(225,20,40,.3),inset 0 0 28px rgba(225,20,40,.16);animation:heat-pulse-echo 1.15s ease-out infinite;pointer-events:none}
#tiknation-gift-engine[data-style=pulse] .cinema-object{transform-box:fill-box;transform-origin:center;animation:heat-pulse-beat 1.15s ease-in-out infinite}
#tiknation-gift-engine[data-style=pulse] .cinema-art{filter:drop-shadow(0 0 12px rgba(255,85,155,.55)) drop-shadow(0 18px 24px rgba(0,0,0,.72))}
#tiknation-gift-engine[data-style=pulse] .cinema-title{text-shadow:0 0 18px rgba(255,55,65,.82),0 3px 12px #000}
@keyframes heat-pulse-beat{0%,100%{transform:scale(1)}9%{transform:scale(1.16)}18%{transform:scale(.98)}29%{transform:scale(1.2)}43%{transform:scale(1)}62%{transform:scale(.985)}}
@keyframes heat-pulse-echo{0%,42%{opacity:.8;transform:translate(-50%,-50%) scale(.72)}100%{opacity:0;transform:translate(-50%,-50%) scale(1.5)}}
@media(prefers-reduced-motion:reduce){#tiknation-gift-engine[data-style=pulse] .cinema-object,#tiknation-gift-engine[data-style=pulse] .cinema-stage:before{animation:none!important}}
`;



/* Chinese celestial dragon: sweeping S-curve flight across the full screen */
css += String.raw`
#tiknation-gift-engine .dragon-v2{position:absolute;inset:0;overflow:hidden;perspective:900px}
#tiknation-gift-engine .dragon-flight-v2{
 width:min(112vw,1080px)!important;
 left:50%!important;top:45%!important;
 animation:c5-serpentine-flight 6.4s cubic-bezier(.42,0,.24,1) both!important;
 will-change:transform,opacity;
 filter:drop-shadow(0 16px 24px rgba(0,0,0,.55)) drop-shadow(0 0 22px rgba(245,190,77,.38))!important
}
#tiknation-gift-engine .dragon-svg-v5{
 animation:c5-body-glide 1.65s ease-in-out infinite alternate; transform-style:preserve-3d;
 transform-origin:50% 50%
}
@keyframes c5-serpentine-flight{
 0%{opacity:0;transform:translate3d(-155vw,24vh,0) rotate(13deg) scale(.62)}
 9%{opacity:1;transform:translate3d(-105vw,16vh,0) rotate(8deg) scale(.72)}
 25%{opacity:1;transform:translate3d(-54vw,-8vh,0) rotate(-5deg) scale(.88)}
 43%{opacity:1;transform:translate3d(-8vw,-19vh,0) rotate(-12deg) scale(1)}
 59%{opacity:1;transform:translate3d(38vw,-5vh,0) rotate(7deg) scale(.94)}
 77%{opacity:1;transform:translate3d(91vw,15vh,0) rotate(15deg) scale(.78)}
 100%{opacity:0;transform:translate3d(160vw,-8vh,0) rotate(-4deg) scale(.64)}
}
@keyframes c5-body-glide{
 from{transform:rotate(-1.2deg) scaleY(.985) skewY(-.4deg)}
 to{transform:rotate(1.2deg) scaleY(1.015) skewY(.4deg)}
}
@media(prefers-reduced-motion:reduce){
 #tiknation-gift-engine .dragon-flight-v2,#tiknation-gift-engine .dragon-svg-v5,#tiknation-gift-engine .c5-tail{animation:none!important}
}
`;
css += String.raw`
#tiknation-gift-engine .dragon-svg-v5{display:block;width:100%;height:auto;overflow:visible}
#tiknation-gift-engine .c5-mane{transform-origin:830px 280px;animation:c5-mane-flow 1.1s ease-in-out infinite alternate}
#tiknation-gift-engine .c5-whiskers{transform-origin:1000px 300px;animation:c5-whisker-flow .8s ease-in-out infinite alternate}
#tiknation-gift-engine .c5-breath{transform-origin:1018px 300px;animation:c5-breath .3s ease-in-out infinite alternate}
#tiknation-gift-engine .c5-tail{transform-box:fill-box;transform-origin:12% 50%;animation:c5-tail-flow 1.45s ease-in-out infinite alternate}
#tiknation-gift-engine .dragon-svg-v5{transform-origin:50% 50%}
@keyframes c5-tail-flow{from{transform:rotate(-5deg) translateY(-3px)}to{transform:rotate(7deg) translateY(4px)}}
@keyframes c5-mane-flow{from{transform:translateY(-4px) rotate(-1deg)}to{transform:translateY(5px) rotate(2deg)}}
@keyframes c5-whisker-flow{from{transform:rotate(-3deg)}to{transform:rotate(4deg)}}
@keyframes c5-breath{from{opacity:.65;transform:scaleX(.72)}to{opacity:1;transform:scaleX(1.18)}}
`;

function install(){if(document.getElementById("tiknation-gift-engine-style"))return;const s=document.createElement("style");s.id="tiknation-gift-engine-style";s.textContent=css;document.head.appendChild(s)}


function renderMusicSheetGift(gift,opts){
 const overlay=document.createElement("div");overlay.id="tiknation-gift-engine";overlay.dataset.style="notes";overlay.setAttribute("role","status");overlay.setAttribute("aria-live","polite");
 overlay.style.cssText="position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;overflow:hidden;pointer-events:none;padding:8px;box-sizing:border-box;background:radial-gradient(ellipse at 50% 48%,rgba(18,39,66,.96),rgba(3,8,20,.99) 72%);";
 let style=document.getElementById("tiknation-score-style");if(!style){style=document.createElement("style");style.id="tiknation-score-style";document.head.appendChild(style)}
 style.textContent='#tiknation-gift-engine .score-sheet{width:min(97vw,1100px);height:96vh;height:96dvh;min-height:0;display:flex;flex-direction:column;box-sizing:border-box;border:1px solid #d6b77b;border-radius:8px;background:linear-gradient(135deg,#fff8e8,#f1e5c9 52%,#fff5df);box-shadow:0 24px 90px #000b,0 0 45px #79dfff66,inset 0 0 35px #c8a76b55;color:#17243a;padding:clamp(12px,2.2vh,26px);transform-origin:center;animation:score-unfold .9s cubic-bezier(.2,.8,.2,1) both}'+
 '#tiknation-gift-engine .score-heading{text-align:center;flex:none;font:700 clamp(11px,2vw,16px)/1.3 Georgia,serif;letter-spacing:.28em;color:#80643a}#tiknation-gift-engine .score-heading strong{display:block;margin-top:5px;font:700 clamp(20px,4vw,34px)/1.2 Georgia,serif;letter-spacing:.09em;color:#1c2c43}'+
 '#tiknation-gift-engine .score-svg{display:block;width:100%;height:0;min-height:0;flex:1 1 auto;margin:clamp(8px,2vh,20px) 0;overflow:visible}#tiknation-gift-engine .score-staff{stroke:#33435a;stroke-width:2;opacity:.8}'+
 '#tiknation-gift-engine .score-note{opacity:.12;transform-box:fill-box;transform-origin:center;animation:score-note-play .42s ease-out var(--beat) both}#tiknation-gift-engine .score-note ellipse{fill:#17243a;stroke:#17243a;stroke-width:2}#tiknation-gift-engine .score-note path{fill:none;stroke:#17243a;stroke-width:5;stroke-linecap:round}#tiknation-gift-engine .score-note.active ellipse{fill:#b47a25;stroke:#fff0b8;filter:drop-shadow(0 0 9px #d79a36)}#tiknation-gift-engine .score-note.active path{stroke:#9a641e}'+
 '#tiknation-gift-engine .score-caption{text-align:center;flex:none;margin-top:auto;font:italic clamp(12px,2vw,17px) Georgia,serif;letter-spacing:.08em;color:#78613e;padding-top:6px}#tiknation-gift-engine .score-clef{font:112px Georgia,serif;fill:#263c58}'+
 '@keyframes score-unfold{0%{opacity:0;transform:perspective(900px) rotateX(24deg) scaleX(.18)}70%{opacity:1;transform:perspective(900px) rotateX(0) scaleX(1.015)}100%{transform:perspective(900px) rotateX(0) scale(1)}}@keyframes score-note-play{0%{opacity:.12;transform:scale(.72)}45%{opacity:1;transform:scale(1.4)}100%{opacity:1;transform:scale(1)}}@media(prefers-reduced-motion:reduce){#tiknation-gift-engine .score-sheet,#tiknation-gift-engine .score-note{animation:none!important;opacity:1}}';
 const scene=document.createElement("div");scene.className="score-scene";scene.style.cssText="position:absolute;inset:0;display:grid;place-items:center;overflow:hidden;padding:4px;box-sizing:border-box;";
 const sheet=document.createElement("div");sheet.className="score-sheet";
 const heading=document.createElement("div");heading.className="score-heading";heading.innerHTML='TIKNATION LIVE<strong>MELODY NOTE</strong>';
 const ns="http://www.w3.org/2000/svg";const svg=document.createElementNS(ns,"svg");svg.setAttribute("class","score-svg");svg.setAttribute("viewBox","0 0 1000 900");svg.setAttribute("preserveAspectRatio","none");svg.setAttribute("role","img");svg.setAttribute("aria-label","Full-page animated musical score with three systems of notes");
 const systems=[{top:100,notes:[187,163,139,115,139,163,175,151,127,115,127,151]},{top:380,notes:[163,139,115,127,151,175,163,139,115,139,163,187]},{top:660,notes:[139,115,127,151,175,163,139,115,127,151,163,187]}];
 systems.forEach((system,row)=>{
  [0,24,48,72,96].forEach(offset=>{const l=document.createElementNS(ns,"line");l.setAttribute("x1","42");l.setAttribute("y1",system.top+offset);l.setAttribute("x2","960");l.setAttribute("y2",system.top+offset);l.setAttribute("class","score-staff");svg.appendChild(l)});
  const clef=document.createElementNS(ns,"text");clef.setAttribute("x","55");clef.setAttribute("y",system.top+100);clef.setAttribute("class","score-clef");clef.textContent="𝄞";svg.appendChild(clef);
  system.notes.forEach((pitch,i)=>{const x=210+i*62,y=system.top+pitch-115,g=document.createElementNS(ns,"g");g.setAttribute("class","score-note active");g.style.setProperty("--beat",(row*1.1+i*.13+.25)+"s");const n=document.createElementNS(ns,"ellipse");n.setAttribute("cx",x);n.setAttribute("cy",y);n.setAttribute("rx","10");n.setAttribute("ry","7");n.setAttribute("transform","rotate(-24 "+x+" "+y+")");g.appendChild(n);const stem=document.createElementNS(ns,"path");stem.setAttribute("d","M"+(x+9)+" "+(y-2)+"V"+(y-75));g.appendChild(stem);if(i%3===1){const flag=document.createElementNS(ns,"path");flag.setAttribute("d","M"+(x+9)+" "+(y-75)+"q35 18 8 43");g.appendChild(flag)}svg.appendChild(g)});
  [405,585,765].forEach(x=>{const b=document.createElementNS(ns,"line");b.setAttribute("x1",x);b.setAttribute("x2",x);b.setAttribute("y1",system.top);b.setAttribute("y2",system.top+96);b.setAttribute("stroke","#33435a");b.setAttribute("stroke-width","2");svg.appendChild(b)});
 });
 const caption=document.createElement("div");caption.className="score-caption";caption.textContent="A little melody, written in light";
 sheet.append(heading,svg,caption);scene.appendChild(sheet);overlay.appendChild(scene);document.body.appendChild(overlay);
 if(typeof opts.onSound==="function"){try{opts.onSound()}catch(_){}}
 const duration=Math.max(1000,Number(opts.duration)||5200);setTimeout(()=>{if(overlay.isConnected){overlay.style.transition="opacity .32s ease";overlay.style.opacity="0";setTimeout(()=>overlay.remove(),350)}},duration);return overlay;
}
function renderSymphonyGift(gift,opts){
 const overlay=document.createElement("div");overlay.id="tiknation-gift-engine";overlay.dataset.style="grand";overlay.setAttribute("role","status");overlay.setAttribute("aria-live","polite");
 overlay.style.cssText="position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;overflow:hidden;pointer-events:none;padding:12px;box-sizing:border-box;background:radial-gradient(ellipse at 50% 35%,rgba(93,62,25,.72),rgba(9,8,20,.98) 72%);";
 const style=document.createElement("style");style.textContent=`
 #tiknation-gift-engine .symphony-stage{position:relative;width:min(96vw,1000px);height:min(88vh,720px);overflow:hidden;border:1px solid #d6b36b;border-radius:24px;background:linear-gradient(180deg,#17142a 0%,#30203a 52%,#090b18 100%);box-shadow:0 0 70px #e8b95b55,inset 0 0 70px #ffdc8b18;color:#fff}
 #tiknation-gift-engine .symphony-curtain{position:absolute;inset:0 0 43%;background:repeating-linear-gradient(90deg,#401b35 0 7%,#682b45 8% 12%,#32172f 14% 20%);clip-path:polygon(0 0,100% 0,92% 100%,8% 100%);filter:drop-shadow(0 14px 12px #0009)}
 #tiknation-gift-engine .symphony-lights{position:absolute;top:0;left:8%;right:8%;height:42%;background:radial-gradient(ellipse at 50% 5%,#ffe8a866,transparent 58%);animation:symphony-glow 2.4s ease-in-out infinite alternate}
 #tiknation-gift-engine .symphony-beam{position:absolute;top:12%;left:50%;width:45%;height:74%;transform:translateX(-50%);background:linear-gradient(180deg,#ffe9a833,transparent 78%);clip-path:polygon(42% 0,58% 0,100% 100%,0 100%);filter:blur(5px)}
 #tiknation-gift-engine .symphony-orchestra{position:absolute;left:7%;right:7%;bottom:19%;height:31%;display:flex;align-items:end;justify-content:space-around;gap:1%;border-bottom:5px solid #c38d43}
 #tiknation-gift-engine .symphony-player{position:relative;width:21%;height:84%;display:flex;flex-direction:column;align-items:center;justify-content:center;filter:drop-shadow(0 8px 9px #000);animation:symphony-play .96s ease-in-out infinite alternate;animation-delay:var(--delay)}
 #tiknation-gift-engine .symphony-instrument{width:100%;height:82%;overflow:visible}
 #tiknation-gift-engine .symphony-instrument .moving{transform-box:fill-box;transform-origin:center;animation:symphony-playing .48s ease-in-out infinite alternate}
 #tiknation-gift-engine .symphony-instrument .bow{transform-origin:10% 50%;animation:symphony-bow .48s ease-in-out infinite alternate}
 #tiknation-gift-engine .symphony-instrument .stick{transform-origin:50% 100%;animation:symphony-drum .48s ease-in-out infinite alternate}
 #tiknation-gift-engine .symphony-instrument .keys{animation:symphony-keys .48s steps(2,end) infinite alternate}
 #tiknation-gift-engine .symphony-player small{font:700 clamp(8px,1.4vw,12px) system-ui;letter-spacing:.14em;color:#ffe5a7;white-space:nowrap;margin-top:3px}
 #tiknation-gift-engine .symphony-conductor{position:absolute;z-index:3;left:50%;bottom:19%;transform:translateX(-50%);font-size:clamp(54px,10vw,100px);filter:drop-shadow(0 0 18px #f6c66c);animation:symphony-conduct .96s ease-in-out infinite alternate}
 #tiknation-gift-engine .symphony-score{position:absolute;left:50%;top:14%;width:64%;height:23%;transform:translateX(-50%);border:1px solid #e4ca91;border-radius:8px;background:linear-gradient(135deg,#fff4d6,#e9d4a6);box-shadow:0 10px 28px #0008;padding:10px 14px;color:#33233a}
 #tiknation-gift-engine .symphony-score strong{display:block;text-align:center;font:700 clamp(12px,2.2vw,19px) Georgia;letter-spacing:.22em}
 #tiknation-gift-engine .symphony-staff{height:65%;margin-top:6px;background:repeating-linear-gradient(to bottom,transparent 0 calc(20% - 1px),#725b43 calc(20% - 1px) 20%);position:relative;overflow:hidden}
 #tiknation-gift-engine .symphony-notes{position:absolute;inset:0;display:flex;justify-content:space-around;align-items:center;font:clamp(20px,4vw,38px) Georgia;color:#33233a;animation:symphony-notes 5s linear infinite}
 #tiknation-gift-engine .symphony-title{position:absolute;left:0;right:0;bottom:5%;text-align:center;font:900 clamp(24px,6vw,52px) Georgia;letter-spacing:.18em;color:#fff0c5;text-shadow:0 0 22px #f3c56d,0 4px 10px #000}
 #tiknation-gift-engine .symphony-title small{display:block;margin-top:7px;font:700 clamp(9px,1.7vw,13px) system-ui;letter-spacing:.3em;color:#e8d5ad}
 #tiknation-gift-engine .symphony-star{position:absolute;top:var(--top);left:var(--left);color:#ffe6a1;font-size:var(--size);animation:symphony-star 2.8s ease-in-out infinite;animation-delay:var(--delay)}
 @keyframes symphony-playing{to{transform:translateY(5px) rotate(5deg)}}@keyframes symphony-bow{to{transform:translateX(18px) rotate(8deg)}}@keyframes symphony-drum{to{transform:rotate(-24deg) translateY(10px)}}@keyframes symphony-keys{to{transform:translateY(7px)}}@keyframes symphony-glow{to{opacity:.45;filter:brightness(1.7)}}@keyframes symphony-play{to{transform:translateY(-12px) rotate(3deg)}}@keyframes symphony-conduct{to{transform:translateX(-50%) rotate(13deg) translateY(-9px)}}@keyframes symphony-notes{from{transform:translateX(-10%)}to{transform:translateX(10%)}}@keyframes symphony-star{50%{opacity:.25;transform:scale(.6)}}
 @media(prefers-reduced-motion:reduce){#tiknation-gift-engine .symphony-stage *,#tiknation-gift-engine .symphony-stage:before{animation:none!important}}
 `;document.head.appendChild(style);
 const stage=document.createElement("div");stage.className="symphony-stage";
 stage.innerHTML='<div class="symphony-curtain"></div><div class="symphony-lights"></div><div class="symphony-beam"></div><div class="symphony-score"><strong>THE GRAND SCORE</strong><div class="symphony-staff"><div class="symphony-notes">♪ ♫ ♬ ♩ ♫ ♬ ♪ ♩ ♫</div></div></div><div class="symphony-orchestra"><div class="symphony-player" style="--delay:0s"><svg class="symphony-instrument" viewBox="0 0 150 150" aria-label="Violin being played"><path d="M70 20L81 20L91 91L78 130L65 91Z" fill="#d99a43" stroke="#61351e" stroke-width="5"/><path d="M70 20L81 20L82 7L69 7Z" fill="#8b542b"/><path d="M75 18L75 130M79 18L79 130" stroke="#f8e7bd" stroke-width="1.5"/><path d="M58 62Q75 47 92 62Q105 76 90 91Q75 105 60 91Q45 76 58 62Z" fill="#b96c2e" stroke="#63371e" stroke-width="4"/><path d="M51 19L107 117" stroke="#f4e0ad" stroke-width="4" stroke-linecap="round" class="bow"/><path d="M70 73L83 80M83 73L70 80" stroke="#f7dfae" stroke-width="2"/></svg><small>VIOLIN · BOWING</small></div><div class="symphony-player" style="--delay:0s"><svg class="symphony-instrument" viewBox="0 0 150 150" aria-label="Trumpet being played"><path d="M25 70H91V84H25Q13 84 13 77Q13 70 25 70Z" fill="#e7b94f" stroke="#80551d" stroke-width="4"/><path d="M91 70L130 48V106L91 84Z" fill="#f4d16d" stroke="#80551d" stroke-width="4"/><path d="M49 70V50M67 70V45M83 70V50" stroke="#f8df8d" stroke-width="5" class="moving"/><path d="M40 84V102M59 84V102M78 84V102" stroke="#dca83d" stroke-width="5"/><path d="M20 65Q8 77 20 89" fill="none" stroke="#f8df8d" stroke-width="4"/></svg><small>TRUMPET · VALVES</small></div><div class="symphony-player" style="--delay:0s"><svg class="symphony-instrument" viewBox="0 0 150 150" aria-label="Piano keys being played"><rect x="10" y="48" width="130" height="65" rx="7" fill="#17151c" stroke="#d8b56b" stroke-width="4"/><g fill="#fff4d8" stroke="#6b5540" stroke-width="2"><rect x="17" y="55" width="18" height="51"/><rect x="35" y="55" width="18" height="51"/><rect x="53" y="55" width="18" height="51"/><rect x="71" y="55" width="18" height="51"/><rect x="89" y="55" width="18" height="51"/><rect x="107" y="55" width="18" height="51"/></g><g fill="#27212b"><rect x="29" y="55" width="12" height="31"/><rect x="47" y="55" width="12" height="31"/><rect x="83" y="55" width="12" height="31"/><rect x="101" y="55" width="12" height="31"/></g><g class="keys" fill="#f6c66c"><circle cx="43" cy="35" r="8"/><circle cx="91" cy="35" r="8"/></g><path d="M43 40L49 58M91 40L86 58" stroke="#f6c66c" stroke-width="7" stroke-linecap="round"/></svg><small>PIANO · PLAYING</small></div><div class="symphony-player" style="--delay:0s"><svg class="symphony-instrument" viewBox="0 0 150 150" aria-label="Drums being played"><ellipse cx="75" cy="85" rx="46" ry="20" fill="#a83f36" stroke="#e9c47b" stroke-width="5"/><path d="M29 85V105Q75 132 121 105V85" fill="#7d2929" stroke="#e9c47b" stroke-width="4"/><ellipse cx="75" cy="85" rx="46" ry="20" fill="#f4e8d0" stroke="#e9c47b" stroke-width="4"/><path d="M48 25L69 73M103 25L81 73" stroke="#f6dca4" stroke-width="6" stroke-linecap="round" class="stick"/><circle cx="48" cy="25" r="6" fill="#e9c47b"/><circle cx="103" cy="25" r="6" fill="#e9c47b"/></svg><small>DRUMS · BEATING</small></div></div><div class="symphony-conductor">🎼</div><div class="symphony-title">SYMPHONY<small>A GRAND PERFORMANCE · TIKNATION LIVE</small></div>';
 for(let i=0;i<24;i++){const star=document.createElement("i");star.className="symphony-star";star.textContent=i%3?"✦":"✧";star.style.setProperty("--top",(8+(i*37)%75)+"%");star.style.setProperty("--left",(3+(i*53)%94)+"%");star.style.setProperty("--size",(10+(i%4)*7)+"px");star.style.setProperty("--delay",(i*.13)+"s");stage.appendChild(star);}
 overlay.appendChild(stage);document.body.appendChild(overlay);if(typeof opts.onSound==="function"){try{opts.onSound()}catch(_){}}
 const duration=Math.max(6500,Number(opts.duration)||7600);setTimeout(()=>{if(overlay.isConnected){overlay.style.transition="opacity .45s ease";overlay.style.opacity="0";setTimeout(()=>overlay.remove(),480)}},duration);return overlay;
}
function renderDiscoRaccoonGift(gift,opts){
 const overlay=document.createElement("div");overlay.id="tiknation-gift-engine";overlay.dataset.style="raccoon";overlay.setAttribute("role","status");overlay.setAttribute("aria-live","polite");
 const styleId="tiknation-disco-raccoon-style";let css=document.getElementById(styleId);if(!css){css=document.createElement("style");css.id=styleId;document.head.appendChild(css);}
 css.textContent=`
 #tiknation-gift-engine[data-style=raccoon]{position:fixed;inset:0;z-index:2147483647;display:grid;place-items:center;overflow:hidden;pointer-events:none;padding:10px;box-sizing:border-box;background:radial-gradient(ellipse at 50% 38%,#3b175f 0%,#160d35 48%,#050713 100%);font-family:system-ui,sans-serif;color:white}
 #tiknation-gift-engine[data-style=raccoon] .disco-stage{position:relative;width:min(96vw,900px);height:min(88vh,720px);overflow:hidden;border:1px solid #e78cff88;border-radius:24px;background:radial-gradient(ellipse at 50% 85%,#642b82 0%,#251347 42%,#090b20 100%);box-shadow:0 0 55px #e34dff55,inset 0 0 70px #8d49ff33}
 #tiknation-gift-engine[data-style=raccoon] .disco-ball{position:absolute;z-index:3;top:1%;left:50%;width:clamp(112px,20vw,174px);height:clamp(145px,25vw,205px);transform:translateX(-50%);overflow:visible;filter:drop-shadow(0 0 18px #f6eaffaa);animation:disco-ball-turn 10s linear infinite}
 #tiknation-gift-engine[data-style=raccoon] .disco-ball svg{display:block;width:100%;height:100%;overflow:visible}
 @keyframes disco-ball-turn{from{transform:translateX(-50%) rotate(0deg)}to{transform:translateX(-50%) rotate(360deg)}}
 #tiknation-gift-engine[data-style=raccoon] .disco-beams{position:absolute;inset:-25%;background:conic-gradient(from 0deg at 50% 15%,transparent 0 8deg,#ff54dd22 9deg 17deg,transparent 18deg 48deg,#54eaff25 49deg 57deg,transparent 58deg 92deg,rgba(255,255,255,.18) 93deg 100deg,transparent 101deg 180deg);animation:disco-spin 9s linear infinite}
 #tiknation-gift-engine[data-style=raccoon] .disco-floor{position:absolute;left:-15%;right:-15%;bottom:-18%;height:45%;transform:perspective(280px) rotateX(58deg);transform-origin:top;background:linear-gradient(#e95aff55 1px,transparent 1px),linear-gradient(90deg,#65eaff55 1px,transparent 1px);background-size:42px 34px;box-shadow:0 -18px 60px #d54cff44}
 #tiknation-gift-engine[data-style=raccoon] .raccoon-dancer{position:absolute;z-index:4;left:50%;bottom:12%;width:min(66vw,410px);height:68%;transform:translateX(-50%);filter:drop-shadow(0 12px 24px #000b);animation:disco-bounce .48s ease-in-out infinite alternate}
 #tiknation-gift-engine[data-style=raccoon] .raccoon-dancer svg{width:100%;height:100%;overflow:visible}


 #tiknation-gift-engine[data-style=raccoon] .rac-left-leg{transform-origin:190px 390px;animation:disco-leg-left .48s ease-in-out infinite alternate}
 #tiknation-gift-engine[data-style=raccoon] .rac-left-forearm,#tiknation-gift-engine[data-style=raccoon] .rac-right-forearm{transform-box:view-box}
 #tiknation-gift-engine[data-style=raccoon] .rac-left-forearm{transform-origin:112px 274px}
 #tiknation-gift-engine[data-style=raccoon] .rac-right-forearm{transform-origin:308px 274px}
 #tiknation-gift-engine[data-style=raccoon] .rac-right-leg{transform-origin:230px 390px;animation:disco-leg-right .48s ease-in-out infinite alternate}
 #tiknation-gift-engine[data-style=raccoon] .rac-tail{transform-origin:95px 365px;animation:disco-tail .7s ease-in-out infinite alternate}
 #tiknation-gift-engine[data-style=raccoon] .disco-title{position:absolute;z-index:6;left:0;right:0;bottom:3%;text-align:center;font-size:clamp(20px,5vw,38px);font-weight:1000;letter-spacing:.12em;text-shadow:0 0 12px #ff5de7,0 0 28px #6ceaff}
 #tiknation-gift-engine[data-style=raccoon] .disco-title small{display:block;margin-top:5px;font-size:clamp(10px,2vw,14px);letter-spacing:.18em;color:#d6c9ff}
 #tiknation-gift-engine[data-style=raccoon] .disco-note{position:absolute;z-index:5;font-size:clamp(24px,5vw,48px);text-shadow:0 0 16px currentColor;animation:disco-note 2.4s ease-in-out infinite}
 #tiknation-gift-engine[data-style=raccoon] .dn1{left:12%;top:35%;color:#7df7ff}#tiknation-gift-engine[data-style=raccoon] .dn2{right:12%;top:43%;color:#ff85e9;animation-delay:.6s}#tiknation-gift-engine[data-style=raccoon] .dn3{left:20%;top:62%;color:#fff18c;animation-delay:1.1s}
 @keyframes disco-spin{to{transform:translateX(-50%) rotate(360deg)}}@keyframes disco-bounce{0%,100%{transform:translateX(-50%) translateY(0) rotate(-2deg) scale(1)}25%{transform:translateX(-50%) translateY(-10px) rotate(2deg) scale(1.015)}50%{transform:translateX(-50%) translateY(-3px) rotate(-1deg) scale(1)}75%{transform:translateX(-50%) translateY(-12px) rotate(2deg) scale(1.01)}}


 #tiknation-gift-engine[data-style=raccoon] .rac-left-leg{transform-box:fill-box;transform-origin:70% 5%;animation:disco-leg-left .32s ease-in-out infinite alternate}
 #tiknation-gift-engine[data-style=raccoon] .rac-right-leg{transform-box:fill-box;transform-origin:30% 5%;animation:disco-leg-right .32s ease-in-out infinite alternate}
 #tiknation-gift-engine[data-style=raccoon] .rac-tail{transform-box:fill-box;transform-origin:96% 20%;animation:disco-tail .72s ease-in-out infinite alternate}
 #tiknation-gift-engine[data-style=raccoon] .raccoon-dancer svg{overflow:visible}
 @keyframes disco-arm-left{from{transform:rotate(28deg)}to{transform:rotate(-42deg)}}@keyframes disco-arm-right{from{transform:rotate(-38deg)}to{transform:rotate(36deg)}}
 @keyframes disco-leg-left{from{transform:rotate(-16deg)}to{transform:rotate(18deg)}}@keyframes disco-leg-right{from{transform:rotate(18deg)}to{transform:rotate(-16deg)}}
 @keyframes disco-tail{from{transform:rotate(-9deg)}to{transform:rotate(11deg)}}@keyframes disco-note{0%,100%{opacity:.25;transform:translateY(16px) rotate(-14deg)}50%{opacity:1;transform:translateY(-18px) rotate(14deg)}}
 @media(prefers-reduced-motion:reduce){#tiknation-gift-engine[data-style=raccoon] *{animation:none!important}}
 `;
 overlay.innerHTML=`<div class="disco-stage"><div class="disco-beams"></div><div class="disco-ball" aria-label="Rotating mirrored disco ball"><svg viewBox="0 0 180 210" role="img" aria-label="A spherical mirrored disco ball hanging from the ceiling"><defs><radialGradient id="mirrorSphere" cx="30%" cy="23%" r="78%"><stop stop-color="#fff"/><stop offset=".22" stop-color="#d9f4ff"/><stop offset=".55" stop-color="#8299bd"/><stop offset=".82" stop-color="#354363"/><stop offset="1" stop-color="#111a32"/></radialGradient><clipPath id="mirrorClip"><circle cx="90" cy="112" r="54"/></clipPath><linearGradient id="mirrorTile" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff"/><stop offset=".45" stop-color="#a8c4e8"/><stop offset="1" stop-color="#52617f"/></linearGradient></defs><path d="M90 0V49" stroke="#dceaff" stroke-width="3"/><path d="M82 47Q90 40 98 47L98 58Q90 64 82 58Z" fill="#a9b9d5" stroke="#f5fbff" stroke-width="2"/><circle cx="90" cy="112" r="58" fill="#18223a" stroke="#eaf7ff" stroke-width="3"/><circle cx="90" cy="112" r="54" fill="url(#mirrorSphere)"/><g clip-path="url(#mirrorClip)" stroke="#25324d" stroke-width="2"><path d="M36 72H144M36 91H144M36 110H144M36 129H144M36 148H144" fill="none"/><path d="M49 58L49 166M68 58L68 166M87 58L87 166M106 58L106 166M125 58L125 166" fill="none"/><path d="M36 72L49 58H68L87 72H106L125 58H144M36 110L49 91H68L87 110H106L125 91H144M36 148L49 129H68L87 148H106L125 129H144" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="3"/></g><circle cx="90" cy="112" r="54" fill="none" stroke="#f7fdff" stroke-width="2"/><path d="M57 77Q70 59 91 59" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".85"/><path d="M115 158Q135 145 141 125" fill="none" stroke="#b4eaff" stroke-width="5" stroke-linecap="round" opacity=".7"/></svg></div><div class="disco-floor"></div>
 <span class="disco-note dn1">♫</span><span class="disco-note dn2">♪</span><span class="disco-note dn3">✦</span>
 <div class="raccoon-dancer"><svg viewBox="0 0 420 540" role="img" aria-label="A 3D-style raccoon wearing disco sunglasses and dancing">
 <defs>
  <linearGradient id="racFur" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f1f0eb"/><stop offset=".28" stop-color="#aeb5c1"/><stop offset=".68" stop-color="#747d8e"/><stop offset="1" stop-color="#303849"/></linearGradient>
  <linearGradient id="racDark" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#343b4d"/><stop offset="1" stop-color="#101625"/></linearGradient>
  <linearGradient id="racCream" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#fff8e9"/><stop offset="1" stop-color="#b9b4ac"/></linearGradient>
  <linearGradient id="racLens" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#75f5ff"/><stop offset=".42" stop-color="#a77bff"/><stop offset="1" stop-color="#ff63cf"/></linearGradient>
 </defs>
 <g class="rac-tail">
  <path d="M151 365C124 350 94 347 70 359C39 375 31 411 49 440C67 469 105 473 132 452C151 437 155 414 142 397C131 382 111 379 96 390" fill="none" stroke="#20283a" stroke-width="68" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M151 365C124 350 94 347 70 359C39 375 31 411 49 440C67 469 105 473 132 452C151 437 155 414 142 397C131 382 111 379 96 390" fill="none" stroke="#aeb8c7" stroke-width="54" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M70 359C39 375 31 411 49 440M96 390C111 379 131 382 142 397" fill="none" stroke="#303849" stroke-width="18" stroke-linecap="round"/>
  <path d="M53 385Q68 375 84 372M45 422Q59 414 77 414M72 453Q91 443 108 443" fill="none" stroke="#252c3c" stroke-width="9" stroke-linecap="round"/>
  <path d="M118 355Q136 358 151 369" fill="none" stroke="#e8edf4" stroke-width="7" opacity=".55" stroke-linecap="round"/>
 </g>
 <g class="rac-left-leg"><animateTransform attributeName="transform" type="rotate" values="12 183 390;-22 183 390;12 183 390" dur=".48s" repeatCount="indefinite"/><path d="M174 366L164 454L183 478L205 467L202 384Z" fill="url(#racFur)" stroke="#303849" stroke-width="7"/><path d="M174 463Q145 468 145 490Q153 510 207 500L211 482L192 468Z" fill="url(#racDark)" stroke="#171d2b" stroke-width="5"/><path d="M155 486Q176 476 197 486" fill="none" stroke="#8eeeff" stroke-width="4"/></g>
 <g class="rac-right-leg"><animateTransform attributeName="transform" type="rotate" values="-17 239 390;20 239 390;-17 239 390" dur=".48s" repeatCount="indefinite"/><path d="M224 380L235 455L220 478L244 489L266 466L250 371Z" fill="url(#racFur)" stroke="#303849" stroke-width="7"/><path d="M223 472Q249 467 273 484Q287 503 267 511L218 504L210 489Z" fill="url(#racDark)" stroke="#171d2b" stroke-width="5"/><path d="M230 486Q251 479 272 495" fill="none" stroke="#ff8de5" stroke-width="4"/></g>
 <path d="M145 220Q210 191 275 220L288 389Q211 424 132 389Z" fill="url(#racFur)" stroke="#303849" stroke-width="9"/><path d="M163 248Q210 230 257 248L264 365Q211 395 157 365Z" fill="url(#racCream)" stroke="#747b89" stroke-width="4"/><path d="M174 268Q210 280 246 268" fill="none" stroke="#fff" stroke-width="7" opacity=".5"/>
 <g class="rac-left-arm">
  <path d="M151 247Q128 251 112 274" fill="none" stroke="#303849" stroke-width="43" stroke-linecap="round"/>
  <path d="M151 247Q128 251 112 274" fill="none" stroke="url(#racFur)" stroke-width="32" stroke-linecap="round"/>
  <g class="rac-left-forearm"><animateTransform attributeName="transform" type="rotate" values="-12 112 274;22 112 274;-12 112 274" dur=".62s" repeatCount="indefinite"/>
   <path d="M112 274L91 291" fill="none" stroke="#303849" stroke-width="39" stroke-linecap="round"/>
   <path d="M112 274L91 291" fill="none" stroke="url(#racFur)" stroke-width="29" stroke-linecap="round"/>
   <path d="M91 291Q70 275 54 289Q42 307 64 321L94 317L108 300Z" fill="url(#racCream)" stroke="#303849" stroke-width="6"/>
  </g><circle cx="112" cy="274" r="13" fill="#8993a4" stroke="#303849" stroke-width="4"/>
 </g>
 <g class="rac-right-arm">
  <path d="M269 247Q292 251 308 274" fill="none" stroke="#303849" stroke-width="43" stroke-linecap="round"/>
  <path d="M269 247Q292 251 308 274" fill="none" stroke="url(#racFur)" stroke-width="32" stroke-linecap="round"/>
  <g class="rac-right-forearm"><animateTransform attributeName="transform" type="rotate" values="12 308 274;-22 308 274;12 308 274" dur=".62s" repeatCount="indefinite"/>
   <path d="M308 274L329 291" fill="none" stroke="#303849" stroke-width="39" stroke-linecap="round"/>
   <path d="M308 274L329 291" fill="none" stroke="url(#racFur)" stroke-width="29" stroke-linecap="round"/>
   <path d="M329 291Q350 275 366 289Q378 307 356 321L326 317L312 300Z" fill="url(#racCream)" stroke="#303849" stroke-width="6"/>
  </g><circle cx="308" cy="274" r="13" fill="#8993a4" stroke="#303849" stroke-width="4"/>
 </g>
 <path d="M126 132L106 43Q102 22 123 34L184 86Q210 75 236 86L297 34Q318 22 314 43L294 132Z" fill="url(#racFur)" stroke="#303849" stroke-width="9"/><path d="M128 53L171 94L145 111Z" fill="#f19aa9"/><path d="M292 53L249 94L275 111Z" fill="#f19aa9"/>
 <ellipse cx="210" cy="158" rx="105" ry="94" fill="url(#racFur)" stroke="#303849" stroke-width="9"/>
 <path d="M108 143Q149 101 197 143L210 178Q177 216 128 187Z" fill="#202738"/><path d="M312 143Q271 101 223 143L210 178Q243 216 292 187Z" fill="#202738"/>
 <g class="rac-shades"><path d="M116 143Q153 123 191 146L188 180Q155 201 124 178Z" fill="url(#racLens)" stroke="#111827" stroke-width="9"/><path d="M304 143Q267 123 229 146L232 180Q265 201 296 178Z" fill="url(#racLens)" stroke="#111827" stroke-width="9"/><path d="M190 151Q210 140 230 151" fill="none" stroke="#111827" stroke-width="10"/><path d="M130 151L169 137M244 137L285 151" stroke="#fff" stroke-width="7" opacity=".72" stroke-linecap="round"/></g>
 <ellipse cx="210" cy="197" rx="48" ry="31" fill="url(#racCream)" stroke="#777b86" stroke-width="3"/><ellipse cx="210" cy="185" rx="14" ry="10" fill="#171b25"/><path d="M193 204Q210 222 227 204" fill="none" stroke="#4a3035" stroke-width="6" stroke-linecap="round"/>
 <path d="M151 231Q210 267 269 231" fill="none" stroke="#f4cb65" stroke-width="7"/><path d="M210 251L220 266L210 278L200 266Z" fill="#ffe18a" stroke="#b98229" stroke-width="3"/>
 </svg></div><div class="disco-title">DISCO RACCOON<small>THE DANCE FLOOR IS HIS NOW</small></div></div>`;
 document.body.appendChild(overlay);if(typeof opts.onSound==="function"){try{opts.onSound()}catch(_){}}
 const duration=Math.max(5000,Number(opts.duration)||7000);setTimeout(()=>{if(overlay.isConnected){overlay.style.transition="opacity .5s ease";overlay.style.opacity="0";setTimeout(()=>overlay.remove(),520)}},duration);return overlay;
}
function renderMagicSparkGift(gift,opts){
 const overlay=document.createElement("div");overlay.id="tiknation-gift-engine";overlay.dataset.style="spark";overlay.setAttribute("role","status");overlay.setAttribute("aria-live","polite");
 Object.assign(overlay.style,{position:"fixed",inset:"0",zIndex:"2147483647",display:"grid",placeItems:"center",overflow:"hidden",pointerEvents:"none",background:"radial-gradient(circle at 50% 48%,rgba(27,48,92,.94),rgba(5,10,30,.97) 68%,#02040c)"});
 const world=document.createElement("div");Object.assign(world.style,{position:"relative",width:"100vw",height:"100vh",display:"grid",placeItems:"center",isolation:"isolate"});
 const glow=document.createElement("div");Object.assign(glow.style,{position:"absolute",width:"min(58vw,330px)",height:"min(58vw,330px)",borderRadius:"50%",background:"radial-gradient(circle,#fff 0 3%,#fff4b8 8%,#6df5ff 22%,#a66bff 43%,transparent 72%)",filter:"drop-shadow(0 0 28px #5cecff) drop-shadow(0 0 65px #a66bff)"});
 const ring=document.createElement("div");Object.assign(ring.style,{position:"absolute",width:"min(34vw,190px)",height:"min(34vw,190px)",border:"4px solid #bafaff",borderRadius:"50%",boxShadow:"0 0 24px #62eaff,inset 0 0 20px #a66bff"});
 const ring2=document.createElement("div");Object.assign(ring2.style,{position:"absolute",width:"min(42vw,240px)",height:"min(42vw,240px)",border:"3px solid #ffe7a0",borderRadius:"50%",boxShadow:"0 0 22px #ffdb76"});
 const title=document.createElement("div");title.innerHTML="MAGIC SPARK";Object.assign(title.style,{position:"absolute",top:"72%",width:"100%",textAlign:"center",font:"900 clamp(24px,6vw,42px) system-ui",letterSpacing:".2em",color:"#fff",textShadow:"0 0 12px #65eaff,0 0 32px #b06cff"});
 const subtitle=document.createElement("div");subtitle.textContent="A SPARK OF POSSIBILITY";Object.assign(subtitle.style,{display:"block",marginTop:"12px",font:"700 11px system-ui",letterSpacing:".28em",color:"#d9faff"});
 title.appendChild(subtitle);world.append(glow,ring,ring2);
 for(let i=0;i<88;i++){const p=document.createElement("span");const angle=i*2.399,radius=75+(i%9)*31,size=4+(i%4)*2;Object.assign(p.style,{position:"absolute",left:"50%",top:"50%",width:size+"px",height:size+"px",borderRadius:"50%",background:["#fff0a6","#72f4ff","#c79bff","#ff91d8"][i%4],boxShadow:"0 0 10px currentColor,0 0 20px currentColor",color:["#fff0a6","#72f4ff","#c79bff","#ff91d8"][i%4]});world.appendChild(p);if(p.animate)p.animate([{transform:"translate(-50%,-50%) scale(.1)",opacity:0},{opacity:1,offset:.18},{transform:"translate(calc(-50% + "+Math.cos(angle)*radius+"px),calc(-50% + "+Math.sin(angle)*radius+"px)) scale(1.5)",opacity:0}],{duration:1800+(i%6)*180,delay:(i%12)*65,iterations:2,easing:"cubic-bezier(.12,.7,.2,1)"});}
 world.appendChild(title);overlay.appendChild(world);document.body.appendChild(overlay);
 if(glow.animate)glow.animate([{transform:"scale(.12) rotate(-25deg)",opacity:0,filter:"hue-rotate(0deg)"},{transform:"scale(1.12) rotate(15deg)",opacity:1,offset:.35,filter:"hue-rotate(180deg)"},{transform:"scale(.78) rotate(45deg)",opacity:.9,filter:"hue-rotate(360deg)"}],{duration:3600,iterations:1,easing:"ease-out"});
 if(ring.animate)ring.animate([{transform:"scale(.15)",opacity:0},{transform:"scale(3.7)",opacity:0}],{duration:2400,iterations:2,easing:"ease-out"});
 if(ring2.animate)ring2.animate([{transform:"scale(.1) rotate(0deg)",opacity:0},{transform:"scale(3.2) rotate(180deg)",opacity:0}],{duration:2800,delay:180,iterations:2,easing:"ease-out"});
 if(title.animate)title.animate([{opacity:0,transform:"translateY(24px) scale(.8)"},{opacity:1,transform:"translateY(0) scale(1)",offset:.25},{opacity:1,transform:"translateY(-8px) scale(1.03)"},{opacity:0,transform:"translateY(-28px) scale(1.08)"}],{duration:5000,easing:"ease-out"});
 if(typeof opts.onSound==="function"){try{opts.onSound()}catch(_){}}
 const duration=Math.max(5000,Number(opts.duration)||7000);setTimeout(()=>{if(overlay.isConnected){overlay.style.transition="opacity .6s ease";overlay.style.opacity="0";setTimeout(()=>overlay.remove(),620)}},duration);return overlay;
}

function renderStormWorld(gift,opts,overlay){
 const scene=document.createElement("div");scene.style.cssText="position:absolute;inset:0;overflow:hidden;background:linear-gradient(180deg,#080e1b,#27354a 48%,#080d17)";
 scene.innerHTML='<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 20% 18%,#68758a 0,transparent 35%),radial-gradient(ellipse at 78% 24%,#48566b 0,transparent 42%),radial-gradient(ellipse at 50% 42%,#344256 0,transparent 48%);filter:blur(12px);animation:ge-cloud 7s ease-in-out infinite alternate"></div><canvas style="position:absolute;inset:0;width:100%;height:100%"></canvas><div style="position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg,rgba(2,5,13,.12),transparent 45%,rgba(0,0,0,.62))"></div><div style="position:absolute;z-index:4;bottom:8%;left:0;right:0;text-align:center;color:#eaf4ff;font:900 clamp(22px,5vw,42px)/1.1 system-ui;letter-spacing:.13em;text-shadow:0 0 18px #9bcaff,0 3px 8px #000">STORM OF THE WORLD<div style="font-size:clamp(9px,1.8vw,13px);letter-spacing:.24em;margin-top:10px;color:#c4d8f1">THE SKY HAS AWAKENED</div></div>';
 overlay.appendChild(scene);document.body.appendChild(overlay);
 let alive=true,raf=0,resizeHandler=null;
 try{const canvas=scene.querySelector("canvas"),ctx=canvas&&canvas.getContext("2d");if(ctx){
 let w=0,h=0,dpr=1,last=performance.now(),nextFlash=0,flash=0,bolt=null,boltLife=0;const rand=(a,b)=>a+Math.random()*(b-a),rain=[];
 function resize(){dpr=Math.min(2,window.devicePixelRatio||1);w=window.innerWidth;h=window.innerHeight;canvas.width=Math.max(1,w*dpr);canvas.height=Math.max(1,h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);}resize();resizeHandler=resize;window.addEventListener("resize",resize);
 for(let i=0;i<420;i++)rain.push({x:rand(-w,w),y:rand(-h,h),len:rand(12,36),speed:rand(650,1150),alpha:rand(.08,.35),thick:rand(.5,1.4)});
 const bands=Array.from({length:8},(_,i)=>({y:.06+i*.075,x:rand(-.3,.3),scale:rand(.8,1.5),speed:rand(.002,.009),alpha:rand(.12,.3)}));
 function makeBolt(){const x=rand(w*.2,w*.8),y=rand(h*.08,h*.28),end=rand(w*.15,w*.85),points=[[x,y]];let px=x,py=y;while(py<h*.82){py+=rand(18,48);px+=(end-px)*.12+rand(-35,35);points.push([px,py]);}const branches=[];for(let n=0;n<5;n++){const at=Math.floor(rand(2,points.length-2)),p=points[at],dir=Math.random()<.5?-1:1;branches.push([[p[0],p[1]],[p[0]+dir*rand(20,60),p[1]+rand(18,40)],[p[0]+dir*rand(45,110),p[1]+rand(50,110)]]);}return{points,branches};}
 function drawBolt(b,alpha){ctx.save();ctx.globalCompositeOperation="lighter";ctx.lineCap="round";ctx.lineJoin="round";ctx.shadowColor="#a8d9ff";ctx.shadowBlur=30;ctx.strokeStyle="rgba(165,211,255,"+alpha*.7+")";ctx.lineWidth=12;ctx.beginPath();b.points.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.stroke();ctx.shadowBlur=8;ctx.strokeStyle="rgba(255,255,255,"+alpha+")";ctx.lineWidth=3.2;ctx.stroke();for(const branch of b.branches){ctx.beginPath();branch.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.stroke();}ctx.restore();}
 function frame(now){if(!alive||!overlay.isConnected)return;const dt=Math.min(45,now-last);last=now;const t=now*.001;ctx.clearRect(0,0,w,h);
 for(let layer=0;layer<bands.length;layer++){const c=bands[layer],y=c.y*h+Math.sin(t*.16+layer)*h*.012,x=(c.x+Math.sin(t*c.speed+layer)*.12)*w;for(let j=0;j<13;j++){const xx=x+(j-6)*w*.12,yy=y+Math.sin(j*.9+t*.12+layer)*h*.025,rx=w*(.075+((Math.sin(j*17+layer)*.5+.5)*.075))*c.scale,ry=h*(.055+(j%3)*.018),g=ctx.createRadialGradient(xx,yy,rx*.08,xx,yy,rx);g.addColorStop(0,"rgba(94,108,128,"+c.alpha+")");g.addColorStop(.48,"rgba(48,59,76,"+(c.alpha*.8)+")");g.addColorStop(1,"rgba(15,22,35,0)");ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(xx,yy,rx,ry,0,0,Math.PI*2);ctx.fill();}}
 if(now>nextFlash&&Math.random()<.035){bolt=makeBolt();boltLife=1;flash=rand(.55,1);nextFlash=now+rand(1700,3400);if(typeof opts.onLightning==="function"){try{opts.onLightning();}catch(error){console.warn("Lightning sound callback failed",error);}}}if(boltLife>0&&bolt){ctx.fillStyle="rgba(205,228,255,"+(flash*boltLife*.28)+")";ctx.fillRect(0,0,w,h);drawBolt(bolt,boltLife);boltLife-=dt/240;if(boltLife<=0)bolt=null;}
 ctx.save();ctx.strokeStyle="rgba(205,224,246,.5)";for(const p of rain){p.x-=p.speed*.19*dt/1000;p.y+=p.speed*dt/1000;if(p.y>h+30||p.x<-40){p.x=rand(0,w+250);p.y=rand(-h*.4,-20);}ctx.globalAlpha=p.alpha;ctx.lineWidth=p.thick;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x-8,p.y+p.len);ctx.stroke();}ctx.restore();raf=requestAnimationFrame(frame);}
 raf=requestAnimationFrame(frame);
 }}catch(error){console.warn("Storm animation fallback active:",error);}
 if(typeof opts.onSound==="function"){try{opts.onSound()}catch(error){console.warn("Storm sound unavailable",error);}}
 const duration=Math.max(6000,Number(opts.duration)||7800);setTimeout(()=>{alive=false;cancelAnimationFrame(raf);if(resizeHandler)window.removeEventListener("resize",resizeHandler);if(overlay.isConnected){overlay.style.transition="opacity .65s ease";overlay.style.opacity="0";setTimeout(()=>overlay.remove(),680);}},duration);return overlay;
}
function renderVoidRiftGift(gift,opts,overlay){
 const scene=document.createElement("div");
 scene.style.cssText="position:absolute;inset:0;overflow:hidden;background:#02030a;isolation:isolate";
 scene.innerHTML='<canvas style="position:absolute;inset:0;width:100%;height:100%"></canvas><div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 48%,transparent 5%,rgba(0,0,0,.28) 48%,#000 100%);pointer-events:none"></div><div style="position:absolute;z-index:5;left:0;right:0;bottom:9%;text-align:center;color:#f1eaff;font:1000 clamp(25px,6vw,48px)/1.1 system-ui;letter-spacing:.16em;text-shadow:0 0 22px #a98aff,0 3px 10px #000">THE VOID RIFT<div style="font-size:clamp(10px,2vw,14px);letter-spacing:.25em;margin-top:10px;color:#c7b6ff">REALITY HAS SPLIT OPEN</div></div>';
 overlay.appendChild(scene);document.body.appendChild(overlay);
 const canvas=scene.querySelector("canvas"),ctx=canvas.getContext("2d");
 let w=0,h=0,dpr=1,raf=0,alive=true,start=performance.now(),last=start,particles=[];
 const rand=(a,b)=>a+Math.random()*(b-a);
 function resize(){dpr=Math.min(2,window.devicePixelRatio||1);w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);}
 resize();window.addEventListener("resize",resize);
 for(let i=0;i<190;i++){const a=rand(0,Math.PI*2),r=rand(90,Math.max(w,h)*.7);particles.push({a,r,size:rand(.6,3.2),speed:rand(.3,1.3),tone:Math.random()});}
 function frame(now){
  if(!alive||!overlay.isConnected)return;
  const t=(now-start)/1000,dt=Math.min(.04,(now-last)/1000);last=now;
  ctx.clearRect(0,0,w,h);
  const cx=w*.5,cy=h*.46,open=Math.min(1,t/.95),collapse=Math.max(0,Math.min(1,(t-4.5)/1.05)),burst=Math.max(0,Math.min(1,(t-5.25)/.9));
  const pulse=1+Math.sin(t*2.1)*.025,rx=Math.min(w*.235,185)*pulse*(1-collapse*.72),ry=Math.min(h*.34,265)*pulse*(1-collapse*.72);
  const bg=ctx.createRadialGradient(cx,cy,0,cx,cy,Math.max(w,h)*.78);bg.addColorStop(0,"rgba(35,22,76,.38)");bg.addColorStop(.48,"rgba(8,9,24,.5)");bg.addColorStop(1,"#010207");ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
  // Dust and fractured debris spiral toward the tear, then fly outward with the release.
  for(const p of particles){
   p.a+=dt*(.38+p.speed*.38);p.r=Math.max(8,p.r-dt*(25+p.speed*48)*(1-collapse)+dt*burst*620);
   const x=cx+Math.cos(p.a)*p.r,y=cy+Math.sin(p.a)*p.r*.78;
   ctx.save();ctx.translate(x,y);ctx.rotate(p.a+t);ctx.fillStyle=p.tone>.72?"rgba(198,174,255,.9)":"rgba(116,151,210,.7)";ctx.shadowColor="#a78bff";ctx.shadowBlur=12;
   ctx.fillRect(-p.size*1.7,-p.size*.55,p.size*3.4,p.size*1.1);ctx.restore();
   if(p.r<10||p.r>Math.max(w,h)*.9){p.a=rand(0,Math.PI*2);p.r=rand(Math.max(w,h)*.42,Math.max(w,h)*.72);}
  }
  // Luminous fracture rim with jagged edges and a deep, lightless center.
  ctx.save();ctx.translate(cx,cy);ctx.rotate(Math.sin(t*.31)*.035);
  for(let layer=0;layer<4;layer++){
   ctx.beginPath();const count=150;
   for(let i=0;i<=count;i++){const a=i/count*Math.PI*2;const jag=1+Math.sin(a*17+t*1.4+layer)*.035+Math.sin(a*39-t*.8)*.018;const x=Math.cos(a)*rx*jag,y=Math.sin(a)*ry*jag;if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);}
   ctx.closePath();ctx.strokeStyle=["rgba(203,178,255,.92)","rgba(126,91,220,.72)","rgba(74,128,255,.36)","rgba(236,221,255,.22)"][layer];ctx.lineWidth=[2.2,8,19,34][layer];ctx.shadowColor="#a17bff";ctx.shadowBlur=[18,28,38,48][layer];ctx.stroke();
  }
  const hole=ctx.createRadialGradient(0,0,2,0,0,Math.max(rx,ry)*.78);hole.addColorStop(0,"#000");hole.addColorStop(.58,"#03020b");hole.addColorStop(.84,"rgba(8,5,22,.9)");hole.addColorStop(1,"rgba(8,5,22,0)");ctx.fillStyle=hole;ctx.beginPath();ctx.ellipse(0,0,rx*.99,ry*.99,0,0,Math.PI*2);ctx.fill();
  // Fine fracture filaments flicker around the perimeter.
  ctx.globalCompositeOperation="lighter";for(let i=0;i<22;i++){const a=i/22*Math.PI*2+Math.sin(t+i)*.025;const x=Math.cos(a)*rx*.92,y=Math.sin(a)*ry*.92;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+Math.cos(a+.45)*rand(12,38),y+Math.sin(a+.45)*rand(12,38));ctx.strokeStyle="rgba(185,157,255,.48)";ctx.lineWidth=1.2;ctx.stroke();}
  ctx.restore();
  // Collapse then a wide, fast shockwave.
  if(t>4.5){ctx.save();ctx.globalCompositeOperation="lighter";ctx.beginPath();ctx.ellipse(cx,cy,rx+burst*w*.72,ry+burst*h*.52,0,0,Math.PI*2);ctx.strokeStyle="rgba(198,179,255,"+(1-burst)*.85+")";ctx.lineWidth=12*(1-burst)+1;ctx.shadowColor="#a78bff";ctx.shadowBlur=34;ctx.stroke();ctx.restore();}
  if(t>5.2&&t<6.3){ctx.fillStyle="rgba(194,174,255,"+Math.max(0,.18*(1-burst))+")";ctx.fillRect(0,0,w,h);}
  raf=requestAnimationFrame(frame);
 }
 raf=requestAnimationFrame(frame);
 const duration=Math.max(6500,Number(opts.duration)||8200);
 setTimeout(()=>{alive=false;cancelAnimationFrame(raf);window.removeEventListener("resize",resize);if(overlay.isConnected){overlay.style.transition="opacity .7s ease";overlay.style.opacity="0";setTimeout(()=>overlay.remove(),730);}},duration);
 return overlay;
}




function renderCarnevilGift(gift,opts,overlay){
 const scene=document.createElement("div");scene.style.cssText="position:absolute;inset:0;overflow:hidden;background:#050307;isolation:isolate";
 scene.innerHTML='<div style="position:absolute;z-index:8;inset:0;pointer-events:none;background:linear-gradient(transparent 45%,rgba(0,0,0,.78)),radial-gradient(ellipse at 50% 48%,transparent 25%,rgba(0,0,0,.68) 100%)"></div><div style="position:absolute;z-index:9;bottom:4.5%;left:0;right:0;text-align:center;color:#ead9c8;font:1000 clamp(32px,7vw,56px)/.95 Georgia,serif;letter-spacing:.2em;text-shadow:0 3px 12px #000,0 0 22px #a52a35">CARNEVIL<div style="font:700 10px system-ui;letter-spacing:.34em;margin-top:10px;color:#c5a49b">THE MIDWAY NEVER CLOSES</div></div>';
 overlay.appendChild(scene);document.body.appendChild(overlay);if(typeof opts.onSound==="function"){try{opts.onSound();}catch(_){}}
 let alive=true,renderer=null,raf=0,resizeHandler=null;const duration=Math.max(22000,Number(opts.duration)||25000);
 const cleanup=()=>{alive=false;if(raf)cancelAnimationFrame(raf);if(resizeHandler)window.removeEventListener("resize",resizeHandler);if(renderer){renderer.dispose();if(renderer.domElement.parentNode)renderer.domElement.remove();}if(overlay.isConnected)overlay.remove();};
 const finish=()=>{if(!alive)return;overlay.style.transition="opacity .8s ease";overlay.style.opacity="0";setTimeout(cleanup,850);};const timer=setTimeout(finish,duration);
 function fail(msg){scene.insertAdjacentHTML("afterbegin",'<div style="position:absolute;z-index:7;inset:0;display:grid;place-items:center;color:#e8b7b7;font:700 12px system-ui;text-align:center;padding:24px">'+msg+'</div>');}
 function loadThree(done){if(window.THREE){done();return;}const existing=document.querySelector('script[data-tiknation-three="160"]');if(existing){existing.addEventListener("load",done,{once:true});existing.addEventListener("error",()=>fail("THE CARNIVAL ENGINE COULD NOT LOAD."),{once:true});return;}const script=document.createElement("script");script.src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js";script.async=true;script.dataset.tiknationThree="160";script.onload=done;script.onerror=()=>fail("THE CARNIVAL ENGINE COULD NOT LOAD.");document.head.appendChild(script);}
 loadThree(()=>{
  if(!alive||!overlay.isConnected)return;try{
   const T=window.THREE,world=new T.Scene();world.background=new T.Color(0x08070b);world.fog=new T.FogExp2(0x171016,.035);
   const camera=new T.PerspectiveCamera(43,1,.1,100);camera.position.set(0,7.4,18);camera.lookAt(0,3.1,0);
   const canvas=document.createElement("canvas");canvas.style.cssText="position:absolute;inset:0;width:100%;height:100%;display:block";scene.insertBefore(canvas,scene.firstChild);
   renderer=new T.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:"high-performance"});renderer.setPixelRatio(Math.min(devicePixelRatio||1,1.6));renderer.setSize(scene.clientWidth,scene.clientHeight,false);renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;
   const mat=(color,rough=.8,metal=0)=>new T.MeshStandardMaterial({color,roughness:rough,metalness:metal});
   const ground=new T.Mesh(new T.PlaneGeometry(100,100),mat(0x100d12));ground.rotation.x=-Math.PI/2;ground.position.y=-.08;world.add(ground);
   world.add(new T.HemisphereLight(0x9aa6c4,0x160a10,1.1));const moon=new T.DirectionalLight(0xb6c3d7,2.1);moon.position.set(-7,13,8);moon.castShadow=true;world.add(moon);
   const red=mat(0x791725),cream=mat(0xc4b49a),dark=mat(0x130b12),gold=mat(0xb58a53,.35,.65),steel=mat(0x46434a,.35,.8);
   // Weathered big-top: alternating canvas panels on a true conical roof.
   const tent=new T.Group();tent.position.set(-2.8,0,-2);world.add(tent);
   const base=new T.Mesh(new T.CylinderGeometry(4.35,4.65,3.15,12,1,true),red);base.position.y=1.58;base.castShadow=true;base.receiveShadow=true;tent.add(base);
   for(let i=0;i<12;i++){const a=i*Math.PI/6;const panel=new T.Mesh(new T.CylinderGeometry(4.37,4.68,3.13,1,1,true,0,Math.PI/6),i%2?cream:red);panel.rotation.y=a;panel.position.y=1.58;tent.add(panel);}
   const roof=new T.Mesh(new T.ConeGeometry(4.65,3.1,12,1,true),cream);roof.position.y=4.7;roof.castShadow=true;tent.add(roof);
   for(let i=0;i<12;i++){const a=i*Math.PI/6;const seam=new T.Mesh(new T.CylinderGeometry(.025,.025,3.1,5),gold);seam.position.set(Math.cos(a)*4.55,4.7+1.55,Math.sin(a)*4.55);tent.add(seam);}
   const peak=new T.Mesh(new T.SphereGeometry(.24,12,8),gold);peak.position.y=6.28;tent.add(peak);
   // Black entrance with heavy red velvet curtains and brass framing.
   const entrance=new T.Mesh(new T.BoxGeometry(2.15,2.55,.16),dark);entrance.position.set(-2.8,1.27,2.68);world.add(entrance);
   for(const x of [-3.78,-1.82]){const post=new T.Mesh(new T.CylinderGeometry(.07,.09,2.9,10),gold);post.position.set(x,1.42,2.8);world.add(post);}
   const lintel=new T.Mesh(new T.BoxGeometry(2.2,.14,.18),gold);lintel.position.set(-2.8,2.78,2.8);world.add(lintel);
   for(const x of [-3.48,-2.12]){const curtain=new T.Mesh(new T.BoxGeometry(.62,2.35,.12),red);curtain.position.set(x,1.2,2.9);curtain.rotation.z=x< -2.8?-.12:.12;world.add(curtain);}
    // Warm, eerie light spills through the curtains and fans outward from the tent.
    const doorwayGlow=new T.Mesh(new T.PlaneGeometry(1.82,2.28),new T.MeshBasicMaterial({color:0xff8a24,transparent:true,opacity:.92,side:T.DoubleSide,depthWrite:false,depthTest:false}));
    doorwayGlow.position.set(-2.8,1.28,3.035);doorwayGlow.renderOrder=20;world.add(doorwayGlow);
    const doorwayBeam=new T.Mesh(new T.ConeGeometry(2.65,7.2,32,1,true),new T.MeshBasicMaterial({color:0xffa13b,transparent:true,opacity:.32,side:T.DoubleSide,depthWrite:false,depthTest:false}));
    doorwayBeam.rotation.x=Math.PI/2;doorwayBeam.position.set(-2.8,1.32,6.25);doorwayBeam.renderOrder=19;world.add(doorwayBeam);
    const doorwayLight=new T.SpotLight(0xffb45e,155,17,.62,.82,1.2);
    doorwayLight.position.set(-2.8,1.55,2.48);doorwayLight.target.position.set(-2.8,.2,8.5);world.add(doorwayLight,doorwayLight.target);
    const doorwayHaze=new T.PointLight(0xff8b36,18,7,2);doorwayHaze.position.set(-2.8,1.3,3.1);world.add(doorwayHaze);
   // Ferris wheel with metal structure, cross braces and hanging gondolas.
   const wheel=new T.Group();wheel.position.set(5.1,4.2,-3.1);world.add(wheel);
   for(const z of [-.12,.12]){const rim=new T.Mesh(new T.TorusGeometry(2.85,.09,10,72),steel);rim.position.z=z;wheel.add(rim);}
   for(let i=0;i<16;i++){const a=i*Math.PI/8;const spoke=new T.Mesh(new T.CylinderGeometry(.035,.035,5.7,6),steel);spoke.position.set(Math.cos(a)*1.42,Math.sin(a)*1.42,0);spoke.rotation.z=a-Math.PI/2;wheel.add(spoke);
    const gondola=new T.Group();const cabin=new T.Mesh(new T.BoxGeometry(.55,.48,.45),i%2?red:dark);cabin.position.y=-.28;gondola.add(cabin);const roofCap=new T.Mesh(new T.BoxGeometry(.64,.08,.5),gold);roofCap.position.y=-.02;gondola.add(roofCap);gondola.position.set(Math.cos(a)*2.85,Math.sin(a)*2.85,0);wheel.add(gondola);}
   for(const x of [-1.1,1.1]){const leg=new T.Mesh(new T.CylinderGeometry(.09,.15,4.3,8),steel);leg.position.set(x,-2.1,0);leg.rotation.z=x<0?-.27:.27;wheel.add(leg);}
   // Hanging strings of warm carnival bulbs.
   const bulbs2=[];for(let strand=0;strand<3;strand++){const cable=new T.Mesh(new T.TorusGeometry(7.1,.018,4,64,Math.PI),steel);cable.rotation.z=Math.PI; cable.position.set(0,8.2-strand*.65,-2);world.add(cable);for(let i=0;i<18;i++){const a=Math.PI+i*Math.PI/17;const b=new T.Mesh(new T.SphereGeometry(.07,8,6),mat(0xffc47b,.25));b.position.set(Math.cos(a)*7.1,8.2-strand*.65-Math.sin(a)*.9,-2);world.add(b);bulbs2.push(b);}}
   // Clown apparition hidden inside the big-top doorway; it slowly emerges.
   const clown=new T.Group();clown.position.set(-2.8,.4,2.2);world.add(clown);const face=new T.Mesh(new T.SphereGeometry(.48,24,18),mat(0xd8c9b4,.85));face.scale.set(.78,1.15,.48);face.position.y=1.45;clown.add(face);
   const hood=new T.Mesh(new T.ConeGeometry(.72,.85,8),red);hood.position.y=2.25;clown.add(hood);
   for(const x of [-.18,.18]){const eye=new T.Mesh(new T.SphereGeometry(.065,10,8),mat(0x090609));eye.position.set(x,1.54,.39);clown.add(eye);const cheek=new T.Mesh(new T.SphereGeometry(.11,12,8),red);cheek.position.set(x*1.9,1.24,.34);clown.add(cheek);}
   const nose=new T.Mesh(new T.SphereGeometry(.12,12,8),red);nose.position.set(0,1.36,.43);clown.add(nose);
   const mouth=new T.Mesh(new T.TorusGeometry(.17,.025,6,24,Math.PI),dark);mouth.position.set(0,1.12,.42);mouth.rotation.z=Math.PI;clown.add(mouth);clown.scale.setScalar(.001);
   // Drifting ground fog and intermittent searchlights.
   const fogMat=new T.MeshBasicMaterial({color:0xb8aab4,transparent:true,opacity:.075,depthWrite:false});const fogs=[];for(let i=0;i<16;i++){const f=new T.Mesh(new T.CircleGeometry(1,24),fogMat.clone());f.rotation.x=-Math.PI/2;f.scale.set(1.5+Math.random()*2,.5+Math.random(),1);f.position.set(-10+Math.random()*20,.035+i*.001,-1+Math.random()*8);world.add(f);fogs.push(f);}
   const beams=[];for(const x of [-8,7]){const light=new T.SpotLight(0xb9c8e8,95,28,Math.PI/8,.55,1.4);light.position.set(x,8,-4);light.target.position.set(x*.4,0,0);world.add(light,light.target);beams.push(light);}
   resizeHandler=()=>{if(!alive)return;const width=Math.max(1,scene.clientWidth),height=Math.max(1,scene.clientHeight);renderer.setSize(width,height,false);camera.aspect=width/height;camera.fov=width/height<.8?49:43;camera.position.set(width/height<.8?0:0,width/height<.8?8.5:7.4,width/height<.8?22:18);camera.lookAt(0,3.1,0);camera.updateProjectionMatrix();};resizeHandler();window.addEventListener("resize",resizeHandler);
   const clock=new T.Clock();let elapsed=0;function animate(){if(!alive||!overlay.isConnected)return;raf=requestAnimationFrame(animate);const dt=Math.min(.05,clock.getDelta());elapsed+=dt;wheel.rotation.z=-elapsed*.17;clown.scale.setScalar(Math.max(.001,Math.min(1,(elapsed-5)/2)));clown.position.y=.4+Math.sin(elapsed*1.2)*.035;bulbs.forEach((b,i)=>{const flicker=Math.sin(elapsed*(3.2+i%4)+i*2);const v=(i%4===0&&flicker>.94)?1.4:((i%3===0&&flicker<-.7)?0:.08);b.material.emissive=new T.Color(0xffa04b);b.material.emissiveIntensity=v*1.8;});bulbs2.forEach((b,i)=>{const v=.3+.7*Math.max(0,Math.sin(elapsed*3.2+i*.7));b.material.emissive=new T.Color(0xffb36b);b.material.emissiveIntensity=v*1.3;});fogs.forEach((f,i)=>{f.position.x+=dt*(.18+i%4*.07);if(f.position.x>12)f.position.x=-12;f.material.opacity=.04+.035*Math.sin(elapsed+i);});doorwayGlow.material.opacity=.72+.2*(.5+.5*Math.sin(elapsed*2.1));doorwayBeam.material.opacity=.24+.12*(.5+.5*Math.sin(elapsed*1.65));doorwayLight.intensity=180+70*(.5+.5*Math.sin(elapsed*2.1));doorwayHaze.intensity=22+10*(.5+.5*Math.sin(elapsed*2.1));beams.forEach((b,i)=>{b.target.position.x=Math.sin(elapsed*.6+i*2)*5;b.target.position.z=Math.cos(elapsed*.45+i)*3;});renderer.render(world,camera);}
   animate();
  }catch(err){fail("THE CARNIVAL COULD NOT BE RENDERED. PLEASE REOPEN THE PREVIEW.");}
 });
 return overlay;
}

function renderHauntedHearseGift(gift,opts,overlay){
 const scene=document.createElement("div");
 scene.style.cssText="position:absolute;inset:0;overflow:hidden;background:#05080b;isolation:isolate";
 scene.innerHTML='<div class="hearse-loading" style="position:absolute;inset:0;display:grid;place-items:center;color:#d6e0dc;font:700 13px system-ui;letter-spacing:.18em">PREPARING THE FINAL RIDE…</div><div style="position:absolute;z-index:8;inset:0;pointer-events:none;background:linear-gradient(transparent 48%,rgba(0,0,0,.62) 78%,#020405),radial-gradient(ellipse at 50% 52%,transparent 25%,rgba(0,0,0,.55) 100%)"></div><div style="position:absolute;z-index:9;bottom:5.5%;left:0;right:0;text-align:center;color:#e2e7e0;font:1000 clamp(23px,5.2vw,44px)/1 Georgia,serif;letter-spacing:.13em;text-shadow:0 2px 12px #000,0 0 22px #789b8b">THE HAUNTED HEARSE<div style="font:700 10px system-ui;letter-spacing:.3em;margin-top:10px;color:#b5c4ba">SOME PASSENGERS NEVER ARRIVE</div></div>';
 overlay.appendChild(scene);document.body.appendChild(overlay);
 if(typeof opts.onSound==="function"){try{opts.onSound();}catch(_){}}
 let alive=true,renderer=null,raf=0,resizeHandler=null,doorL=null,doorR=null,car=null,ghost=null;
 const duration=Math.max(29000,Number(opts.duration)||30000);
 const cleanup=()=>{alive=false;if(raf)cancelAnimationFrame(raf);if(resizeHandler)window.removeEventListener("resize",resizeHandler);if(renderer){renderer.dispose();if(renderer.domElement.parentNode)renderer.domElement.remove();}if(overlay.isConnected)overlay.remove();};
 const finish=()=>{if(!alive)return;overlay.style.transition="opacity .8s ease";overlay.style.opacity="0";setTimeout(cleanup,850);};
 const timer=setTimeout(finish,duration);
 function fail(message){const loading=scene.querySelector(".hearse-loading");if(loading){loading.textContent=message;loading.style.color="#ffb7b7";loading.style.letterSpacing=".04em";loading.style.padding="24px";loading.style.textAlign="center";} }
 function loadThree(done){
  if(window.THREE){done();return;}
  const existing=document.querySelector('script[data-tiknation-three="160"]');
  if(existing){existing.addEventListener("load",done,{once:true});existing.addEventListener("error",()=>fail("THE 3D ENGINE COULD NOT LOAD. CHECK YOUR CONNECTION."),{once:true});return;}
  const script=document.createElement("script");script.src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js";script.async=true;script.dataset.tiknationThree="160";
  script.onload=done;script.onerror=()=>fail("THE 3D ENGINE COULD NOT LOAD. CHECK YOUR CONNECTION.");document.head.appendChild(script);
 }
 loadThree(()=>{
  if(!alive||!overlay.isConnected)return;
  try{
   const THREE=window.THREE;
   const canvas=document.createElement("canvas");canvas.style.cssText="position:absolute;inset:0;width:100%;height:100%;display:block";
   scene.insertBefore(canvas,scene.firstChild);
   renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:false,powerPreference:"high-performance"});
   renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.7));renderer.setSize(scene.clientWidth,scene.clientHeight,false);
   renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
   renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;
   const world=new THREE.Scene();world.background=new THREE.Color(0x080e12);world.fog=new THREE.FogExp2(0x101a1c,.035);
   const camera=new THREE.PerspectiveCamera(34,scene.clientWidth/scene.clientHeight,.1,120);camera.position.set(12.2,6.2,14.2);camera.lookAt(0,1.1,0);
   const hemi=new THREE.HemisphereLight(0xc9d9d0,0x111713,2.0);world.add(hemi);
   const moon=new THREE.DirectionalLight(0xd9e7e0,3.2);moon.position.set(-4,9,5);moon.castShadow=true;moon.shadow.mapSize.set(1024,1024);moon.shadow.camera.left=-10;moon.shadow.camera.right=10;moon.shadow.camera.top=10;moon.shadow.camera.bottom=-10;world.add(moon);
   const rim=new THREE.PointLight(0x88b99e,42,15);rim.position.set(-4,3,-3);world.add(rim);
   const headGlow=new THREE.PointLight(0xe6f3dc,18,8);headGlow.position.set(4,1.7,0);world.add(headGlow);
   const mat=(color,metalness,roughness)=>new THREE.MeshStandardMaterial({color,metalness:metalness||0,roughness:roughness===undefined ? .55 : roughness});
   const paint=mat(0x293b35,.78,.28),paintLight=mat(0x66766b,.72,.3),burgundy=mat(0x3a2027,.62,.31),chrome=mat(0xc4d0c9,.88,.2),rubber=mat(0x090c0d,.08,.82),glass= new THREE.MeshPhysicalMaterial({color:0x29453e,metalness:.45,roughness:.12,transparent:true,opacity:.82,clearcoat:1}),interior=mat(0x080e0d,.2,.65),lamp= new THREE.MeshStandardMaterial({color:0xfff0c2,emissive:0xd7bb78,emissiveIntensity:1.7});
   const ground=new THREE.Mesh(new THREE.PlaneGeometry(100,100),mat(0x11191a,.12,.92));ground.rotation.x=-Math.PI/2;ground.position.y=-.03;ground.receiveShadow=true;world.add(ground);
   const road=new THREE.Mesh(new THREE.PlaneGeometry(90,8),mat(0x202728,.32,.24));road.rotation.x=-Math.PI/2;road.position.set(0,.002,0);road.receiveShadow=true;world.add(road);
   for(let i=-8;i<=8;i++){const line=new THREE.Mesh(new THREE.BoxGeometry(1.25,.008,.045),mat(0x69736d,.05,.8));line.position.set(i*5,.012,0);world.add(line);}
   const car=new THREE.Group();world.add(car);
   const carShadow=new THREE.Mesh(new THREE.CircleGeometry(1,48),new THREE.MeshBasicMaterial({color:0x020505,transparent:true,opacity:.62,depthWrite:false}));
   carShadow.rotation.x=-Math.PI/2;carShadow.scale.set(3.55,1.08,1);carShadow.position.set(0,.018,0);world.add(carShadow);
   function box(parent,w,h,d,material,x,y,z,bevel){const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),material);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
   function cylinder(parent,r1,r2,depth,material,x,y,z,rx,ry,rz){const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r1,r2,depth,32),material);mesh.position.set(x,y,z);mesh.rotation.set(rx||0,ry||0,rz||0);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;}
   function rod(parent,a,b,r,material){const p1=new THREE.Vector3(a[0],a[1],a[2]),p2=new THREE.Vector3(b[0],b[1],b[2]),delta=new THREE.Vector3().subVectors(p2,p1);const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,delta.length(),10),material);mesh.position.copy(p1).add(p2).multiplyScalar(.5);mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());mesh.castShadow=true;parent.add(mesh);return mesh;}
   // Long coach-built chassis, broad hood and a separate raised rear funeral compartment.
   box(car,6.15,.38,1.94,interior,0,.79,0);
   box(car,6.35,.16,2.04,chrome,0,.93,0);
   box(car,6.18,.63,1.98,paint,0,1.22,0);
   box(car,1.85,.56,2.02,paintLight,2.08,1.54,0);
   box(car,1.72,.13,2.04,chrome,2.12,1.84,0);
   // Passenger cabin with a sloped front screen and distinct front doors.
   box(car,2.0,1.02,1.83,paintLight,.28,2.02,0);
   box(car,1.88,.12,1.9,chrome,.28,2.58,0);
   box(car,.08,.77,1.72,glass,1.29,2.08,0);
   box(car,.08,.78,1.72,glass,-.72,2.08,0);
   // Hearse-specific high roof and coffin compartment: taller than the passenger cabin.
   box(car,2.35,1.34,1.9,burgundy,-1.75,2.18,0);
   box(car,2.5,.15,2.04,chrome,-1.73,2.88,0);
   box(car,2.34,.12,1.96,paintLight,-1.75,2.79,0);
   // Deep side glass panels, curtain folds and polished landau bars on both sides.
   for(const side of [-1,1]){
    const z=side* .972;
    box(car,1.72,.82,.025,glass,-1.78,2.28,z);
    box(car,.12,.9,.045,chrome,-2.66,2.28,z);
    box(car,.12,.9,.045,chrome,-.9,2.28,z);
    for(let k=0;k<5;k++){const curtain=box(car,.035,.64,.03,mat(0x101d19,.1,.9),-2.42+k*.29,2.28,z+side*.025);curtain.position.x=-2.42+k*.29;}
    rod(car,[-2.58,2.84,z+side*.055],[-.96,2.84,z+side*.055],.025,chrome);
    rod(car,[-2.55,1.78,z+side*.055],[-.99,1.78,z+side*.055],.022,chrome);
    box(car,.9,.72,.035,glass,.27,2.13,z);
    box(car,.055,.82,.06,chrome,-.22,2.12,z+side*.03);
    box(car,.055,.82,.06,chrome,.76,2.12,z+side*.03);
    box(car,.035,.78,.04,chrome,.27,2.12,z+side*.035);
    box(car,.05,.08,.09,chrome,-.02,1.92,z+side*.055);
    // Landau bars on the rear quarter and a fine bright coach line.
    rod(car,[-2.56,1.73,z+side*.06],[-2.48,2.76,z+side*.06],.022,chrome);
    rod(car,[-1.0,1.73,z+side*.06],[-1.08,2.76,z+side*.06],.022,chrome);
    rod(car,[-2.9,1.02,z+side*.045],[2.92,1.02,z+side*.045],.018,chrome);
   }
   // Rear compartment interior and a visible coffin silhouette behind the tall glass.
   box(car,.82,.2,1.05,interior,-1.82,1.83,0);
   box(car,1.08,.2,.48,mat(0x4b4d42,.35,.55),-1.88,1.98,0);
   // Rear double doors mounted at the back end; their hinges swing outward.
   const rear=new THREE.Group();rear.position.set(-3.12,1.78,0);car.add(rear);
   doorL=new THREE.Group();doorL.position.z=-.96;rear.add(doorL);
   box(doorL,.09,1.55,.96,paint,-.02,.2,.48);
   box(doorL,.035,.82,.68,glass,-.075,.25,.48);
   doorR=new THREE.Group();doorR.position.z=.96;rear.add(doorR);
   box(doorR,.09,1.55,.96,paint,-.02,.2,-.48);
   box(doorR,.035,.82,.68,glass,-.075,.25,-.48);
   // Rear sill, bumper and front fascia.
   box(car,.16,.17,2.12,chrome,-3.18,.93,0);
   box(car,.13,.15,2.13,chrome,3.13,1.0,0);
   box(car,.08,.68,1.0,interior,3.13,1.43,0);
   for(let i=0;i<13;i++)box(car,.025,.55,.035,chrome,3.18,1.43,-.44+i*.073);
   for(const z of [-.72,.72]){cylinder(car,.18,.18,.1,lamp,3.22,1.57,z,0,0,Math.PI/2);const beam=new THREE.SpotLight(0xe8f2d8,18,12,.32,.5,1.4);beam.position.set(3.35,1.62,z);beam.target.position.set(8,.15,z*1.8);car.add(beam,beam.target);}
   // Long hood ridges and separate chrome grille surround.
   for(const z of [-.55,-.28,0,.28,.55])rod(car,[[1.35,1.84,z],[2.8,1.84,z]][0],[ [1.35,1.84,z],[2.8,1.84,z]][1],.012,chrome);
   // Wheels with thick tires, stepped alloy rims, hubs and ten visible spokes.
   const wheels=[];
   for(const x of [-2.08,2.12])for(const z of [-1.02,1.02]){
    const wheel=new THREE.Group();wheel.position.set(x,.55,z);car.add(wheel);wheels.push(wheel);
    cylinder(wheel,.55,.55,.32,rubber,0,0,0,Math.PI/2,0,0);
    cylinder(wheel,.37,.37,.34,mat(0x77827b,.86,.26),0,0,z>0?.19:-.19,Math.PI/2,0,0);
    cylinder(wheel,.25,.25,.36,chrome,0,0,z>0?.22:-.22,Math.PI/2,0,0);
    cylinder(wheel,.105,.105,.38,mat(0x3d4842,.9,.2),0,0,z>0?.24:-.24,Math.PI/2,0,0);
    // High-contrast, full-length spokes and an asymmetric marker make rotation unmistakable.
    for(let k=0;k<8;k++){const a=k*Math.PI/4;rod(wheel,[Math.cos(a)*.09,Math.sin(a)*.09,z>0?.255:-.255],[Math.cos(a)*.34,Math.sin(a)*.34,z>0?.255:-.255],.052,k%2?chrome:mat(0xffbd54,.45,.28));}
    const ring=new THREE.Mesh(new THREE.TorusGeometry(.36,.035,10,40),chrome);ring.position.z=z>0?.23:-.23;wheel.add(ring);
    const valve=new THREE.Mesh(new THREE.SphereGeometry(.09,16,12),new THREE.MeshStandardMaterial({color:0xff3c24,emissive:0xff2100,emissiveIntensity:3.5,roughness:.2}));
    valve.position.set(.30,0,z>0?.31:-.31);wheel.add(valve);
    for(let k=0;k<5;k++){const a=k*Math.PI*2/5;const lug=new THREE.Mesh(new THREE.SphereGeometry(.045,10,8),new THREE.MeshStandardMaterial({color:0xffd58a,metalness:.55,roughness:.25}));lug.position.set(Math.cos(a)*.17,Math.sin(a)*.17,z>0?.30:-.30);wheel.add(lug);}
   }
   // Mirrors, handles, coach badges and small bright details.
   for(const side of [-1,1]){
    const z=side*1.04;rod(car,[[1.08,2.23,z],[1.18,2.48,z+side*.14]][0],[[1.08,2.23,z],[1.18,2.48,z+side*.14]][1],.025,chrome);
    box(car,.22,.08,.08,chrome,-.15,1.96,z);
    box(car,.1,.06,.07,chrome,.92,1.96,z);
   }
   // Tall rear coach window at the back, framed like a funeral coach rather than a limo.
   box(car,.035,.98,1.28,glass,-2.96,2.25,0);
   box(car,.06,1.08,.055,chrome,-2.99,2.25,-.68);
   box(car,.06,1.08,.055,chrome,-2.99,2.25,.68);
   box(car,.06,.055,1.38,chrome,-2.99,2.79,0);
   // Cemetery approach: crooked bare trees, iron fence, distant lamps and ground mist.
   const bark=mat(0x111817,.05,.95);
   for(let i=0;i<13;i++){const x=-12+i*2;const trunk=box(world,.16,2.5,.16,bark,x,1.1,-5.8-(i%3)*.5);trunk.rotation.z=(i%2?-.12:.12);rod(world,[x,1.9,-5.8],[x+(i%2?-.7:.7),2.8,-5.8],.055,bark);}
   for(let i=0;i<22;i++){const x=-10+i*.95;box(world,.055,.85,.055,chrome,x,.43,-3.8);const spike=new THREE.Mesh(new THREE.ConeGeometry(.075,.18,6),chrome);spike.position.set(x,.94,-3.8);world.add(spike);}
   box(world,21,.09,.09,chrome,0,.7,-3.8);
   // A few volumetric-looking fog banks stay low on the wet road.
   // Distant storm flashes and a falling rain field.
   const lightning=new THREE.DirectionalLight(0xdcecff,0);lightning.position.set(-5,10,-8);world.add(lightning);
   const rainCount=520,rainGeometry=new THREE.BufferGeometry(),rainPositions=new Float32Array(rainCount*3),rainSpeeds=new Float32Array(rainCount);
   for(let i=0;i<rainCount;i++){rainPositions[i*3]=-12+Math.random()*24;rainPositions[i*3+1]=Math.random()*11;rainPositions[i*3+2]=-10+Math.random()*20;rainSpeeds[i]=7+Math.random()*7;}
   rainGeometry.setAttribute("position",new THREE.BufferAttribute(rainPositions,3));
   const rain=new THREE.Points(rainGeometry,new THREE.PointsMaterial({color:0xbacbd4,size:.035,transparent:true,opacity:.58,depthWrite:false}));world.add(rain);
   const stormFlash=new THREE.PointLight(0xc9dcff,0,45);stormFlash.position.set(-7,7,-12);world.add(stormFlash);
   const fogMat=new THREE.MeshBasicMaterial({color:0x9aafa6,transparent:true,opacity:.055,depthWrite:false});
   const fogs=[];for(let i=0;i<34;i++){const fog=new THREE.Mesh(new THREE.SphereGeometry(1,16,10),fogMat);fog.scale.set(1.5+Math.random()*2.8,.16+Math.random()*.08,.7+Math.random()*1.1);fog.position.set(-10+Math.random()*20,.16+Math.random()*.35,-4+Math.random()*8);world.add(fog);fogs.push(fog);}
   const fogSheets=[];for(let i=0;i<7;i++){const layer=new THREE.Mesh(new THREE.PlaneGeometry(9,2.5),new THREE.MeshBasicMaterial({color:0x9aaea5,transparent:true,opacity:.055,depthWrite:false,side:THREE.DoubleSide}));layer.rotation.x=-Math.PI/2;layer.position.set(-7+i*2.3,.22+(i%3)*.08,-1.5+(i%2)*2);world.add(layer);fogSheets.push(layer);}
   // Weathered grave markers and iron lanterns beside the road.
   const stone=mat(0x39413d,.08,.92),stoneEdge=mat(0x68716b,.22,.72),lanternGlass=new THREE.MeshStandardMaterial({color:0xffdca1,emissive:0xff9c43,emissiveIntensity:1.8});
   const graveGroups=[];
   for(let i=0;i<12;i++){const side=i%2===0?-1:1,x=-9+Math.floor(i/2)*3.1,z=side*(4.4+(i%3)*.65);const grave=new THREE.Group();grave.position.set(x,0,z);world.add(grave);const base=box(grave,.72,.18,.28,stone,0,.12,0);const head=new THREE.Mesh(new THREE.BoxGeometry(.58,.9,.18),stone);head.position.set(0,.63,0);head.castShadow=true;head.rotation.z=(i%2?-.06:.06);grave.add(head);const cap=new THREE.Mesh(new THREE.SphereGeometry(.29,12,8,0,Math.PI*2,0,Math.PI/2),stoneEdge);cap.scale.set(1,.72,.55);cap.position.set(0,1.08,0);grave.add(cap);graveGroups.push(grave);}
   const lanterns=[];for(let i=0;i<5;i++){const side=i%2===0?-1:1,x=-7+i*3.3,z=side*3.5;const post=box(world,.09,1.5,.09,chrome,x,.75,z);const cage=box(world,.28,.34,.28,interior,x,1.58,z);box(world,.18,.22,.18,lanternGlass,x,1.58,z);const light=new THREE.PointLight(0xffad63,3.5,5);light.position.set(x,1.65,z);world.add(light);lanterns.push(light);}
   ghost=new THREE.Group();ghost.position.set(-2.75,1.5,0);car.add(ghost);
   const ghostMat=new THREE.MeshStandardMaterial({color:0xc8ded0,transparent:true,opacity:0,roughness:1,emissive:0x294738,emissiveIntensity:.5});
   const ghostBody=new THREE.Mesh(new THREE.ConeGeometry(.34,1.2,10),ghostMat);ghostBody.position.y=.3;ghost.add(ghostBody);
   const ghostHead=new THREE.Mesh(new THREE.SphereGeometry(.22,16,12),ghostMat);ghostHead.position.y=1.03;ghost.add(ghostHead);
   const loading=scene.querySelector(".hearse-loading");if(loading)loading.remove();
   resizeHandler=()=>{if(!alive)return;const width=Math.max(1,scene.clientWidth),height=Math.max(1,scene.clientHeight),aspect=width/height;renderer.setSize(width,height,false);camera.aspect=aspect;if(aspect<.82){camera.fov=43;camera.position.set(12.8,7.0,15.2);}else{camera.fov=39;camera.position.set(11.8,6.0,14.0);}camera.lookAt(0,1.1,0);camera.updateProjectionMatrix();};resizeHandler();window.addEventListener("resize",resizeHandler);
   const clock=new THREE.Clock();let elapsed=0,previousCarX=car.position.x,wheelSpin=0;
   function animate(){if(!alive||!overlay.isConnected)return;raf=requestAnimationFrame(animate);const dt=Math.min(.05,clock.getDelta());elapsed+=dt;
    const drive=Math.min(1,Math.max(0,(elapsed-.8)/18.5));const engineEnded=window.__tiknationHearseEngineEnded===true;const eased=drive*drive*(3-2*drive);if(!engineEnded)car.position.x=-4.4+eased*7.2;car.position.y=0;
    car.rotation.y=Math.sin(elapsed*.8)*.006;
    const travelled=car.position.x-previousCarX;const rolling=!engineEnded&&drive>0&&drive<1?Math.abs(travelled)/.55:0;wheelSpin-=rolling;wheels.forEach(w=>{w.rotation.set(0,0,wheelSpin);});previousCarX=car.position.x;
    // Keep the camera planted so the hearse visibly travels through the cemetery instead of being locked in the center of frame.
    camera.position.x=11.8;camera.position.y=6.0;camera.position.z=14.0;camera.lookAt(0,1.05,0);carShadow.position.x=car.position.x;
    const open=Math.max(0,Math.min(1,(elapsed-21.0)/2.0));if(doorL)doorL.rotation.y=-open*.95;if(doorR)doorR.rotation.y=open*.95;
    if(ghost){ghost.visible=elapsed>25.0;ghost.children.forEach(m=>{m.material.opacity=ghost.visible ? .48+.12*Math.sin(elapsed*2) : 0;});ghost.position.y=1.45+Math.sin(elapsed*1.25)*.08;}
    const stormCycle=elapsed%8.5;const flash=stormCycle>0.0&&stormCycle<.18?Math.sin(stormCycle/.18*Math.PI):stormCycle>0.34&&stormCycle<.48?Math.sin((stormCycle-.34)/.14*Math.PI)*.62:0;lightning.intensity=flash*3.8;stormFlash.intensity=flash*20;
    const rainAttr=rainGeometry.attributes.position;for(let i=0;i<rainCount;i++){const j=i*3;rainPositions[j+1]-=rainSpeeds[i]*dt;rainPositions[j]-=dt*1.1;if(rainPositions[j+1]<0){rainPositions[j+1]=8+Math.random()*4;rainPositions[j]=-12+Math.random()*24;rainPositions[j+2]=-10+Math.random()*20;}}rainAttr.needsUpdate=true;
    fogs.forEach((f,i)=>{f.position.x+=dt*(.13+(i%5)*.055);if(f.position.x>12)f.position.x=-12;f.material.opacity=.045+.035*Math.sin(elapsed*1.1+i);});
    fogSheets.forEach((f,i)=>{f.position.x+=dt*(i%2?.16:-.12);if(f.position.x>12)f.position.x=-12;if(f.position.x< -12)f.position.x=12;f.material.opacity=.035+.025*Math.sin(elapsed*.9+i);});
    lanterns.forEach((light,i)=>{light.intensity=2.1+Math.max(0,Math.sin(elapsed*3.4+i*2.1))*2.2;});
    graveGroups.forEach((grave,i)=>{grave.rotation.y=Math.sin(elapsed*.35+i)*.018;});
    rim.intensity=36+Math.sin(elapsed*1.8)*7;renderer.render(world,camera);
   }
   animate();
  }catch(error){fail("3D HEARSE ERROR: "+(error&&error.message?error.message:"RENDER FAILED"));}
 });
 return overlay;
}
function renderLivingTombstonesGift(gift,opts,overlay){
 const scene=document.createElement("div");
 scene.style.cssText="position:absolute;inset:0;overflow:hidden;background:#05080b;isolation:isolate";
 scene.innerHTML='<canvas style="position:absolute;inset:0;width:100%;height:100%"></canvas><div style="position:absolute;inset:0;background:linear-gradient(transparent 38%,rgba(0,0,0,.82)),radial-gradient(ellipse,transparent 24%,#000 100%);pointer-events:none"></div><div style="position:absolute;z-index:5;bottom:7%;left:0;right:0;text-align:center;color:#d7ded4;font:1000 clamp(22px,5.8vw,44px)/1.1 Georgia,serif;letter-spacing:.1em;text-shadow:0 2px 8px #000,0 0 18px #8aa08c">THE NIGHT OF THE LIVING TOMBSTONES<div style="font:700 10px system-ui;letter-spacing:.28em;margin-top:9px;color:#a6b6a7">THE DEAD WILL NOT STAY BURIED</div></div>';
 overlay.appendChild(scene);document.body.appendChild(overlay);
 const canvas=scene.querySelector("canvas"),ctx=canvas.getContext("2d");
 let w=0,h=0,dpr=1,raf=0,alive=true,start=performance.now(),last=start;
 const rand=(a,b)=>a+Math.random()*(b-a),stones=[],mist=[];
 function resize(){dpr=Math.min(2,devicePixelRatio||1);w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);}
 resize();window.addEventListener("resize",resize);
 for(let i=0;i<16;i++){const depth=i/15,scale=.42+depth*.9;stones.push({x:rand(.025,.975)*w,baseY:h*(.53+depth*.32),s:scale,phase:rand(0,Math.PI*2),delay:1.1+rand(0,2.1),shape:i%5,crack:rand(0,1),rock:rand(.026,.052),tone:rand(0,1)});}
 for(let i=0;i<38;i++)mist.push({x:rand(0,w),y:rand(h*.5,h),r:rand(28,105),speed:rand(6,19),a:rand(.025,.075)});
 function grave(st,t){
  const ww=st.shape===0?43:st.shape===1?38:st.shape===2?35:st.shape===3?46:40;
  const hh=st.shape===0?91:st.shape===1?105:st.shape===2?78:st.shape===3?88:96;
  const wake=Math.max(0,Math.min(1,(t-st.delay)/.9));
  const rock=Math.sin(Math.max(0,t-st.delay)*3.2+st.phase)*st.rock*wake;
  ctx.save();
  // The pivot is fixed at the foot of the stone: rotation only, never screen-space travel.
  ctx.translate(st.x,st.baseY);ctx.rotate(rock);ctx.scale(st.s,st.s);
  ctx.globalAlpha=.72;
  ctx.fillStyle="#020504";ctx.beginPath();ctx.ellipse(0,2,ww*.72,8,0,0,Math.PI*2);ctx.fill();
  ctx.globalAlpha=1;
  ctx.beginPath();
  if(st.shape===0){ctx.moveTo(-ww/2,0);ctx.lineTo(-ww/2,-hh+19);ctx.quadraticCurveTo(-ww/2,-hh+2,-ww*.18,-hh);ctx.quadraticCurveTo(ww*.2,-hh-3,ww/2,-hh+18);ctx.lineTo(ww/2,0);}
  else if(st.shape===1){ctx.moveTo(-ww/2,0);ctx.lineTo(-ww/2,-hh+12);ctx.quadraticCurveTo(-ww*.4,-hh-4,0,-hh+2);ctx.quadraticCurveTo(ww*.42,-hh-2,ww/2,-hh+13);ctx.lineTo(ww/2,0);}
  else if(st.shape===2){ctx.moveTo(-ww/2,0);ctx.lineTo(-ww/2,-hh);ctx.lineTo(ww/2,-hh);ctx.lineTo(ww/2,0);}
  else if(st.shape===3){ctx.moveTo(-ww/2,0);ctx.lineTo(-ww/2,-hh+8);ctx.lineTo(-ww*.25,-hh);ctx.lineTo(ww*.25,-hh);ctx.lineTo(ww/2,-hh+8);ctx.lineTo(ww/2,0);}
  else{ctx.moveTo(-ww/2,0);ctx.lineTo(-ww/2,-hh+16);ctx.quadraticCurveTo(-ww/2,-hh+4,0,-hh+5);ctx.quadraticCurveTo(ww/2,-hh+4,ww/2,-hh+16);ctx.lineTo(ww/2,0);}
  ctx.closePath();
  const stone=ctx.createLinearGradient(-ww/2,-hh,ww/2,0);
  stone.addColorStop(0,st.tone>.5?"#252b29":"#1a211f");stone.addColorStop(.28,"#555c55");stone.addColorStop(.55,"#343b36");stone.addColorStop(1,"#111714");
  ctx.fillStyle=stone;ctx.fill();
  ctx.strokeStyle="rgba(157,165,151,.48)";ctx.lineWidth=1.1;ctx.stroke();
  // chipped edge and darker bevel
  ctx.strokeStyle="rgba(5,9,7,.82)";ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-ww/2+3,-5);ctx.lineTo(-ww/2+3,-hh+20);ctx.lineTo(-ww*.2,-hh+5);ctx.stroke();
  ctx.strokeStyle="rgba(190,192,174,.17)";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(ww/2-3,-8);ctx.lineTo(ww/2-3,-hh+20);ctx.stroke();
  // weathering, lichen and age streaks
  for(let k=0;k<7;k++){const px=-ww*.4+((k*37+st.shape*11)%70)/70*ww*.8,py=-hh*.82+((k*19+st.shape*7)%60)/60*hh*.66;ctx.fillStyle=k%2?"rgba(113,129,98,.16)":"rgba(3,8,6,.2)";ctx.beginPath();ctx.ellipse(px,py,2+(k%3),5+(k%4)*2,-.3,0,Math.PI*2);ctx.fill();}
  ctx.strokeStyle="rgba(8,13,10,.9)";ctx.lineWidth=1.35;ctx.beginPath();ctx.moveTo(-ww*.1,-hh*.91);ctx.lineTo(-ww*.02,-hh*.72);ctx.lineTo(-ww*.16,-hh*.59);ctx.lineTo(-ww*.09,-hh*.43);ctx.stroke();
  // worn inscription panel and subtle carved lettering
  ctx.fillStyle="rgba(5,10,8,.28)";ctx.fillRect(-ww*.31,-hh*.69,ww*.62,hh*.27);
  ctx.strokeStyle="rgba(177,184,165,.19)";ctx.lineWidth=.8;ctx.strokeRect(-ww*.31,-hh*.69,ww*.62,hh*.27);
  ctx.fillStyle="rgba(194,197,177,.45)";ctx.textAlign="center";ctx.font="bold 8px Georgia";ctx.fillText(st.shape%2?"REST IN PEACE":"R.I.P.",0,-hh*.56);
  ctx.fillStyle="rgba(6,10,8,.55)";ctx.fillRect(-ww*.23,-hh*.48,ww*.46,1);
  ctx.restore();
 }
 function tree(x,y,s){ctx.save();ctx.translate(x,y);ctx.scale(s,s);ctx.strokeStyle="#101713";ctx.lineCap="round";ctx.lineWidth=13;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(5,-220);ctx.lineTo(-24,-280);ctx.moveTo(3,-170);ctx.lineTo(65,-225);ctx.lineTo(82,-273);ctx.moveTo(0,-130);ctx.lineTo(-74,-181);ctx.lineTo(-94,-224);ctx.moveTo(8,-205);ctx.lineTo(52,-250);ctx.stroke();ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(-24,-280);ctx.lineTo(-54,-306);ctx.moveTo(82,-273);ctx.lineTo(111,-296);ctx.moveTo(-94,-224);ctx.lineTo(-124,-237);ctx.stroke();ctx.restore();}
 function frame(now){
  if(!alive||!overlay.isConnected)return;
  const t=(now-start)/1000,dt=Math.min(.04,(now-last)/1000);last=now;ctx.clearRect(0,0,w,h);
  const sky=ctx.createLinearGradient(0,0,0,h);sky.addColorStop(0,"#070c13");sky.addColorStop(.5,"#172029");sky.addColorStop(1,"#080d0b");ctx.fillStyle=sky;ctx.fillRect(0,0,w,h);
  const moon=ctx.createRadialGradient(w*.78,h*.19,2,w*.78,h*.19,h*.18);moon.addColorStop(0,"rgba(218,228,214,.48)");moon.addColorStop(.25,"rgba(154,174,161,.13)");moon.addColorStop(1,"transparent");ctx.fillStyle=moon;ctx.fillRect(0,0,w,h);
  tree(w*.08,h*.78,Math.max(.55,w/1000));tree(w*.92,h*.77,Math.max(.6,w/950));
  ctx.fillStyle="#0b100e";ctx.beginPath();ctx.moveTo(0,h*.65);ctx.quadraticCurveTo(w*.5,h*.54,w,h*.66);ctx.lineTo(w,h);ctx.lineTo(0,h);ctx.fill();
  // distant graves first, then larger foreground stones; all keep their base coordinates.
  stones.slice().sort((a,b)=>a.baseY-b.baseY).forEach(st=>grave(st,t));
  mist.forEach(m=>{m.x-=m.speed*dt;if(m.x<-m.r)m.x=w+m.r;const fog=ctx.createRadialGradient(m.x,m.y,0,m.x,m.y,m.r);fog.addColorStop(0,"rgba(181,196,185,"+m.a+")");fog.addColorStop(1,"transparent");ctx.fillStyle=fog;ctx.fillRect(m.x-m.r,m.y-m.r,m.r*2,m.r*2);});
  if(t>4.5&&t<5.1){ctx.fillStyle="rgba(174,195,177,"+(Math.sin(t*38)*.025)+")";ctx.fillRect(0,0,w,h);}
  raf=requestAnimationFrame(frame);
 }
 raf=requestAnimationFrame(frame);
 const duration=Math.max(7000,Number(opts.duration)||7800);
 setTimeout(()=>{alive=false;cancelAnimationFrame(raf);window.removeEventListener("resize",resize);if(overlay.isConnected){overlay.style.transition="opacity .55s ease";overlay.style.opacity="0";setTimeout(()=>overlay.remove(),580);}},duration);
 return overlay;
}




function renderPhantomTrainGift(gift,opts,overlay){
 const scene=document.createElement("div");scene.className="phantom-rail-scene";
 scene.innerHTML='<div class="pt-moon"></div><div class="pt-pines"></div><div class="pt-ground"></div><div class="pt-track"></div><div class="pt-train-wrap"><svg class="pt-train" viewBox="0 0 1100 470" role="img" aria-label="A single connected haunted steam locomotive with chassis, axles, wheels and passenger carriage"><defs><linearGradient id="pt-metal" x1="0" y1="0" x2=".2" y2="1"><stop stop-color="#d1dadd"/><stop offset=".18" stop-color="#617681"/><stop offset=".48" stop-color="#263d4b"/><stop offset="1" stop-color="#080f17"/></linearGradient><linearGradient id="pt-brass" x2="1" y2="1"><stop stop-color="#fff0b2"/><stop offset=".45" stop-color="#ad7c3d"/><stop offset="1" stop-color="#38251b"/></linearGradient><linearGradient id="pt-red" x2="0" y2="1"><stop stop-color="#a83f3b"/><stop offset="1" stop-color="#210d16"/></linearGradient><radialGradient id="pt-lamp"><stop stop-color="#fff"/><stop offset=".3" stop-color="#ffe8a5"/><stop offset="1" stop-color="#ff9b38" stop-opacity="0"/></radialGradient><linearGradient id="pt-window" x2="0" y2="1"><stop stop-color="#fff4bd"/><stop offset="1" stop-color="#a9572e"/></linearGradient><filter id="pt-glow"><feGaussianBlur stdDeviation="10"/></filter></defs><ellipse cx="550" cy="410" rx="470" ry="28" fill="#000" opacity=".8"/><g class="pt-smoke" fill="#d9e6e9" opacity=".42"><path d="M360 75C290 25 350-15 400 10C390-40 465-48 490 0C550 0 560 60 500 82C550 120 480 145 435 115C390 145 340 115 360 75Z"/><path class="pt-smoke-puff puff-two" d="M375 30C345 2 372-28 403-16C410-55 458-53 466-18C504-12 505 29 470 40C444 61 400 55 375 30Z"/><path class="pt-smoke-puff puff-three" d="M390 5C370-18 394-42 418-33C429-67 466-57 473-30C505-23 500 10 476 19C445 36 411 27 390 5Z"/></g><g class="pt-coach"><path d="M760 180H1060V326H760Z" fill="url(#pt-metal)" stroke="#b7c6ca" stroke-width="8"/><path d="M750 164H1070V188H750Z" fill="url(#pt-brass)" stroke="#e9d9b0" stroke-width="4"/><path d="M785 202H1035V280H785Z" fill="#09131b" stroke="#81939b" stroke-width="5"/><g fill="url(#pt-window)" stroke="#d9b777" stroke-width="7"><path d="M800 212H860V272H800Z"/><path d="M885 212H945V272H885Z"/><path d="M970 212H1030V272H970Z"/></g><path d="M770 296H1050V324H770Z" fill="url(#pt-red)" stroke="#c39a5d" stroke-width="4"/><g class="pt-wheel-set" transform="translate(830 354)"><g class="pt-wheel-rotor"><circle r="34" fill="#070c12" stroke="#c0cbd0" stroke-width="9"/><circle r="23" fill="#344b57" stroke="url(#pt-brass)" stroke-width="5"/><path d="M0-22V22M-22 0H22M-16-16L16 16M16-16L-16 16" stroke="#d3dce0" stroke-width="5"/></g></g><g class="pt-wheel-set" transform="translate(1000 354)"><g class="pt-wheel-rotor"><circle r="34" fill="#070c12" stroke="#c0cbd0" stroke-width="9"/><circle r="23" fill="#344b57" stroke="url(#pt-brass)" stroke-width="5"/><path d="M0-22V22M-22 0H22M-16-16L16 16M16-16L-16 16" stroke="#d3dce0" stroke-width="5"/></g></g><path d="M745 330H1070V348H745Z" fill="#101820" stroke="url(#pt-brass)" stroke-width="5"/></g><g class="pt-loco"><!-- one continuous locomotive frame: body, boiler, cab and running gear share this assembly --><path d="M55 300H740V386H55Z" fill="#080f17" stroke="#b7c6cc" stroke-width="10"/><path d="M68 314H726V353H68Z" fill="url(#pt-red)" stroke="#bd9258" stroke-width="6"/><path d="M80 352H710V379H80Z" fill="#1b2932" stroke="#c6d1d4" stroke-width="6"/><path d="M145 142Q175 112 230 112H585Q655 112 690 184L720 306H125Z" fill="url(#pt-metal)" stroke="#c6d1d4" stroke-width="10"/><ellipse cx="164" cy="232" rx="78" ry="108" fill="#0c1822" stroke="url(#pt-brass)" stroke-width="12"/><ellipse cx="164" cy="232" rx="57" ry="86" fill="url(#pt-metal)" stroke="#82959f" stroke-width="8"/><ellipse cx="160" cy="232" rx="36" ry="62" fill="#07111a" stroke="#536c78" stroke-width="7"/><path d="M245 130H580V156H245Z" fill="url(#pt-brass)"/><path d="M310 112V80H440V112Z" fill="#172733" stroke="#aab9bf" stroke-width="7"/><path d="M328 81V42H423V81Z" fill="url(#pt-metal)" stroke="#c4ced1" stroke-width="7"/><path d="M312 43H456L438 24H332Z" fill="url(#pt-brass)" stroke="#eee0b9" stroke-width="5"/><path d="M365 24V-2H407V24Z" fill="#15232d" stroke="#b8c5c9" stroke-width="6"/><path d="M350-2H423L411-18H363Z" fill="url(#pt-brass)"/><path d="M485 124V62H665V124Z" fill="#142431" stroke="#aab9c0" stroke-width="8"/><path d="M505 73H562V116H505Z M584 73H646V116H584Z" fill="url(#pt-window)" stroke="#e0c58d" stroke-width="5"/><path d="M95 286L35 374H151L168 293Z" fill="#172630" stroke="#b5c2c8" stroke-width="8"/><path d="M35 374H154L132 394H58Z" fill="url(#pt-brass)" stroke="#e6d5aa" stroke-width="5"/><g class="pt-lamp"><circle cx="105" cy="220" r="78" fill="url(#pt-lamp)" filter="url(#pt-glow)"/><circle cx="105" cy="220" r="28" fill="#ffe9aa" stroke="#fff6d7" stroke-width="8"/></g><g class="pt-wheel-set" transform="translate(245 358)"><g class="pt-wheel-rotor"><circle r="62" fill="#070c12" stroke="#d2dcdf" stroke-width="13"/><circle r="44" fill="#344b58" stroke="url(#pt-brass)" stroke-width="9"/><circle r="11" fill="#d9e1e3"/><path d="M0-42V42M-42 0H42M-30-30L30 30M30-30L-30 30" stroke="#d9e1e3" stroke-width="7"/><circle cx="32" cy="0" r="9" fill="#f2d18a" stroke="#15232d" stroke-width="4"/></g></g><g class="pt-wheel-set" transform="translate(455 358)"><g class="pt-wheel-rotor"><circle r="62" fill="#070c12" stroke="#d2dcdf" stroke-width="13"/><circle r="44" fill="#344b58" stroke="url(#pt-brass)" stroke-width="9"/><circle r="11" fill="#d9e1e3"/><path d="M0-42V42M-42 0H42M-30-30L30 30M30-30L-30 30" stroke="#d9e1e3" stroke-width="7"/><circle cx="32" cy="0" r="9" fill="#f2d18a" stroke="#15232d" stroke-width="4"/></g></g><g class="pt-wheel-set" transform="translate(665 358)"><g class="pt-wheel-rotor"><circle r="48" fill="#070c12" stroke="#c5d0d4" stroke-width="11"/><circle r="32" fill="#344b58" stroke="url(#pt-brass)" stroke-width="7"/><circle r="9" fill="#d9e1e3"/><path d="M0-30V30M-30 0H30M-21-21L21 21M21-21L-21 21" stroke="#d9e1e3" stroke-width="6"/><circle cx="25" cy="0" r="8" fill="#f2d18a" stroke="#15232d" stroke-width="3"/></g></g><path d="M180 285H710" stroke="#090f15" stroke-width="27" stroke-linecap="square"/><path d="M180 281H710" stroke="url(#pt-brass)" stroke-width="9"/><g fill="url(#pt-metal)" stroke="#d1dadd" stroke-width="5"><path d="M218 267H272V299H218Z"/><path d="M428 267H482V299H428Z"/><path d="M640 267H690V299H640Z"/></g><path d="M210 315H690" stroke="#dce5e7" stroke-width="8" opacity=".55"/><path d="M195 145H610" stroke="#f2e4c3" stroke-width="4" opacity=".35"/><g class="pt-linkage"><path id="pt-rod-a-shadow" d="M245 358L455 358" fill="none" stroke="#08121a" stroke-width="17" stroke-linecap="round"/><path id="pt-rod-a" d="M245 358L455 358" fill="none" stroke="#d7e0e2" stroke-width="9" stroke-linecap="round"/><path id="pt-rod-b-shadow" d="M455 358L665 358" fill="none" stroke="#08121a" stroke-width="15" stroke-linecap="round"/><path id="pt-rod-b" d="M455 358L665 358" fill="none" stroke="#b8c9ce" stroke-width="8" stroke-linecap="round"/><circle id="pt-pin-a" cx="245" cy="358" r="10" fill="#f2d18a" stroke="#172733" stroke-width="4"/><circle id="pt-pin-b" cx="455" cy="358" r="10" fill="#f2d18a" stroke="#172733" stroke-width="4"/><circle id="pt-pin-c" cx="665" cy="358" r="8" fill="#f2d18a" stroke="#172733" stroke-width="3"/></g></g></svg></div><div class="pt-title">THE PHANTOM TRAIN<small>THE LAST DEPARTURE · MIDNIGHT</small></div><div class="pt-fog"></div>';
 const rodA=scene.querySelector("#pt-rod-a"),rodAShadow=scene.querySelector("#pt-rod-a-shadow"),rodB=scene.querySelector("#pt-rod-b"),rodBShadow=scene.querySelector("#pt-rod-b-shadow");
 const pinA=scene.querySelector("#pt-pin-a"),pinB=scene.querySelector("#pt-pin-b"),pinC=scene.querySelector("#pt-pin-c");
 const wheelStart=performance.now();let wheelFrame=0;
 const animateRunningGear=now=>{if(!overlay.isConnected)return;const angle=((now-wheelStart)/340)*Math.PI*2;const point=(x,r)=>({x:x+Math.cos(angle)*r,y:358+Math.sin(angle)*r});const a=point(245,32),b=point(455,32),c=point(665,25);const set=(node,p,q)=>{if(node)node.setAttribute("d",`M${p.x.toFixed(2)} ${p.y.toFixed(2)}L${q.x.toFixed(2)} ${q.y.toFixed(2)}`)};set(rodA,a,b);set(rodAShadow,a,b);set(rodB,b,c);set(rodBShadow,b,c);[[pinA,a],[pinB,b],[pinC,c]].forEach(([node,p])=>{if(node){node.setAttribute("cx",p.x);node.setAttribute("cy",p.y)}});wheelFrame=requestAnimationFrame(animateRunningGear);};
 requestAnimationFrame(animateRunningGear);
 const css=document.createElement("style");css.textContent='#tiknation-gift-engine.phantom-rail-scene{position:fixed;inset:0;z-index:2147483647;overflow:hidden;pointer-events:none;background:radial-gradient(ellipse at 52% 38%,#30475b,#111c2b 48%,#02060c 100%);isolation:isolate}.phantom-rail-scene .pt-moon{position:absolute;right:13%;top:7%;width:clamp(100px,20vw,220px);aspect-ratio:1;border-radius:50%;background:radial-gradient(circle at 40% 35%,#fffbe0,#c5d9e0 50%,#647d8d 72%,transparent 73%);box-shadow:0 0 65px #c9e6ff66}.phantom-rail-scene .pt-pines{position:absolute;bottom:23%;left:0;right:0;height:38%;background:repeating-linear-gradient(82deg,transparent 0 7vw,#07131e 7.2vw 8vw,transparent 8.2vw 12vw);clip-path:polygon(0 100%,0 62%,7% 8%,13% 70%,21% 5%,27% 72%,35% 10%,42% 70%,50% 4%,58% 72%,66% 8%,73% 68%,82% 3%,89% 73%,96% 12%,100% 65%,100% 100%);opacity:.85}.phantom-rail-scene .pt-ground{position:absolute;bottom:0;height:31%;width:100%;background:linear-gradient(#1a2934,#070d13 65%,#020407)}.phantom-rail-scene .pt-track{position:absolute;bottom:13%;left:-10%;width:120%;height:12px;background:repeating-linear-gradient(90deg,transparent 0 7%,#25343c 7.2% 8.2%,transparent 8.4% 15%),linear-gradient(#c3d0d2,#33434d 45%,#080d12);transform:perspective(280px) rotateX(16deg);box-shadow:0 0 22px #b6d5e155}.phantom-rail-scene .pt-train-wrap{position:absolute;left:50%;bottom:18%;width:min(76vw,780px);transform:translateX(-50%);transform-origin:50% 85%;animation:pt-forward 6.4s linear infinite;will-change:transform}.phantom-rail-scene .pt-train{width:100%;height:auto;display:block;overflow:visible;transform:scaleX(-1);filter:drop-shadow(0 25px 24px #000c)}.phantom-rail-scene .pt-loco,.phantom-rail-scene .pt-coach{transform-box:fill-box;transform-origin:center;animation:none!important}.phantom-rail-scene .pt-linkage path{filter:drop-shadow(0 2px 2px #000)}.phantom-rail-scene .pt-wheel-rotor{transform-box:fill-box;transform-origin:center;animation:pt-spin .34s linear infinite}.phantom-rail-scene .pt-wheel-set{transform-box:view-box}.phantom-rail-scene .pt-smoke{transform-origin:70% 100%;animation:pt-smoke 2.3s ease-out infinite}.phantom-rail-scene .pt-smoke-puff{opacity:0;transform-box:fill-box;transform-origin:center;animation:pt-smoke-puff 2.8s ease-out infinite}.phantom-rail-scene .pt-smoke-puff.puff-two{animation-delay:.85s}.phantom-rail-scene .pt-smoke-puff.puff-three{animation-delay:1.65s}.phantom-rail-scene .pt-lamp{animation:pt-beam 2s ease-in-out infinite}.phantom-rail-scene .pt-fog{position:absolute;left:-20%;bottom:12%;width:140%;height:20%;border-radius:50%;background:#d0e1e4;filter:blur(35px);opacity:.14;animation:pt-fog 8s linear infinite}.phantom-rail-scene .pt-title{position:absolute;bottom:3%;left:0;right:0;text-align:center;color:#e8eeee;font:900 clamp(20px,4vw,34px) Georgia,serif;letter-spacing:.18em;text-shadow:0 3px 12px #000,0 0 25px #b7d9e8}.phantom-rail-scene .pt-title small{display:block;margin-top:8px;font:700 9px system-ui;letter-spacing:.34em;color:#b7cbd3}@keyframes pt-forward{0%{opacity:0;transform:translate(calc(-50% - 78vw),0) scale(.72)}8%{opacity:1}72%{opacity:1;transform:translate(calc(-50% + 20vw),4vh) scale(.9)}91%{opacity:0;transform:translate(calc(-50% + 78vw),5vh) scale(.86)}100%{opacity:0;transform:translate(calc(-50% + 78vw),5vh) scale(.86)}}@keyframes pt-spin{to{transform:rotate(360deg)}}@keyframes pt-rumble{from{translate:0 -1px}to{translate:0 2px}}@keyframes pt-smoke{0%{opacity:.08;transform:translateY(8px) scale(.65)}55%{opacity:.58}100%{opacity:0;transform:translateY(-45px) scale(1.3)}}@keyframes pt-smoke-puff{0%{opacity:0;transform:translate(0,10px) scale(.55)}18%{opacity:.42}100%{opacity:0;transform:translate(18px,-78px) scale(1.45)}}@keyframes pt-beam{0%,100%{filter:drop-shadow(0 0 10px #ffbf64)}50%{filter:drop-shadow(0 0 32px #ffb34d)}}@keyframes pt-fog{from{transform:translateX(-12vw)}to{transform:translateX(12vw)}}@media(max-width:600px){.phantom-rail-scene .pt-train-wrap{width:90vw;bottom:20%}}@media(prefers-reduced-motion:reduce){.phantom-rail-scene *{animation:none!important}}';
 document.head.appendChild(css);overlay.appendChild(scene);document.body.appendChild(overlay);
 if(typeof opts.onSound==="function"){try{opts.onSound()}catch(_){}}
 const duration=Math.max(9000,Number(opts.duration)||11000);
 setTimeout(()=>{if(overlay.isConnected){overlay.style.transition="opacity .8s ease";overlay.style.opacity="0";setTimeout(()=>{overlay.remove();css.remove()},850)}},duration);
 return overlay;
}

function renderGift(gift,opts){if(!gift||!document.body)return null;opts=opts||{};install();const old=document.getElementById("tiknation-gift-engine");if(old)old.remove();const overlay=document.createElement("div");overlay.id="tiknation-gift-engine";overlay.dataset.style=String(gift.style||"spark").replace(/[^a-z0-9_-]/gi,"");overlay.setAttribute("role","status");overlay.setAttribute("aria-live","polite");if(gift.style==="spark"){return renderMagicSparkGift(gift,opts);}if(gift.style==="notes"){return renderMusicSheetGift(gift,opts);}if(gift.style==="grand"){return renderSymphonyGift(gift,opts);}if(gift.style==="raccoon"){return renderDiscoRaccoonGift(gift,opts);}if(gift.style==="storm")return renderStormWorld(gift,opts,overlay);if(gift.style==="voidrift")return renderVoidRiftGift(gift,opts,overlay);if(gift.style==="livingtombstones")return renderLivingTombstonesGift(gift,opts,overlay);if(gift.style==="hauntedhearse")return renderHauntedHearseGift(gift,opts,overlay);if(gift.style==="carnevil")return renderCarnevilGift(gift,opts,overlay);if(gift.style==="phantomtrain")return renderPhantomTrainGift(gift,opts,overlay);if(false&&(gift.style==="notes"||gift.style==="grand")){const world=document.createElement("div");world.className="music-stage";const hero=document.createElement("div");hero.className="music-hero";hero.textContent=gift.emoji||(gift.style==="grand"?"🎻":"🎵");const symbols=gift.style==="grand"?["🎼","🎻","🎺","🎶","♫","♪"]:["♪","♫","♬","🎶","♫","♪"];symbols.forEach((symbol,i)=>{const note=document.createElement("span");note.className="music-note";note.textContent=symbol;note.style.setProperty("--sx",(i%2?72:12)+"%");note.style.setProperty("--sy",(18+(i%3)*22)+"%");note.style.setProperty("--dx",(i%2?-1:1)*(90+i*24)+"px");note.style.setProperty("--dur",(3.2+(i%3)*.45)+"s");note.style.setProperty("--delay",(i*.24)+"s");note.style.setProperty("--note-color",i%2?"#ffe6a6":"#ffc8ee");world.appendChild(note);});const title=document.createElement("div");title.className="music-title";title.textContent=gift.name||"MUSIC IN MOTION";const sub=document.createElement("small");sub.textContent=gift.style==="grand"?"THE GRAND PERFORMANCE":"LET THE MUSIC PLAY";title.appendChild(sub);world.append(hero,title);overlay.appendChild(world);document.body.appendChild(overlay);if(typeof opts.onSound==="function"){try{opts.onSound()}catch(_){}}const musicDuration=Math.max(4800,Number(opts.duration)||6500);setTimeout(()=>{if(overlay.isConnected){overlay.style.transition="opacity .5s ease";overlay.style.opacity="0";setTimeout(()=>overlay.remove(),520)}},musicDuration);return overlay;}

/* Cinematic object renderer: custom shaded vector artwork replaces emoji-only gift posters. */
function renderCinematicGift(gift,opts,overlay){
 const style=gift.style||"spark";
 const art={
 heartbeat:'<g class="heartbeat-drum"><path d="M-108-70Q-126-48-126 0Q-126 54-108 75L-87 91Q-99 48-99 0Q-99-48-87-91Z" fill="#4a101d" stroke="#b68c78" stroke-width="5"/><path d="M86-91Q112-72 120-39L120 40Q112 74 86 91L99 62L99-62Z" fill="#5d1422" stroke="#b68c78" stroke-width="5"/><circle r="119" fill="#220d17" stroke="#b7a18c" stroke-width="12"/><circle r="108" fill="#6c1a2a" stroke="#e1c9a7" stroke-width="7"/><circle r="99" fill="url(#drumhead)" stroke="#59483d" stroke-width="3"/><circle r="91" fill="none" stroke="#b9a895" stroke-width="1.5" opacity=".65"/><path d="M-75-65Q-30-103 24-91" fill="none" stroke="#fff" stroke-width="5" opacity=".22" stroke-linecap="round"/><g fill="#c7b9a3" stroke="#4b3a35" stroke-width="2"><rect x="-7" y="-133" width="14" height="25" rx="4"/><rect x="-7" y="108" width="14" height="25" rx="4"/><rect x="-133" y="-7" width="25" height="14" rx="4"/><rect x="108" y="-7" width="25" height="14" rx="4"/><rect x="83" y="-105" width="15" height="24" rx="4" transform="rotate(38 90 -93)"/><rect x="-98" y="-105" width="15" height="24" rx="4" transform="rotate(-38 -90 -93)"/><rect x="83" y="81" width="15" height="24" rx="4" transform="rotate(-38 90 93)"/><rect x="-98" y="81" width="15" height="24" rx="4" transform="rotate(38 -90 93)"/></g><path d="M-78 27H-48L-35 12L-23 47L-7-8L9 30H30L42 20L53 27H78" fill="none" stroke="#bd263e" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" opacity=".65"/><g class="heartbeat-organ" transform="translate(0 -3) scale(.43)"><path d="M0 82C-22 62-112 3-112-68C-112-118-55-140-14-91C-3-78 4-78 15-91C56-140 112-118 112-68C112 3 22 62 0 82Z" fill="url(#heart-flesh)" stroke="#ff9ba8" stroke-width="5"/><path d="M-7-88C-22-132-12-151 8-163L27-178M10-118C33-139 55-139 67-157M-24-103C-45-132-68-133-82-151" fill="none" stroke="#e7a1a5" stroke-width="17" stroke-linecap="round"/><path d="M-7-88C-22-132-12-151 8-163L27-178M10-118C33-139 55-139 67-157M-24-103C-45-132-68-133-82-151" fill="none" stroke="#ffccd0" stroke-width="5" stroke-linecap="round"/><path d="M-68-66C-60-91-34-102-16-83M18-82C43-107 72-92 78-65" fill="none" stroke="#ffb8bf" stroke-width="8" stroke-linecap="round" opacity=".8"/><path d="M-3-62C-23-28-24 5-4 42M21-57C9-25 13 5 31 28M-45-28C-31-7-29 15-37 34" fill="none" stroke="#9e1029" stroke-width="8" stroke-linecap="round" opacity=".65"/></g></g>',
 pulse:'<path d="M0 48C-22 28-78-3-78-43c0-29 40-44 78-8 38-36 78-21 78 8 0 40-56 71-78 91Z" fill="url(#metal)" stroke="#ffb1b8" stroke-width="5"/><path d="M-47-32Q-23-53 0-28Q25-54 47-32" fill="none" stroke="#fff0ed" stroke-opacity=".92" stroke-width="5"/><path d="M-48-4Q-20 18 0 34Q20 18 48-4" fill="none" stroke="#ff6b70" stroke-opacity=".72" stroke-width="4"/><path d="M-31-14Q-12-31 0-15Q12-31 31-14Q24 8 0 23Q-24 8-31-14Z" fill="#ff4b55" opacity=".88" filter="url(#depth)"/><path d="M-25-18Q-10-31 0-17Q10-31 25-18" fill="none" stroke="#fff2e9" stroke-width="3.5" stroke-linecap="round" opacity=".9"/>',
 notes:'<path d="M25-83V38Q25 65-5 70Q-35 74-38 52Q-40 29-8 23L5 21V-65L84-82V12Q84 39 54 44Q24 48 22 26Q20 5 52-2L64-5V-67Z" fill="url(#metal)" stroke="#fff2d7" stroke-width="5"/>',
 grand:'<path d="M-18-90Q35-84 39-42L28 37Q20 83-22 78Q-66 68-53 25L-25-42Z" fill="url(#metal)" stroke="#f9dfaa" stroke-width="6"/><path d="M-12-72L-30 44M14-68L0 52M-45 4Q0-12 34 6" stroke="#fff0cf" stroke-width="4" fill="none"/><path d="M-18-90L-4-112L8-89" fill="none" stroke="#f8e4bd" stroke-width="7"/>',
 spark:'<path d="M0-105L25-25L105 0L25 25L0 105L-25 25L-105 0L-25-25Z" fill="url(#metal)" stroke="#fff" stroke-width="5"/><path d="M0-75V75M-75 0H75" stroke="#fff" stroke-opacity=".65" stroke-width="3"/>',
 portal:'<ellipse rx="75" ry="104" fill="none" stroke="url(#metal)" stroke-width="23"/><ellipse rx="51" ry="80" fill="#10182e" stroke="#e2d5ff" stroke-width="4"/><path d="M-30 55Q42 22 17-26Q-5-62 32-76" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/>',
 galaxy:'<circle r="67" fill="url(#metal)" stroke="#fff" stroke-width="4"/><ellipse rx="112" ry="34" transform="rotate(-25)" fill="none" stroke="#d8caff" stroke-width="11"/><circle cx="78" cy="-47" r="19" fill="#fff1b5"/><circle cx="-82" cy="48" r="11" fill="#9feaff"/>',
 burst:'<path d="M15-112L-48-12L-4-12L-32 104L58-26L15-26L48-112Z" fill="url(#metal)" stroke="#fff" stroke-width="6" stroke-linejoin="round"/>',
 prism:'<path d="M0-112L83-38L56 77L0 112L-56 77L-83-38Z" fill="url(#metal)" stroke="#fff" stroke-width="5"/><path d="M0-112V112M-83-38L0 15L83-38M-56 77L0 15L56 77" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="4"/>',
 phantomtrain:'<g class="phantom-train"><path d="M-174 91H174M-174 103H174" stroke="#8293a4" stroke-width="7"/><path d="M-165 88L-145 106M-125 88L-105 106M-85 88L-65 106M-45 88L-25 106M-5 88L15 106M35 88L55 106M75 88L95 106M115 88L135 106M155 88L175 106" stroke="#657587" stroke-width="5"/><g class="train-car"><path d="M30-45H165V53H30Z" fill="#172536" stroke="#9fb2c1" stroke-width="5"/><path d="M24-52H170V-39H24Z" fill="#718797" stroke="#d4e0e6" stroke-width="3"/><path d="M39-31H157V8H39Z" fill="#0b1422" stroke="#9bb4c2" stroke-width="3"/><path d="M46-25H69V1H46ZM82-25H105V1H82ZM118-25H150V1H118Z" fill="#ffdf91" stroke="#fff0c0" stroke-width="2"/><path d="M42 18H155V37H42Z" fill="#26394a"/><circle cx="57" cy="58" r="18" fill="#080e17" stroke="#aab8c4" stroke-width="6"/><circle cx="142" cy="58" r="18" fill="#080e17" stroke="#aab8c4" stroke-width="6"/></g><g class="train-engine"><path d="M-153 39H38L24 78H-140Z" fill="#101a27" stroke="#9eb2c0" stroke-width="5"/><rect x="-133" y="-24" width="153" height="72" rx="34" fill="#263b4d" stroke="#b5c5cf" stroke-width="6"/><ellipse cx="-122" cy="12" rx="36" ry="37" fill="#152637" stroke="#c1d0d8" stroke-width="7"/><ellipse cx="-122" cy="12" rx="24" ry="25" fill="#09121d" stroke="#71899b" stroke-width="5"/><path d="M-94-25H-10V-58H-83Z" fill="#192b3c" stroke="#b7c8d2" stroke-width="5"/><path d="M-85-61H-8V-50H-85Z" fill="#9eafbb" stroke="#e0e8ed" stroke-width="3"/><rect x="-70" y="-51" width="24" height="27" fill="#ffd98b" stroke="#fff0c0" stroke-width="3"/><rect x="-37" y="-51" width="21" height="27" fill="#ffd98b" stroke="#fff0c0" stroke-width="3"/><path d="M-65-63V-115H-39V-63Z" fill="#101b29" stroke="#9aabb8" stroke-width="5"/><path d="M-76-116H-28L-35-127H-69Z" fill="#bac7cf" stroke="#e3e9ed" stroke-width="4"/><path d="M-52-128Q-85-148-58-166Q-34-183-48-198Q-6-176-29-149Q-15-135-52-128Z" fill="#d8e8ee" opacity=".7" class="phantom-smoke"/><path d="M-150 38L-171 73H-127Z" fill="#9babb6" stroke="#dce6eb" stroke-width="4"/><circle cx="-105" cy="67" r="28" fill="#090f18" stroke="#c0cbd3" stroke-width="7"/><circle cx="-105" cy="67" r="18" fill="#263747" stroke="#718797" stroke-width="4"/><circle cx="-22" cy="67" r="28" fill="#090f18" stroke="#c0cbd3" stroke-width="7"/><circle cx="-22" cy="67" r="18" fill="#263747" stroke="#718797" stroke-width="4"/><path d="M-105 67L-22 67" stroke="#d8e4e9" stroke-width="5"/><circle cx="-153" cy="10" r="15" fill="#fff0ad" stroke="#fff" stroke-width="5"/></g></g>',
 surprise:'<path d="M-78-35H78V78H-78Z" fill="url(#metal)" stroke="#fff0cf" stroke-width="6"/><path d="M-91-57H91V-27H-91Z" fill="#d8b7ff" stroke="#fff" stroke-width="5"/><path d="M-12-57Q-80-125-55-138Q-20-150 0-57Q20-150 55-138Q80-125 12-57" fill="none" stroke="#fff0ce" stroke-width="13"/>',
 crown:'<path d="M-100-57L-55-5L-24-78L15-5L66-83L100-57L78 65H-78Z" fill="url(#metal)" stroke="#fff1b4" stroke-width="6"/><path d="M-68 34H68M-55-5L-24 48L15-5L42 48L66-83" fill="none" stroke="#fff" stroke-opacity=".65" stroke-width="4"/>',
 infinity:'<path d="M0 0C-70-100-142-52-105 12C-72 70-18 17 0 0C70-100 142-52 105 12C72 70 18 17 0 0Z" fill="none" stroke="url(#metal)" stroke-width="24" stroke-linecap="round"/><path d="M-85-36Q-44-70 0 0Q44 70 85 36" fill="none" stroke="#fff" stroke-width="4"/>',
 clouds:'<path d="M-80 40Q-112 2-78-26Q-58-53-25-38Q-5-100 45-72Q80-60 77-22Q127-19 111 28Q100 55 70 55H-55Q-80 55-80 40Z" fill="url(#metal)" stroke="#e5f5ff" stroke-width="6"/>',
 hammer:'<path d="M-76-58L-40-94L35-18L0 18Z" fill="url(#metal)" stroke="#fff" stroke-width="6"/><path d="M-8 8L18 34L-48 105L-72 82Z" fill="#7b553b" stroke="#e8c8a2" stroke-width="6"/>',
 thunderass:'<path d="M-25-100L-65-10L-8-10L-42 95L67-35L8-35L44-100Z" fill="url(#metal)" stroke="#fff" stroke-width="6"/>',
 storm:'<path d="M-25-100L-65-10L-8-10L-42 95L67-35L8-35L44-100Z" fill="url(#metal)" stroke="#fff" stroke-width="6"/>',
 lightning:'<path d="M-25-100L-65-10L-8-10L-42 95L67-35L8-35L44-100Z" fill="url(#metal)" stroke="#fff" stroke-width="6"/>',
 book:'<path d="M-8-80Q-58-103-100-72V75Q-53 49-8 78Q36 49 100 75V-72Q46-103-8-80Z" fill="url(#metal)" stroke="#f1dfb5" stroke-width="7"/><path d="M-8-78V78M-72-45L-28-35M-72-15L-28-5M27-35L73-45M27-5L73-15" stroke="#fff" stroke-width="5" fill="none"/>',
 dreammakers:'<path d="M0-94L18-28L83-58L48 2L104 35L34 38L18 105L-13 43L-82 69L-48 8L-103-27L-33-32Z" fill="url(#metal)" stroke="#fff" stroke-width="5"/><circle cx="0" cy="0" r="28" fill="#fff2bd"/>',
 phoenix:'<path d="M0 95Q-22 20-100-44Q-30-30-10-86Q5-35 30-88Q40-27 104-52Q37 18 0 95Z" fill="url(#metal)" stroke="#ffe9bd" stroke-width="6"/><path d="M0 78Q-5 5-55-38M0 78Q20 0 62-36" fill="none" stroke="#fff" stroke-width="5"/>',
 treasure:'<path d="M-92-22H92V78H-92Z" fill="url(#metal)" stroke="#ffe7a7" stroke-width="7"/><path d="M-100-27Q-90-95-40-95H40Q90-95 100-27Z" fill="#d59b39" stroke="#fff0bb" stroke-width="7"/><path d="M0-90V78M-90 5H90" stroke="#fff1c6" stroke-width="6"/><circle cy="20" r="13" fill="#fff4bd"/>',
 meteor:'<g class="meteor-flames"><path d="M-155-8Q-95-70-24-72Q-84-34-65-8Q-115 4-155-8Z" fill="#ff4b16" opacity=".9"/><path d="M-158 26Q-96-12-27-40Q-81 4-48 31Q-106 48-158 26Z" fill="#ff9b25"/><path d="M-130 58Q-78 17-18-10Q-57 38-29 58Q-83 77-130 58Z" fill="#ffe08a"/><path d="M-165-42Q-103-91-42-84" fill="none" stroke="#fff2bd" stroke-width="8" stroke-linecap="round" opacity=".9"/></g><path d="M-69-58L-36-103L-5-87L34-111L57-76L105-65L112-24L139 9L111 43L94 85L48 83L17 111L-20 87L-66 94L-84 53L-117 23L-94-17Z" fill="#321c1b" stroke="#ffb05a" stroke-width="7" stroke-linejoin="round"/><path d="M-58-48L-35-89L-9-73L25-94L43-61L87-51L93-19L116 10L88 33L74 67L42 65L13 91L-15 68L-53 73L-68 42L-95 18L-77-11Z" fill="url(#metal)" stroke="#ffdb91" stroke-width="4" stroke-linejoin="round"/><path d="M-35-62L-9-78L12-48L-7-17L-45-22ZM24-70L62-53L47-21L12-18ZM-63 5L-27-10L-10 23L-42 49L-70 31ZM19 15L57-4L78 25L54 55L18 44Z" fill="#ffb04c" opacity=".72"/><g fill="#241514" stroke="#ffcf83" stroke-width="4"><ellipse cx="-25" cy="-26" rx="18" ry="11" transform="rotate(-28 -25 -26)"/><ellipse cx="52" cy="27" rx="15" ry="9" transform="rotate(22 52 27)"/><ellipse cx="31" cy="-43" rx="9" ry="6"/></g><path d="M-49-43L-27-62M38-53L58-39M-55 37L-36 25" stroke="#fff0c1" stroke-width="6" stroke-linecap="round" opacity=".8"/>',
 raccoon:'<path d="M-75-48L-95-100L-35-74Q0-95 35-74L95-100L75-48Q104 20 56 76Q0 112-56 76Q-104 20-75-48Z" fill="url(#metal)" stroke="#f5e4ca" stroke-width="6"/><path d="M-80-25Q-40-60 0-25Q40-60 80-25Q55 30 0 13Q-55 30-80-25Z" fill="#17202a"/><circle cx="-35" cy="-12" r="8" fill="#fff"/><circle cx="35" cy="-12" r="8" fill="#fff"/>',
 portalparty:'<ellipse rx="78" ry="100" fill="none" stroke="url(#metal)" stroke-width="22"/><ellipse rx="50" ry="73" fill="#10182e" stroke="#fff" stroke-width="4"/><path d="M-28 48Q36 12 14-25Q-5-56 27-69" fill="none" stroke="#fff" stroke-width="8"/>',
 blastass:'<path d="M-92 30Q-120-20-65-40Q-55-100 0-65Q48-115 72-55Q132-32 87 18Q105 82 45 76Q-4 125-42 78Q-104 91-92 30Z" fill="url(#metal)" stroke="#e5f4ff" stroke-width="6"/>',
 deathass:'<path d="M0-100Q80-100 90-20Q100 58 0 105Q-100 58-90-20Q-80-100 0-100Z" fill="url(#metal)" stroke="#fff" stroke-width="6"/><circle cx="-30" cy="-15" r="13" fill="#10131d"/><circle cx="30" cy="-15" r="13" fill="#10131d"/><path d="M-18 30L0 8L18 30Z" fill="#10131d"/>',
 throne:'<path d="M-75-95H75V-22H100V88H-100V-22H-75Z" fill="url(#metal)" stroke="#fff0b0" stroke-width="7"/><path d="M-60-60H60M-65 18H65M-70 55H70" stroke="#fff" stroke-width="5"/>',
 chicken:'<path d="M-70 20Q-88-48-22-63Q35-85 73-20Q92 42 25 78Q-45 95-70 20Z" fill="url(#metal)" stroke="#fff0d0" stroke-width="6"/><path d="M-20-68Q-45-115-5-102Q12-138 30-92Q61-112 53-66Z" fill="#c64c3e"/><path d="M55-22L105 0L55 20Z" fill="#f6bc4b"/><circle cx="25" cy="-30" r="8" fill="#111"/>',
 cheese:'<path d="M-95-35L65-95L98 70L-95 70Z" fill="url(#metal)" stroke="#fff0b0" stroke-width="7"/><circle cx="-35" cy="5" r="13" fill="#9b671d"/><circle cx="35" cy="-30" r="10" fill="#9b671d"/><circle cx="55" cy="38" r="8" fill="#9b671d"/>',
 skeleton:'<circle cy="-35" r="62" fill="url(#metal)" stroke="#fff" stroke-width="6"/><circle cx="-25" cy="-42" r="14" fill="#10131d"/><circle cx="25" cy="-42" r="14" fill="#10131d"/><path d="M-35 10H35M-25 10V34M-8 10V34M8 10V34M25 10V34" stroke="#10131d" stroke-width="7"/><path d="M-52 70L-90 112M52 70L90 112M-30 70V122M30 70V122" stroke="#e9e4d7" stroke-width="13" stroke-linecap="round"/>',
 stinkdeath:'<path d="M-80 55Q-125 5-68-30Q-55-94 4-62Q62-112 81-42Q125 7 65 42Q30 98-25 69Z" fill="url(#metal)" stroke="#e8ffbe" stroke-width="6"/>',
 rattlebone:'<path d="M-14-100Q-55-108-55-67Q-55-43-31-35L-30 65Q-60 78-43 105Q-18 127 0 100Q20 127 43 105Q60 78 30 65L31-35Q55-43 55-67Q55-108 14-100Z" fill="url(#metal)" stroke="#fff" stroke-width="6"/>',
 toxiccloud:'<path d="M-95 50Q-125 0-72-32Q-52-92 0-60Q54-108 77-47Q126-17 83 34Q57 78-10 62Z" fill="url(#metal)" stroke="#e5ffbc" stroke-width="6"/>',
 bonebreaker:'<path d="M-20-100Q-58-106-60-68Q-62-40-32-34L-32 55Q-64 74-40 102Q-15 122 0 96Q18 122 42 102Q62 74 32 55L32-34Q62-40 60-68Q58-106 20-100Z" fill="url(#metal)" stroke="#fff" stroke-width="6"/>',
 knockout:'<path d="M-62-80Q-100-78-92-25L-60 58Q-30 110 18 91L70 50Q110 8 76-28L18-80Z" fill="url(#metal)" stroke="#fff0d8" stroke-width="7"/><path d="M-65-42L44 53M-35-72L72 20" stroke="#fff" stroke-opacity=".65" stroke-width="5"/>',
 cantbreathe:'<circle cy="-28" r="68" fill="url(#metal)" stroke="#fff" stroke-width="6"/><circle cx="-25" cy="-35" r="13" fill="#14151e"/><circle cx="25" cy="-35" r="13" fill="#14151e"/><path d="M-32 9Q0 45 32 9" fill="none" stroke="#14151e" stroke-width="10" stroke-linecap="round"/><path d="M-45 55Q-68 84-45 105M45 55Q68 84 45 105" fill="none" stroke="#9eeaff" stroke-width="8"/>'
 };
 const colors={drum:["#fff1e3","#b53a45","#34101a"],heart:["#fff0ed","#d71932","#610817"],fire:["#fff4a8","#ff6a22","#72180f"],cosmic:["#f2e7ff","#9875ff","#272052"],gold:["#fff3b0","#dca63c","#704013"],ice:["#efffff","#65cde9","#174365"],magic:["#fff1ff","#b88bff","#44206e"],party:["#fff0ce","#fa79c9","#50204d"],shadow:["#f4ffc7","#9aaa69","#1a3029"],impact:["#fff0c5","#e78c42","#5c2118"],prism:["#ffffff","#9de8ff","#57358a"],stormlight:["#ffffff","#a8dfff","#283c61"]};
 const col=colors[({phantomtrain:"ice",heartbeat:"drum",pulse:"heart",notes:"party",grand:"gold",spark:"magic",portal:"cosmic",dragon:"fire",galaxy:"cosmic",burst:"stormlight",prism:"prism",surprise:"gold",crown:"gold",infinity:"cosmic",clouds:"ice",hammer:"impact",thunderass:"stormlight",storm:"stormlight",lightning:"stormlight",book:"shadow",dreammakers:"magic",phoenix:"fire",treasure:"gold",meteor:"impact",raccoon:"party",portalparty:"prism",blastass:"impact",deathass:"shadow",throne:"gold",chicken:"fire",cheese:"gold",skeleton:"shadow",dragonrevenge:"fire",stinkdeath:"shadow",rattlebone:"shadow",toxiccloud:"shadow",bonebreaker:"shadow",knockout:"impact",cantbreathe:"party"})[style]||"magic"];
 const markup=art[style]||art.spark;
 const svg='<svg viewBox="-200 -210 400 340" role="img" aria-label="'+String(gift.name||"Gift").replace(/[&<>"']/g,"")+'" class="cinema-art"><defs><linearGradient id="metal" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="'+col[0]+'"/><stop offset=".3" stop-color="'+col[1]+'"/><stop offset=".68" stop-color="'+col[2]+'"/><stop offset="1" stop-color="#080b13"/></linearGradient><radialGradient id="shine"><stop stop-color="#fff" stop-opacity=".5"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><filter id="depth" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="10"/></filter><radialGradient id="drumhead" cx=".35" cy=".28" r=".8"><stop stop-color="#f4e9d9"/><stop offset=".58" stop-color="#cfc0ae"/><stop offset="1" stop-color="#75675f"/></radialGradient><linearGradient id="heart-flesh" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#ffb0b7"/><stop offset=".28" stop-color="#ed2945"/><stop offset=".68" stop-color="#a9082a"/><stop offset="1" stop-color="#4b0618"/></linearGradient></defs><ellipse cx="0" cy="128" rx="92" ry="13" fill="'+col[1]+'" opacity=".4" filter="url(#depth)"/><g class="cinema-object">'+markup+'</g><ellipse cx="-35" cy="-75" rx="48" ry="24" fill="url(#shine)" opacity=".55" transform="rotate(-28 -35 -75)"/></svg>';
 const world=document.createElement("div");world.className="cinema-stage";world.innerHTML=svg;
 if(style==="phantomtrain"){
  const trainStyle=document.createElement("style");trainStyle.textContent='#tiknation-gift-engine[data-style=phantomtrain]{background:radial-gradient(ellipse at 50% 75%,#1a2d40 0%,#080f1b 55%,#02050b 100%)!important}#tiknation-gift-engine[data-style=phantomtrain] .cinema-art{width:min(98vw,900px);max-height:62vh;overflow:visible;filter:drop-shadow(0 18px 24px #000c)}#tiknation-gift-engine[data-style=phantomtrain] .cinema-object{animation:phantom-train-arrive 7.5s cubic-bezier(.18,.72,.24,1) both!important;transform-origin:center}#tiknation-gift-engine[data-style=phantomtrain] .train-engine,#tiknation-gift-engine[data-style=phantomtrain] .train-car{transform-box:fill-box;transform-origin:center;animation:phantom-train-rumble .22s ease-in-out infinite alternate}#tiknation-gift-engine[data-style=phantomtrain] .train-car{animation-delay:-.11s}#tiknation-gift-engine[data-style=phantomtrain] .train-engine circle,#tiknation-gift-engine[data-style=phantomtrain] .train-car circle{transform-box:fill-box;transform-origin:center;animation:phantom-wheel-spin .8s linear infinite}#tiknation-gift-engine[data-style=phantomtrain] .phantom-smoke{transform-box:fill-box;transform-origin:bottom center;animation:phantom-smoke-rise 2.1s ease-out infinite}@keyframes phantom-train-arrive{0%{opacity:0;transform:translateX(-65vw) scale(.72)}20%{opacity:1}75%{transform:translateX(0) scale(1.04)}100%{opacity:1;transform:translateX(0) scale(1)}}@keyframes phantom-train-rumble{from{translate:0 -1px}to{translate:0 2px}}@keyframes phantom-wheel-spin{to{rotate:360deg}}@keyframes phantom-smoke-rise{0%{opacity:.1;transform:translateY(14px) scale(.65)}55%{opacity:.75}100%{opacity:0;transform:translateY(-32px) scale(1.35)}}@media(prefers-reduced-motion:reduce){#tiknation-gift-engine[data-style=phantomtrain] .cinema-object,#tiknation-gift-engine[data-style=phantomtrain] .train-engine,#tiknation-gift-engine[data-style=phantomtrain] .train-car,#tiknation-gift-engine[data-style=phantomtrain] .phantom-smoke{animation:none!important}}';document.head.appendChild(trainStyle);
 }
 const obj=world.querySelector(".cinema-object");
 const title=document.createElement("div");title.className="cinema-title";title.textContent=gift.name||"TikNation Gift";
 const msg=document.createElement("small");msg.textContent=gift.message||"A gift has arrived.";title.appendChild(msg);world.appendChild(title);
 if(style==="pulse"||style==="heartbeat"){world.querySelectorAll(".cinema-mote").forEach(node=>node.remove());}
 if(style==="heartbeat"){
  let drumStyle=document.getElementById("tiknation-heartbeat-style");if(!drumStyle){drumStyle=document.createElement("style");drumStyle.id="tiknation-heartbeat-style";document.head.appendChild(drumStyle);}
  drumStyle.textContent='#tiknation-gift-engine[data-style=heartbeat] .cinema-art{width:min(78vw,470px);overflow:visible;filter:drop-shadow(0 18px 24px #0009)}#tiknation-gift-engine[data-style=heartbeat] .heartbeat-organ{transform-box:fill-box;transform-origin:center;animation:heartbeat-double 1.15s ease-in-out infinite;filter:drop-shadow(0 0 18px rgba(255,30,65,.85))}#tiknation-gift-engine[data-style=heartbeat] .cinema-stage:before,#tiknation-gift-engine[data-style=heartbeat] .cinema-stage:after{content:"";position:absolute;left:50%;top:50%;width:min(62vw,340px);aspect-ratio:1;border:2px solid rgba(255,55,72,.65);border-radius:50%;transform:translate(-50%,-50%) scale(.55);animation:heartbeat-ring 1.15s ease-out infinite;pointer-events:none}#tiknation-gift-engine[data-style=heartbeat] .cinema-stage:after{animation-delay:.18s;border-color:rgba(255,170,175,.48)}@keyframes heartbeat-double{0%,100%{transform:scale(1)}8%{transform:scale(1.075)}17%{transform:scale(.99)}25%{transform:scale(1.045)}38%{transform:scale(1)} }@keyframes heartbeat-ring{0%{opacity:0;transform:translate(-50%,-50%) scale(.55)}12%{opacity:.8}100%{opacity:0;transform:translate(-50%,-50%) scale(1.5)}}';
 }
 if(style==="skeleton"){
  world.className="cinema-stage skeleton-disco-stage";
  world.innerHTML=`<div class="skeleton-disco-lights"><i></i><i></i><i></i><i></i></div><div class="skeleton-fog fog-back"></div><div class="skeleton-fog fog-front"></div><div class="skeleton-disco-ball"><span></span></div><div class="skeleton-disco-floor"></div><svg class="skeleton-dancer" viewBox="0 0 500 620" role="img" aria-label="A full-body dancing skeleton">
<defs><linearGradient id="skBone" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fffef0"/><stop offset=".48" stop-color="#d9e3e5"/><stop offset="1" stop-color="#8ca0aa"/></linearGradient><filter id="skGlow"><feGaussianBlur stdDeviation="8"/></filter></defs>
<ellipse cx="250" cy="572" rx="126" ry="20" fill="#46eaff" opacity=".35" filter="url(#skGlow)"/>
<g class="skel-torso">
<path d="M190 224Q250 190 310 224L314 348Q250 380 186 348Z" fill="#182b35" opacity=".18"/>
<path d="M250 196V365M190 224Q250 190 310 224M184 251Q250 218 316 251M181 280Q250 247 319 280M186 309Q250 279 314 309M198 338Q250 313 302 338" fill="none" stroke="url(#skBone)" stroke-width="15" stroke-linecap="round"/>
<path d="M207 365Q250 341 293 365L282 407Q250 426 218 407Z" fill="url(#skBone)" stroke="#8799a3" stroke-width="5"/>
</g>
<g class="skel-arm-left">
<path d="M183 224L145 270" stroke="#8799a3" stroke-width="28" stroke-linecap="round"/><path d="M183 224L145 270" stroke="url(#skBone)" stroke-width="19" stroke-linecap="round"/>
<circle cx="183" cy="224" r="15" fill="#f7f5e9" stroke="#8ca0aa" stroke-width="4"/>
<g class="skel-forearm-left"><path d="M145 270L83 218" stroke="#8799a3" stroke-width="27" stroke-linecap="round"/><path d="M145 270L83 218" stroke="url(#skBone)" stroke-width="18" stroke-linecap="round"/><circle cx="145" cy="270" r="13" fill="#f7f5e9" stroke="#8ca0aa" stroke-width="4"/><path d="M83 218l-20-32m20 32-31-9m31 9 2-39" stroke="#eeeede" stroke-width="9" stroke-linecap="round"/></g>
</g>
<g class="skel-arm-right">
<path d="M317 224L378 165" stroke="#8799a3" stroke-width="28" stroke-linecap="round"/><path d="M317 224L378 165" stroke="url(#skBone)" stroke-width="19" stroke-linecap="round"/><circle cx="317" cy="224" r="15" fill="#f7f5e9" stroke="#8ca0aa" stroke-width="4"/>
<g class="skel-forearm-right"><path d="M378 165L414 91" stroke="#8799a3" stroke-width="27" stroke-linecap="round"/><path d="M378 165L414 91" stroke="url(#skBone)" stroke-width="18" stroke-linecap="round"/><circle cx="378" cy="165" r="13" fill="#f7f5e9" stroke="#8ca0aa" stroke-width="4"/><path d="M414 91l-4-35m4 35 20-29m-20 29 31-8" stroke="#eeeede" stroke-width="9" stroke-linecap="round"/></g>
</g>
<g class="skel-leg-left"><path d="M229 403L195 477" stroke="#8799a3" stroke-width="30" stroke-linecap="round"/><path d="M229 403L195 477" stroke="url(#skBone)" stroke-width="20" stroke-linecap="round"/><circle cx="229" cy="403" r="15" fill="#f7f5e9" stroke="#8ca0aa" stroke-width="4"/><g class="skel-shin-left"><path d="M195 477L166 548" stroke="#8799a3" stroke-width="29" stroke-linecap="round"/><path d="M195 477L166 548" stroke="url(#skBone)" stroke-width="19" stroke-linecap="round"/><circle cx="195" cy="477" r="14" fill="#f7f5e9" stroke="#8ca0aa" stroke-width="4"/><path d="M166 548Q145 555 139 575L196 578L205 565" fill="#e9e8dc" stroke="#8799a3" stroke-width="5"/></g></g>
<g class="skel-leg-right"><path d="M271 403L307 474" stroke="#8799a3" stroke-width="30" stroke-linecap="round"/><path d="M271 403L307 474" stroke="url(#skBone)" stroke-width="20" stroke-linecap="round"/><circle cx="271" cy="403" r="15" fill="#f7f5e9" stroke="#8ca0aa" stroke-width="4"/><g class="skel-shin-right"><path d="M307 474L337 543" stroke="#8799a3" stroke-width="29" stroke-linecap="round"/><path d="M307 474L337 543" stroke="url(#skBone)" stroke-width="19" stroke-linecap="round"/><circle cx="307" cy="474" r="14" fill="#f7f5e9" stroke="#8ca0aa" stroke-width="4"/><path d="M337 543Q360 551 367 573L309 578L298 560" fill="#e9e8dc" stroke="#8799a3" stroke-width="5"/></g></g>
<g class="skel-head"><path d="M195 89Q195 42 250 38Q305 42 305 89L296 153Q286 183 250 185Q214 183 204 153Z" fill="url(#skBone)" stroke="#82959f" stroke-width="7"/><path d="M205 105Q220 79 242 98L239 129Q220 145 207 126ZM295 105Q280 79 258 98L261 129Q280 145 293 126Z" fill="#101c2a"/><ellipse cx="225" cy="116" rx="8" ry="11" fill="#7cf7ff"/><ellipse cx="275" cy="116" rx="8" ry="11" fill="#7cf7ff"/><path d="M250 128L238 151L262 151Z" fill="#53616c"/><path d="M222 157Q250 171 278 157L270 178H230Z" fill="#101c2a"/><path d="M231 158V174M241 161V177M251 162V178M261 161V177M271 158V174" stroke="#f4f0df" stroke-width="5"/></g>
</svg>`;
  let discoStyle=document.getElementById("tiknation-skeleton-disco-style");if(!discoStyle){discoStyle=document.createElement("style");discoStyle.id="tiknation-skeleton-disco-style";document.head.appendChild(discoStyle);}
  discoStyle.textContent="#tiknation-gift-engine[data-style=skeleton]{background:radial-gradient(ellipse at 50% 72%,rgba(34,20,77,.4),rgba(2,4,16,.97))!important}#tiknation-gift-engine[data-style=skeleton] .skeleton-disco-stage{position:absolute;inset:0;overflow:hidden;background:radial-gradient(ellipse at 50% 75%,#25164d 0%,#090d25 55%,#02040d 100%)}#tiknation-gift-engine[data-style=skeleton] .cinema-title{position:absolute;z-index:10;bottom:7%;left:4%;right:4%;text-align:center;color:#fff;font-size:clamp(24px,5vw,44px);font-weight:1000;letter-spacing:.13em;text-shadow:0 0 14px #ff65e8,0 0 28px #5cecff}#tiknation-gift-engine[data-style=skeleton] .cinema-title small{display:block;margin-top:9px;font-size:clamp(10px,2vw,14px);letter-spacing:.22em;color:#b9faff}#tiknation-gift-engine[data-style=skeleton] .skeleton-dancer{position:absolute;z-index:4;left:50%;top:49%;width:min(78vw,480px);height:min(72vh,620px);overflow:visible;transform:translate(-50%,-50%);filter:drop-shadow(0 0 16px #6feaff) drop-shadow(0 0 30px #d45bff);animation:skel-bounce .62s ease-in-out infinite alternate}#tiknation-gift-engine[data-style=skeleton] .skel-body{transform-box:fill-box;transform-origin:50% 55%;animation:skel-sway 1.24s ease-in-out infinite}#tiknation-gift-engine[data-style=skeleton] .skel-arm-left{transform-box:view-box;transform-origin:183px 224px;animation:skel-arm-left .62s ease-in-out infinite alternate}#tiknation-gift-engine[data-style=skeleton] .skel-arm-right{transform-box:view-box;transform-origin:317px 224px;animation:skel-arm-right .62s ease-in-out infinite alternate}#tiknation-gift-engine[data-style=skeleton] .skel-leg-left{transform-box:view-box;transform-origin:229px 403px;animation:skel-leg-left .62s ease-in-out infinite alternate}#tiknation-gift-engine[data-style=skeleton] .skel-leg-right{transform-box:view-box;transform-origin:271px 403px;animation:skel-leg-right .62s ease-in-out infinite alternate}#tiknation-gift-engine[data-style=skeleton] .skel-head{transform-box:view-box;transform-origin:250px 180px;animation:skel-head .62s ease-in-out infinite alternate}#tiknation-gift-engine[data-style=skeleton] .skeleton-disco-ball{position:absolute;z-index:3;top:5%;left:50%;width:clamp(70px,15vw,118px);aspect-ratio:1;border-radius:50%;transform:translateX(-50%);background:repeating-conic-gradient(from 0deg,#fff 0 8deg,#a7eaff 8deg 16deg,#7250b8 16deg 24deg,#fff 24deg 30deg);box-shadow:0 0 25px #a9f6ff,0 0 55px #b56cff,inset -12px -10px 18px #050817;animation:skel-ball-spin 2.8s linear infinite}#tiknation-gift-engine[data-style=skeleton] .skeleton-disco-ball:before{content:\"\";position:absolute;left:50%;bottom:100%;height:60px;border-left:2px solid #d9faff;transform:translateX(-50%)}#tiknation-gift-engine[data-style=skeleton] .skeleton-disco-ball span{position:absolute;inset:18%;border-radius:50%;background:radial-gradient(circle at 28% 22%,#fff 0 7%,transparent 9%),radial-gradient(circle at 65% 70%,#fff 0 6%,transparent 8%);border:1px solid #fff9}#tiknation-gift-engine[data-style=skeleton] .skeleton-disco-lights{position:absolute;z-index:2;inset:0;pointer-events:none}#tiknation-gift-engine[data-style=skeleton] .skeleton-disco-lights i{position:absolute;top:-20%;width:45%;height:100%;opacity:.42;filter:blur(10px);clip-path:polygon(45% 0,55% 0,100% 100%,0 100%);transform-origin:50% 0;animation:skel-spot 2.4s ease-in-out infinite alternate}#tiknation-gift-engine[data-style=skeleton] .skeleton-disco-lights i:nth-child(1){left:4%;background:linear-gradient(#ff36d7,transparent 80%);transform:rotate(-26deg)}#tiknation-gift-engine[data-style=skeleton] .skeleton-disco-lights i:nth-child(2){right:4%;background:linear-gradient(#38eaff,transparent 80%);transform:rotate(26deg);animation-delay:-1.1s}#tiknation-gift-engine[data-style=skeleton] .skeleton-disco-lights i:nth-child(3){left:28%;background:linear-gradient(#baff54,transparent 80%);animation-delay:-.6s}#tiknation-gift-engine[data-style=skeleton] .skeleton-disco-lights i:nth-child(4){right:28%;background:linear-gradient(#ffb33d,transparent 80%);animation-delay:-1.7s}#tiknation-gift-engine[data-style=skeleton] .skeleton-disco-floor{position:absolute;z-index:1;left:-20%;right:-20%;bottom:-23%;height:44%;border-radius:50%;background:repeating-conic-gradient(from 0deg at 50% 0%,rgba(255,65,218,.2) 0 10deg,rgba(69,235,255,.18) 10deg 20deg,rgba(173,255,82,.16) 20deg 30deg,transparent 30deg 40deg);filter:blur(7px);animation:skel-floor 3s linear infinite}@keyframes skel-bounce{from{margin-top:8px}to{margin-top:-13px}}@keyframes skel-sway{0%,100%{transform:rotate(-5deg) translateX(-5px)}50%{transform:rotate(5deg) translateX(5px)}}@keyframes skel-arm-left{from{transform:rotate(30deg)}to{transform:rotate(-48deg)}}@keyframes skel-arm-right{from{transform:rotate(-48deg)}to{transform:rotate(34deg)}}@keyframes skel-leg-left{from{transform:rotate(-18deg)}to{transform:rotate(24deg)}}@keyframes skel-leg-right{from{transform:rotate(22deg)}to{transform:rotate(-20deg)}}@keyframes skel-head{from{transform:rotate(-8deg)}to{transform:rotate(8deg)}}@keyframes skel-ball-spin{to{rotate:360deg}}@keyframes skel-spot{from{opacity:.18;filter:blur(14px)}to{opacity:.58;filter:blur(5px)}}@keyframes skel-floor{to{transform:rotate(360deg)}}@media(prefers-reduced-motion:reduce){#tiknation-gift-engine[data-style=skeleton] .skeleton-disco-ball,#tiknation-gift-engine[data-style=skeleton] .skeleton-disco-floor,#tiknation-gift-engine[data-style=skeleton] .skeleton-disco-lights i,#tiknation-gift-engine[data-style=skeleton] .skel-body,#tiknation-gift-engine[data-style=skeleton] .skel-arm,#tiknation-gift-engine[data-style=skeleton] .skel-leg,#tiknation-gift-engine[data-style=skeleton] .skel-head,#tiknation-gift-engine[data-style=skeleton] .skeleton-dancer{animation:none!important}";
  discoStyle.textContent += "#tiknation-gift-engine[data-style=skeleton] .skeleton-dancer{animation:skel-stage-groove 2.4s cubic-bezier(.45,0,.55,1) infinite!important;transform-origin:50% 75%;will-change:transform}\n#tiknation-gift-engine[data-style=skeleton] .skel-body{animation:skel-torso-groove 2.4s ease-in-out infinite!important;transform-box:view-box;transform-origin:250px 300px}\n#tiknation-gift-engine[data-style=skeleton] .skel-arm-left{animation:skel-left-choreo 2.4s cubic-bezier(.45,0,.55,1) infinite!important;transform-box:view-box;transform-origin:183px 224px}\n#tiknation-gift-engine[data-style=skeleton] .skel-arm-right{animation:skel-right-choreo 2.4s cubic-bezier(.45,0,.55,1) infinite!important;transform-box:view-box;transform-origin:317px 224px}\n#tiknation-gift-engine[data-style=skeleton] .skel-leg-left{animation:skel-left-step 1.2s ease-in-out infinite!important;transform-box:view-box;transform-origin:229px 403px}\n#tiknation-gift-engine[data-style=skeleton] .skel-leg-right{animation:skel-right-step 1.2s ease-in-out infinite!important;transform-box:view-box;transform-origin:271px 403px}\n#tiknation-gift-engine[data-style=skeleton] .skel-head{animation:skel-head-bop .8s ease-in-out infinite alternate!important;transform-box:view-box;transform-origin:250px 180px}\n@keyframes skel-stage-groove{0%,100%{transform:translate(-50%,-50%) translateY(0) rotate(-2deg) scale(1)}12%{transform:translate(-50%,-50%) translateY(-13px) rotate(2deg) scale(1.015)}25%{transform:translate(-50%,-50%) translateY(0) rotate(3deg) scale(1)}38%{transform:translate(-50%,-50%) translateY(-17px) rotate(-3deg) scale(1.02)}50%{transform:translate(-50%,-50%) translateY(0) rotate(-2deg) scale(1)}63%{transform:translate(-50%,-50%) translateY(-11px) rotate(3deg) scale(1.01)}75%{transform:translate(-50%,-50%) translateY(0) rotate(-3deg) scale(1)}88%{transform:translate(-50%,-50%) translateY(-15px) rotate(2deg) scale(1.02)}}\n@keyframes skel-torso-groove{0%,100%{transform:rotate(-7deg) translateX(-7px)}25%{transform:rotate(8deg) translateX(8px)}50%{transform:rotate(-9deg) translateX(-8px)}75%{transform:rotate(7deg) translateX(7px)}}\n@keyframes skel-left-choreo{0%,100%{transform:rotate(38deg)}18%{transform:rotate(-72deg)}35%{transform:rotate(-112deg)}52%{transform:rotate(-38deg)}70%{transform:rotate(58deg)}86%{transform:rotate(-18deg)}}\n@keyframes skel-right-choreo{0%,100%{transform:rotate(-105deg)}18%{transform:rotate(-34deg)}35%{transform:rotate(48deg)}52%{transform:rotate(105deg)}70%{transform:rotate(24deg)}86%{transform:rotate(-58deg)}}\n@keyframes skel-left-step{0%,100%{transform:rotate(-22deg) translateY(0)}25%{transform:rotate(18deg) translateY(-9px)}50%{transform:rotate(-8deg) translateY(3px)}75%{transform:rotate(28deg) translateY(-12px)}}\n@keyframes skel-right-step{0%,100%{transform:rotate(24deg) translateY(-8px)}25%{transform:rotate(-18deg) translateY(0)}50%{transform:rotate(28deg) translateY(-12px)}75%{transform:rotate(-8deg) translateY(3px)}}\n@keyframes skel-head-bop{from{transform:rotate(-13deg) translateY(-2px)}to{transform:rotate(13deg) translateY(4px)}}\n#tiknation-gift-engine[data-style=skeleton] .skeleton-disco-ball{animation-duration:1.7s!important}\n#tiknation-gift-engine[data-style=skeleton] .skeleton-disco-lights i{animation-duration:1.45s!important}";
  /* V11: use native SVG joint animation so Android browsers rotate bones around exact SVG pivots. */
  discoStyle.textContent += "#tiknation-gift-engine[data-style=skeleton] .skeleton-dancer{animation:skel-v11-bounce 1.2s ease-in-out infinite!important;transform-origin:50% 50%}#tiknation-gift-engine[data-style=skeleton] .skel-torso,#tiknation-gift-engine[data-style=skeleton] .skel-head,#tiknation-gift-engine[data-style=skeleton] .skel-arm-left,#tiknation-gift-engine[data-style=skeleton] .skel-forearm-left,#tiknation-gift-engine[data-style=skeleton] .skel-arm-right,#tiknation-gift-engine[data-style=skeleton] .skel-forearm-right,#tiknation-gift-engine[data-style=skeleton] .skel-leg-left,#tiknation-gift-engine[data-style=skeleton] .skel-shin-left,#tiknation-gift-engine[data-style=skeleton] .skel-leg-right,#tiknation-gift-engine[data-style=skeleton] .skel-shin-right{animation:none!important}@keyframes skel-v11-bounce{0%,100%{transform:translate(-50%,-50%) translateY(0)}25%{transform:translate(-50%,-50%) translateY(-9px)}50%{transform:translate(-50%,-50%) translateY(1px)}75%{transform:translate(-50%,-50%) translateY(-11px)}}";
  /* SVG animateTransform nodes are inserted directly into the articulated groups below. */
  /* Upright mirrored disco ball, plus layered low-lying stage fog and moving beams. */
  discoStyle.textContent += "#tiknation-gift-engine[data-style=skeleton] .skeleton-disco-ball{transform:translateX(-50%) rotate(0deg)!important;animation:none!important;background:radial-gradient(ellipse at 32% 22%,#fff 0 3%,transparent 18%),repeating-linear-gradient(90deg,#f9ffff 0 5px,#a7eaff 5px 10px,#6c4caa 10px 15px,#f9ffff 15px 19px);background-size:auto,38px 100%;animation:none!important;box-shadow:0 0 24px #a9f6ff,0 0 55px #b56cff,inset -12px -10px 18px #050817;transform-origin:50% 50%}#tiknation-gift-engine[data-style=skeleton] .skeleton-disco-ball span{background:radial-gradient(ellipse at 28% 20%,#fff 0 4%,transparent 18%),linear-gradient(90deg,transparent,#ffffff55,transparent);animation:skel-ball-glint 2.2s ease-in-out infinite alternate}#tiknation-gift-engine[data-style=skeleton] .skeleton-fog{position:absolute;z-index:2;left:-25%;width:150%;height:25%;bottom:4%;border-radius:50%;pointer-events:none;filter:blur(18px);opacity:.58;background:radial-gradient(ellipse at 25% 55%,#b5faff88,transparent 48%),radial-gradient(ellipse at 70% 45%,#e87dff77,transparent 52%),radial-gradient(ellipse at 48% 60%,#d7eaff66,transparent 62%);animation:skel-fog-drift 7s ease-in-out infinite alternate}#tiknation-gift-engine[data-style=skeleton] .skeleton-fog.fog-front{z-index:5;bottom:-3%;height:18%;opacity:.42;filter:blur(24px);animation-duration:9s;animation-direction:alternate-reverse}#tiknation-gift-engine[data-style=skeleton] .skeleton-disco-lights i{width:52%;opacity:.52;filter:blur(7px);animation:skel-spot 2.2s ease-in-out infinite alternate}#tiknation-gift-engine[data-style=skeleton] .skeleton-disco-lights i:nth-child(1){animation:skel-beam-left 5s ease-in-out infinite alternate}#tiknation-gift-engine[data-style=skeleton] .skeleton-disco-lights i:nth-child(2){animation:skel-beam-right 5.6s ease-in-out infinite alternate}#tiknation-gift-engine[data-style=skeleton] .skeleton-disco-lights i:nth-child(3){animation:skel-beam-mid 4.8s ease-in-out infinite alternate}#tiknation-gift-engine[data-style=skeleton] .skeleton-disco-lights i:nth-child(4){animation:skel-beam-mid 5.4s ease-in-out infinite alternate-reverse}@keyframes skel-ball-glint{from{opacity:.45;transform:translateX(-8%)}to{opacity:1;transform:translateX(8%)}}@keyframes skel-fog-drift{from{transform:translateX(-8%) scaleY(.8)}to{transform:translateX(8%) scaleY(1.15)}}@keyframes skel-beam-left{from{transform:rotate(-34deg);opacity:.18}to{transform:rotate(8deg);opacity:.62}}@keyframes skel-beam-right{from{transform:rotate(34deg);opacity:.18}to{transform:rotate(-8deg);opacity:.62}}@keyframes skel-beam-mid{from{transform:rotate(-14deg);opacity:.2}to{transform:rotate(18deg);opacity:.58}}@media(prefers-reduced-motion:reduce){#tiknation-gift-engine[data-style=skeleton] .skeleton-fog,#tiknation-gift-engine[data-style=skeleton] .skeleton-disco-ball span{animation:none!important}}";
  const skeletonTitle=document.createElement("div");skeletonTitle.className="cinema-title";skeletonTitle.textContent=gift.name||"SKELETON DISCO";const skeletonSub=document.createElement("small");skeletonSub.textContent="THE BONES ARE GROOVING · TIKNATION LIVE";skeletonTitle.appendChild(skeletonSub);world.appendChild(skeletonTitle);
  overlay.appendChild(world);document.body.appendChild(overlay);
  /* V13: drive every skeleton joint directly in SVG user coordinates. This avoids CSS/SMIL transform conflicts. */
  const dancer=world.querySelector(".skeleton-dancer");
  if(dancer&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
   const joints={
    torso:world.querySelector(".skel-torso"),head:world.querySelector(".skel-head"),
    leftArm:world.querySelector(".skel-arm-left"),leftForearm:world.querySelector(".skel-forearm-left"),
    rightArm:world.querySelector(".skel-arm-right"),rightForearm:world.querySelector(".skel-forearm-right"),
    leftLeg:world.querySelector(".skel-leg-left"),leftShin:world.querySelector(".skel-shin-left"),
    rightLeg:world.querySelector(".skel-leg-right"),rightShin:world.querySelector(".skel-shin-right")
   };
   const setJoint=(el,angle,x,y)=>{if(el)el.setAttribute("transform","rotate("+angle.toFixed(2)+" "+x+" "+y+")");};
   const dance=(now)=>{
    if(!overlay.isConnected)return;
    const t=now/1000,beat=t*Math.PI*2/1.05;
    const step=Math.sin(beat),alt=Math.sin(beat+Math.PI);
    setJoint(joints.torso,Math.sin(beat*.5)*8,250,300);
    setJoint(joints.head,Math.sin(beat*1.5)*13,250,180);
    setJoint(joints.leftArm,-18+Math.sin(beat+0.7)*88,183,224);
    setJoint(joints.leftForearm,Math.sin(beat+1.8)*72,145,270);
    setJoint(joints.rightArm,18+Math.sin(beat+Math.PI+0.7)*88,317,224);
    setJoint(joints.rightForearm,Math.sin(beat+Math.PI+1.8)*72,378,165);
    setJoint(joints.leftLeg,step*27,229,403);
    setJoint(joints.leftShin,Math.max(0,step)*-48+Math.max(0,-step)*18,195,477);
    setJoint(joints.rightLeg,alt*27,271,403);
    setJoint(joints.rightShin,Math.max(0,alt)*-48+Math.max(0,-alt)*18,307,474);
    dancer.style.setProperty("--dance-bob",(Math.abs(step)*-15)+"px");
    requestAnimationFrame(dance);
   };
   requestAnimationFrame(dance);
  }
  if(typeof opts.onSound==="function"){try{opts.onSound()}catch(_){}}const skeletonDuration=Math.max(7000,Number(opts.duration)||9000);setTimeout(()=>{if(overlay.isConnected){overlay.style.transition="opacity .55s ease";overlay.style.opacity="0";setTimeout(()=>overlay.remove(),580)}},skeletonDuration);return overlay;
 }
 if(style==="meteor"){
  world.classList.add("meteor-stage");
  let meteorStyle=document.getElementById("tiknation-meteor-style");
  if(!meteorStyle){meteorStyle=document.createElement("style");meteorStyle.id="tiknation-meteor-style";document.head.appendChild(meteorStyle);}
  meteorStyle.textContent=`
  #tiknation-gift-engine[data-style=meteor]{background:radial-gradient(ellipse at 50% 70%,rgba(95,37,18,.42),rgba(2,5,14,.98) 72%)!important}
  #tiknation-gift-engine[data-style=meteor] .meteor-stage{background:radial-gradient(ellipse at 50% 82%,rgba(255,107,35,.22),transparent 38%),linear-gradient(160deg,#080d1b,#17101a 58%,#03050c)}
  #tiknation-gift-engine[data-style=meteor] .meteor-stage:before{content:"";position:absolute;z-index:1;left:-35%;top:17%;width:82vw;height:18px;border-radius:50%;background:linear-gradient(90deg,transparent,rgba(255,110,35,.05) 18%,#ff7b27 65%,#fff5bd);filter:blur(7px);transform:rotate(28deg);animation:meteor-trail 1.65s cubic-bezier(.2,.7,.3,1) both}
  #tiknation-gift-engine[data-style=meteor] .meteor-stage:after{content:"";position:absolute;z-index:1;left:50%;top:58%;width:min(48vw,300px);aspect-ratio:1;border:5px solid rgba(255,208,119,.9);border-radius:50%;box-shadow:0 0 28px #ff762e,inset 0 0 22px #ff9a42;opacity:0;transform:translate(-50%,-50%) scale(.12);animation:meteor-impact 2.8s 1.35s ease-out both}
  #tiknation-gift-engine[data-style=meteor] .cinema-art{z-index:3;width:min(82vw,560px);animation:meteor-flight 2.05s cubic-bezier(.18,.72,.2,1) both;filter:drop-shadow(0 0 26px #ff7a22) drop-shadow(0 18px 28px #000b)}
  #tiknation-gift-engine[data-style=meteor] .cinema-object{animation:meteor-spin 2.1s ease-in-out both}
  #tiknation-gift-engine[data-style=meteor] .meteor-flames{filter:drop-shadow(0 0 13px #ff4a12)}
  #tiknation-gift-engine[data-style=meteor] .meteor-shower-streak{position:absolute;z-index:2;left:var(--sx);top:var(--sy);width:var(--len);height:var(--thick);border-radius:50%;transform:rotate(var(--angle));transform-origin:left center;opacity:0;background:linear-gradient(90deg,transparent 0%,rgba(255,72,20,.12) 22%,#ff6b25 67%,#ffe3a0 91%,#fff 100%);filter:drop-shadow(0 0 7px #ff742b);animation:meteor-shower-flight var(--dur) linear var(--delay) both;pointer-events:none}
  #tiknation-gift-engine[data-style=meteor] .meteor-shower-streak:after{content:"";position:absolute;right:-3px;top:50%;width:var(--head);height:var(--head);border-radius:50%;transform:translateY(-50%);background:#fff5c9;box-shadow:0 0 8px 3px #ffcf72,0 0 20px 7px #ff6725}
  #tiknation-gift-engine[data-style=meteor] .meteor-spark{position:absolute;z-index:2;left:var(--sx);top:var(--sy);width:var(--size);height:var(--size);border-radius:50%;background:radial-gradient(circle,#fff8ce 0 18%,#ffbd55 35%,#ff4c16 70%,transparent 100%);box-shadow:0 0 12px #ff8b35;opacity:0;animation:meteor-ember var(--dur) ease-out var(--delay) both;pointer-events:none}
  #tiknation-gift-engine[data-style=meteor] .meteor-dust{position:absolute;z-index:2;left:50%;top:59%;width:32vw;height:9vh;border-radius:50%;background:radial-gradient(ellipse,rgba(255,112,43,.48),rgba(100,65,61,.18) 48%,transparent 72%);filter:blur(12px);opacity:0;animation:meteor-dust 2.2s 1.55s ease-out both}
  #tiknation-gift-engine[data-style=meteor] .meteor-boss{position:absolute;z-index:6;left:50%;top:-28%;width:clamp(176px,43vw,390px);aspect-ratio:1;border-radius:44% 56% 48% 52%;background:radial-gradient(circle at 29% 24%,#fffde0 0 2%,#fff0a1 5%,#ffc14f 12%,#ff7624 25%,#a9361b 49%,#401b1d 72%,#160e18 100%);box-shadow:inset -18px -20px 24px #170c17,inset 8px 7px 18px #fff0a0,0 0 28px 12px #ff702c,0 0 85px 34px #ff3d16;opacity:0;transform:translateX(-50%) rotate(22deg);animation:meteor-boss-flight 2.15s 3.7s cubic-bezier(.2,.7,.2,1) both}
  #tiknation-gift-engine[data-style=meteor] .meteor-boss:before{content:"";position:absolute;width:230%;height:75%;right:58%;top:12%;border-radius:50%;background:linear-gradient(90deg,transparent,#ff3b13 25%,#ff8a28 58%,#fff2ad 90%,transparent);filter:blur(12px);transform:rotate(-8deg)}
  #tiknation-gift-engine[data-style=meteor] .meteor-boss:after{content:"";position:absolute;inset:18%;border-radius:50%;background:radial-gradient(circle at 30% 40%,#54201b 0 7%,transparent 8%),radial-gradient(circle at 70% 62%,#4a1c18 0 10%,transparent 11%),radial-gradient(circle at 62% 25%,#6d2b1c 0 6%,transparent 7%);filter:blur(2px)}
  #tiknation-gift-engine[data-style=meteor] .meteor-crater{position:absolute;z-index:4;left:50%;top:70%;width:min(68vw,470px);height:13vh;border-radius:50%;transform:translate(-50%,-50%) scale(.12);opacity:0;background:radial-gradient(ellipse at center,#05070b 0 27%,#25110d 38%,#a83c17 48%,#ff9a32 54%,rgba(255,92,24,.38) 63%,transparent 74%);box-shadow:0 0 24px #ff5a1d,inset 0 0 24px #000;animation:meteor-crater-open 1.1s 5.72s ease-out both}
  #tiknation-gift-engine[data-style=meteor] .meteor-smoke{position:absolute;z-index:5;left:var(--smx);top:68%;width:var(--sms);height:var(--sms);border-radius:50%;opacity:0;background:radial-gradient(circle at 38% 35%,rgba(178,177,174,.72),rgba(66,67,72,.66) 48%,rgba(25,27,34,.08) 75%,transparent 78%);filter:blur(5px);animation:meteor-smoke-rise var(--smd) ease-out var(--sml) both}
  #tiknation-gift-engine[data-style=meteor] .meteor-debris{position:absolute;z-index:6;left:50%;top:69%;width:var(--mds);height:var(--mds);border-radius:35% 60% 45% 55%;background:linear-gradient(135deg,#ffe29a,#ff7426 42%,#4b2019 78%);box-shadow:0 0 12px #ff6a24;opacity:0;animation:meteor-debris-burst var(--mdd) cubic-bezier(.12,.72,.18,1) var(--mdl) both}
  @keyframes meteor-debris-burst{0%{opacity:0;transform:translate(-50%,-50%) scale(.2) rotate(0)}12%{opacity:1}100%{opacity:0;transform:translate(var(--mdx),var(--mdy)) scale(.15) rotate(var(--mdr))}}
  #tiknation-gift-engine[data-style=meteor] .meteor-final-flash{position:absolute;inset:0;z-index:7;background:radial-gradient(ellipse at 50% 70%,#fff9d7 0,rgba(255,188,85,.9) 8%,rgba(255,70,22,.55) 25%,transparent 65%);opacity:0;animation:meteor-final-blast 1.05s 5.68s ease-out both;pointer-events:none}
  @keyframes meteor-boss-flight{0%{opacity:0;transform:translate(-50%,-8vh) rotate(22deg) scale(.28)}10%{opacity:1}58%{opacity:1;transform:translate(-50%,58vh) rotate(105deg) scale(1.08)}78%{opacity:1;transform:translate(-50%,83vh) rotate(155deg) scale(1.18)}90%{opacity:1;transform:translate(-50%,94vh) rotate(165deg) scale(1.22)}100%{opacity:0;transform:translate(-50%,101vh) rotate(180deg) scale(1.3)}}
  @keyframes meteor-crater-open{0%{opacity:0;transform:translate(-50%,-50%) scale(.12)}35%{opacity:1;transform:translate(-50%,-50%) scale(1.12)}100%{opacity:1;transform:translate(-50%,-50%) scale(1)}}
  @keyframes meteor-smoke-rise{0%{opacity:0;transform:translate(0,24px) scale(.35)}20%{opacity:.85}100%{opacity:0;transform:translate(var(--smx-drift),-125px) scale(1.65)}}
  @keyframes meteor-ground-flames{0%{opacity:0;transform:translate(-50%,-50%) scale(.2)}20%{opacity:1}55%{opacity:.85;transform:translate(-50%,-50%) scale(1.15)}100%{opacity:0;transform:translate(-50%,-65%) scale(1.45)}}
  @keyframes meteor-final-blast{0%{opacity:0}12%{opacity:1}38%{opacity:.82}100%{opacity:0}}
  #tiknation-gift-engine[data-style=meteor] .meteor-stage{animation:meteor-camera-shake .9s 5.68s ease-out both}
  @keyframes meteor-camera-shake{0%,100%{transform:translate3d(0,0,0)}12%{transform:translate3d(-9px,5px,0)}24%{transform:translate3d(8px,-4px,0)}36%{transform:translate3d(-6px,3px,0)}50%{transform:translate3d(5px,-2px,0)}68%{transform:translate3d(-2px,1px,0)}}
  @keyframes meteor-shower-flight{0%{opacity:0;transform:translate3d(0,0,0) rotate(var(--angle)) scaleX(.45)}12%{opacity:1}72%{opacity:.9}100%{opacity:0;transform:translate3d(var(--dx),var(--dy),0) rotate(var(--angle)) scaleX(1.1)}}
  @keyframes meteor-ember{0%{opacity:0;transform:translate(0,0) scale(.2)}15%{opacity:1}100%{opacity:0;transform:translate(var(--ex),var(--ey)) scale(.05)}}
  @keyframes meteor-dust{0%{opacity:0;transform:translate(-50%,-50%) scale(.2)}25%{opacity:.9}100%{opacity:0;transform:translate(-50%,-20%) scale(2.8)}}
  #tiknation-gift-engine[data-style=meteor] .cinema-stage:before{height:34px;filter:blur(10px);box-shadow:0 0 28px #ff5b1e}
  #tiknation-gift-engine[data-style=meteor] .cinema-title{z-index:5;text-shadow:0 0 16px #ff8b36,0 3px 14px #000}
  #tiknation-gift-engine[data-style=meteor] .cinema-title small{color:#ffe0b6}
  @keyframes meteor-trail{0%{opacity:0;transform:translate(-22vw,-28vh) rotate(28deg) scaleX(.2)}35%{opacity:1}100%{opacity:.12;transform:translate(68vw,42vh) rotate(28deg) scaleX(1.15)}}
  @keyframes meteor-flight{0%{opacity:0;transform:translate(-70vw,-55vh) rotate(18deg) scale(.35)}18%{opacity:1}72%{transform:translate(5vw,3vh) rotate(8deg) scale(1.12)}100%{opacity:1;transform:translate(0,0) rotate(0) scale(1.08)}}
  @keyframes meteor-spin{0%{transform:rotate(-38deg) scale(.7)}65%{transform:rotate(20deg) scale(1.08)}100%{transform:rotate(0) scale(1)}}
  @keyframes meteor-impact{0%{opacity:0;transform:translate(-50%,-50%) scale(.12)}18%{opacity:1}100%{opacity:0;transform:translate(-50%,-50%) scale(2.1)}}
  @media(prefers-reduced-motion:reduce){#tiknation-gift-engine[data-style=meteor] .cinema-art,#tiknation-gift-engine[data-style=meteor] .meteor-stage:before,#tiknation-gift-engine[data-style=meteor] .meteor-stage:after,#tiknation-gift-engine[data-style=meteor] .meteor-shower-streak{animation:none!important;opacity:1}}
  `;
  const reducedMotion=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const showerPaths=[
   [3,-8,17,1.35,18,56,68],[22,-12,31,1.55,42,48,78],[47,-9,24,1.2,64,42,72],
   [73,-15,39,1.7,88,35,82],[91,4,22,1.25,25,38,72],[12,22,34,1.8,112,52,68],
   [58,9,19,1.15,136,35,72],[82,26,28,1.55,158,32,76],[34,-18,43,1.9,184,46,82],
   [5,42,20,1.3,205,36,66],[68,38,35,1.65,228,40,80],[43,16,16,1.1,252,44,62],
   [95,48,25,1.45,276,30,74],[18,55,30,1.7,298,48,78],[54,52,22,1.3,322,35,68],
   [78,60,38,1.8,345,28,84],[30,34,18,1.2,368,42,64],[62,-5,32,1.6,392,50,78]
  ];
  showerPaths.forEach(([x,y,len,dur,delay,dx,dy],i)=>{
   const streak=document.createElement("i");streak.className="meteor-shower-streak";
   streak.style.setProperty("--sx",x+"%");streak.style.setProperty("--sy",y+"%");
   streak.style.setProperty("--len",len+"vw");streak.style.setProperty("--thick",(i%4===0?6:3+i%3)+"px");
   streak.style.setProperty("--head",(i%3===0?11:7)+"px");streak.style.setProperty("--angle",(24+(i%4)*7)+"deg");
   streak.style.setProperty("--dur",dur+"s");streak.style.setProperty("--delay",(delay/100)+"s");
   streak.style.setProperty("--dx",dx+"vw");streak.style.setProperty("--dy",dy+"vh");
   if(reducedMotion){streak.style.opacity="1";streak.style.animation="none";}
   world.appendChild(streak);
  });
  if(!reducedMotion){
   for(let i=0;i<24;i++){const spark=document.createElement("i");spark.className="meteor-spark";const angle=(Math.PI*2*i)/24;const distance=90+(i%6)*22;spark.style.setProperty("--sx",(34+(i%7)*5)+"%");spark.style.setProperty("--sy",(42+(i%5)*5)+"%");spark.style.setProperty("--size",(4+(i%4)*2)+"px");spark.style.setProperty("--ex",(Math.cos(angle)*distance)+"px");spark.style.setProperty("--ey",(Math.sin(angle)*distance)+"px");spark.style.setProperty("--dur",(1.0+(i%4)*.22)+"s");spark.style.setProperty("--delay",(1.35+(i%6)*.035)+"s");world.appendChild(spark);}
   const dust=document.createElement("i");dust.className="meteor-dust";world.appendChild(dust);
   const boss=document.createElement("i");boss.className="meteor-boss";world.appendChild(boss);
   const crater=document.createElement("i");crater.className="meteor-crater";world.appendChild(crater);
   const groundFire=document.createElement("i");groundFire.className="meteor-ground-fire";world.appendChild(groundFire);
   for(let i=0;i<18;i++){const debris=document.createElement("i");debris.className="meteor-debris";const angle=(Math.PI*2*i)/18;const distance=90+(i%6)*34;debris.style.setProperty("--mds",(7+(i%4)*5)+"px");debris.style.setProperty("--mdd",(1.0+(i%4)*.18)+"s");debris.style.setProperty("--mdl",(5.72+(i%5)*.012)+"s");debris.style.setProperty("--mdx",(Math.cos(angle)*distance)+"px");debris.style.setProperty("--mdy",(Math.sin(angle)*distance*.55-25)+"px");debris.style.setProperty("--mdr",(i*47)+"deg");world.appendChild(debris);}
   for(let i=0;i<9;i++){const smoke=document.createElement("i");smoke.className="meteor-smoke";smoke.style.setProperty("--smx",(35+(i%5)*7)+"%");smoke.style.setProperty("--sms",(48+(i%4)*20)+"px");smoke.style.setProperty("--smd",(2.2+(i%3)*.5)+"s");smoke.style.setProperty("--sml",(5.82+(i%5)*.12)+"s");smoke.style.setProperty("--smx-drift",((i%2?1:-1)*(18+(i%4)*9))+"px");world.appendChild(smoke);}
   const finalFlash=document.createElement("i");finalFlash.className="meteor-final-flash";world.appendChild(finalFlash);
  }
 }
 const reduced=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 if(!reduced){for(let i=0;i<10;i++){const mote=document.createElement("i");mote.className="cinema-mote";mote.style.setProperty("--mx",(Math.cos(i*2.4)*42)+"vw");mote.style.setProperty("--my",(Math.sin(i*2.4)*34)+"vh");mote.style.setProperty("--wait",(i*.19)+"s");world.appendChild(mote);}}
 overlay.appendChild(world);document.body.appendChild(overlay);
 if(typeof opts.onSound==="function"){try{opts.onSound()}catch(_){}}
 const duration=Math.max(4500,Number(opts.duration)||6500);
 setTimeout(()=>{if(overlay.isConnected){overlay.style.transition="opacity .65s ease";overlay.style.opacity="0";setTimeout(()=>overlay.remove(),680)}},duration);
 return overlay;
}

const worlds={heartbeat:["heart","💓","❤️","💗","💓"],pulse:["magic","💗","💓","✨","💗"],notes:["party","🎵","🎶","🎼","🎵"],grand:["prism","🎼","🎻","🎺","🎶"],spark:["magic","✨","✦","✧","💫"],portal:["cosmic","🌀","✦","🪄","🌀"],dragon:["fire","🐉","🔥","💥","🐲"],galaxy:["cosmic","🌌","🪐","⭐","🌠"],burst:["stormlight","⚡","💥","✨","⚡"],prism:["prism","🌈","💎","✨","🌈"],surprise:["magic","🎁","❔","✨","🎉"],crown:["gold","👑","✨","💎","👑"],infinity:["cosmic","💎","♾️","✨","💠"],clouds:["ice","☁️","🌫️","✨","☁️"],hammer:["impact","🔨","💥","⭐","🔨"],thunderass:["stormlight","⚡","🍑","💥","⚡"],lightning:["stormlight","⚡","💀","⚡","🌩️"],book:["shadow","📕","☠️","🌫️","📖"],dreammakers:["magic","🧚","✨","🌟","🪄"],phoenix:["fire","🪽","🔥","🌅","🪽"],treasure:["gold","💰","💎","🪙","🏆"],meteor:["impact","☄️","🔥","💥","🌠"],raccoon:["party","🦝","🪩","🎵","🦝"],portalparty:["prism","🌀","🎉","✨","🌀"],blastass:["impact","💨","🍑","💥","💨"],deathass:["shadow","☠️","💀","🌑","☠️"],throne:["gold","👑","🚽","✨","🏆"],chicken:["fire","🐔","💥","🪶","🐓"],cheese:["gold","🧀","☄️","💥","🧀"],skeleton:["party","💀","🪩","🎶","💀"],dragonrevenge:["fire","🐉","🔥","💥","🐲"],stinkdeath:["shadow","💨","💀","☣️","💨"],rattlebone:["shadow","🦴","💀","⚡","🦴"],toxiccloud:["shadow","☣️","💚","🪰","☣️"],bonebreaker:["impact","💀","🦴","👎","💀"],knockout:["impact","🥊","💥","⭐","🥊"],cantbreathe:["party","😂","💀","💧","😂"]};
if(gift.style==="dragon"||gift.style==="dragonrevenge"){const world=document.createElement("div");world.className="dragon-v2";const dragon=document.createElement("div");dragon.className="dragon-flight-v2";dragon.innerHTML=`<svg class="dragon-svg-v5" viewBox="0 0 1100 700" role="img" aria-label="A long, golden and jade Chinese celestial dragon with antler horns, whiskers, flowing mane, four clawed legs and a serpentine body">
<defs>
 <linearGradient id="c5Body" x1="0" y1="0" x2=".2" y2="1"><stop stop-color="#fff0a2"/><stop offset=".22" stop-color="#dcae42"/><stop offset=".48" stop-color="#9a5a22"/><stop offset=".72" stop-color="#315d4c"/><stop offset="1" stop-color="#15352f"/></linearGradient>
 <linearGradient id="c5Belly" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#fff0bf"/><stop offset="1" stop-color="#bd8851"/></linearGradient>
 <linearGradient id="c5Mane" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff3a6"/><stop offset=".5" stop-color="#e85a25"/><stop offset="1" stop-color="#a51e22"/></linearGradient>
 <linearGradient id="c5Horn" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff5c6"/><stop offset="1" stop-color="#9b6a38"/></linearGradient>
 <radialGradient id="c5Eye"><stop stop-color="#fffbd0"/><stop offset=".35" stop-color="#ffcf45"/><stop offset="1" stop-color="#e33b18"/></radialGradient>
 <pattern id="c5Scales" width="22" height="18" patternUnits="userSpaceOnUse"><path d="M1 2Q11 15 21 2M-10 10Q0 23 10 10M12 10Q22 23 32 10" fill="none" stroke="#fff0b1" stroke-opacity=".35" stroke-width="2.5"/></pattern>
 <filter id="c5Glow" x="-40%" y="-60%" width="180%" height="220%"><feGaussianBlur stdDeviation="10"/></filter>
 <filter id="c5Undulate" x="-12%" y="-18%" width="124%" height="136%"><feTurbulence type="fractalNoise" baseFrequency=".007 .016" numOctaves="2" seed="8" result="wave"><animate attributeName="baseFrequency" values=".006 .014;.012 .022;.006 .014" dur="2.1s" repeatCount="indefinite"/></feTurbulence><feDisplacementMap in="SourceGraphic" in2="wave" scale="15" xChannelSelector="R" yChannelSelector="G"/></filter>
</defs>
<!-- Live, depth-shaded body sections are positioned along a moving 3D-style coil. -->
<g id="c5BodySections">
 <path id="c5BodyOutline" fill="none" stroke="#102b28" stroke-width="91" stroke-linecap="round" stroke-linejoin="round"/>
 <path id="c5BodyCore" fill="none" stroke="url(#c5Body)" stroke-width="78" stroke-linecap="round" stroke-linejoin="round"/>
 <path id="c5BodyScale" fill="none" stroke="url(#c5Scales)" stroke-width="69" stroke-linecap="round" stroke-linejoin="round" opacity=".8"/>
 <path id="c5BodyBelly" fill="none" stroke="url(#c5Belly)" stroke-width="19" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>
</g>
<path class="c5-tail" d="M112 430Q48 398 28 342Q83 370 124 397Q86 337 104 291Q143 353 155 405Q180 359 225 345Q197 414 151 447Z" fill="url(#c5Mane)" stroke="#783c27" stroke-width="6"/>
<!-- four agile legs with curved claws -->
<g fill="url(#c5Body)" stroke="#704522" stroke-width="8" stroke-linejoin="round">
 <path d="M302 472Q270 500 264 548L222 578Q208 598 235 607L294 590L328 526Z"/>
 <path d="M424 345Q399 377 407 422L380 461Q379 484 405 477L456 438L463 378Z"/>
 <path d="M622 321Q655 347 664 391L705 414Q716 434 689 444L635 421L601 369Z"/>
 <path d="M748 223Q781 247 785 286L824 309Q837 331 809 340L759 316L728 272Z"/>
</g>
<g fill="#fff0c2" stroke="#6b472c" stroke-width="4">
 <path d="M222 578l-26 25 34-7 16 17 11-29Z"/><path d="M380 461l-19 26 32-9 15 16 12-30Z"/>
 <path d="M689 435l-8 29 31-14 18 8 1-28Z"/><path d="M809 331l-4 27 28-15 18 8-2-27Z"/>
</g>
<!-- mane and flame-like fur along the neck -->
<g class="c5-mane" fill="url(#c5Mane)" stroke="#71372b" stroke-width="5" stroke-linejoin="round">
 <path d="M735 246Q690 190 705 127Q739 160 755 196Q759 129 814 91Q802 154 809 204Q851 153 906 159Q867 207 867 246Z"/>
 <path d="M775 292Q716 291 683 249Q739 254 774 265Q736 219 746 176Q785 220 812 252Z"/>
 <path d="M842 309Q861 352 835 397Q824 354 821 330Q798 370 755 378Q782 337 792 305Z"/>
</g>
<!-- Chinese dragon head, long muzzle and jade scales -->
<path d="M780 234Q819 182 889 187Q956 187 1000 236L1040 280Q1027 316 985 332Q930 349 868 319L818 289Z" fill="url(#c5Body)" stroke="#704522" stroke-width="9"/>
<path d="M850 290Q922 326 1017 294L1030 316Q986 369 912 354Q863 339 850 290Z" fill="url(#c5Belly)" stroke="#80512e" stroke-width="6"/>
<path d="M872 245Q929 213 989 248L1005 275Q944 258 891 282Z" fill="#254d3e" stroke="#d5b45e" stroke-width="5"/>
<ellipse cx="949" cy="258" rx="18" ry="13" fill="url(#c5Eye)"/><ellipse cx="953" cy="258" rx="4" ry="12" fill="#151b17"/>
<path d="M1003 287l24 1M997 301l25 1" stroke="#30231c" stroke-width="6" stroke-linecap="round"/>
<path d="M904 315l12 23 12-19M951 322l12 22 13-22" fill="#fff2d2" stroke="#78502e" stroke-width="3"/>
<!-- branching antler horns -->
<g fill="none" stroke="url(#c5Horn)" stroke-width="17" stroke-linecap="round" stroke-linejoin="round">
 <path d="M865 203Q837 157 853 103Q876 137 881 165Q896 112 943 90Q923 142 903 178"/>
 <path d="M930 194Q938 143 982 116Q970 158 954 188"/>
</g>
<!-- long whiskers -->
<g class="c5-whiskers" fill="none" stroke="#f5d58c" stroke-width="7" stroke-linecap="round">
 <path d="M1000 298Q1056 290 1080 245Q1068 309 1020 326"/>
 <path d="M991 315Q1054 343 1077 388Q1030 371 1007 342"/>
 <path d="M918 286Q880 270 851 285Q882 294 899 305"/>
</g>
<!-- nostrils, brow and beard -->
<path d="M1012 273l14-7M1015 283l15-4" stroke="#35251d" stroke-width="6" stroke-linecap="round"/>
<path d="M895 229Q938 197 978 226" fill="none" stroke="#f4d27e" stroke-width="8" stroke-linecap="round"/>
<path d="M926 350Q912 390 883 410Q934 397 951 362Q963 405 997 419Q984 377 964 347Z" fill="url(#c5Mane)" stroke="#783c27" stroke-width="5"/>
<!-- golden dorsal whisker/spines -->
<g fill="#f3d37b" stroke="#81512d" stroke-width="3">
 <path d="M290 458l-7-34 27 25Z"/><path d="M348 365l7-35 20 35Z"/><path d="M435 344l16-34 13 42Z"/>
 <path d="M530 365l23-30 8 41Z"/><path d="M623 313l27-30 2 43Z"/><path d="M708 231l27-30-4 40Z"/>
</g>
<!-- warm breath glow from the mouth -->
<g class="c5-breath">
 <path d="M1022 292Q1062 260 1095 280Q1065 295 1095 313Q1056 326 1020 304Z" fill="#ff5b20" opacity=".9" filter="url(#c5Glow)"/>
 <path d="M1018 294Q1062 275 1097 290Q1065 299 1096 306Q1054 314 1018 301Z" fill="#ffcf59"/>
 <path d="M1018 297Q1055 289 1080 297L1088 301Q1051 306 1018 300Z" fill="#fff6c7"/>
</g>
</svg>`;;;const title=document.createElement("div");title.className="dragon-title-v2";title.textContent=gift.name||"DRAGON SPIRIT";const sub=document.createElement("small");sub.textContent="THE FIRE AWAKENS";title.appendChild(sub);world.appendChild(dragon);
const bodySvg=dragon.querySelector("svg");
const bodyGroup=bodySvg&&bodySvg.querySelector("#c5BodySections");
if(bodyGroup){
 const paths=["c5BodyOutline","c5BodyCore","c5BodyScale","c5BodyBelly"].map(id=>bodySvg.querySelector("#"+id));
 const startAt=performance.now();
 const makeCoil=t=>{
  const a=18*Math.sin(t*1.05), b=24*Math.sin(t*1.05+1.7), c=20*Math.sin(t*1.05+3.2);
  return "M 112 430 C "+(185+a)+" "+(315+b)+" "+(270-a)+" "+(255-b)+" 365 315 C "+(465+c)+" "+(405+a)+" "+(505-c)+" "+(505-a)+" 600 405 C "+(700+b)+" "+(485-c)+" "+(730-b)+" "+(350+c)+" 790 275 C 810 250 826 244 850 250";
 };
 const animateBody=now=>{
  if(!overlay.isConnected)return;
  const d=makeCoil((now-startAt)/1000);
  paths.forEach(p=>{if(p)p.setAttribute("d",d)});
  const tail=bodySvg.querySelector(".c5-tail");
  if(tail)tail.setAttribute("transform","translate("+(-Math.sin((now-startAt)/1000*1.05)*5)+" "+(Math.sin((now-startAt)/1000*1.05)*7)+")");
  requestAnimationFrame(animateBody);
 };
 requestAnimationFrame(animateBody);
}
world.appendChild(title);overlay.appendChild(world);document.body.appendChild(overlay);if(typeof opts.onSound==="function"){try{opts.onSound()}catch(_){}}const dragonDuration=Math.max(5000,Number(opts.duration)||6500);setTimeout(()=>{if(overlay.isConnected){overlay.style.transition="opacity .5s ease";overlay.style.opacity="0";setTimeout(()=>overlay.remove(),520)}},dragonDuration);return overlay;}return renderCinematicGift(gift,opts,overlay);const scene=worlds[gift.style];if(scene){const world=document.createElement("div");world.className="gift-world";world.dataset.world=scene[0];const halo=document.createElement("div");halo.className="world-halo";const ground=document.createElement("div");ground.className="world-ground";const beam=document.createElement("div");beam.className="world-beam";const hero=document.createElement("div");hero.className="world-hero";hero.textContent=scene[1];const left=document.createElement("div");left.className="world-side left";left.textContent=scene[2];const right=document.createElement("div");right.className="world-side right";right.textContent=scene[3];const title=document.createElement("div");title.className="world-title";title.textContent=gift.name||"TikNation Gift";const message=document.createElement("span");message.className="world-message";message.textContent=gift.message||"A gift has arrived.";title.appendChild(message);world.append(halo,ground,beam,left,right,hero);
const motionStart=Date.now();let motionTimer=0;function animateWorld(){if(!overlay.isConnected){if(motionTimer)clearInterval(motionTimer);return;}const t=(Date.now()-motionStart)/1000;const entry=Math.min(1,(Date.now()-motionStart)/950);const ease=1-Math.pow(1-entry,3);hero.style.opacity=String(ease);hero.style.transform="translate(-50%,calc(-50% + "+((1-ease)*150+Math.sin(t*1.8)*10)+"px)) scale("+(0.25+ease*.82+Math.sin(t*2.1)*.07)+") rotate("+((1-ease)*-24+Math.sin(t*1.4)*5)+"deg)";halo.style.transform="rotate("+((t*42)%360)+"deg) scale("+(1+Math.sin(t*1.7)*.09)+")";ground.style.transform="scale("+(1.05+Math.sin(t*2.4)*.22)+")";ground.style.opacity=String(.58+Math.sin(t*2.4)*.2);beam.style.transform="rotate("+Math.sin(t*1.35)*27+"deg)";beam.style.opacity=String(.5+Math.sin(t*1.35)*.35);left.style.transform="translateY("+Math.sin(t*1.8)*38+"px) rotate("+Math.sin(t*1.5)*15+"deg) scale("+(1+Math.sin(t*1.8)*.12)+")";right.style.transform="translateY("+Math.sin(t*1.55+2)*42+"px) rotate("+Math.sin(t*1.3+2)*15+"deg) scale("+(1+Math.sin(t*1.55+2)*.12)+")";} for(let i=0;i<18;i++){const p=document.createElement("span");p.className="world-particle";p.textContent=[scene[4],"✦","•","✧"][i%4];p.style.setProperty("--x",((i%2?1:-1)*(70+(i%6)*34))+"px");p.style.setProperty("--delay",(i*.11)+"s");world.appendChild(p);try{p.animate([{opacity:0,transform:"translate(-50%,20vh) scale(.2)"},{opacity:1,offset:.18},{opacity:0,transform:"translate(calc(-50% + "+((i%2?1:-1)*(70+(i%6)*34))+"px),-65vh) scale(1.1)"}],{duration:2800,delay:i*110,iterations:Infinity,easing:"ease-out"});}catch(_){}}world.appendChild(title);overlay.appendChild(world);document.body.appendChild(overlay);animateWorld();motionTimer=setInterval(animateWorld,32);if(typeof opts.onSound==="function"){try{opts.onSound()}catch(_){}}const sceneDuration=Math.max(4000,Number(opts.duration)||6500);setTimeout(()=>{if(overlay.isConnected){overlay.style.transition="opacity .5s ease";overlay.style.opacity="0";setTimeout(()=>overlay.remove(),520)}},sceneDuration);return overlay;}const stage=document.createElement("div");stage.className="stage";const ring=document.createElement("div");ring.className="ring";const hero=document.createElement("div");hero.className="hero";hero.textContent=gift.emoji||"🎁";hero.setAttribute("aria-hidden","true");const title=document.createElement("div");title.className="title";title.textContent=gift.name||"TikNation Gift";const message=document.createElement("div");message.className="message";message.textContent=gift.message||"A gift has arrived.";const meta=document.createElement("div");meta.className="meta";meta.textContent=opts.meta||"TIKNATION LIVE · GIFT RECEIVED";stage.append(ring,hero,title,message,meta);if(!window.matchMedia||!window.matchMedia("(prefers-reduced-motion: reduce)").matches){const symbols=["✦","✧","✶","•","✷","⋆"];for(let i=0;i<28;i++){const p=document.createElement("span");const a=Math.PI*2*i/28,d=110+(i%5)*42;p.className="particle";p.textContent=symbols[i%symbols.length];p.style.setProperty("--dx",Math.cos(a)*d+"px");p.style.setProperty("--dy",Math.sin(a)*d+"px");p.style.setProperty("--delay",(i%7)*.035+"s");stage.appendChild(p)}}overlay.appendChild(stage);document.body.appendChild(overlay);if(typeof opts.onSound==="function"){try{opts.onSound()}catch(_){}}const duration=Math.max(1800,Number(opts.duration)||4300);setTimeout(()=>{if(overlay.isConnected){overlay.style.transition="opacity .35s ease";overlay.style.opacity="0";setTimeout(()=>overlay.remove(),380)}},duration);return overlay}
const giftQueue=[];let giftPlaying=false;
function playNextGift(){const item=giftQueue.shift();if(!item){giftPlaying=false;return;}giftPlaying=true;const duration=Math.max(4500,Number(item.opts&&item.opts.duration)||6500);try{renderGift(item.gift,item.opts);}catch(error){console.error("Gift animation failed:",error);}setTimeout(()=>{giftPlaying=false;playNextGift();},duration+600);}
function show(gift,opts){if(!gift||!document.body)return null;giftQueue.push({gift,opts:opts||{}});if(!giftPlaying)playNextGift();return true;}
window.TikNationGiftEngine=Object.freeze({show:show});
})();