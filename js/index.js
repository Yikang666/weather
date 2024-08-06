// 仿安卓Toast提示
function toast(msg, duration) {
  duration = isNaN(duration) ? 3000 : duration;
  var m = document.createElement("div");
  m.setAttribute("id", "toast");
  m.innerHTML = msg;
  m.style.cssText =
    "max-width: 70%;color: rgb(255, 255, 255);text-align: center;border-radius: 6px;padding: 4px 6px;position: fixed;top: 80%;left: 50%;transform: translate(-50%, 0);z-index: 99999999;background: rgba(0, 0, 0, 0.75);font-size: 14px;";
  document.querySelector("html").appendChild(m);
  setTimeout(function() {
    var d = 0.5;
    m.style.transition =
      "-webkit-transform " + d + "s ease-in, opacity " + d + "s ease-in";
    m.style.opacity = "0";
    setTimeout(function() {
      document.querySelector("html").removeChild(m);
    }, d * 1000);
  }, duration);
}

// 发送请求
// XML 普通GET请求
const xhr = new XMLHttpRequest();

function sendGetRequest(url, callback) {
  xhr.open("GET", url);
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      callback(xhr.response);
    }
  };
  xhr.send();
}

// 当前时间戳
time = Date.now();

// 本地存储城市信息，减少API请求
if (localStorage.getItem("city") === null) {
  importJS("./js/locate.js");
} else {
  if (time - localStorage.getItem("time") >= 1800000) {
    importJS("./js/locate.js");
  } else {
    city = localStorage.getItem("city");
    dom(".city", city);
  }
}

// 引入JS文件函数
function importJS(url) {
  var script = document.createElement("script");
  script.src = url;
  document.querySelector("body").appendChild(script);
}

// 引入数据源获取天气
function getWeather() {
  var provider = "caiyun";
  importJS("./js/api/" + provider + ".js");
}

// DOM操作
function dom(query, text) {
  document.querySelector(query).innerHTML = text;
}

// 获取星期
var week = "周" + "日一二三四五六".charAt(new Date().getDay());
dom(".a1 .day", week);

// 两秒后隐藏启动界面
setTimeout(function() {
  document.querySelector(".start").remove();
  document.querySelector("#app").style.opacity = "1";
}, 2000);

// BetterScroll配置
window.onload = function() {
  var scrollA1 = new BScroll('.container .a2', {
    scrollX: true,
    bounceTime: 500,
    swipeBounceTime: 200,
    deceleration: 0.002
  });
};