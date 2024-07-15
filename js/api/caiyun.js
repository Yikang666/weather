// 获取定位
function getCity() {
  sendGetRequest(`http://api.tianditu.gov.cn/geocoder?postStr={'lon':` + longitude + `,'lat':` + latitude + `,'ver':1}&type=geocode&tk=922317ec85e9364922d3e97f06ab54fc`, function(response) {
    var address = JSON.parse(response).result.addressComponent;

    if (address.town == '') {
      if (address.county == '') {
        city = address.city;
      } else {
        city = address.county;
      };
    } else {
      city = address.town;
    };
    
    localStorage.setItem('city', city);
  });
};

// 本地存储城市信息，减少API请求
if (localStorage.getItem('city') === null) {
    getCity();
} else {
    city = localStorage.getItem('city');
};

dom('.city', city);
setTimeout(function() {
  document.querySelector('.start').remove();
  setTimeout(function() {
    document.querySelector('#app').style.opacity = '1';
  }, 200);
}, 1000);