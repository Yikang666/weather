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
        "/assets/makeup_index.png",
        "/assets/motion_index.png",
        "/assets/cold_index.png",
        "/assets/clothing_index.png",
        "/assets/traffic_index.png",
        "/assets/tourism_index.png",
        "/assets/morning_exercise_index.png",
        "/assets/logo_caiyun.png"
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
