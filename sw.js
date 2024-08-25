self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open("site-cache").then(function(cache) {
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
        "/assets/apparent_temperature.png",
        "/assets/visibility.png",
        "/assets/ziwai.png",
        "/assets/humidity.png",
        "/assets/fengli.png",
        "/assets/air_pressure.png",
      ]);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
