function createDrivingDirectionsMap() {
  if (navigator.geolocation) {
    console.log("attempting geolocation.");
    navigator.geolocation.getCurrentPosition(OnSuccess, OnError, {
      enableHighAccuracy: true,
      maximumAge: 1000,
      timeout: 5000
    });
  }
  else {
    document.getElementById(map).innerHTML = "No support for geolocation, we can't find your location.";
  }
};

function OnSuccess(position) {
  console.log(position);
  showMap(position.coords.latitude, position.coords.longitude);
  console.log("back from showMap()");
};

function OnError(error) {
  console.log(error);
  var mapDiv = document.getElementById("map");
  switch (error.code) {
    case error.PERMISSION_DENIED:
      mapDiv.innerHTML = "User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      mapDiv.innerHTML = "Location information is unavailable."
      break;
    case error.TIMEOUT:
      mapDiv.innerHTML = "The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      mapDiv.innerHTML = "An unknown error occurred."
      break;
    default:
      console.log(error.code);
  }
};

function showMap(lat, long) {
  console.log("in showMap()");
  var directionsService = new google.maps.DirectionsService();
  var directionsRenderer = new google.maps.DirectionsRenderer();
  console.log(directionsService);
  console.log(directionsRenderer);

  var route = {
    origin: new google.maps.LatLng(lat, long),
    destination: "Bettendorf, Iowa, USA",
    travelMode: google.maps.DirectionsTravelMode.DRIVING
  };

  var mapOptions = {
    zoom: 10,
    center: new google.maps.LatLng(41.5263, 90.5073),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  directionsRenderer.setMap(map);
  directionsService.route(route, function(result, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsRenderer.setDirections(result);
    }
  });
}
