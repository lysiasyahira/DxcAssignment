import { Injectable } from "@angular/core";
declare var google: any;
@Injectable({
  providedIn: "root"
})
export class MapService {
  constructor() {}
  
  displayRoute(map) {
     let start = new google.maps.LatLng(3.1412, 101.68653);
     let end = new google.maps.LatLng(3.519863, 101.538116);

    var directionsDisplay = new google.maps.DirectionsRenderer(); // also, constructor can get "DirectionsRendererOptions" object
    directionsDisplay.setMap(map); // map should be already initialized.

    var request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.DRIVING
    };
    var directionsService = new google.maps.DirectionsService();
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(response);
      }
    });
  }
  moveToLocation(map, lat, lng) {
    var center = new google.maps.LatLng(lat, lng);
    // using global variable:
    map.panTo(center);
  }
}
