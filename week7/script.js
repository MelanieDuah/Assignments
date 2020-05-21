

function showWeatherConditions(cityObject) {

  var url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + cityObject.lat + '&lon=' + cityObject.lng + '&appid=b212266a3b5800f1c727bf9539b273bb';

  $.get(url, function (response) {
    onWeatherInformationReturned(response, cityObject);
  });
}

function onWeatherInformationReturned(response, cityObject) {

  var currentDay = moment().format('L');

  var iconImage = response.current.weather[0].icon;
  var iconSource = 'http://openweathermap.org/img/wn/' + iconImage + '.png';
  var icon = '<img src="' + iconSource + '" />';
  var cityAndDate = cityObject.city + ' (' + currentDay + ')' + icon;

  $("#weatherSearch").html(cityAndDate);

  $('.d-none').removeClass('d-none');
  $('.progress').addClass('d-none');

  var temp = response.current.temp;
  var temperatureInFahrenheit = convertKelvinIntoFahrenheit(temp);

  $("#currentTemp").html(temperatureInFahrenheit);

  var humid = response.current.humidity;

  $("#currentHumid").html(humid);

  var windSpeed = response.current.wind_speed;

  $("#theWindSpeed").html(windSpeed);

  var uvIndex = response.current.uvi;

  $("#uvIndex").html(uvIndex);


  if (uvIndex <= 2) {
    $("#uvIndex").addClass('low');

  } else if (uvIndex >= 3 && uvIndex <= 5) {
    $("#uvIndex").addClass('moderate');

  } else if (uvIndex >= 6 && uvIndex <= 7) {
    $("#uvIndex").addClass('high');

  } else if (uvIndex >= 8 && uvIndex <= 10) {
    $("#uvIndex").addClass('veryhigh');

  } else {
    (uvIndex >= 11);
    $("#uvIndex").addClass('extreme');
  }

  var dailyArray = response.daily;

  for (var i = 0; i < 5; i++) {

    var currentDaily = dailyArray[i];
    var date = moment.unix(currentDaily.dt).format('L');

    $('#weatherDisplayDate' + i).html(date);

    var iconSource = 'http://openweathermap.org/img/wn/' + currentDaily.weather[0].icon + '.png';
    var icon = '<img src="' + iconSource + '" />';

    $('#weatherDisplayIcon' + i).html(icon);

    var currentTemp = currentDaily.temp.max;
    var temperatureInFahrenheit = convertKelvinIntoFahrenheit(currentTemp);

    $('#weatherDisplayTemp' + i).html(temperatureInFahrenheit);

    var currentHumid = currentDaily.humidity;

    $('#weatherDisplayHumid' + i).html(currentHumid);

  }


}

function addCityToSearchHistory(cityObject) {

  if ($("td:contains(" + cityObject.city + ")").length == 0) {
    
    localStorage.setItem('latitude', cityObject.lat);
    localStorage.setItem('longitude', cityObject.lng);
    localStorage.setItem('cityname', cityObject.city);

    var existingCitiesStorage = localStorage.getItem('savedcities');

    var savedCities = '';

    if (existingCitiesStorage != null) {
      savedCities = existingCitiesStorage;
      var savedCitiesArray = savedCities.split('|');
      if (savedCitiesArray.length == 9) {
        savedCitiesArray.splice(6, 1);
        savedCities = savedCitiesArray.join('|');
      }
    }

    savedCities += cityObject.city + '&' + cityObject.lat + '&' + cityObject.lng + '|';

    localStorage.setItem('savedcities', savedCities);

    var rowString = "<tr><td data-lat='" + cityObject.lat + "' data-lng='" + cityObject.lng + "' class='cityinhistory text-light'>" + cityObject.city + "</td></<tr>";

    if ($('#tableRows').children().length == 0)
      $('#tableRows').append(rowString);
    else
      $('#tableRows > tr:first').before(rowString);

    if ($('#tableRows').children().length > 8)
      $('#tableRows').children().last().remove();

    $('.cityinhistory').on('click', function () {

      var latitude = $(this).attr('data-lat');
      var longitude = $(this).attr('data-lng');
      var cityValue = $(this).html();

      var cityObject = { lat: latitude, lng: longitude, city: cityValue };

      showWeatherConditions(cityObject);
    });
  }
}

function convertKelvinIntoFahrenheit(kelvin) {
  return Math.floor((kelvin - 273.15) * (9 / 5) + 32);
}

