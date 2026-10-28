/* ============ OPENBOX : boîtes à ouvrir ============ */
(function(){
const css=`
.obw{display:flex;flex-direction:column;align-items:center;gap:8px;padding-top:2px}
.obt{display:flex;justify-content:space-between;align-items:center;width:var(--st);font-weight:800;text-shadow:0 1px 3px #000}
.obt .mb{padding:6px 10px;font-size:13px}
.stage{position:relative;width:var(--st);height:var(--st);border-radius:14px;overflow:hidden;box-shadow:0 12px 30px #000a,0 0 0 2px #ffffff22 inset;user-select:none}
.bgf{position:absolute;inset:0;background-size:100% 100%}
.bgf.f1{filter:brightness(.9) hue-rotate(-6deg)}.bgf.f2{transform:scaleX(-1);filter:brightness(.95)}.bgf.f3{transform:scaleY(-1);filter:brightness(.92) hue-rotate(6deg)}.bgf.f5{transform:rotate(-90deg);filter:brightness(.7) saturate(.9)}.bgf.f4{transform:rotate(90deg);filter:brightness(1.08) saturate(1.1)}
.in{position:absolute}.p{position:absolute}
.nv{position:absolute;top:50%;transform:translateY(-50%);width:30px;height:56px;border:0;border-radius:12px;background:#000b;color:#f0c060;font-size:20px;z-index:5}
.nv.l{left:3px}.nv.r{right:3px}.nv.t{top:4px;left:50%;transform:translateX(-50%);width:56px;height:30px}.nv.b{top:auto;bottom:4px;left:50%;transform:translateX(-50%);width:56px;height:30px}
.fn{position:absolute;bottom:5px;left:0;right:0;text-align:center;font-size:11px;color:#fff;opacity:.7;text-shadow:0 1px 3px #000;pointer-events:none;z-index:4}
.invb{display:flex;gap:6px;width:var(--st);min-height:62px;padding:6px;background:#0a1420d9;border-radius:14px;box-shadow:0 0 0 1px #ffffff22 inset;overflow-x:auto;align-items:center}
.invb .it{flex:none;width:50px;height:50px;border-radius:10px;border:2px solid transparent;background:#ffffff12;display:flex;align-items:center;justify-content:center;padding:3px}
.invb .it img{max-width:100%;max-height:100%;object-fit:contain}.invb .it.sel{border-color:#f0c060;background:#f0c06033;box-shadow:0 0 10px #f0c060}
.invb .em{color:#b6c4d6;font-size:13px;padding:0 6px}
.note{width:36px;height:42px;background:linear-gradient(#f3e3b8,#d8be84);border-radius:3px;box-shadow:0 2px 4px #0008;position:relative}
.note::after{content:"";position:absolute;left:6px;right:6px;top:10px;height:3px;background:#8a6a2a66;box-shadow:0 7px #8a6a2a66,0 14px #8a6a2a66}
.plq{background:radial-gradient(ellipse at 50% 30%,#2a1a0e,#0e0805);border:2px solid #c9a24a;border-radius:14px;box-shadow:inset 0 3px 10px #000,0 2px 0 #ffffff33,0 4px 8px #0008}
.rdr{position:absolute;right:8px;bottom:8px;z-index:30;background:#000b;color:#e8c070;border:1.5px solid #c9a24a;border-radius:999px;padding:6px 12px;font:inherit;font-weight:800;font-size:13px}
/*.lg{display:grid*/
/*.smn{display:flex*/
/*.sls{display:flex*/
.lg{display:grid;gap:7%;width:100%;height:100%;align-content:center}.lm{aspect-ratio:1;background:none;border:0;padding:0;position:relative}.lm img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;transition:opacity .2s}.lm .ln{opacity:0}.lm.on .ln{opacity:1}
.smn{display:flex;align-items:center;justify-content:space-around;width:100%;height:100%;gap:2%}.sbt{flex:1;aspect-ratio:1;max-height:100%;background:none;border:0;padding:0;position:relative}.sbt img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}.sbt .ln{opacity:0;transition:opacity .08s}.sbt.fl .ln{opacity:1}.sgo{width:18%;aspect-ratio:1;border-radius:50%;border:3px solid #c9a24a;background:#000b;color:#e8c070;font-size:20px;font-weight:900;padding:0}
.pd.pp{background:none!important;box-shadow:none}.pd.pp img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}.pd.pp .ln{opacity:0}.pd.pp.fl .ln{opacity:1}.pd.pp.fl{animation:none}
.sls{container-type:size;--rh:calc(100cqh/var(--n,4) - 6px);display:flex;flex-direction:column;justify-content:space-around;width:100%;height:100%}.slc{display:flex;align-items:center;gap:8px;padding:0 6px;height:calc(100%/var(--n,4) - 6px);min-height:0}.slv{color:#e8c070;font-weight:900;min-width:1.1em;text-align:center;font-size:calc(var(--rh)*.8);text-shadow:0 2px 2px #000}.slr{flex:1;touch-action:none;-webkit-appearance:none;appearance:none;background:transparent;height:100%}.slr::-webkit-slider-runnable-track{height:calc(var(--rh)*.62);background:url(img/ob/xz0.webp) center/100% 100% no-repeat}.slr::-webkit-slider-thumb{-webkit-appearance:none;width:calc(var(--rh)*.9);height:calc(var(--rh)*.9);margin-top:calc(var(--rh)*-.14);background:url(img/ob/xz_k0.webp) center/contain no-repeat;border:0;border-radius:0}.slr::-moz-range-track{height:calc(var(--rh)*.62);background:url(img/ob/xz0.webp) center/100% 100% no-repeat}.slr::-moz-range-thumb{width:calc(var(--rh)*.9);height:calc(var(--rh)*.9);background:url(img/ob/xz_k0.webp) center/contain no-repeat;border:0;border-radius:0}
.wb{position:absolute;right:-2px;bottom:-2px;min-width:18px;height:18px;border-radius:9px;background:#e8c070;color:#2a1a08;font:900 12px/18px system-ui;text-align:center;font-style:normal;padding:0 3px;box-shadow:0 1px 3px #000a}.invb .it{position:relative}
.gg{display:flex;justify-content:space-around;align-items:center;width:100%;height:100%;gap:2%}.gd{position:relative;flex:1;aspect-ratio:1;max-height:100%;touch-action:none}.gd>img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}.gd .odg{position:absolute;transform:translate(-50%,-50%);font-weight:900;font-size:calc(var(--st)*.035);line-height:1;pointer-events:none}.gd .ond{position:absolute;left:47%;top:11%;width:6%;height:41%;transform-origin:50% 90%;transform:rotate(var(--a));pointer-events:none;transition:transform .12s}.gd .ond img{width:100%;height:100%;object-fit:fill;filter:drop-shadow(0 2px 2px #0008)}.gd .cp{position:absolute;left:41%;top:41%;width:18%;height:18%;pointer-events:none}.gd.ok{filter:drop-shadow(0 0 8px #5ee6a0)}
.bal{position:relative;width:100%;height:100%;container-type:size}.bi{--u:min(1.15cqw,1.15cqh);position:absolute;left:50%;top:0;width:calc(100*min(1.15cqw,1.15cqh));height:calc(100*min(1.15cqw,1.15cqh));transform:translateX(-50%)}.bi>*{position:absolute}.bi img{display:block}.bi .opan{background:none;border:0;padding:0}.bi .opan img{width:100%}.bi>div>img{width:100%;height:auto}.bi>div>img{width:100%;height:auto}.bi .wt{position:absolute;pointer-events:none}.bi .wt .wb{right:-3px;bottom:-3px;min-width:14px;height:14px;font-size:10px;line-height:14px}
.mg{display:grid;gap:5%;width:100%;height:100%;grid-auto-rows:1fr;place-content:center}.omc{aspect-ratio:1;background:none;border:0;padding:0;min-height:0;position:relative;justify-self:center;height:100%}.omc img{width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 2px 3px #0008)}.omc.up{animation:fl2 .3s}@keyframes fl2{from{transform:rotateY(80deg)}to{transform:none}}
.mr{position:relative;width:100%;height:100%;display:grid}.mr button{background:none;border:0;padding:0;position:relative}.mr .cl img{position:absolute;inset:2%;width:96%;height:96%;object-fit:contain}.mr .cl.e::after{content:"";position:absolute;left:46%;top:46%;width:8%;height:8%;border-radius:50%;background:#ffffff33}.mr svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.dl{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4%;width:100%;height:100%}.dd{position:relative;aspect-ratio:1;height:78%;touch-action:none}.dd>img{position:absolute;width:100%;height:100%;inset:0;object-fit:contain}.dd .odr{position:absolute;left:17%;top:17%;width:66%;height:66%;transform:rotate(var(--a))}.dd .odr img{width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 3px 4px #000a)}.dd .mk{position:absolute;left:44%;top:-6%;width:12%}.dd .mk img{width:100%}
.dok{display:flex;gap:10px;align-items:center}.dok b{font-size:calc(var(--st)*.07);color:#e8c070;min-width:2.2em;text-align:center;text-shadow:0 2px 3px #000}.dok button{border:2px solid #c9a24a;background:#000b;color:#e8c070;font-weight:900;border-radius:999px;padding:4px 14px;font-size:calc(var(--st)*.045)}.dok i{width:9px;height:9px;border-radius:50%;background:#ffffff33;display:inline-block}.dok i.on{background:#e8c070}


.opg{display:grid;width:100%;height:100%}.opg button{background:none;border:0;padding:0;position:relative;min-height:0}.opg img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;transition:transform .15s}
.hn{position:relative;width:100%;height:100%}.hn .hb{position:absolute;left:0;right:0;bottom:0;height:11%;border-radius:10px;background:linear-gradient(#7a5230,#3e2411 60%,#24130a);border-top:3px solid #d8b25a;box-shadow:0 6px 10px #000a,inset 0 2px 3px #fff4}.hn .hp{position:absolute;top:0;bottom:0;width:32%;background:none;border:0;padding:0}.hn .pg{position:absolute;left:50%;transform:translateX(-50%);bottom:10%;width:4%;height:82%;border-radius:999px 999px 2px 2px;background:linear-gradient(90deg,#6b4a14,#f0d27a 40%,#fff3c0 50%,#b88a2a 70%,#5a3c0e);box-shadow:0 0 6px #0008}.hn .hd2{position:absolute;left:50%;transform:translateX(-50%);height:8.5%;border-radius:999px;box-shadow:0 3px 4px #000a,inset 0 2px 2px #fff8,inset 0 -3px 3px #0006;transition:bottom .15s}.hn .hd2.top.sel{box-shadow:0 0 12px 3px #fff,inset 0 2px 2px #fff8,inset 0 -3px 3px #0006}.hn .hp.sel::after{content:"";position:absolute;left:50%;transform:translateX(-50%);top:0;border:9px solid transparent;border-top-color:#fff;filter:drop-shadow(0 0 4px #fff)}
.ock{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3%;width:100%;height:100%}.ock .cd{position:relative;aspect-ratio:1;height:80%;touch-action:none}.ock .cd>img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}.ock .hd{position:absolute;left:47.2%;top:12%;width:5.6%;height:40%;transform-origin:50% 88%;transform:rotate(var(--a));pointer-events:none;transition:transform .12s}.ock .hd.hh{top:22%;height:30%;left:46.4%;width:7.2%}.ock .hd img{width:100%;height:100%;object-fit:fill}.ock .ct{position:absolute;left:44%;top:44%;width:12%;pointer-events:none}.ock .ct img{width:100%}.ock b{font-size:calc(var(--st)*.06);color:#e8c070;text-shadow:0 2px 3px #000}
.vl{display:flex;flex-direction:column;align-items:center;justify-content:space-around;width:100%;height:100%}.vl .cz{height:44%;position:relative;aspect-ratio:1.1;display:flex;align-items:flex-end;justify-content:center}.vl .cz img{height:100%;width:auto}.vl .cz .pd2{position:absolute;top:0;display:flex;gap:3px}.vl .cz .pd2 i{width:10px;height:10px;border-radius:50%;box-shadow:0 0 4px #000a}.vl .vr{display:flex;justify-content:space-around;width:100%;height:46%;align-items:flex-end}.vl .vr button{background:none;border:0;padding:0;height:100%;flex:1;min-width:0}.vl .vr button img{height:100%;width:100%;object-fit:contain;filter:drop-shadow(0 3px 3px #0008)}
.pt{display:flex;flex-direction:column;justify-content:space-around;width:100%;height:100%}.pt .ps,.pt .pl{display:flex;justify-content:space-around;align-items:center;height:40%}.pt button{background:none;border:0;padding:0;position:relative;flex:1;height:100%;min-width:0}.pt button img.sk{width:100%;height:100%;object-fit:contain}.pt .pl button img{width:125%;height:100%;object-fit:contain;transform:translateX(-6%);filter:drop-shadow(0 2px 3px #0008)}.pt .pl button.sel{filter:drop-shadow(0 0 8px #fff)}.pt .ps button .pu{position:absolute;left:44%;top:10%;width:110%;height:80%;pointer-events:none}.pt .ps button .pu img{width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 2px 3px #0008)}
.rgs{position:relative;aspect-ratio:1;height:100%;margin:auto;touch-action:none}.rgs>img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}.rgs .rr{position:absolute;transform:rotate(var(--a));transition:transform .15s}.rgs .rr img{width:100%;height:100%;object-fit:contain}.rgs .tm{position:absolute;left:calc(50% - var(--w)/2);top:1%;width:var(--w);z-index:3;filter:drop-shadow(0 0 2px #fff) drop-shadow(0 0 2px #fff) drop-shadow(0 1px 3px #000)}.rgs .tm i{display:block;width:100%;aspect-ratio:1.1;background:var(--c);clip-path:polygon(50% 0,100% 100%,0 100%)}.rgs .nm{position:absolute;transform:translate(-50%,-50%);font-weight:900;font-size:calc(var(--st)*.03);color:#f0d890;text-shadow:0 1px 2px #000;pointer-events:none}
.mn2{display:flex;justify-content:space-around;align-items:center;width:100%;height:100%}.mn2 button{background:none;border:0;padding:0;flex:1;min-width:0;height:100%}.mn2 button img{width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 2px 4px #000a)}
.tn{display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:3%;width:100%;height:100%}.tn button{background:none;border:0;padding:0;min-height:0;position:relative}.tn button img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 2px 3px #0009)}.tn button.sel img{filter:drop-shadow(0 0 8px #fff)}
.sbt.bl{max-height:100%}.sbt.bl.fl img{filter:brightness(1.6) drop-shadow(0 0 10px #ffd870);transform:rotate(8deg)}.sbt.xy.fl img{filter:brightness(1.7) drop-shadow(0 0 10px #fff);transform:scale(1.07)}
.eng{position:absolute;white-space:nowrap;font-weight:900;line-height:1;transform:translate(-50%,-50%)}
.eng.gl{color:#e8c070;text-shadow:0 -1px 0 #fff8,0 2px 2px #000}
.eng.dk{height:auto;border-radius:0;box-shadow:none;color:#3a2610;text-shadow:0 1px 0 #ffffff66,0 -1px 1px #0008}
.eng.lt{color:#fff3cc;text-shadow:0 1px 3px #000}
.rg,.lv,.pd,.sl,.hs2{border:0;background:none;padding:0;position:relative;touch-action:manipulation}
.rg{flex:1;aspect-ratio:1}.rg img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;transition:transform .15s}
.rg span.ro{position:absolute}
.rg:active img{transform:rotate(25deg)}
.row{display:flex;gap:4%;width:100%;height:100%;align-items:center;justify-content:center}
.lv img{width:100%;height:100%;object-fit:contain;transition:transform .15s}.lv{flex:1;height:100%}.lv.dn img{transform:scaleY(-1)}
.pd{flex:1;aspect-ratio:1;border-radius:50%;box-shadow:0 3px 6px #000a,0 0 0 3px #00000055 inset}
.pd.fl{animation:fl .35s}@keyframes fl{50%{filter:brightness(2.2);transform:scale(1.15)}}
.pdots{position:absolute;left:0;right:0;top:-18%;display:flex;gap:6px;justify-content:center}
.pdots i{width:8px;height:8px;border-radius:50%;background:#0006;box-shadow:0 0 0 1px #fff3}.pdots i.on{background:#f0c060;box-shadow:0 0 6px #f0c060}
.sl{flex:1;height:100%}.sl img{width:100%;height:100%;object-fit:contain}.sl.e img{filter:brightness(0) invert(.78) sepia(1) saturate(3) hue-rotate(-8deg);opacity:.6;transform:scale(.8)}.sl.f img{filter:drop-shadow(0 0 6px #fff8)}
.hs2>img:not(.pl){width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 2px 3px #000a)}.hs2 img.pl{width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 3px 4px #000a)}
.cav{width:100%;height:100%;border-radius:8px;background:radial-gradient(#1a0f08,#050302);box-shadow:0 0 0 3px #00000088 inset,0 0 8px #000;display:flex;align-items:center;justify-content:center;gap:6px;position:relative}
.cav img{height:70%;max-width:46%;object-fit:contain;animation:pu 1.6s infinite}.cav .open{position:absolute;left:-8%;top:-10%;width:40%;transform:rotate(-80deg);transform-origin:left bottom;opacity:.9}
@keyframes pu{50%{filter:brightness(1.4)}}
.glint.fa{opacity:.7;animation:none!important;border-radius:45%;background:radial-gradient(ellipse,#fff8 0%,#fff0 65%)}.glint{position:absolute;inset:0;border-radius:50%;animation:gl 4s infinite;background:radial-gradient(circle,#fff9 0%,#fff0 60%)}
@keyframes gl{0%,80%,100%{opacity:0}90%{opacity:.7}}
.tl2{border:0;border-radius:6%;background:linear-gradient(135deg,#8c7a58,#5d4d34);color:#f3e3b0;font-weight:900;font-size:calc(var(--st)*.08);box-shadow:0 2px 3px #000a,0 0 0 1px #ffffff40 inset;text-shadow:0 1px 2px #000}
.tl2.e{background:#0006;box-shadow:inset 0 0 6px #000;visibility:visible}
.tg{display:grid;gap:3%;width:100%;height:100%;padding:3%;background:#0005;border-radius:8px}
.ovn{background:linear-gradient(#f3e3b8,#d8be84);color:#3a2610;border-radius:6px;padding:12px;position:relative;height:250px;margin:8px 0;box-shadow:0 0 0 3px #8a6a2a55 inset}
.ovn .eng{font-size:34px!important;letter-spacing:2px}.ovn .eng.dk{text-shadow:0 1px 0 #fff9}.ovn .tx{border-top:1px solid #8a6a2a66;padding-top:6px;text-align:center}.ovn .tx{position:absolute;left:8px;right:8px;bottom:8px;font-size:15px;font-weight:700}
.bgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.bx{position:relative;border:0;border-radius:16px;overflow:hidden;aspect-ratio:1;color:#fff;font:inherit;text-align:left;padding:0;box-shadow:0 8px 20px #000a,0 0 0 2px #ffffff30 inset;background:#000 center/cover}
.bx div{position:absolute;left:0;right:0;bottom:0;padding:8px 10px;background:linear-gradient(transparent,#000d);font-weight:800;font-size:14px}.bx small{display:block;color:#f0c060;font-weight:700;font-size:12px}
.bx.lock{filter:grayscale(1) brightness(.5)}

.stage{user-select:none;-webkit-user-select:none;touch-action:none}.drh{text-align:center;margin:6px 0 2px;width:var(--st)}
.lvl{display:grid;gap:12px}.lc{position:relative;display:flex;align-items:center;gap:12px;text-align:left;border:2px solid #c9962a;border-radius:18px;padding:16px 14px;color:#f6e7b8;overflow:hidden;min-height:96px;background:#140c06;box-shadow:0 6px 16px #000a}
.lc i{position:absolute;inset:0;background-size:cover;background-position:center;opacity:.5}.lc::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#0c0704f0 20%,#0c070488)}
.lc>*{position:relative;z-index:1}.lc b{font-size:20px;display:block}.lc small{display:block;font-size:12.5px;opacity:.9;margin-top:2px}.lc>div{flex:1}.lc>img{width:60px;height:60px;object-fit:contain;filter:drop-shadow(0 4px 5px #000)}
.lc .st{position:absolute;right:12px;top:8px;color:#ffd24a;font-size:14px;letter-spacing:2px;z-index:2}
.mn{display:grid;gap:14px}.mc{position:relative;height:150px;border:2px solid #c9962a;border-radius:20px;overflow:hidden;color:#fff;text-align:left;padding:0;background-size:cover;background-position:center;box-shadow:0 8px 18px #000b}
.mc::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,#000d,#0003 70%)}.mc div{position:absolute;left:16px;bottom:12px;z-index:1}.mc b{font-size:24px;display:block}.mc small{opacity:.9}
.mc img{position:absolute;right:12px;top:10px;height:70px;z-index:1;filter:drop-shadow(0 4px 6px #000)}
.sb{background:none;border:0;color:var(--gold);font-size:15px;padding:4px 0 10px}
.bn{position:relative;display:block;width:100%;height:118px;border:2px solid #c9962a;border-radius:18px;margin-bottom:12px;overflow:hidden;color:#fff;text-align:left;background-size:cover;background-position:center;padding:0;box-shadow:0 6px 16px #000a}
.bn::after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,#000e,#0002 75%)}.bn div{position:absolute;left:14px;right:14px;bottom:10px;z-index:1}.bn b{font-size:19px;display:block}.bn small{opacity:.92;display:block;font-size:12.5px}.bn .tag{color:#ffe08a;background:#f0c06033;border:1px solid #c9962a;border-radius:8px;padding:1px 7px;margin-right:6px}
.sg{height:1.05em;width:auto;vertical-align:middle;filter:drop-shadow(0 2px 2px #000a)}.eng .sg{height:1em}.rg span img.sg{position:static;width:auto;height:70%;inset:auto;filter:brightness(.42) contrast(1.3) drop-shadow(0 1px 0 #fff7)}.tl2{overflow:hidden;min-width:0;min-height:0;padding:0}.tl2 .sg{height:calc(var(--st)*.15);width:auto;max-width:90%;object-fit:contain}
.kn{position:relative;width:100%;height:100%}.kn svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}.kl,.kr{position:absolute;width:11%;aspect-ratio:1;border-radius:50%;transform:translate(-50%,-50%);border:3px solid #222;box-shadow:0 2px 4px #000a,inset 0 2px 3px #fff8;padding:0}.kl{left:6%}.kr{left:94%}.kr.sel{outline:3px solid #fff;box-shadow:0 0 12px #fff}
.trn{position:relative;width:100%;height:100%}.tg2{position:absolute;transform:translate(-50%,-50%);border-radius:50%;border:2px dashed #ffffff66;background:radial-gradient(circle,#0008 30%,#0003);padding:0}.tg2.fl{border:0;background:none}.tg2 img{width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 3px 3px #000b)}.spn{animation:gs 9s linear infinite}.spn.r{animation-direction:reverse}@keyframes gs{to{transform:rotate(360deg)}}
.crk{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:0}.hub{flex:1;aspect-ratio:1;max-height:100%;padding:0;background:none;border:0}.hub .ax{width:70%;height:70%;margin:15%;border-radius:50%;border:3px dashed #ffffff77;background:radial-gradient(circle,#000a,#0004)}.hub img.hd{width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 3px 3px #000b)}.hub img.sp2{animation:cs .4s ease-out}@keyframes cs{from{transform:rotate(-120deg)}to{transform:rotate(0)}}.cp{display:flex;gap:5px}.cp i{width:9px;height:9px;border-radius:50%;background:#0008;border:1px solid #fff6}.cp i.on{background:#ffd24a;box-shadow:0 0 6px #ffd24a}
.rg .rot{position:absolute;inset:0;transform:rotate(var(--a))}.rg .rot img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}.rg.sp .rot{animation:rsp .26s ease-out}@keyframes rsp{from{transform:rotate(var(--b))}to{transform:rotate(var(--a))}}
.rg .ptr{display:none!important;position:absolute;left:50%;top:5%;width:9%;height:9%;margin-left:-4.5%;border-radius:50%;background:#ffe9a0;box-shadow:0 0 5px #000,0 0 6px #ffd24a;z-index:2}
.rg .ro{position:absolute;left:50%;bottom:-9%;transform:translateX(-50%);display:block;right:auto;top:auto;background:linear-gradient(#000d,#222d);color:#ffe9a0;border:1px solid #c9962a;border-radius:7px;padding:1px 7px;font-size:calc(var(--st)*.05);min-width:1.7em;text-align:center;line-height:1.35;box-shadow:inset 0 2px 4px #000,0 2px 3px #000a;z-index:3;white-space:nowrap}
.rg .ro .sg{filter:none;height:1.15em;vertical-align:-.2em}
.rg img{filter:drop-shadow(0 3px 3px #000b)!important}.lv img{filter:var(--tn) drop-shadow(0 3px 3px #000b)!important}.hs2 img.pl{filter:var(--tn) drop-shadow(0 4px 5px #000c)!important}.cav .open{filter:var(--tn)}
.in{--tn:brightness(1)}
.cav{background:radial-gradient(ellipse at 50% 30%,#3a2a1c,#0b0705 85%)!important;border:2px solid #000a}
.cav .open{left:50%!important;top:-34%!important;width:70%!important;height:38%;object-fit:contain;transform:translateX(-50%) perspective(160px) rotateX(58deg)!important;transform-origin:50% 100%!important;opacity:1!important}
.face.cur{display:block}
.lsv{width:100%;height:100%;overflow:visible;filter:var(--tn) drop-shadow(0 3px 3px #000b)}.lsv .arm.au{animation:larm .22s ease-out}.lsv .arm.ad{animation:larm2 .22s ease-out}@keyframes larm{from{transform:rotate(180deg)}to{transform:rotate(0)}}@keyframes larm2{from{transform:rotate(0)}to{transform:rotate(180deg)}}
.in>.p{position:absolute!important}
.cyc{display:flex;justify-content:space-around;align-items:center;width:100%;height:100%;gap:2%}.cyc button{background:none;border:0;padding:0;flex:1;aspect-ratio:1;max-height:100%;min-width:0}.cyc button img{width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 3px 4px #000b)}
.swb{display:flex;flex-direction:column;justify-content:space-between;width:100%;height:100%}.swb .r{display:flex;justify-content:space-around;align-items:center;height:42%}.swb .r>*{flex:1;height:100%;display:flex;align-items:center;justify-content:center;min-width:0;background:none;border:0;padding:0}.swb img{max-width:92%;max-height:100%;object-fit:contain;filter:drop-shadow(0 2px 3px #000a)}
.fz{display:grid;grid-template-columns:1fr 1fr;gap:10% 5%;width:100%;height:100%;align-content:center}.fz button{background:linear-gradient(#2a1d10,#150d06);border:2px solid #7a5a22;border-radius:10px;padding:0;aspect-ratio:175/70;position:relative;box-shadow:inset 0 3px 7px #000d,0 2px 4px #000a}.fz button img{position:absolute;inset:8% 4%;width:92%;height:84%;object-fit:contain}.fz button.bad img{filter:drop-shadow(0 0 5px #f33a)}.fz button.ok img{filter:drop-shadow(0 0 5px #fff6)}
.pkb{flex:1;height:100%;border:0;background:none;padding:0;position:relative}.pkb img{width:100%;height:100%;object-fit:contain;filter:drop-shadow(0 3px 4px #000c)}.pkb.f img{filter:drop-shadow(0 0 9px #fff9)}
.hs2.dn{opacity:.55}
.hkw{container-type:size;display:flex;align-items:flex-end}.hkw.l{justify-content:flex-start}.hkw.c{justify-content:center}.hkw.r{justify-content:flex-end}.hk{position:relative;width:min(100cqw,calc(100cqh*var(--r)));aspect-ratio:var(--r);cursor:pointer}.hk>img{position:absolute;bottom:0;height:auto;opacity:0;transition:opacity .1s;filter:drop-shadow(0 3px 5px #000c);pointer-events:none}.hk>img.on{opacity:1}.hkw.l .hk>img{left:0}.hkw.r .hk>img{right:0}.hkw.c .hk>img{left:50%;transform:translateX(-50%)}
.hk .in{position:absolute;display:flex;flex-wrap:wrap;justify-content:center;align-content:center;gap:3%;animation:hkin .3s .4s both}.hk .in .hs2{height:48%;flex:0 0 30%;min-width:0}.hk .in .hs2 img{max-height:100%;animation:pu 1.6s infinite}@keyframes hkin{from{opacity:0;transform:translateY(8px) scale(.8)}to{opacity:1;transform:none}}
.chw{position:relative;width:70%;max-width:260px;aspect-ratio:190/170;margin:0 auto 6px}.chw img{position:absolute;bottom:0;left:50%;transform:translateX(-50%);height:auto;opacity:0;transition:opacity .3s}.chw img.on{opacity:1}
.hub{position:relative;overflow:visible}.hub .pr{position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg)}.hub .pr circle{fill:none;stroke-width:5}.hub .pr .bg{stroke:#0009}.hub .pr .fg{stroke:#ffd24a;stroke-linecap:round;filter:drop-shadow(0 0 3px #ffd24a);transition:stroke-dashoffset .35s}.hub .pl{position:absolute;inset:15%;border-radius:50%;background:radial-gradient(circle at 35% 30%,#f0cf7c,#9a7428 55%,#4a3410);box-shadow:inset 0 2px 4px #fff7,0 3px 7px #000d;border:2px solid #3a2808}.hub .pl::after{content:"";position:absolute;inset:40%;border-radius:50%;background:radial-gradient(circle,#2a2218,#000)}.hub img.hc{position:absolute;width:64%;height:auto;left:-2.5%;top:38.5%;transform-origin:82% 18%;filter:drop-shadow(0 4px 4px #000c)}.hub img.hc.sp3{animation:hspin .5s ease-in-out}@keyframes hspin{to{transform:rotate(360deg)}}
.pt .ps button .ph{position:absolute;left:50%;top:50%;width:64%;aspect-ratio:1;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle at 35% 30%,color-mix(in srgb,var(--c) 60%,#fff),var(--c) 55%,color-mix(in srgb,var(--c) 40%,#000));border:3px solid #c9a24a;box-shadow:0 3px 7px #000c,inset 0 2px 3px #fff6;pointer-events:none}.pt .ps button .ph::after{content:'';position:absolute;inset:34%;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff3b0,#b8892a 60%,#5a3f10)}
.fnv{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;width:var(--st);margin:8px auto 2px}.fnv button{background:#0009;color:#e8c070;border:1.5px solid #6b5420;border-radius:10px;padding:8px 4px;font:inherit;font-weight:700;font-size:14px}.fnv button.on{background:linear-gradient(#f0c866,#c9962f);color:#2a1c05;border-color:#f0c866}.fnv button.ok:not(.on){color:#9fe0a0;border-color:#3f7a45}
.rgw{display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;width:100%;gap:2%}.rgw .rgs{flex:1 1 0;min-height:0;height:auto;aspect-ratio:1;max-width:100%;margin:0}.rgw .rdo{font-weight:900;color:#f0d890;letter-spacing:.12em;font-size:calc(var(--st)*.045);text-shadow:0 2px 3px #000;background:#000a;border:1px solid #c9a24a;border-radius:999px;padding:0 14px;line-height:1.3}
.cav{display:flex;justify-content:center;align-items:center;gap:4%;padding:2%}.cav>.hs2{height:100%!important;flex:0 1 38%!important;transform:scale(1.35);z-index:2}.cav>.hs2 img{max-height:100%}
.stage{overflow:visible!important;box-shadow:none!important}
.scene{position:absolute;inset:0;perspective:1300px;perspective-origin:50% 42%}
.cube{position:absolute;inset:0;transform-style:preserve-3d}
.face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;border-radius:12px;overflow:hidden;box-shadow:0 0 0 2px #000a}
.shade{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 28% 18%,rgba(255,255,255,.17),transparent 55%),radial-gradient(ellipse at 50% 50%,transparent 58%,rgba(0,0,0,.5))}
.stage::before{content:"";position:absolute;left:6%;right:6%;bottom:-16px;height:22px;background:radial-gradient(ellipse,#000d,transparent 70%);filter:blur(5px);pointer-events:none}
.dimv{position:absolute;inset:0;border-radius:12px;background:rgba(2,8,36,.55);pointer-events:none;opacity:0;transition:opacity .6s;z-index:3}.dimv.on{opacity:1}
.nv{z-index:6}
.flash{position:absolute;inset:0;background:radial-gradient(circle,#fffb,#f0c06066 40%,transparent 70%);animation:fh .8s forwards;pointer-events:none;z-index:7;border-radius:12px}@keyframes fh{from{opacity:1}to{opacity:0}}
.pt2{position:absolute;left:50%;top:50%;width:9px;height:9px;margin:-4px;border-radius:50%;background:#ffe9a0;box-shadow:0 0 10px #ffd24a;animation:pf .9s ease-out forwards;z-index:7;pointer-events:none}
@keyframes pf{to{transform:translate(var(--dx),var(--dy)) scale(.15);opacity:0}}
.rg::before{content:"";position:absolute;inset:-7%;border-radius:50%;background:radial-gradient(circle,#000a 52%,#0000 74%);box-shadow:inset 0 4px 9px #000d,0 1px 0 #ffffff44}
.rg img{filter:drop-shadow(0 3px 3px #000b)}.rg.sp img{animation:spn .28s ease-out}@keyframes spn{from{transform:rotate(-70deg)}to{transform:rotate(0)}}
.lv::before{display:none}
.lv img{position:relative;filter:drop-shadow(0 3px 3px #000b)}.lv.au img{animation:lau .22s ease-out}.lv.ad img{animation:lad .22s ease-out}
@keyframes lau{from{transform:scaleY(-1)}to{transform:scaleY(1)}}@keyframes lad{from{transform:scaleY(1)}to{transform:scaleY(-1)}}
.sl::before{content:"";position:absolute;inset:4%;border-radius:50%;background:radial-gradient(circle,#1a0f08 55%,#3a2610 100%);border:3px solid #c9a24a;box-shadow:inset 0 4px 9px #000d,0 1px 0 #fff6,0 2px 5px #000a}
.sl img{position:relative}.sl.f img{filter:drop-shadow(0 0 8px #fff9)}
.cav.ho{animation:cin .5s ease-out}@keyframes cin{from{transform:scale(.6);filter:brightness(2.5)}to{transform:scale(1);filter:none}}
.hs2 img.pl{filter:drop-shadow(0 4px 5px #000c)}
.invb{background:linear-gradient(#2e1f13,#120b06)!important;box-shadow:inset 0 3px 10px #000,0 0 0 2px #7a5430,0 8px 14px #000a!important}
.invb .it{background:radial-gradient(circle,#ffffff2a,#0005)!important;box-shadow:inset 0 0 9px #000b}
.invb .it.sel{border-color:#f0c060;box-shadow:0 0 12px #f0c060,inset 0 0 9px #000b}
.obw .mb{background:linear-gradient(#6a4824,#2c1b0c);border:2px solid #c9962a;color:#f6e7b8;box-shadow:0 3px 0 #1a0f06}
.obw .mb:active{transform:translateY(2px);box-shadow:0 1px 0 #1a0f06}
.bx{box-shadow:0 10px 24px #000b,0 0 0 2px #c9962a66 inset!important}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

const SY=['☀','☾','★','☠','⚷','♥','♦','⚓','☘','⚡','♞','✿'];
const YF={'☀':0,'☾':1,'★':2,'⚓':3,'☘':4,'♥':5,'♦':6,'⚡':7,'♞':8,'✿':9,'⚷':10,'☠':11};
const G=t=>String(t).replace(/[\u2600-\u27BF\u2665\u2666\u265E\u26A1\u2693\u2620\u26B7]\uFE0E?/g,c=>{const k=c[0];return k in YF?'<img class="sg" src="img/ob/y'+YF[k]+'.webp" alt="" draggable="false">':c;});
const DINK={c4:'#3a2610',c5:'#f3e3b0',c6:'#3a2610',d0:'#3a2a12',d1:'#f6e7b8',d2:'#3b1d0a',d3:'#2b2418',d4:'#222',d5:'#3a2a12',d6:'#222',d7:'#fff',d8:'#123'};
const FACES=['Face avant','Côté gauche','Face arrière','Côté droit','Dessus','Dessous'];
const TH={noyer:{img:'p_noyer',kn:'b0',safe:[20,20,60,60]},cuir:{img:'p_cuir',kn:'b2',safe:[20,20,60,60]},lave:{img:'p_lave',kn:'u11',safe:[22,22,58,58]},verre:{img:'p_verre',kn:'u5',safe:[18,18,64,64]},nacre:{img:'p_nacre',kn:'u2',safe:[22,22,56,56]},beton:{img:'p_beton',kn:'u9',safe:[22,22,57,57]},wood:{img:'p_wood',kn:'b0',safe:[11,11,78,78]},lacque:{img:'p_lacque',kn:'u8',safe:[19,19,62,62]},pierre:{img:'p_pierre',kn:'u7',safe:[21,21,58,58]},jouet:{img:'p_jouet',kn:'u0',safe:[20,20,60,60],tn:'hue-rotate(-62deg) saturate(.75) brightness(1.12)'},marbre:{img:'p_marbre',kn:'u3',safe:[20,20,60,60]},rouille:{img:'p_rouille',kn:'u9',safe:[14,14,72,72]},cristal:{img:'p_cristal',kn:'u6',safe:[15,15,70,70]},sable:{img:'p_sable',kn:'b2',safe:[14,14,72,72]},corail:{img:'p_corail',kn:'u10',safe:[16,16,68,68]},jade:{img:'p_jade',kn:'u4',safe:[15,15,70,70]},ice:{img:'p_ice',kn:'u5',safe:[16,16,68,68],tn:'hue-rotate(150deg) saturate(.5) brightness(1.1)'},clock:{img:'p_clock',kn:'b7',safe:[19,19,62,62]},ivory:{img:'p_ivory',kn:'u2',safe:[18,18,64,64]},obsidian:{img:'p_obsidian',kn:'u11',safe:[15,15,70,70]},egypt:{img:'p_egypt',kn:'b4',safe:[17,17,66,66]},steam:{img:'p_steam',kn:'b6',safe:[11,11,78,78]},night:{img:'p_night',kn:'b3',safe:[16,16,68,68]}};
window.OBX={SY,boxes:[]};
let OB=null;
const D=id=>!!OB.done[id],F=f=>!!OB.flags[f],H=id=>OB.inv.includes(id)||!!OB.flags['used:'+id];
window.obD=D;window.obF=F;window.obH=H;
const im=(id,c)=>'<img src="img/ob/'+id+'.webp" alt="" draggable="false"'+(c?' class="'+c+'"':'')+'>';
const stSize=()=>{const m=$('main');const w=Math.min(m.clientWidth-4,window.innerHeight-290,520);document.documentElement.style.setProperty('--st',Math.max(240,w)+'px');};
window.addEventListener('resize',()=>{if(OB&&!OB.over)stSize();});

/* ---------- liste des boîtes ---------- */
const LV=[{n:1,nm:'Facile',ic:'k1',th:'wood',st:'★',tx:'Une boîte, quelques mécanismes.'},{n:2,nm:'Moyen',ic:'k3',th:'egypt',st:'★★',tx:'Plus de mécanismes, des pièges.'},{n:3,nm:'Difficile',ic:'g2',th:'night',st:'★★★',tx:'Des boîtes retorses à fouiller.'},{n:4,nm:'Extrême',ic:'k8',th:'obsidian',st:'★★★★',tx:'La boîte la plus retorse. Courage.'}];
const lvOf=d=>({'Facile':1,'Moyen':2,'Difficile':3,'Extrême':4})[d.lab]||3;
window.obList=function(box){
  box.append(el('p','muted sm','Choisis un niveau : une boîte tirée au hasard, aucun mode d’emploi. Fais-la tourner du doigt, touche, déplace.'));
  const g=el('div','lvl');
  LV.forEach(l=>{const done=(ST.ob&&ST.ob.lv&&ST.ob.lv[l.n])||0;
    const b=el('button','lc t'+l.n,'<i style="background-image:url(img/ob/p_'+l.th+'.webp)"></i><span class="st">'+l.st+'</span><div><b>'+l.nm+'</b><small>'+l.tx+'</small><small class="gold">💎 '+(OBX.boxes.filter(d=>lvOf(d)===l.n).map(d=>d.rw).reduce((a,x)=>Math.min(a,x),999)+' à '+OBX.boxes.filter(d=>lvOf(d)===l.n).map(d=>d.rw).reduce((a,x)=>Math.max(a,x),0))+(done?' · ✔ ×'+done:'')+'</small></div><img src="img/ob/'+l.ic+'.webp" alt="">');
    b.onclick=()=>obLevel(l.n);g.append(b);});
  box.append(g);
};
function obLevel(n){
  let pool=OBX.boxes.filter(d=>lvOf(d)===n);
  const last=ST.ob&&ST.ob.last;
  let ch=[];
  if(true){const gn=pool.filter(d=>d.gen);const p=pool.filter(d=>d.id!==last&&!d.gen);ch=[gn.length&&(Math.random()<.75||!p.length)?gn[0]:(p.length?p[Math.floor(Math.random()*p.length)]:pool[0])];}
  else{const p=pool.slice().sort(()=>Math.random()-.5);ch=p.slice(0,2);}
  const tot=ch.reduce((a,d)=>a+d.rw,0)+0;
  openOv('<div style="font-size:30px;color:var(--gold)">'+LV[n-1].st+'</div><h2>'+LV[n-1].nm+'</h2><p class="muted">'+'Une boîte mystère.'+'</p><p class="gold">Récompense : '+tot+' 💎</p><button class="ob" id="go">Ouvrir</button><button class="ob alt" id="cn">Retour</button>');
  $('cn').onclick=closeOv;$('go').onclick=()=>{closeOv();obRun(n,ch,tot);};
}
function obRun(n,ch,tot){const d=ch[0];obStart(d);OB.lv=n;OB.chain=ch.slice(1);OB.tot=tot;OB.num=1;OB.of=ch.length;}
function obIntro(d){
  openOv('<img src="img/ob/'+(d.icon||'k0')+'.webp" style="height:70px;display:block;margin:0 auto" alt=""><h2>'+d.name+'</h2><p class="muted">'+d.lab+' · '+d.parts+' mécanismes</p><p>'+d.intro+'</p><p class="gold">Récompense : '+d.rw+' 💎</p><button class="ob" id="go">Ouvrir la boîte</button><button class="ob alt" id="cn">Retour</button>');
  $('cn').onclick=closeOv;$('go').onclick=()=>{closeOv();obStart(d);};
}
/* ---------- partie ---------- */
function obStart(d,seed){
  seed=seed||Math.floor(Math.random()*1e9);const R=mkR(seed);const b=d.build(R);
  OB={d,b,seed,th:b.theme||d.theme,t0:Date.now(),face:0,ax:0,ay:0,done:{},inv:(b.inv0||[]).slice(),sel:null,st:{},flags:{},hintN:0,hints:0,over:false};
  bgSet(null);$('sc').textContent='📦 '+(b.name||d.name);stSize();draw();
}
window.obLeave=function(){OB=null;};
const rd=t=>t*Math.PI/180,mm=(A,B)=>A.map((r,i)=>[0,1,2].map(j=>r[0]*B[0][j]+r[1]*B[1][j]+r[2]*B[2][j]));
const Rx=t=>{const c=Math.cos(rd(t)),s=Math.sin(rd(t));return[[1,0,0],[0,c,-s],[0,s,c]];},Ry=t=>{const c=Math.cos(rd(t)),s=Math.sin(rd(t));return[[c,0,s],[0,1,0],[-s,0,c]];};
const CF=[Ry(0),Ry(90),Ry(180),Ry(-90),Rx(-90),Rx(90)].map(m=>m.map(r=>r.map(v=>Math.abs(v)<1e-9?0:Math.round(v*1e6)/1e6)));
const FT=['rotateY(0deg)','rotateY(-90deg)','rotateY(180deg)','rotateY(90deg)','rotateX(90deg)','rotateX(-90deg)'];
const Rz=t=>{const c=Math.cos(rd(t)),s=Math.sin(rd(t));return[[c,-s,0],[s,c,0],[0,0,1]];};
const ALL=(()=>{const out=[];const seen=new Set();const q=[CF[0]];const gens=[Ry(90),Rx(90),Rz(90)].map(m=>m.map(r=>r.map(v=>Math.round(v))));const key=m=>m.flat().join();seen.add(key(CF[0]));while(q.length){const m=q.pop();out.push(m);gens.forEach(g=>{const n=mm(g,m);if(!seen.has(key(n))){seen.add(key(n));q.push(n);}});}return out;})();
const snapM=M=>{let best=ALL[0],bd=1e9;ALL.forEach(A=>{let d=0;for(let i=0;i<3;i++)for(let j=0;j<3;j++){const e=A[i][j]-M[i][j];d+=e*e;}if(d<bd){bd=d;best=A;}});return best.map(r=>r.slice());};
const NF=[[0,0,1],[-1,0,0],[0,0,-1],[1,0,0],[0,-1,0],[0,1,0]];
const curF=()=>{let best=0,bz=-9;NF.forEach((n,i)=>{const z=OB.M[2][0]*n[0]+OB.M[2][1]*n[1]+OB.M[2][2]*n[2];if(z>bz){bz=z;best=i;}});return best;};
function setFace(f){OB.M=CF[f].map(r=>r.slice());OB.face=f;}
const cubeT=()=>{const M=OB.M;return 'translateZ(calc(var(--st)/-2)) matrix3d('+[M[0][0],M[1][0],M[2][0],0,M[0][1],M[1][1],M[2][1],0,M[0][2],M[1][2],M[2][2],0,0,0,0,1].join(',')+')';};
const RF=[Ry(0),Ry(-90),Ry(180),Ry(90),Rx(90),Rx(-90)];
const rollOf=()=>{const P=mm(OB.M,RF[OB.face]);return Math.round(Math.atan2(P[1][0],P[0][0])*180/Math.PI/90)*90;};
function rest(cube){cube.classList.add('rest');cube.style.transition='none';cube.style.transform='none';cube.querySelectorAll('.face').forEach((fc,i)=>{if(i===OB.face){fc.style.transform='none';fc.style.display='block';}else fc.style.display='none';});}
function unrest(cube){if(!cube.classList.contains('rest'))return;cube.classList.remove('rest');cube.querySelectorAll('.face').forEach((fc,i)=>{fc.style.transform=FT[i]+' translateZ(calc(var(--st)/2))';fc.style.display='block';});cube.style.transition='none';cube.style.transform=cubeT();}
function setT(c,tr){c.style.transition=tr?'transform .38s cubic-bezier(.3,.7,.2,1)':'none';c.style.transform=cubeT();}
function nav(stg){stg.querySelectorAll('.nv').forEach(n=>n.remove());}
function setName(){const nm=document.querySelector('.obt span');if(nm)nm.textContent=FACES[OB.face];}
function bindDrag(stg,cube){let lx,ly,sx,sy,drag=false,down=false,pid,ax=null,tot=0,M0=null,ign=false;
  stg.style.touchAction='none';
  stg.addEventListener('pointerdown',e=>{down=true;drag=false;ign=false;ax=null;tot=0;sx=lx=e.clientX;sy=ly=e.clientY;pid=e.pointerId;});
  stg.addEventListener('pointermove',e=>{if(!down||ign)return;
    if(!drag){const ddx=e.clientX-sx,ddy=e.clientY-sy;if(Math.hypot(ddx,ddy)<20)return;
      const horiz=Math.abs(ddx)>=Math.abs(ddy);
      drag=true;ax=horiz?'y':'x';M0=OB.M.map(r=>r.slice());unrest(cube);try{stg.setPointerCapture(pid);}catch(_){}lx=sx;ly=sy;}
    const dx=e.clientX-lx,dy=e.clientY-ly;lx=e.clientX;ly=e.clientY;const k=0.3;
    if(ax==='y'){tot+=dx;OB.M=mm(Ry(dx*k),OB.M);}else{tot+=dy;OB.M=mm(Rx(-dy*k),OB.M);}
    setT(cube,false);});
  let tm=null;const later=()=>{clearTimeout(tm);const ob=OB;tm=setTimeout(()=>{if(OB===ob&&cube.isConnected&&!down&&!cube.classList.contains('rest')){setFace(OB.face);draw();}},430);};
  const end=()=>{if(!down)return;down=false;if(!drag){if(!cube.classList.contains('rest'))later();return;}
    let T=M0;
    if(Math.abs(tot)>40){T=ax==='y'?mm(Ry(tot>0?90:-90),M0):mm(Rx(tot>0?-90:90),M0);T=snapM(T);OB.M=T;const nf=curF();if(OB.face>=4&&nf>=4){OB.M=M0;}else OB.face=nf;}
    else OB.M=M0;
    later();setT(cube,true);setName();
    const sup=ev=>{ev.stopPropagation();ev.preventDefault();};stg.addEventListener('click',sup,{capture:true,once:true});setTimeout(()=>stg.removeEventListener('click',sup,true),60);};
  stg.addEventListener('pointerup',end);stg.addEventListener('pointercancel',end);}
function burst(stg){const f=el('div','flash');stg.append(f);setTimeout(()=>f.remove(),800);
  for(let i=0;i<16;i++){const p=el('div','pt2');const a=Math.random()*6.28,d=60+Math.random()*110;p.style.setProperty('--dx',Math.cos(a)*d+'px');p.style.setProperty('--dy',Math.sin(a)*d+'px');p.style.animationDelay=(Math.random()*.15)+'s';stg.append(p);setTimeout(()=>p.remove(),1200);}}
function draw(){
  const m=$('main');m.innerHTML='';m.scrollTop=0;const th=TH[OB.th];
  if(!OB.M)setFace(OB.face);
  $('app').style.backgroundImage='linear-gradient(rgba(8,8,14,.55),rgba(8,8,14,.9)),url(img/ob/'+th.img+'.webp)';$('app').style.backgroundSize='cover';
  const total=OB.b.parts.filter(p=>p.key).length,dn=OB.b.parts.filter(p=>p.key&&D(p.id)).length;
  const w=el('div','obw');
  const top=el('div','obt','<span>'+FACES[OB.face]+'</span><span class="muted sm">'+(OB.of>1?'Boîte '+OB.num+'/'+OB.of+' · ':'')+dn+' / '+total+' ✔</span>');
  const hb=el('button','mb','💡 Indice (3 💎)');hb.onclick=hint;top.append(hb);w.append(top);
  const stg=el('div','stage'),sc=el('div','scene'),cube=el('div','cube');cube.style.transform=cubeT();
  for(let f=0;f<6;f++){const fc2=[];const fc=el('div','face');fc.style.transform=FT[f]+' translateZ(calc(var(--st)/2))';
    const bg=el('div','bgf f'+f);bg.style.backgroundImage='url(img/ob/'+th.img+'.webp)';fc.append(bg);
    const inn=el('div','in');inn.style.cssText='left:'+th.safe[0]+'%;top:'+th.safe[1]+'%;width:'+th.safe[2]+'%;height:'+th.safe[3]+'%';inn.style.setProperty('--tn',th.tn||'brightness(1)');
    OB.b.parts.filter(p=>p.f===f&&(!p.need||p.need())).forEach(p=>{const n=T[p.t](p);if(!n)return;n.classList.add('p');if(p.edge){const sf=th.safe,bd=[sf[1],100-sf[1]-sf[3],sf[0],100-sf[0]-sf[2]][p.es],z=Math.max(5,Math.min(bd*.8,10)),c=(bd-z)/2,pos=5+p.ep*(90-z);n.style.width=z+'%';n.style.height=z+'%';if(p.es===0){n.style.top=c+'%';n.style.left=pos+'%';}else if(p.es===1){n.style.top=(100-bd+c)+'%';n.style.left=pos+'%';}else if(p.es===2){n.style.left=c+'%';n.style.top=pos+'%';}else{n.style.left=(100-bd+c)+'%';n.style.top=pos+'%';}n.style.zIndex=6;fc2.push(n);return;}n.style.left=p.x+'%';n.style.top=p.y+'%';n.style.width=p.w+'%';n.style.height=p.h+'%';inn.append(n);});
    fc.append(inn,el('div','shade'));fc2.forEach(n=>fc.append(n));cube.append(fc);}
  sc.append(cube);stg.append(sc);
  stg.append(el('div','dimv'+(OB.th==='night'&&!F('lamp')?' on':'')));
  rest(cube);bindDrag(stg,cube);
  w.append(stg);w.append(el('div','muted sm drh','↔↕ Glisse sur la boîte pour changer de face, ou touche un bouton'));
  const fn=el('div','fnv');['Avant','Gauche','Arrière','Droite','Dessus','Dessous'].forEach((nm,i)=>{const ps=OB.b.parts.filter(p=>p.f===i&&p.key),ok=ps.length&&ps.every(p=>D(p.id));const b=el('button',(i===OB.face?'on ':'')+(ok?'ok':''),nm+(ok?' ✔':''));b.onclick=()=>{try{setFace(i);draw();}catch(e){toast('Erreur : '+e.message);}};fn.append(b);});w.append(fn);
  const inv=el('div','invb');if(!OB.inv.length)inv.append(el('span','em','Inventaire vide'));
  OB.inv.forEach(id=>{const it=OB.b.items[id];const b=el('button','it'+(OB.sel===id?' sel':''),it.kind==='note'?'<div class="note"></div>':im(it.spr)+(it.wv!=null?'<i class="wb">'+it.wv+'</i>':''));b.onclick=()=>pick(id);inv.append(b);});
  w.append(inv);
  const r=el('div','row2');const q=el('button','mb','☰ Boîtes');q.onclick=()=>{OB=null;home();};const rs=el('button','mb','↻ Recommencer');rs.onclick=()=>{openOv('<h2>Recommencer ?</h2><p class="muted">Une nouvelle boîte du même modèle (codes différents).</p><button class="ob" id="y">Oui</button><button class="ob alt" id="n">Non</button>');$('n').onclick=closeOv;$('y').onclick=()=>{closeOv();obStart(OB.d);};};r.append(q,rs);r.style.width='var(--st)';w.append(r);
  m.append(w);
  if(OB.fx){OB.fx=0;burst(stg);}
  OB.anim=null;
}
function pick(id){const it=OB.b.items[id];
  if(it.kind==='note'){showNote(id);return;}
  if(OB.sel&&OB.sel!==id){const rc=(OB.b.recipes||[]).find(r=>(r.a===OB.sel&&r.b===id)||(r.a===id&&r.b===OB.sel));
    if(rc){OB.inv=OB.inv.filter(x=>x!==OB.sel&&x!==id);OB.inv.push(rc.out);OB.sel=null;toast('Tu assembles : '+OB.b.items[rc.out].name+'.');draw();return;}
    toast('Ces deux objets ne vont pas ensemble.');}
  OB.sel=OB.sel===id?null:id;if(OB.sel)toast(it.name);draw();}
function showNote(id){const it=OB.b.items[id],n=it.note;
  openOv('<h2>'+it.name+'</h2><div class="ovn">'+(n.marks||[]).map(mk).join('')+(n.text?'<div class="tx">'+n.text+'</div>':'')+'</div><button class="ob" id="ok">Fermer</button>');$('ok').onclick=closeOv;}
const mk=i=>'<span class="eng '+(i.c||'dk')+'" style="'+(i.col?'color:'+i.col+';':'')+'left:'+i.x+'%;top:'+i.y+'%;font-size:'+(i.s?'calc(var(--st)*'+(i.s/100)+')':'')+';'+(i.r?'transform:translate(-50%,-50%) rotate('+i.r+'deg);':'')+'letter-spacing:'+(i.ls||0)+'px">'+G(i.t)+'</span>';
function hint(){const hs=OB.b.hints||[];if(OB.hintN>=hs.length){toast('Plus d’indice pour cette boîte.');return;}if(gems()<3){toast('Il te faut 3 💎.');return;}
  addGems(-3);OB.hints++;const h=hs[OB.hintN++];openOv('<h2>💡 Indice '+OB.hintN+'</h2><p>'+h+'</p><button class="ob" id="ok">Merci</button>');$('ok').onclick=closeOv;}
function solve(p,quiet){OB.done[p.id]=true;if(!quiet){toast(p.msg||'Clic ! Quelque chose s’est débloqué.');OB.fx=1;}
  (p.give||[]).forEach(g=>{if(p.t!=='hatch')take(g);});
  if(OB.d.win&&OB.d.win(D)&&!OB.over){OB.over=true;setTimeout(win,900);}
  draw();}
window.obDraw=draw;window.showNote=showNote;window.obFace=f=>{setFace(f);draw();};
function take(id){if(!OB.inv.includes(id)){OB.inv.push(id);OB.flags['took:'+id]=true;toast('Tu prends : '+OB.b.items[id].name+'.');}}
const CH={"cha": [[179, 137], [179, 138], [169, 150], [183, 158]], "chb": [[180, 137], [184, 138], [170, 155], [184, 164]], "chc": [[185, 136], [183, 138], [183, 163], [175, 156]]};
function chestAnim(){const k=['cha','chb','chc'][Math.floor(Math.random()*3)],f=CH[k];const W=190,hh=170;
  const h='<div class="chw">'+f.map((s,i)=>'<img src="img/ob/hk_'+k+i+'.webp" alt="" style="width:'+(s[0]/W*100)+'%"'+(i===0?' class="on"':'')+'>').join('')+'</div>';
  setTimeout(()=>{const ims=document.querySelectorAll('.chw img');if(!ims.length)return;const st=n=>ims.forEach((x,q)=>x.classList.toggle('on',q===n));[600,1300,2100].forEach((t,n)=>setTimeout(()=>st(n+1),t));},50);return h;}
function win(){const t=Date.now()-OB.t0,id=OB.d.id;ST.ob=ST.ob||{done:{},best:{}};ST.ob.lv=ST.ob.lv||{};ST.ob.last=id;ST.ob.done[id]=(ST.ob.done[id]||0)+1;if(!ST.ob.best[id]||t<ST.ob.best[id])ST.ob.best[id]=t;
  if(OB.chain&&OB.chain.length){const nx=OB.chain[0];addGems(OB.d.rw);save();
    openOv(chestAnim()+'<h2>Première boîte ouverte !</h2><p class="gold" style="font-size:22px">+'+OB.d.rw+' 💎</p><p class="muted">Une deuxième boîte t’attend, plus retorse encore.</p><button class="ob" id="nx">Boîte suivante</button>');
    $('nx').onclick=()=>{closeOv();const n=OB.lv,ch=OB.chain.slice(1),tot=OB.tot,k=OB.num+1,of=OB.of;obStart(nx);OB.lv=n;OB.chain=ch;OB.tot=tot;OB.num=k;OB.of=of;};return;}
  const bonus=0;if(OB.lv)ST.ob.lv[OB.lv]=(ST.ob.lv[OB.lv]||0)+1;addGems(OB.d.rw+bonus);save();
  const lv=OB.lv;
  openOv(chestAnim()+'<h2>Boîte ouverte !</h2><p class="gold" style="font-size:22px">+'+(OB.d.rw+bonus)+' 💎</p><p class="muted">'+OB.d.name+' · '+fmt(t)+(OB.hints?' · '+OB.hints+' indice'+(OB.hints>1?'s':''):'')+'</p>'+(lv?'<button class="ob" id="rp">Nouvelle boîte ('+LV[lv-1].nm+')</button>':'<button class="ob" id="rp">Rejouer</button>')+'<button class="ob alt" id="hm">Menu Openbox</button>');
  $('rp').onclick=()=>{closeOv();if(lv)obLevel(lv);else obStart(OB.d);};$('hm').onclick=()=>{closeOv();OB=null;home();};}
const shake=n=>{if(n){bad(n);}};

/* ---------- composants ---------- */
const T={};
T.ring=p=>{const s=OB.st[p.id]||(OB.st[p.id]=p.init?p.init.slice():Array(p.n).fill(0));const w=el('div','row');const done=D(p.id);
  for(let i=0;i<p.n;i++){const sy=Array.isArray(p.syms[0])?p.syms[i]:p.syms;const sp=TH[OB.th].kn||(Array.isArray(p.spr)?p.spr[i]:p.spr)||'d0';
    const step=360/sy.length,ang=s[i]*step,an=OB.anim&&OB.anim.id===p.id&&OB.anim.i===i;
    const b=el('button','rg'+(an?' sp':''),'<div class="rot" style="--a:'+ang+'deg;--b:'+(ang-step)+'deg">'+im(sp)+'<i class="ptr"></i></div><span class="ro">'+G(sy[s[i]])+'</span>');
    b.style.touchAction='none';
    b.addEventListener('pointerdown',e=>{e.stopPropagation();if(D(p.id))return;const r=b.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
      let last=Math.atan2(e.clientY-cy,e.clientX-cx)*180/Math.PI,tot=0,moved=false,cur=s[i];const base=s[i],n=sy.length,rot=b.querySelector('.rot'),ro=b.querySelector('.ro');
      try{b.setPointerCapture(e.pointerId);}catch(_){}
      const mv=ev=>{let a=Math.atan2(ev.clientY-cy,ev.clientX-cx)*180/Math.PI,d=a-last;if(d>180)d-=360;if(d<-180)d+=360;last=a;tot+=d;if(Math.abs(tot)>7)moved=true;
        if(!moved)return;rot.style.animation='none';rot.style.transform='rotate('+(base*step+tot)+'deg)';
        const v=(((base+Math.round(tot/step))%n)+n)%n;if(v!==cur){cur=v;ro.innerHTML=G(sy[v]);try{navigator.vibrate&&navigator.vibrate(8);}catch(_){}}};
      const up=()=>{b.removeEventListener('pointermove',mv);b.removeEventListener('pointerup',up);b.removeEventListener('pointercancel',up);
        if(moved){s[i]=cur;OB.anim=null;}else{s[i]=(s[i]+1)%n;OB.anim={id:p.id,i};}
        if(s.every((v,k)=>v===p.code[k]))solve(p);else draw();};
      b.addEventListener('pointermove',mv);b.addEventListener('pointerup',up);b.addEventListener('pointercancel',up);});
    w.append(b);}
  if(done)w.style.filter='drop-shadow(0 0 6px #5ee6a0)';return w;};
const LVC={l0:'#d4342c',l1:'#d98a3d',l2:'#4a90e0',l3:'#3fae5c',l4:'#e0c030'};
const leverSvg=(up,col,an)=>{const id='g'+Math.random().toString(36).slice(2,7);
  return '<svg viewBox="0 0 60 100" class="lsv"><defs><linearGradient id="'+id+'p" x1="0" x2="1"><stop offset="0" stop-color="#8a6a2e"/><stop offset=".45" stop-color="#e6c978"/><stop offset="1" stop-color="#7a5a22"/></linearGradient><linearGradient id="'+id+'a" x1="0" x2="1"><stop offset="0" stop-color="#777"/><stop offset=".4" stop-color="#f4f4f4"/><stop offset="1" stop-color="#666"/></linearGradient><radialGradient id="'+id+'b" cx=".35" cy=".3"><stop offset="0" stop-color="#fff"/><stop offset=".25" stop-color="'+col+'"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient></defs>'
  +'<rect x="8" y="30" width="44" height="40" rx="7" fill="url(#'+id+'p)" stroke="#2a1c08" stroke-width="1.5"/><circle cx="14" cy="36" r="2.2" fill="#3a2a10"/><circle cx="46" cy="36" r="2.2" fill="#3a2a10"/><circle cx="14" cy="64" r="2.2" fill="#3a2a10"/><circle cx="46" cy="64" r="2.2" fill="#3a2a10"/>'
  +'<rect x="22" y="42" width="16" height="16" rx="8" fill="#1a1208" stroke="#000" stroke-width="1"/>'
  +'<g class="arm'+(an?' '+an:'')+'" style="transform-origin:30px 50px;transform:rotate('+(up?0:180)+'deg)"><rect x="26.5" y="8" width="7" height="42" rx="3.5" fill="url(#'+id+'a)" stroke="#222" stroke-width="1"/><circle cx="30" cy="9" r="8.5" fill="url(#'+id+'b)" stroke="#2a0a0a" stroke-width="1"/></g>'
  +'<circle cx="30" cy="50" r="5.5" fill="url(#'+id+'p)" stroke="#2a1c08" stroke-width="1.2"/></svg>';};
T.lever=p=>{const s=OB.st[p.id]||(OB.st[p.id]=p.init?p.init.slice():Array(p.n).fill(0));const w=el('div','row');
  for(let i=0;i<p.n;i++){const sp=(Array.isArray(p.spr)?p.spr[i]:p.spr)||'l0';const an=OB.anim&&OB.anim.id===p.id&&OB.anim.i===i?(s[i]?'au':'ad'):'';
    const b=el('button','lv',leverSvg(!!s[i],LVC[sp]||'#d4342c',an));
    b.onclick=()=>{if(D(p.id))return;s[i]=s[i]?0:1;OB.anim={id:p.id,i};if(s.every((v,k)=>v===p.target[k]))solve(p);else draw();};w.append(b);}
  if(D(p.id))w.style.filter='drop-shadow(0 0 6px #5ee6a0)';return w;};
const PADL={'#2f55d4':'b','#d4342c':'r','#2fa84f':'g','#e0b030':'y'};
T.pads=p=>{const s=OB.st[p.id]||(OB.st[p.id]=[]);const w=el('div','row');const dots=el('div','pdots');p.seq.forEach((_,i)=>dots.append(el('i',i<s.length?'on':'')));w.append(dots);
  p.cols.forEach((c,i)=>{const L=PADL[c];const b=el('button','pd'+(L?' pp':''),L?im('xpd_'+L+'0')+im('xpd_'+L+'1','ln'):'');if(!L)b.style.background='radial-gradient(circle at 35% 30%,#fff9,'+c+' 40%,#0008)';
    b.onclick=()=>{if(D(p.id))return;s.push(i);if(s[s.length-1]!==p.seq[s.length-1]){OB.st[p.id]=[];toast('Raté… ça se remet à zéro.');draw();return;}
      if(s.length===p.seq.length)solve(p);else{b.classList.add('fl');setTimeout(draw,180);}};w.append(b);});return w;};
T.lights=p=>{const N=p.n||3;const s=OB.st[p.id]||(OB.st[p.id]=p.init.slice());const w=el('div','lg');w.style.gridTemplateColumns='repeat('+N+',1fr)';const L=p.lamp==='b'?['xl2','xl3']:['xl0','xl1'];
  s.forEach((v,i)=>{const b=el('button','lm'+(v?' on':''),im(L[0])+im(L[1],'ln'));b.onclick=()=>{if(D(p.id))return;const x=i%N,y=(i/N)|0;[[0,0],[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{const X=x+dx,Y=y+dy;if(X>=0&&X<N&&Y>=0&&Y<N)s[Y*N+X]^=1;});if(s.every(q=>q))solve(p);else draw();};w.append(b);});return w;};
T.simon=p=>{const st=OB.st[p.id]||(OB.st[p.id]={inp:[],show:false});const w=el('div','smn');const bs=[];
  const fl=(i,ms)=>{bs[i].classList.add('fl');setTimeout(()=>bs[i].classList.remove('fl'),ms);};
  const go=el('button','sgo','▶');go.onclick=()=>{if(D(p.id)||st.show)return;st.inp=[];st.show=true;toast('Observe…');p.seq.forEach((c,k)=>setTimeout(()=>fl(c,380),500+k*620));setTimeout(()=>{st.show=false;toast('À toi !');},500+p.seq.length*620);};
  w.append(go);
  p.cols.forEach((c,i)=>{const L=PADL[c]||'b';let b;
    if(p.skin==='bells')b=el('button','sbt bl',im('bl'+i));
    else if(p.skin==='xylo')b=el('button','sbt xy',im('xy_'+L));
    else b=el('button','sbt',im('xpd_'+L+'0')+im('xpd_'+L+'1','ln'));
    bs.push(b);
    b.onclick=()=>{if(D(p.id)||st.show){return;}fl(i,200);st.inp.push(i);const k=st.inp.length-1;
      if(st.inp[k]!==p.seq[k]){st.inp=[];toast('Raté. Appuie sur ▶ pour revoir la séquence.');shake(w);return;}
      if(st.inp.length===p.seq.length)solve(p);};w.append(b);});return w;};
T.sliders=p=>{const s=OB.st[p.id]||(OB.st[p.id]=p.init.slice());const w=el('div','sls');w.style.setProperty('--n',s.length);w.style.setProperty('--n',s.length);
  s.forEach((v,i)=>{const c=el('div','slc');const lab=el('span','slv',String(v));const r=document.createElement('input');r.type='range';r.min=0;r.max=9;r.step=1;r.value=v;r.className='slr';
    r.onpointerdown=e=>e.stopPropagation();
    r.oninput=()=>{if(D(p.id))return;s[i]=+r.value;lab.textContent=r.value;if(s.every((x,j)=>x===p.target[j]))solve(p);};
    c.append(lab,r);w.append(c);});return w;};

T.gauges=p=>{const n=p.n,s=OB.st[p.id]||(OB.st[p.id]=p.init.slice());const w=el('div','gg');const done=D(p.id);
  for(let i=0;i<n;i++){const d=p.dials[i];const g=el('div','gd'+(done?' ok':''));let h=im(d.spr);
    for(let k=0;k<10;k++){const a=(-135+k*30)*Math.PI/180;h+='<span class="odg" style="left:'+(50+34*Math.sin(a))+'%;top:'+(50-34*Math.cos(a))+'%;color:'+(d.dark?'#f0d890':'#3a2610')+'">'+k+'</span>';}
    h+='<div class="ond" style="--a:'+(-135+s[i]*30)+'deg">'+im(d.nd)+'</div><div class="cp">'+im('xn_cap')+'</div>';g.innerHTML=h;
    let on=false;const upd=e=>{const r=g.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);if(Math.hypot(dx,dy)<r.width*.06)return;let a=Math.atan2(dx,-dy)*180/Math.PI;a=Math.max(-135,Math.min(135,a));const v=Math.round((a+135)/30);if(v!==s[i]){s[i]=v;g.querySelector('.ond').style.setProperty('--a',(-135+v*30)+'deg');if(navigator.vibrate)try{navigator.vibrate(8);}catch(_){}}};
    g.onpointerdown=e=>{if(D(p.id))return;e.stopPropagation();on=true;try{g.setPointerCapture(e.pointerId);}catch(_){}upd(e);};
    g.onpointermove=e=>{if(on)upd(e);};
    g.onpointerup=g.onpointercancel=e=>{if(!on)return;on=false;if(s.every((v,j)=>v===p.target[j]))solve(p);};
    w.append(g);}
  return w;};
T.balance=p=>{const L=OB.st[p.id]||(OB.st[p.id]=[]);const wv=id=>OB.b.items[id].wv;const sum=L.reduce((a,id)=>a+wv(id),0),diff=sum-p.target;const th=Math.max(-13,Math.min(13,diff*4));
  const w=el('div','bal'),bi=el('div','bi');w.append(bi);const U=v=>'calc(var(--u)*'+v+')';
  const a=th*Math.PI/180,c=Math.cos(a),sn=Math.sin(a),cx=50,cy=22;
  const pied=el('div','','<img src="img/ob/xb_pied.webp" alt="">');pied.style.cssText='left:'+U(30)+';top:'+U(24)+';width:'+U(40)+';';bi.append(pied);
  const beam=el('div','','<img src="img/ob/xb_fl.webp" alt="" style="width:100%">');beam.style.cssText='left:'+U(cx-32)+';top:'+U(cy-16)+';width:'+U(64)+';transform-origin:50% 50%;transform:rotate('+th+'deg);transition:transform .35s';bi.append(beam);
  [[-1,'L'],[1,'R']].forEach(([sg,k])=>{const hx=cx+sg*26*c-8*sn,hy=cy+sg*26*sn+8*c;
    const ch=el('div','','<img src="img/ob/xb_ch.webp" alt="" style="width:100%;height:100%;object-fit:fill">');ch.style.cssText='left:'+U(hx-1.2)+';top:'+U(hy)+';width:'+U(2.4)+';height:'+U(18)+';';bi.append(ch);
    const pan=el('button','opan','<img src="img/ob/xb_p.webp" alt="">');pan.style.cssText='left:'+U(hx-15)+';top:'+U(hy+16)+';width:'+U(30)+';';
    if(k==='L')pan.onclick=()=>{if(D(p.id))return;const it=OB.sel&&OB.b.items[OB.sel];
      if(it&&it.wv!=null){L.push(OB.sel);OB.inv=OB.inv.filter(x=>x!==OB.sel);OB.sel=null;if(L.reduce((q,id)=>q+wv(id),0)===p.target)solve(p);else draw();}
      else if(L.length){OB.inv.push(L.pop());draw();}else{toast('Pose un poids ici (sélectionne-le dans l’inventaire).');shake(pan);}};
    else pan.onclick=()=>{toast('La pierre de référence pèse '+p.target+'.');};
    bi.append(pan);
    const ids=k==='L'?L:['xw2'];ids.forEach((id,q)=>{const n=ids.length,off=(q-(n-1)/2)*11;const t=el('div','wt','<img src="img/ob/'+(k==='L'?OB.b.items[id].spr:id)+'.webp" alt="" style="width:100%">'+'<i class="wb">'+(k==='L'?wv(id):p.target)+'</i>');t.style.cssText='left:'+U(hx+off-(k==='R'?8:7))+';top:'+U(hy+16-(k==='R'?15:11))+';width:'+U(k==='R'?16:14)+';';bi.append(t);});});
  return w;};
T.memory=p=>{const st=OB.st[p.id]||(OB.st[p.id]={m:[],o:[]});const w=el('div','mg');w.style.gridTemplateColumns='repeat('+p.cols+',1fr)';
  p.deck.forEach((c,i)=>{const up=st.m.includes(i)||st.o.includes(i);const b=el('button','omc'+(up?' up':''),im(up?'xc'+c:'xc_b'+(p.back||0)));
    b.onclick=()=>{if(D(p.id)||up||st.o.length>=2)return;st.o.push(i);
      if(st.o.length===2){const[a1,b1]=st.o;if(p.deck[a1]===p.deck[b1]){st.m.push(a1,b1);st.o=[];if(st.m.length===p.deck.length){solve(p);return;}toast('Une paire !');}
        else{const cur=OB;setTimeout(()=>{if(OB===cur){st.o=[];draw();}},800);}}
      draw();};w.append(b);});return w;};
function mtrace(p,s){let r=p.proj,c=0,dx=1,dy=0;const pts=[[.5,r+.5]];let hit=false;
  for(let k=0;k<80;k++){c+=dx;r+=dy;if(c<0||r<0||c>p.cols||r>=p.rows){pts.push([Math.max(0,Math.min(p.cols+1,c+.5-dx*.5)),Math.max(0,Math.min(p.rows,r+.5-dy*.5))]);break;}
    if(p.obs.some(o=>o.r===r&&o.c===c)){pts.push([c+.5,r+.5]);break;}
    if(p.tgt.r===r&&p.tgt.c===c){pts.push([c+.5,r+.5]);hit=true;break;}
    const mi=p.mir.findIndex(m=>m.r===r&&m.c===c);
    if(mi>=0){pts.push([c+.5,r+.5]);if(s[mi]===0){const t=dx;dx=-dy;dy=-t;}else{const t=dx;dx=dy;dy=t;}}}
  return{pts,hit};}
T.mirrors=p=>{const s=OB.st[p.id]||(OB.st[p.id]=p.init.slice());const W=p.cols+1,w=el('div','mr');w.style.gridTemplateColumns='repeat('+W+',1fr)';w.style.gridTemplateRows='repeat('+p.rows+',1fr)';
  const tr=mtrace(p,s);const done=D(p.id);
  for(let r=0;r<p.rows;r++)for(let c=0;c<W;c++){let inner='',cls='cl',mi=-1;
    if(r===p.proj&&c===0)inner=im('xs_proj');
    else if(p.tgt.r===r&&p.tgt.c===c)inner=im(tr.hit||done?'xs_t1':'xs_t0');
    else if(p.obs.some(o=>o.r===r&&o.c===c))inner=im('xs_cache');
    else{mi=p.mir.findIndex(m=>m.r===r&&m.c===c);if(mi>=0)inner='<img src="img/ob/xs_mir.webp" alt="" style="transform:rotate('+(s[mi]===0?-45:45)+'deg) scale(1.3)">';else cls+=' e';}
    const b=el('button',cls,inner);b.style.gridColumn=c+1;b.style.gridRow=r+1;
    if(mi>=0)b.onclick=()=>{if(D(p.id))return;s[mi]^=1;if(mtrace(p,s).hit)solve(p);else draw();};w.append(b);}
  const pts=tr.pts.map(q=>q[0]+','+q[1]).join(' ');
  w.insertAdjacentHTML('beforeend','<svg viewBox="0 0 '+W+' '+p.rows+'" preserveAspectRatio="none"><polyline points="'+pts+'" fill="none" stroke="#ffd870" stroke-width=".09" stroke-linecap="round" stroke-linejoin="round" opacity=".95" style="filter:drop-shadow(0 0 3px #ffb030)"/><polyline points="'+pts+'" fill="none" stroke="#fff" stroke-width=".03" stroke-linecap="round" stroke-linejoin="round"/></svg>');
  return w;};
T.dial=p=>{const st=OB.st[p.id]||(OB.st[p.id]={pos:0,step:0});const w=el('div','dl');const dd=el('div','dd',im('xr0')+'<div class="odr" style="--a:'+(st.pos*9)+'deg">'+im('xd0')+'</div><div class="mk">'+im('xm0')+'</div>');
  const ok=el('div','dok');const num=el('b','',String(st.pos));ok.append(num);
  for(let i=0;i<p.n;i++)ok.append(el('i',i<st.step?'on':''));
  const bt=el('button','','Valider');ok.append(bt);
  let on=false;const upd=e=>{const r=dd.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);if(Math.hypot(dx,dy)<r.width*.08)return;let a=Math.atan2(dx,-dy)*180/Math.PI;if(a<0)a+=360;const v=Math.round(a/9)%40;if(v!==st.pos){st.pos=v;dd.querySelector('.odr').style.setProperty('--a',(v*9)+'deg');num.textContent=v;if(navigator.vibrate)try{navigator.vibrate(6);}catch(_){}}};
  dd.onpointerdown=e=>{if(D(p.id))return;e.stopPropagation();on=true;try{dd.setPointerCapture(e.pointerId);}catch(_){}upd(e);};
  dd.onpointermove=e=>{if(on)upd(e);};dd.onpointerup=dd.onpointercancel=()=>{on=false;};
  bt.onclick=()=>{if(D(p.id))return;if(st.pos===p.code[st.step]){st.step++;if(st.step>=p.n){solve(p);return;}toast('Un déclic.');draw();}else{st.step=0;toast('Rien. Le mécanisme se remet à zéro.');draw();}};
  w.append(dd,ok);return w;};

/* pipes */
const PIPE={tp_t:[0,1,1,1],tp_t2:[0,1,1,1],tp_t3:[0,1,1,1],tp_x3:[1,1,1,1],tp_vx:[1,1,1,1],tp_s3:[1,0,1,0],tp_s4:[1,0,1,0],tp_g:[1,0,1,0],tp_f:[1,0,1,0],tp_r:[1,0,1,0],tp_e3:[0,1,1,0],tp_e4:[0,1,1,0],tp_e5:[0,1,1,0],tp_s:[1,0,1,0],tp_s2:[1,0,1,0],tp_v:[1,0,1,0],tp_e:[0,1,1,0],tp_e2:[0,1,1,0],tp_x:[1,1,1,1],tp_x2:[1,1,1,1],tp_c:[0,0,0,1],tp_src:[0,1,0,0],tp_snk:[0,0,0,1],tp_z:[0,0,0,0],tp_b:[0,1,1,0]};
function popen(spr,r){const b=PIPE[spr];return[0,1,2,3].map(d=>b[((d-r)%4+4)%4]);}
const PD=[[0,-1],[1,0],[0,1],[-1,0]];
function ptrace(p,s){const seen=new Set(),q=[[p.sr,0]];seen.add(p.sr*100);let hit=false;
  while(q.length){const[r,c]=q.pop();if(r===p.tr&&c===p.cols-1)hit=true;const o=popen(p.cells[r*p.cols+c],s[r*p.cols+c]||0);
   for(let d=0;d<4;d++){if(!o[d])continue;const nr=r+PD[d][1],nc=c+PD[d][0];if(nr<0||nc<0||nr>=p.rows||nc>=p.cols)continue;const k=nr*100+nc;if(seen.has(k))continue;const o2=popen(p.cells[nr*p.cols+nc],s[nr*p.cols+nc]||0);if(o2[(d+2)%4]){seen.add(k);q.push([nr,nc]);}}}
  return{hit,seen};}
T.pipes=p=>{const s=OB.st[p.id]||(OB.st[p.id]=p.init.slice());const w=el('div','opg');w.style.gridTemplateColumns='repeat('+p.cols+',1fr)';w.style.gridTemplateRows='repeat('+p.rows+',1fr)';
  const tr=ptrace(p,s);
  p.cells.forEach((sp,i)=>{const r=(i/p.cols)|0,c=i%p.cols;const fixed=(c===0&&r===p.sr)||(c===p.cols-1&&r===p.tr);
    const b=el('button','','<img src="img/ob/'+sp+'.webp" alt="" style="transform:rotate('+((s[i]||0)*90)+'deg)'+(tr.seen.has(r*100+c)?';filter:drop-shadow(0 0 6px #7be0ff)':'')+'">');
    if(!fixed)b.onclick=()=>{if(D(p.id))return;s[i]=((s[i]||0)+1)%4;if(ptrace(p,s).hit)solve(p);else draw();};w.append(b);});return w;};
/* hanoi */
const HCOL=['#e8c36a','#d98a4a','#d4402f','#3f86d4','#4fb36a','#a05ad0','#e0e0e0','#6a6a78'];
T.hanoi=p=>{const st=OB.st[p.id]||(OB.st[p.id]={pegs:[Array.from({length:p.n},(_,i)=>p.n-i),[],[]],sel:-1});const n=p.n;
  const w=el('div','hn','<div class="hb"></div>');
  for(let i=0;i<3;i++){const col=el('button','hp'+(st.sel===i?' sel':''),'<div class="pg"></div>');col.style.left=(1.5+i*33.5)+'%';
    st.pegs[i].forEach((d,k)=>{const wd=38+(d-1)*(58/Math.max(1,n-1));const top=k===st.pegs[i].length-1;const lift=(st.sel===i&&top)?12:0;
      const dd=document.createElement('div');dd.className='hd2'+(top?' top':'')+(st.sel===i&&top?' sel':'');dd.style.width=wd+'%';dd.style.background='linear-gradient(#ffffff55,transparent 45%,#0004),'+HCOL[(d-1)%8];dd.style.bottom=(11+k*9.2+lift)+'%';col.append(dd);});
    col.onclick=()=>{if(D(p.id))return;if(st.sel<0){if(!st.pegs[i].length){toast('Rien à prendre ici.');shake(col);return;}st.sel=i;draw();return;}
      if(st.sel===i){st.sel=-1;draw();return;}const from=st.pegs[st.sel],to=st.pegs[i],d=from[from.length-1];
      if(to.length&&to[to.length-1]<d){toast('Un petit disque ne supporte pas un plus grand… l’inverse oui.');st.sel=-1;shake(col);draw();return;}
      to.push(from.pop());st.sel=-1;if(st.pegs[2].length===n)solve(p);else draw();};w.append(col);}
  return w;};
/* clock */
T.clock=p=>{const st=OB.st[p.id]||(OB.st[p.id]={h:p.init[0],m:p.init[1]});const w=el('div','ock');
  const cd=el('div','cd',im('ck_d'+p.dial)+'<div class="hd hh" style="--a:'+((st.h%12)*30)+'deg">'+im('ck_h'+p.skin)+'</div><div class="hd mh" style="--a:'+(st.m*30)+'deg">'+im('ck_m'+p.skin)+'</div><div class="ct">'+im('ck_cap')+'</div>');
  const lab=el('b','',st.h+':'+String(st.m*5).padStart(2,'0'));
  let on=null;const upd=e=>{const r=cd.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);let a=Math.atan2(dx,-dy)*180/Math.PI;if(a<0)a+=360;const v=Math.round(a/30)%12;
    if(on==='h'){const h=v===0?12:v;if(h!==st.h){st.h=h;cd.querySelector('.hh').style.setProperty('--a',(v*30)+'deg');if(navigator.vibrate)try{navigator.vibrate(6);}catch(_){}}}
    else if(v!==st.m){st.m=v;cd.querySelector('.mh').style.setProperty('--a',(v*30)+'deg');if(navigator.vibrate)try{navigator.vibrate(6);}catch(_){}}
    lab.textContent=st.h+':'+String(st.m*5).padStart(2,'0');};
  cd.onpointerdown=e=>{if(D(p.id))return;e.stopPropagation();const r=cd.getBoundingClientRect(),d=Math.hypot(e.clientX-(r.left+r.width/2),e.clientY-(r.top+r.height/2))/r.width;on=d<.27?'h':'m';try{cd.setPointerCapture(e.pointerId);}catch(_){}upd(e);};
  cd.onpointermove=e=>{if(on)upd(e);};cd.onpointerup=cd.onpointercancel=()=>{if(!on)return;on=null;if(st.h===p.target[0]&&st.m===p.target[1])solve(p);};
  w.append(cd,lab);return w;};
/* vials */
const VCOL=['#d4342c','#2f55d4','#2fa84f','#e0b030','#9a45c8','#e07a30'],VSP=['vl_r','vl_b','vl_g','vl_y','vl_t1','vl_t2'];
T.vials=p=>{const st=OB.st[p.id]||(OB.st[p.id]={seq:[]});const w=el('div','vl');const done=D(p.id);
  const cz=el('div','cz',im(done?'vl_c1':'vl_c0'));const pd=el('div','pd2');st.seq.forEach(i=>pd.append(Object.assign(el('i',''),{style:'background:'+VCOL[i]})));cz.append(pd);
  const vr=el('div','vr');VSP.forEach((sp,i)=>{const b=el('button','',im(sp));b.onclick=()=>{if(D(p.id))return;st.seq.push(i);const k=st.seq.length-1;
      if(st.seq[k]!==p.target[k]){st.seq=[];toast('Le chaudron crachote de la fumée grise… tout est à refaire.');shake(cz);draw();return;}
      if(st.seq.length===p.target.length){solve(p);return;}toast('Ça bouillonne.');draw();};vr.append(b);});
  w.append(cz,vr);return w;};
/* patch */
const PLC=['#d4342c','#2f55d4','#2fa84f','#e0b030','#222'],PLS=['jk_r','jk_b','jk_g','jk_y','jk_k'];
T.patch=p=>{const st=OB.st[p.id]||(OB.st[p.id]={slots:Array(p.n).fill(-1),sel:-1});const done=D(p.id);const w=el('div','pt');
  const ps=el('div','ps'),pl=el('div','pl');
  for(let i=0;i<p.n;i++){const b=el('button','','<img class="sk" src="img/ob/'+(done?'jk_s2':'jk_s0')+'.webp" alt="">'+(st.slots[i]>=0?'<div class="ph" style="--c:'+PLC[st.slots[i]]+'"></div>':''));
    b.onclick=()=>{if(D(p.id))return;if(st.sel>=0){st.slots[i]=st.sel;st.sel=-1;if(st.slots.every((v,j)=>v===p.target[j])){solve(p);return;}draw();}
      else if(st.slots[i]>=0){st.slots[i]=-1;draw();}else{toast('Choisis d’abord une fiche en bas.');shake(b);}};ps.append(b);}
  PLS.forEach((sp,k)=>{if(st.slots.includes(k))return;const b=el('button',st.sel===k?'sel':'',im(sp));b.onclick=()=>{if(D(p.id))return;st.sel=st.sel===k?-1:k;draw();};pl.append(b);});
  w.append(ps,pl);return w;};
/* rings (disques concentriques) */
const RCOL=['#ff5a3c','#2fc8ff','#7be05a'];
T.rings=p=>{const st=OB.st[p.id]||(OB.st[p.id]=p.init.slice());const n=p.n;const RS=[.9,.64,.42];const w=el('div','rgs');
  let h=im('dc_f'+(p.frame||0));
  for(let k=1;k<=8;k++){const a=(k-1)*45*Math.PI/180;h+='<span class="nm" style="left:'+(50+43.5*Math.sin(a))+'%;top:'+(50-43.5*Math.cos(a))+'%">'+k+'</span>';}
  for(let i=0;i<n;i++){const sz=RS[i]*72;h+='<div class="rr" data-i="'+i+'" style="--a:'+(st[i]*45)+'deg;width:'+sz+'%;height:'+sz+'%;left:'+(50-sz/2)+'%;top:'+(50-sz/2)+'%">'+im(p.spr[i])+'</div>';}
  h+='<div class="rr" style="width:20%;height:20%;left:40%;top:40%">'+im('dc_c'+(p.cen||0))+'</div>';
  for(let i=0;i<n;i++){const sz=RS[i]*72;h+='<div class="rr mk" data-i="'+i+'" style="z-index:5;pointer-events:none;--a:'+(st[i]*45)+'deg;width:'+sz+'%;height:'+sz+'%;left:'+(50-sz/2)+'%;top:'+(50-sz/2)+'%"><div class="tm" style="--c:'+RCOL[i]+';--w:'+(11/sz*100)+'%"><i></i></div></div>';}
  w.innerHTML=h;
  const rdo=el('div','rdo');const rdt=()=>{rdo.innerHTML=st.map((v,i)=>'<b style="color:'+RCOL[i]+'">'+(v+1)+'</b>').join(' · ');};rdt();
  let cur=-1,sx=0,sy=0,mv=false;const upd=e=>{const r=w.getBoundingClientRect(),dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);let a=Math.atan2(dx,-dy)*180/Math.PI;if(a<0)a+=360;const v=Math.round(a/45)%8;if(v!==st[cur]){st[cur]=v;w.querySelectorAll('.rr[data-i="'+cur+'"]').forEach(x=>x.style.setProperty('--a',(v*45)+'deg'));rdt();if(navigator.vibrate)try{navigator.vibrate(8);}catch(_){}}};
  w.onpointerdown=e=>{if(D(p.id))return;e.stopPropagation();const r=w.getBoundingClientRect(),dd=Math.hypot(e.clientX-(r.left+r.width/2),e.clientY-(r.top+r.height/2))/r.width;
    cur=-1;for(let i=n-1;i>=0;i--){if(dd<=RS[i]*.36){cur=i;break;}}if(cur<0)return;sx=e.clientX;sy=e.clientY;mv=false;try{w.setPointerCapture(e.pointerId);}catch(_){}};
  w.onpointermove=e=>{if(cur<0)return;if(!mv){if(Math.hypot(e.clientX-sx,e.clientY-sy)<8)return;mv=true;}upd(e);};
  w.onpointerup=w.onpointercancel=()=>{if(cur<0)return;if(!mv){const k=(st[cur]+1)%8;st[cur]=k;w.querySelectorAll('.rr[data-i="'+cur+'"]').forEach(x=>x.style.setProperty('--a',(k*45)+'deg'));rdt();}cur=-1;if(st.every((v,j)=>v===p.target[j]))solve(p);};
  const root=el('div','rgw');root.append(w,rdo);return root;};
/* moons */
T.moons=p=>{const st=OB.st[p.id]||(OB.st[p.id]=p.init.slice());const w=el('div','mn2');
  st.forEach((v,i)=>{const b=el('button','',im('mn'+v));b.onclick=()=>{if(D(p.id))return;st[i]=(st[i]+1)%4;if(st.every((q,j)=>q===p.target[j]))solve(p);else draw();};w.append(b);});return w;};
/* torn paper */
T.torn=p=>{const st=OB.st[p.id]||(OB.st[p.id]={a:p.init.slice(),sel:-1});const w=el('div','tn');
  st.a.forEach((v,i)=>{const b=el('button',st.sel===i?'sel':'',im('pp'+v));b.onclick=()=>{if(D(p.id))return;if(st.sel<0){st.sel=i;draw();return;}if(st.sel===i){st.sel=-1;draw();return;}const t=st.a[st.sel];st.a[st.sel]=st.a[i];st.a[i]=t;st.sel=-1;if(st.a.every((q,j)=>q===j))solve(p);else draw();};w.append(b);});return w;};
T.socket=p=>{const s=OB.st[p.id]||(OB.st[p.id]=p.slots.map(()=>false));const w=el('div','row');
  p.slots.forEach((sl,i)=>{const b=el('button','sl '+(s[i]?'f':'e'),im(sl.g));b.onclick=()=>{if(s[i])return;const it=OB.sel&&OB.b.items[OB.sel];
      if(!it||!['gem','key','part'].includes(it.kind)){toast('Il faut quelque chose à placer ici.');shake(b);return;}
      if(it.spr!==sl.g){toast('Ça ne s’emboîte pas.');shake(b);OB.sel=null;draw();return;}
      OB.flags['used:'+OB.sel]=true;OB.inv=OB.inv.filter(x=>x!==OB.sel);OB.sel=null;s[i]=true;if(s.every(x=>x))solve(p);else{toast('Ça s’emboîte parfaitement.');draw();}};w.append(b);});return w;};
const HK={dr:{a:'l',iv:[8, 22, 48, 56],f:[[157, 138], [168, 142], [225, 142]]},dw:{a:'c',iv:[10, -36, 80, 100],f:[[206, 80], [213, 85], [225, 91]]},tr:{a:'c',iv:[18, 32, 64, 54],f:[[140, 116], [157, 133], [191, 127]]},vt:{a:'r',iv:[40, 18, 55, 66],f:[[113, 108], [167, 118], [188, 117]]},pn:{a:'r',iv:[45, 15, 50, 70],f:[[103, 109], [103, 122], [158, 126]]},cf:{a:'c',iv:[15, 0, 70, 55],f:[[123, 83], [126, 112], [127, 115]]},ca:{a:'c',iv:[28, 15, 44, 70],f:[[150, 113], [277, 117], [299, 115]]}};
T.hatch=p=>{if(p.sk){const H=HK[p.sk],W=Math.max(...H.f.map(f=>f[0])),Hh=Math.max(...H.f.map(f=>f[1]));
  const w=el('div','hkw '+H.a);const hk=el('div','hk');hk.style.setProperty('--r',W/Hh);
  const imgs=H.f.map((f,k)=>{const i=document.createElement('img');i.src='img/ob/hk_'+p.sk+k+'.webp';i.alt='';i.draggable=false;i.style.width=(f[0]/W*100)+'%';hk.append(i);return i;});
  const set=k=>imgs.forEach((i,q)=>i.classList.toggle('on',q===k));
  if(!D(p.id)){set(0);hk.onclick=()=>{if(p.open()){OB.done[p.id]=true;OB.anim={id:p.id};toast(p.msg||'Ça s’ouvre.');draw();}else{toast(p.locked||'Fermé.');shake(hk);}};w.append(hk);return w;}
  if(OB.anim&&OB.anim.id===p.id){set(0);setTimeout(()=>set(1),60);setTimeout(()=>set(2),260);}else set(2);
  const inn=el('div','in');inn.style.cssText='left:'+H.iv[0]+'%;top:'+H.iv[1]+'%;width:'+H.iv[2]+'%;height:'+H.iv[3]+'%';
  (p.give||[]).filter(g=>!OB.flags['took:'+g]).forEach(g=>{const it=OB.b.items[g];const b=el('button','hs2',it.kind==='note'?'<div class="note" style="margin:auto"></div>':im(it.spr)+(it.wv!=null?'<i class="wb">'+it.wv+'</i>':''));b.onclick=()=>{take(g);draw();};inn.append(b);});
  hk.append(inn);w.append(hk);return w;}
  if(!D(p.id)){const b=el('button','hs2',im(p.spr||'l7','pl'));b.onclick=()=>{if(p.open()){OB.done[p.id]=true;OB.anim={id:p.id};toast(p.msg||'Le panneau s’ouvre.');draw();}else{toast(p.locked||'Fermé.');shake(b);}};return b;}
  const w=el('div','cav'+(OB.anim&&OB.anim.id===p.id?' ho':''),'<img class="open" src="img/ob/'+(p.spr||'l7')+'.webp" alt="">');
  (p.give||[]).filter(g=>!OB.flags['took:'+g]).forEach(g=>{const it=OB.b.items[g];const b=el('button','hs2',it.kind==='note'?'<div class="note" style="margin:auto"></div>':im(it.spr)+(it.wv!=null?'<i class="wb">'+it.wv+'</i>':''));b.style.cssText='height:100%;flex:1';b.onclick=()=>{take(g);draw();};w.append(b);});return w;};
T.hot=p=>{if(D(p.id)&&(!p.spr||p.pick))return null;const w=el('button','hs2'+(D(p.id)&&p.fade?' dn':''),p.spr?im(D(p.id)&&p.sprD?p.sprD:p.spr):(p.glint===false?'':'<div class="glint'+(p.glint==='fa'?' fa':'')+'"></div>'));w.style.width='100%';w.style.height='100%';
  if(p.spr&&(D(p.id)||(p.toggle&&OB.flags[p.id])))w.style.filter='drop-shadow(0 0 8px #fff)';
  w.onclick=()=>{if(D(p.id)&&!p.again)return;if(p.uses&&OB.sel!==p.uses){toast(p.fail||'Il faudrait utiliser quelque chose ici.');shake(w);return;}if(p.cond&&!p.cond()){toast(p.fail||'Rien ne se passe.');shake(w);return;}if(p.toggle){OB.flags[p.id]=!OB.flags[p.id];toast(OB.flags[p.id]?'Allumé.':'Éteint.');draw();return;}solve(p);};return w;};
T.marks=p=>{const w=el('div',p.plate?'plq':'');w.style.pointerEvents='none';w.innerHTML=p.items.map(mk).join('');return w;};
T.tiles=p=>{const N=3;const s=OB.st[p.id]||(OB.st[p.id]=p.init.slice());const w=el('div','tg');w.style.gridTemplateColumns='repeat(3,1fr)';
  const rd=()=>{w.textContent='';s.forEach((v,i)=>{const b=el('button','tl2'+(v?'':' e'),v?G(p.glyphs[v-1]):'');b.onclick=()=>{if(D(p.id))return;const z=s.indexOf(0),x=i%N,y=(i/N)|0,zx=z%N,zy=(z/N)|0;if(Math.abs(x-zx)+Math.abs(y-zy)!==1)return;s[z]=v;s[i]=0;
      if(s.every((q,j)=>q===(j+1)%9))solve(p);else rd();};w.append(b);});};rd();if(D(p.id))w.style.boxShadow='0 0 8px #5ee6a0';return w;};
T.knot=p=>{const n=p.n,r=OB.st[p.id]||(OB.st[p.id]=p.init.slice());const done=D(p.id);const sel=OB.st[p.id+'_s'];
  const w=el('div','kn');const Y=i=>(i+.5)*100/n;
  let svg='<svg viewBox="0 0 100 100" preserveAspectRatio="none">';
  const order=r.map((s0,pos)=>[s0,pos]);
  order.forEach(([st,pos])=>{const y0=Y(st),y1=Y(pos),d='M9 '+y0+' C 50 '+y0+' 50 '+y1+' 91 '+y1;
    svg+='<path d="'+d+'" stroke="#000a" stroke-width="5.6" fill="none" vector-effect="non-scaling-stroke" style="stroke-width:11px"/><path d="'+d+'" stroke="'+p.cols[st]+'" fill="none" vector-effect="non-scaling-stroke" style="stroke-width:7px"/><path d="'+d+'" stroke="#fff6" fill="none" vector-effect="non-scaling-stroke" style="stroke-width:2px;transform:translateY(-1.2px)"/>';});
  svg+='</svg>';w.innerHTML=svg;
  for(let i=0;i<n;i++){const l=el('i','kl');l.style.top=Y(i)+'%';l.style.background=p.cols[i];w.append(l);}
  for(let pos=0;pos<n;pos++){const b=el('button','kr'+(sel===pos?' sel':''));b.style.top=Y(pos)+'%';b.style.background=p.cols[r[pos]];
    b.onclick=()=>{if(D(p.id))return;const q=OB.st[p.id+'_s'];if(q==null||q===pos){OB.st[p.id+'_s']=q===pos?null:pos;draw();return;}
      if(Math.abs(q-pos)===1){const t=r[q];r[q]=r[pos];r[pos]=t;OB.st[p.id+'_s']=null;if(r.every((v,i)=>v===i))solve(p);else draw();}else{OB.st[p.id+'_s']=pos;draw();}};w.append(b);}
  if(done)w.style.filter='drop-shadow(0 0 6px #5ee6a0)';return w;};
T.train=p=>{const st=OB.st[p.id]||(OB.st[p.id]=p.slots.map(()=>false));const w=el('div','trn');const done=D(p.id);const turned=OB.st[p.id+'_t']||0;
  p.slots.forEach((sl,i)=>{const b=el('button','tg2'+(st[i]?' fl':''));b.style.cssText='left:'+sl.x+'%;top:'+sl.y+'%;width:'+sl.w+'%;aspect-ratio:1';
    if(st[i]){b.innerHTML=im(sl.g,'spn'+(i%2?' r':''));const cs=OB.st[p.id.slice(0,-1)];b.firstChild.style.animationDuration=(done?3:Math.max(3,9-(cs?cs.n:0)*.9))+'s';}
    b.onclick=()=>{if(st[i]||done)return;const it=OB.sel&&OB.b.items[OB.sel];if(!it||it.kind!=='part'){toast('Un axe vide. Il faut y poser un engrenage.');shake(b);return;}
      if(it.spr!==sl.g){toast('Celui-là ne s’engrène pas ici.');shake(b);OB.sel=null;draw();return;}
      OB.flags['used:'+OB.sel]=true;OB.inv=OB.inv.filter(x=>x!==OB.sel);OB.sel=null;st[i]=true;if(st.every(x=>x))solve(p);else{toast('Ça s’emboîte.');draw();}};w.append(b);});
  return w;};
T.crank=p=>{const w=el('div','crk');const s=OB.st[p.id]||(OB.st[p.id]={has:false,n:0});const done=D(p.id);
  const R=46,C=2*Math.PI*R,off=C*(1-Math.min(1,s.n/p.turns));
  const inner=s.has?'<svg class="pr" viewBox="0 0 100 100"><circle class="bg" cx="50" cy="50" r="'+R+'"/><circle class="fg" cx="50" cy="50" r="'+R+'" stroke-dasharray="'+C.toFixed(1)+'" stroke-dashoffset="'+off.toFixed(1)+'"/></svg><div class="pl"></div>'+im(p.item,'hc'+(OB.anim&&OB.anim.id===p.id?' sp3':'')):'<div class="ax"></div>';
  const hub=el('button','hub'+(s.has?' on':''),inner);
  hub.onclick=()=>{if(done)return;if(!s.has){const it=OB.sel&&OB.b.items[OB.sel];if(!it||it.spr!==p.item){toast('Il manque une manivelle pour tourner ça.');shake(hub);return;}OB.flags['used:'+OB.sel]=true;OB.inv=OB.inv.filter(x=>x!==OB.sel);OB.sel=null;s.has=true;toast('La manivelle est en place. Tourne !');draw();return;}
    s.n++;OB.anim={id:p.id};if(s.n>=p.turns)solve(p);else draw();};
  w.append(hub);return w;};
const LKS=[['pl_br',1],['pl_st',1],['pl_go',1],['lk_orn',0],['lk_iris',0],['lk_cast',0]];
T.keyhole=p=>{if(!p.lock){let h=0;String(p.key).split('').forEach(c=>h=(h*7+c.charCodeAt(0))%97);const L=LKS[h%LKS.length];p={...p,lock:L[0],lockO:L[1]};}const w=el('div','row');const f=D(p.id);const b=p.lock?el('button','pkb '+(f?'f':'e'),im(p.lock+(f&&p.lockO?'_o':(p.lockO?'_c':'')))):el('button','sl '+(f?'f':'e'),im(p.key));
  b.onclick=()=>{if(f)return;const it=OB.sel&&OB.b.items[OB.sel];if(!it||it.kind!=='key'){toast('Une serrure… il faudrait une clé.');shake(b);return;}
    if(it.spr!==p.key){toast('Cette clé ne convient pas.');shake(b);OB.sel=null;draw();return;}OB.flags['used:'+OB.sel]=true;OB.inv=OB.inv.filter(x=>x!==OB.sel);OB.sel=null;solve(p);};w.append(b);return w;};

/* symboles / cycle */
T.cycle=p=>{const st=OB.st[p.id]||(OB.st[p.id]=p.init.slice());const w=el('div','cyc');
  st.forEach((v,i)=>{const b=el('button','',im(p.sprs[v]));b.onclick=()=>{if(D(p.id))return;st[i]=(st[i]+1)%p.sprs.length;if(st.every((q,j)=>q===p.target[j]))solve(p);else draw();};w.append(b);});return w;};
/* interrupteurs */
T.switches=p=>{const st=OB.st[p.id]||(OB.st[p.id]={sw:p.perm.map(()=>0),bu:p.perm.map(()=>0)});const w=el('div','swb');
  const r1=el('div','r'),r2=el('div','r');
  const sk=p.sk||{l0:'bu_off',l1:'bu_on',s0:'sw_a',s1:'sw_b'};st.bu.forEach(v=>r1.append(el('div','',im(v?sk.l1:sk.l0))));
  st.sw.forEach((v,i)=>{const b=el('button','',im(v?sk.s1:sk.s0));b.onclick=()=>{if(D(p.id))return;st.sw[i]^=1;st.bu[p.perm[i]]^=1;if(st.bu.every((q,j)=>q===p.target[j]))solve(p);else draw();};r2.append(b);});
  w.append(r1,r2);return w;};
/* fusibles */
T.fuses=p=>{const st=OB.st[p.id]||(OB.st[p.id]=p.bad.map(()=>false));const w=el('div','fz');
  p.bad.forEach((bd,i)=>{const fixed=st[i];const b=el('button',bd&&!fixed?'bad':'ok',im(bd&&!fixed?'fu_bk'+(p.v[i]?'2':''):'fu_ok'+(p.v[i]?'2':'')));
    b.onclick=()=>{if(!bd||fixed){toast('Celui-ci fonctionne.');return;}const it=OB.sel&&OB.b.items[OB.sel];
      if(!it||it.spr!=='fu_ok'){toast('Ce fusible est grillé : il faut un fusible neuf.');shake(b);return;}
      OB.flags['used:'+OB.sel]=true;OB.inv=OB.inv.filter(x=>x!==OB.sel);OB.sel=null;st[i]=true;
      if(p.bad.every((q,j)=>!q||st[j]))solve(p);else{toast('Le fusible neuf s’enclenche.');draw();}};w.append(b);});return w;};

/* ---------- robot de test ---------- */
window.obBot=function(){let g=0;while(!OB.over&&g++<80){let prog=false;
  OB.d.parts.length;
  OB.b.parts.forEach(p=>{if(D(p.id)&&p.t!=='hatch'&&p.t!=='hot')return;if(p.need&&!p.need())return;
    if(p.t==='ring'){if(!D(p.id)){OB.st[p.id]=p.code.slice();solve(p,true);prog=true;}}
    else if(p.t==='lever'){if(!D(p.id)){OB.st[p.id]=p.target.slice();solve(p,true);prog=true;}}
    else if(p.t==='pads'){if(!D(p.id)){solve(p,true);prog=true;}}
    else if(p.t==='knot'){if(!D(p.id)){OB.st[p.id]=p.cols.map((_,i)=>i);solve(p,true);prog=true;}}
    else if(p.t==='train'){if(!D(p.id)){const st=OB.st[p.id]||(OB.st[p.id]=p.slots.map(()=>false));p.slots.forEach((sl,i)=>{if(st[i])return;const id=OB.inv.find(x=>OB.b.items[x].spr===sl.g&&OB.b.items[x].kind==='part');if(id){OB.inv=OB.inv.filter(x=>x!==id);OB.flags['used:'+id]=true;st[i]=true;prog=true;}});if(st.every(x=>x)){solve(p,true);prog=true;}}}
    else if(p.t==='crank'){if(!D(p.id)){const st=OB.st[p.id]||(OB.st[p.id]={has:false,n:0});if(!st.has){const id=OB.inv.find(x=>OB.b.items[x].spr===p.item);if(id){OB.inv=OB.inv.filter(x=>x!==id);OB.flags['used:'+id]=true;st.has=true;prog=true;}}if(st.has){st.n=p.turns;solve(p,true);prog=true;}}}
    else if(p.t==='gauges'){if(!D(p.id)){OB.st[p.id]=p.target.slice();solve(p,true);prog=true;}}
    else if(p.t==='memory'){if(!D(p.id)){solve(p,true);prog=true;}}
    else if(p.t==='mirrors'){if(!D(p.id)){OB.st[p.id]=p.sol.slice();solve(p,true);prog=true;}}
    else if(p.t==='dial'){if(!D(p.id)){solve(p,true);prog=true;}}
    else if(p.t==='balance'){if(!D(p.id)){if(p.sol.every(id=>OB.inv.includes(id))){OB.st[p.id]=p.sol.slice();OB.inv=OB.inv.filter(x=>!p.sol.includes(x));solve(p,true);prog=true;}}}
    else if(p.t==='pipes'){if(!D(p.id)){OB.st[p.id]=p.sol.slice();solve(p,true);prog=true;}}
    else if(p.t==='cycle'||p.t==='switches'){if(!D(p.id)){solve(p,true);prog=true;}}
    else if(p.t==='fuses'){if(!D(p.id)){const st=OB.st[p.id]||(OB.st[p.id]=p.bad.map(()=>false));p.bad.forEach((bd,i)=>{if(!bd||st[i])return;const id=OB.inv.find(x=>OB.b.items[x].spr==='fu_ok');if(id){OB.inv=OB.inv.filter(x=>x!==id);OB.flags['used:'+id]=true;st[i]=true;prog=true;}});if(p.bad.every((q,j)=>!q||st[j])){solve(p,true);prog=true;}}}
    else if(p.t==='hanoi'||p.t==='clock'||p.t==='vials'||p.t==='patch'||p.t==='rings'||p.t==='moons'||p.t==='torn'){if(!D(p.id)){solve(p,true);prog=true;}}
    else if(p.t==='lights'){if(!D(p.id)){OB.st[p.id]=OB.st[p.id]||[];OB.st[p.id]=OB.st[p.id].map(()=>1);solve(p,true);prog=true;}}
    else if(p.t==='simon'){if(!D(p.id)){solve(p,true);prog=true;}}
    else if(p.t==='sliders'){if(!D(p.id)){OB.st[p.id]=p.target.slice();solve(p,true);prog=true;}}
    else if(p.t==='tiles'){if(!D(p.id)){OB.st[p.id]=[1,2,3,4,5,6,7,8,0];solve(p,true);prog=true;}}
    else if(p.t==='hot'){if(!D(p.id)&&(!p.cond||p.cond())&&(!p.uses||OB.inv.includes(p.uses))){solve(p,true);prog=true;}}
    else if(p.t==='hatch'){if(!D(p.id)&&p.open()){OB.done[p.id]=true;prog=true;}if(D(p.id))(p.give||[]).forEach(x=>{if(!OB.flags['took:'+x]){take(x);prog=true;}});}
    else if(p.t==='keyhole'){if(!D(p.id)){const id=OB.inv.find(i=>OB.b.items[i].kind==='key'&&OB.b.items[i].spr===p.key);if(id){OB.inv=OB.inv.filter(x=>x!==id);OB.flags['used:'+id]=true;solve(p,true);prog=true;}}}
    else if(p.t==='socket'){if(!D(p.id)){const s=OB.st[p.id]||(OB.st[p.id]=p.slots.map(()=>false));p.slots.forEach((sl,i)=>{if(s[i])return;const id=OB.inv.find(x=>OB.b.items[x].spr===sl.g&&['gem','key','part'].includes(OB.b.items[x].kind));if(id){OB.inv=OB.inv.filter(x=>x!==id);OB.flags['used:'+id]=true;s[i]=true;prog=true;}});if(s.every(x=>x)){solve(p,true);prog=true;}}}
  });
  (OB.b.recipes||[]).forEach(r=>{if(OB.inv.includes(r.a)&&OB.inv.includes(r.b)){OB.inv=OB.inv.filter(x=>x!==r.a&&x!==r.b);OB.inv.push(r.out);prog=true;}});
  if(!prog)break;}
  return OB.over;};
window.obState=()=>OB;
window.obDefine=function(d){OBX.boxes.push(d);};
window.obStartTest=function(id,seed){const d=OBX.boxes.find(x=>x.id===id);obStart(d,seed);return OB;};
})();
