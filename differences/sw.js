const CACHE='jeux-differences-v1';
const FILES=["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./img/s01.webp", "./img/s02.webp", "./img/s03.webp", "./img/s04.webp", "./img/s05.webp", "./img/s06.webp", "./img/s07.webp", "./img/s08.webp", "./img/s09.webp", "./img/s10.webp", "./img/s11.webp", "./img/s12.webp", "./img/s13.webp", "./img/s14.webp", "./img/s15.webp", "./img/s16.webp", "./img/s17.webp", "./img/s18.webp", "./img/s19.webp", "./img/s20.webp", "./img/s21.webp"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('jeux-differences-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp)).catch(()=>{});return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
});
