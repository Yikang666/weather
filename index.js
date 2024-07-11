// 仿安卓Toast提示
function toast(msg, duration) {
    duration = isNaN(duration) ? 3000 : duration;
    var m = document.createElement("div");
    m.innerHTML = msg;
    m.style.cssText =
        "max-width: 70%;color: rgb(255, 255, 255);text-align: center;border-radius: 6px;padding: 4px 6px;position: fixed;top: 75%;left: 50%;transform: translate(-50%, 0);z-index: 99999999;background: rgba(0, 0, 0, 0.75);font-size: 14px;";
    document.body.appendChild(m);
    setTimeout(function() {
        var d = 0.5;
        m.style.webkitTransition =
            "-webkit-transform " + d + "s ease-in, opacity " + d + "s ease-in";
        m.style.opacity = "0";
        setTimeout(function() {
            document.body.removeChild(m);
        }, d * 1000);
    }, duration);
};

// 发送请求
const xhr = new XMLHttpRequest();
const apiUrl = 'https://api.weather.888-114514.eu.org';

function sendGetRequest(url, callback) {
  xhr.open('GET', url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      callback(xhr.response);
    }
  };
  xhr.send();
};

// 定位
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(onSuccess, onError);
} else {
  toast('您的浏览器不支持使用HTML5来获取地理位置服务');
};

function onSuccess(position) {
  // xhr.open('GET', 'http://pitaya.tianqiapis.com/?version=today&unit=m&language=zh&appid=test&appsecret=test888&query=' + latitude + ',' + longitude);
  // xhr.onreadystatechange = function() {
  //   if (xhr.readyState == 4 && xhr.status == 200) {
  //     today = JSON.parse(xhr.response);
  //     city = today.city;
  //     document.querySelector('.refresh').style.display = 'none';
  //     document.querySelector(".city").innerHTML = city;
  //     document.querySelector(".temp-now").innerHTML = today.day.temperature;
  //     document.querySelector(".weather").innerHTML = today.day.phrase;
  //     document.querySelector(".airq").innerHTML = '空气质量 ' + today.day.aqi.AIR.index;
  //     document.querySelector('.a0').style.opacity = '1';
  //   };
  // };
  latitude = position.coords.latitude.toFixed(2).replace('.', '')
  longitude = position.coords.longitude.toFixed(2).replace('.', '')
  
  sendGetRequest(apiUrl + '/location/' + latitude + '_' + longitude + '_zh-cn.json.gz', function (response) {
    var city = JSON.parse(response).cities[0];
    cityId = city.lk;
    document.querySelector(".city").innerHTML = city.ln;
  });
};

function onError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      toast('您拒绝了对获取地理位置的请求');
      break;
    case error.POSITION_UNAVAILABLE:
      toast('定位失败，请打开位置服务');
      break;
    case error.TIMEOUT:
      toast('请求您的地理位置超时');
      break;
    case error.UNKNOWN_ERROR:
      toast('未知错误');
      break;
  }
};

// 获取星期
var week = "周" + "日一二三四五六".charAt(new Date().getDay());
document.querySelector(".a1 .day").innerHTML = week;