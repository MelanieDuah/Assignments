$(document).ready(function () {

    showSavedCities();

    var existingCities = [];

    $('#searchInput').autoComplete({
        resolver: 'custom',
        resolverSettings: {
            requestThrottling: 0
        },
        minLength: 1,
        events: {
            search: function (query, showDropdownWithCities) {
                $('.progress').removeClass('d-none');
                var foundCities = getCitiesSearchResult(existingCities, query);
                if (foundCities.length != 0) {
                    showDropdownWithCities(foundCities);
                } else {
                    $.ajax({
                        url: "cities.json",
                    }).done(function (data) {
                        existingCities = data;

                        $('.progress').addClass('d-none');

                        showDropdownWithCities(getCitiesSearchResult(existingCities, query));
                    }).fail(function (e) {
                        console.log(e);
                    });
                }
            }
        },
        formatResult: function (item) {
            return {
                value: item,
                text: item.city + ', ' + item.state_id,
            }
        }
    });

    $('#searchInput').on('autocomplete.select', function (event, item) {
        showWeatherConditions(item);
        addCityToSearchHistory(item);
        $(this).val('');
    });

});


function getCitiesSearchResult(existingCities, query) {
    var foundCities = existingCities.filter(function (entry) {
        return entry.city.toLowerCase().includes(query.toLowerCase());
    });

    return foundCities;
}


function showSavedCities() {
    var latitudeOfLastSearchedCity = localStorage.getItem('latitude');
    var longitudeOfLastSearchedCity = localStorage.getItem('longitude');
    var lastSearchedCityName = localStorage.getItem('cityname');

    if (lastSearchedCityName != null) {
        var lastSeachedCityObject = {
            city: lastSearchedCityName,
            lat: latitudeOfLastSearchedCity,
            lng: longitudeOfLastSearchedCity
        };

        showWeatherConditions(lastSeachedCityObject);
    }

    var savedCities = localStorage.getItem('savedcities');

    if (savedCities != null) {
        var savedCitiesArray = savedCities.split('|');
        for (var i = 0; i < savedCitiesArray.length; i++) {
            
            var cityEntry = savedCitiesArray[i];

            if (cityEntry != '') {
                var cityData = cityEntry.split('&');

                var rowString = "<tr><td data-lat='" + cityData[1] + "' data-lng='" + cityData[2] + "' class='cityinhistory text-light'>" + cityData[0] + "</td></<tr>";

                if ($('#tableRows').children().length == 0)
                    $('#tableRows').append(rowString);
                else
                    $('#tableRows > tr:first').before(rowString);

                $('#tableRows').parent().removeClass('d-none');
            }
        }
        $('.cityinhistory').on('click', function () {
            var latitude = $(this).attr('data-lat');
            var longitude = $(this).attr('data-lng');
            var cityValue = $(this).html();

            var cityObject = { lat: latitude, lng: longitude, city: cityValue };

            showWeatherConditions(cityObject);
        });
    }
}