// 仿安卓Toast提示
function toast(msg, duration) {
    duration = isNaN(duration) ? 3000 : duration;
    var m = document.createElement("div");
    m.setAttribute('id', 'toast');
    m.innerHTML = msg;
    m.style.cssText =
        "max-width: 70%;color: rgb(255, 255, 255);text-align: center;border-radius: 6px;padding: 4px 6px;position: fixed;top: 80%;left: 50%;transform: translate(-50%, 0);z-index: 99999999;background: rgba(0, 0, 0, 0.75);font-size: 14px;";
    document.querySelector('html').appendChild(m);
    setTimeout(function() {
        var d = 0.5;
        m.style.webkitTransition =
            "-webkit-transform " + d + "s ease-in, opacity " + d + "s ease-in";
        m.style.opacity = "0";
        setTimeout(function() {
            document.querySelector('html').removeChild(m);
        }, d * 1000);
    }, duration);
};

// 发送请求
const xhr = new XMLHttpRequest();

function sendGetRequest(url, callback) {
  xhr.open('GET', url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      callback(xhr.response);
    }
  };
  xhr.send();
};

// 引入数据源获取天气
function getWeather() {
  var provider = 'caiyun';
  var url = './js/api/' + provider + '.js';
  
  var script = document.createElement('script');
  script.setAttribute('src', url);
  document.querySelector('body').appendChild(script);
};

// DOM操作
function dom(query, text) {
  document.querySelector(query).innerHTML = text;
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
  //   };
  // };
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  
  getWeather();
};

function onError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      toast('定位失败，请允许定位请求以获得更加精准的天气信息');
      break;
    case error.POSITION_UNAVAILABLE:
      toast('定位失败，请打开位置服务以获得更加精准的天气信息');
      break;
    case error.TIMEOUT:
      toast('请求您的地理位置超时，请重试');
      break;
    case error.UNKNOWN_ERROR:
      toast('未知错误');
      break;
  }
};

// 获取星期
var week = "周" + "日一二三四五六".charAt(new Date().getDay());
dom(".a1 .day", week);