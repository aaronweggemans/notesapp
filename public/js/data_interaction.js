//'mapsApiKey': 'AIzaSyBXkn_iiij3dPDUhyarJPe6qVVn2MGOY8I'
// bf417713f856ea07a5a12b8195cfd8b9

var marker;

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: 52.3669382, lng: 5.2079405}
    });

    google.maps.event.addListener(map, 'click', function (evt) {
        placeMarker(evt.latLng);
    });

    marker = new google.maps.Marker({
        position: {lat: 52.3669382, lng: 5.2079405},
        map: map,
        draggable: true
    });
}

function placeMarker(location) {
    if (marker) {
        marker.setPosition(location);
    } else {
        marker = new google.maps.Marker({
            position: location,
            map: map,
            draggable: true
        });
    }

    lat = marker.getPosition().lat();
    lng = marker.getPosition().lng();
    insertData(lat, lng);
}

function insertData(lat, lng)
{
    $.ajax({
        type: 'POST',
        appid: 'bf417713f856ea07a5a12b8195cfd8b9',
        url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lng +'&appid=bf417713f856ea07a5a12b8195cfd8b9',

        crossDomain: true,
        success: function (msg) {
            var weatherdata = msg;
            var temp = weatherdata.main.temp - 273.15;

            $('.insertName')
                .html(weatherdata.name);

            $('.insertCountry')
                .html(weatherdata.sys.country);

            $('.insertCelsius')
                .html("Today it will be " + parseInt(temp) + " &#x2103; degree in " + weatherdata.name + " ");
        },
        error: function (request, status, error) {
            alert(error);
        }
    });
}

google.maps.event.addDomListener(window, 'load', initMap);
