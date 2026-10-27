const CACHE='jeux-tama-v14';
const FILES=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('jeux-tama-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{const cp=r.clone();caches.open(CACHE).then(c=>c.put(e.request,cp)).catch(()=>{});return r;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));
});
async function check(){
  try{
    const c=await caches.open('tama-alerts');const r=await c.match('alerts.json');if(!r)return;
    const d=await r.json();const now=Date.now();const shown=d.shown||[];
    for(const a of d.alerts||[]){
      if(a.t<=now&&now-a.t<12*3600*1000&&!shown.includes(a.tag)){
        shown.push(a.tag);
        await self.registration.showNotification(a.title,{body:a.body,tag:a.tag,icon:'icons/icon-192.png'});
      }
    }
    d.shown=shown;await c.put('alerts.json',new Response(JSON.stringify(d)));
  }catch(e){}
}
self.addEventListener('periodicsync',e=>{if(e.tag==='tama-check')e.waitUntil(check());});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window'}).then(l=>l.length?l[0].focus():clients.openWindow('./')));});
