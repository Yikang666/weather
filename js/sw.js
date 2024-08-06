self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("my-cache-name").then(function (cache) {
      return cache.addAll([
        "/favicon.ico",
        "/js/locate.js",
        "/assets/font/XType-Regular.otf",
        "/assets/logo.webp",
        "/assets/city_btn.png",
        "/assets/centigrade.png",
        "/assets/warn_right_blue.png",
        "/assets/local_indicator_focused.png",
        "/assets/bg_first_cloudy.png",
        "https://cdn.jsdmirror.com/npm/@better-scroll/core@2.5.1/dist/core.min.js",
      ]);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        return response;
      }

      return fetch(event.request).then(function (response) {
        const cacheCopy = response.clone();
        caches.open("my-cache-name").then(function (cache) {
          cache.put(event.request, cacheCopy);
        });
        return response;
      });
    })
  );
});
