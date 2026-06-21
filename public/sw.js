const CACHE = "hand-betting-v1";

const PRECACHE = [
  "/",
  "/game",
  "/game-over",
  "/leaderboard",
  "/web-app-manifest-192x192.png",
  "/web-app-manifest-512x512.png",
  "/tiles/Back.svg",
  "/tiles/Blank.svg",
  "/tiles/Chun.svg",
  "/tiles/Front.svg",
  "/tiles/Haku.svg",
  "/tiles/Hatsu.svg",
  "/tiles/Man1.svg",
  "/tiles/Man2.svg",
  "/tiles/Man3.svg",
  "/tiles/Man4.svg",
  "/tiles/Man5.svg",
  "/tiles/Man5-Dora.svg",
  "/tiles/Man6.svg",
  "/tiles/Man7.svg",
  "/tiles/Man8.svg",
  "/tiles/Man9.svg",
  "/tiles/Nan.svg",
  "/tiles/Pei.svg",
  "/tiles/Pin1.svg",
  "/tiles/Pin2.svg",
  "/tiles/Pin3.svg",
  "/tiles/Pin4.svg",
  "/tiles/Pin5.svg",
  "/tiles/Pin5-Dora.svg",
  "/tiles/Pin6.svg",
  "/tiles/Pin7.svg",
  "/tiles/Pin8.svg",
  "/tiles/Pin9.svg",
  "/tiles/Shaa.svg",
  "/tiles/Sou1.svg",
  "/tiles/Sou2.svg",
  "/tiles/Sou3.svg",
  "/tiles/Sou4.svg",
  "/tiles/Sou5.svg",
  "/tiles/Sou5-Dora.svg",
  "/tiles/Sou6.svg",
  "/tiles/Sou7.svg",
  "/tiles/Sou8.svg",
  "/tiles/Sou9.svg",
  "/tiles/Ton.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)),
        ),
      ),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;
  if (!request.url.startsWith("http")) return;
  if (request.url.includes("/_next/webpack-hmr")) return;
  if (request.url.includes("/_next/static/development")) return;

  if (request.mode === "navigate") {
    event.respondWith(fetch(request).catch(() => caches.match("/")));
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      });
    }),
  );
});
