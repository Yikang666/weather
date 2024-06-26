// 仿安卓Toast提示
function toast(msg, duration) {
  duration = isNaN(duration) ? 3000 : duration;
  var m = document.createElement("div");
  m.innerHTML = msg;
  m.style.cssText =
    "max-width: 70%;color: rgb(255, 255, 255);text-align: center;border-radius: 6px;padding: 4px 6px;position: fixed;top: 75%;left: 50%;transform: translate(-50%, 0);z-index: 99999999;background: rgba(0, 0, 0, 0.7);font-size: 12px;";
  document.body.appendChild(m);
  setTimeout(function () {
    var d = 0.5;
    m.style.webkitTransition =
      "-webkit-transform " + d + "s ease-in, opacity " + d + "s ease-in";
    m.style.opacity = "0";
    setTimeout(function () {
      document.body.removeChild(m);
    }, d * 1000);
  }, duration);
}

// 发送请求
const xhr0 = new XMLHttpRequest();

// 定位
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
} else {
  toast("您的浏览器不支持使用HTML5来获取地理位置服务");
}

function onSuccess(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  xhr0.open(
    "GET",
    "https://api.map.baidu.com/geocoder?location=" +
      latitude +
      "," +
      longitude +
      "&output=json"
  );
  xhr0.onload = function () {
    if (xhr0.status == 200) {
      var response = xhr0.response;
      toast(response);
    } else {
      toast(123);
    }
  };
  xhr0.send();
}

function onError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      toast("您拒绝了对获取地理位置的请求");
      break;
    case error.POSITION_UNAVAILABLE:
      toast("定位失败，请打开位置服务");
      break;
    case error.TIMEOUT:
      toast("请求您的地理位置超时");
      break;
    case error.UNKNOWN_ERROR:
      toast("未知错误");
      break;
  }
}
