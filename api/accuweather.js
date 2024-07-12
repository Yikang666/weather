var apiUrl = 'https://api.weather.888-114514.eu.org';
  
sendGetRequest(apiUrl + '/location/' + latitude.toFixed(2).replace('.', '') + '_' + longitude.toFixed(2).replace('.', '') + '_zh-cn.json.gz', function(response) {
  var city = JSON.parse(response).cities[0];
  cityId = city.lk;
  cityName = city.ln;
  
  dom('.city', cityName);
});