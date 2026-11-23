/* Service worker — fonctionne hors ligne après la 1re visite.
   Changez VERSION à chaque mise à jour du site pour forcer le rafraîchissement du cache. */
const VERSION = "bulletins-v10";
const CORE = ["./", "index.html", "manifest.webmanifest", "favicon.svg"];          // indispensables
const EXTRA = ["favicon.ico", "icons/icon-32.png", "icons/icon-192.png", "icons/icon-256.png", "icons/icon-512.png",
  "icons/icon-maskable-512.png", "icons/apple-touch-icon.png"];                      // facultatifs : une icône absente ne bloque plus l'installation
const LIBS = [
  "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js",
  "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"
];
self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(VERSION);
    await c.addAll(CORE);
    await Promise.all(EXTRA.concat(LIBS).map(u => c.add(u).catch(() => {})));
    self.skipWaiting();
  })());
});
self.addEventListener("activate", e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== VERSION) await caches.delete(k);
    await self.clients.claim();
  })());
});
self.addEventListener("fetch", e => {
  const r = e.request;
  if (r.method !== "GET") return;
  const u = new URL(r.url);
  if (r.mode === "navigate") {            // page : réseau d'abord (mises à jour), cache en secours
    e.respondWith(fetch(r).then(x => { if (x.ok) { const cp = x.clone(); caches.open(VERSION).then(c => c.put("index.html", cp)); } return x; })
      .catch(() => caches.match("index.html")));
    return;
  }
  if (u.origin === location.origin || /(^|\.)cdnjs\.cloudflare\.com$|(^|\.)fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)) {
    e.respondWith(caches.open(VERSION).then(async c => {   // fichiers/polices/librairies : cache d'abord
      const hit = await c.match(r);
      const net = fetch(r).then(x => { if (x && (x.ok || x.type === "opaque")) c.put(r, x.clone()); return x; }).catch(() => hit);
      return hit || net;
    }));
  }
});
