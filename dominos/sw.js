const CACHE='jeux-dominos-v1';
const FILES=['./','./index.html','./peerjs.min.js','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./img/d_0_0.webp','./img/d_0_1.webp','./img/d_0_2.webp','./img/d_0_3.webp','./img/d_0_4.webp','./img/d_0_5.webp','./img/d_0_6.webp','./img/d_1_1.webp','./img/d_1_2.webp','./img/d_1_3.webp','./img/d_1_4.webp','./img/d_1_5.webp','./img/d_1_6.webp','./img/d_2_2.webp','./img/d_2_3.webp','./img/d_2_4.webp','./img/d_2_5.webp','./img/d_2_6.webp','./img/d_3_3.webp','./img/d_3_4.webp','./img/d_3_5.webp','./img/d_3_6.webp','./img/d_4_4.webp','./img/d_4_5.webp','./img/d_4_6.webp','./img/d_5_5.webp','./img/d_5_6.webp','./img/d_6_6.webp'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('jeux-dominos-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp)).catch(()=>{});return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
});
