var MapMarker = /** @class */ (function () {
    function MapMarker(address) {
        this.address = address;
    }
    ;
    MapMarker.prototype.callback = function (results, status) {
        if (status == "OK") {
            var latLng = { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() };
            this.latLng = latLng;
            console.log(this.latLng);
        }
    };
    MapMarker.prototype.setLatLng = function (latLng) {
        this.latLng = latLng;
    };
    ;
    return MapMarker;
}());
var map;
var geocoder;
var mapMarkers = [];
var positions = [];
var Toronto = { lat: 43, lng: -79.38 };
function initMap() {
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'), {
        center: Toronto,
        zoom: 8
    });
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var position = data_1[_i];
        // console.log(position.address)
        var newMapMarker = new MapMarker(position.address);
        mapMarkers.push(newMapMarker);
    }
    loadadressess();
    console.log(mapMarkers);
}
var i = 0;
function loadadressess() {
    codeAddress(mapMarkers[i]);
    i++;
    if (i < mapMarkers.length) {
        setTimeout(loadadressess, 1000);
    }
}
function load_marker(mapMarker) {
    var marker = new google.maps.Marker({
        map: map,
        position: mapMarker.latLng
    });
}
function codeAddress(mapMarker) {
    var latLng = { lat: 0, lng: 0 };
    geocoder.geocode({ 'address': mapMarker.address }, function (results, status) {
        if (status == 'OK') {
            latLng.lat = results[0].geometry.location.lat();
            latLng.lng = results[0].geometry.location.lng();
            mapMarker.latLng = latLng;
            load_marker(mapMarker);
            console.log(mapMarker);
            // console.log(mapMarkers);
        }
        else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}
