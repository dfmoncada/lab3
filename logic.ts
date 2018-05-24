interface LatLng {
    lat: number;
    lng: number;
}

class MapMarker{
    address:string;
    latLng:LatLng;
    public constructor(address: string){
        this.address = address;
    };
    public callback(results,status){
        if(status=="OK"){
            let latLng: LatLng = {lat:results[0].geometry.location.lat(),lng:results[0].geometry.location.lng()};
            this.latLng = latLng;
            console.log(this.latLng);
        }
    }
    public setLatLng(latLng:LatLng) :void {
        this.latLng = latLng;
    };
}


var map: any;
var geocoder: any;
var mapMarkers:MapMarker[] = [];
var positions = [];

let Toronto:LatLng = {lat: 43, lng: -79.38};

function initMap() {
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('map'), {
    center: Toronto,
    zoom: 8
    });


    for(let position of data){
        // console.log(position.address)
        let newMapMarker: MapMarker = new MapMarker(position.address)
        
        mapMarkers.push(newMapMarker);

    }
    loadadressess();
    console.log(mapMarkers);
}
var i = 0;
function loadadressess(){
    codeAddress(mapMarkers[i]);
    i++;
    if(i<mapMarkers.length){
        setTimeout( loadadressess, 1000);
    }
}

function load_marker(mapMarker:MapMarker){
    var marker = new google.maps.Marker({
        map: map,
        position: mapMarker.latLng
    });
}

function codeAddress(mapMarker:MapMarker) {
    var latLng = {lat:0, lng:0};

    geocoder.geocode({ 'address': mapMarker.address }, 
    function (results, status) {
        if (status == 'OK') {
            latLng.lat = results[0].geometry.location.lat()
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
