var time = new Date().getTime();

// 获取定位
function getCity() {
  sendGetRequest(`https://api.tianditu.gov.cn/geocoder?postStr={'lon':` + longitude + `,'lat':` + latitude + `,'ver':1}&type=geocode&tk=922317ec85e9364922d3e97f06ab54fc`, function(response) {
    var address = JSON.parse(response).result.addressComponent;

    if (address.county == '') {
      city = address.city;
    } else {
      city = address.county;
    };

    localStorage.setItem('city', city);
    localStorage.setItem('time', Date.now());
    dom('.city', city);
  });
};

// 本地存储城市信息，减少API请求
if (localStorage.getItem('city') === null) {
  getCity();
} else {
  if (time - localStorage.getItem('time') >= 1800000) { // 数据超过30分钟自动刷新
    getCity();
  } else {
    city = localStorage.getItem('city');
    dom('.city', city);
  };
};

setTimeout(function() {
  document.querySelector('.start').remove();
  document.querySelector('#app').style.opacity = '1';
}, 2000);