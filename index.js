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
}

// 发送请求
const xhr = new XMLHttpRequest();

// 获取实时天气
function getToday() {
  xhr.open('GET', 'http://pitaya.tianqiapis.com/?version=today&unit=m&language=zh&appid=test&appsecret=test888');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var today = xhr.responseText;
    }
  };
  xhr.send();
}

getToday();
 


// 获取星期
var week = "周" + "日一二三四五六".charAt(new Date().getDay());
document.getElementById("day").innerHTML = week;