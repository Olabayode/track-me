'use-strict';

const track = document.querySelector('.track');
const mapElement = document.getElementById('map');
let mapVisible = false;

track.addEventListener('click', () => {
    if (!mapVisible) {
        // Show map
        mapElement.style.display = 'block';
        track.textContent = 'Hide Map';
        mapVisible = true;

        setTimeout(() => {
            map.resize();  
            mapElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 150);
    } else {
        // Hide map
        mapElement.style.display = 'none';
        track.textContent = 'Track Ride';
        mapVisible = false;
    }
});

mapboxgl.accessToken = 'pk.eyJ1IjoiZ3VybGlua2F1ciIsImEiOiJjbHExYjM4cHUwNzE3MnBud25qNDlmc2VjIn0.Jeu9BD0h1vILAwXce8dQqw';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [0, 0],
    zoom: 17,
    pitch: 40
})

const marker = new mapboxgl.Marker({color: '#d60666'})

//The 'success' callback function
function getLocation(position){

    let {latitude, longitude} = position.coords;
    console.log(position);
    console.log(`Longitude: ${longitude} | Latitude: ${latitude} `)
    map.setCenter([longitude, latitude]);
    marker.setLngLat([longitude, latitude]).addTo(map);

}

//The 'failure' callback function
function errorHandler(){
    console.log('Unable to retrieve your location');
}

const options = {
    enableHighAccuracy: true,
}

function disabledOptions(){
    map.scrollZoom.disable();
    map.doubleClickZoom.disable();
    map.keyboard.disable();
    map.touchZoomRotate.disable();
    map.dragPan.disable();
}

function displayPosition(){
    if('geolocation' in navigator){
    navigator.geolocation.watchPosition(getLocation, errorHandler, options);
    disabledOptions();
    } else {
    console.log('Geolocation is not supported by the browser')
    }
}

displayPosition();