/*
  定位JS
  优先使用设备硬件获取到的经纬度定位，失败则使用IP定位
*/

// 获取城市函数
function getCity() {
  sendGetRequest(
    `https://api.tianditu.gov.cn/geocoder?postStr={'lon':` +
      longitude +
      `,'lat':` +
      latitude +
      `,'ver':1}&type=geocode&tk=922317ec85e9364922d3e97f06ab54fc`,
    function (response) {
      var address = JSON.parse(response).result.addressComponent;

      if (address.county == "") {
        city = address.city;
      } else {
        city = address.county;
      }

      localStorage.setItem("city", city);
      localStorage.setItem("time", Date.now());
      dom(".city", city);
    }
  );
}

function getCityByIP() {
  sendGetRequest("https://api.ipify.cn/", function (response) {
    var ip = response;
    sendGetRequest(
      "https://api.weather.888-114514.eu.org/ip?ip=" + ip,
      function (response) {
        city = JSON.parse(response).regions.pop();

        localStorage.setItem("city", city);
        localStorage.setItem("time", Date.now());
        dom(".city", city);
      }
    );
  });
}

// 通过Geolocation API获取经纬度
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
} else {
  toast("浏览器不支持GPS定位，建议更换浏览器以获得更加精准的天气信息");
}

function onSuccess(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;

  getCity();
}

// 失败后通过IP获取经纬度
function onError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      toast("定位失败，请允许定位请求以获得更加精准的天气信息");
      break;
    case error.POSITION_UNAVAILABLE:
      toast("定位失败，请打开位置服务以获得更加精准的天气信息");
      break;
    case error.TIMEOUT:
      toast("请求您的地理位置超时，请重试");
      break;
    case error.UNKNOWN_ERROR:
      toast("定位出现未知错误");
      break;
  }

  getCityByIP();
}
