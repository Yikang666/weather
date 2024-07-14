// 获取定位
sendGetRequest(`http://api.tianditu.gov.cn/geocoder?postStr={'lon':` + longitude + `,'lat':` + latitude + `,'ver':1}&type=geocode&tk=922317ec85e9364922d3e97f06ab54fc`, function (response) {
  var address = JSON.parse(response).result.addressComponent;
  
  if (address.town == '') {
    if (address.county == '') {
      var city = address.city;
    } else {
      var city = address.county;
    };
  } else {
    var city = address.town;
  };
  
  dom('.city', city);
  setTimeout(function () {
    document.querySelector('.start').remove();
    document.querySelector('#app').style.opacity = '1';
  }, 1000);
});