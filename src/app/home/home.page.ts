import {Component, ElementRef, NgZone, ViewChild} from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
declare var google: any;
declare var google;

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage  {
  @ViewChild('map') mapElement: ElementRef;
    map: any;
    mapOptions: any;
    location = {lat: null, lng: null};
    markerOptions: any = {position: null, map: null, title: null};
    marker: any;
    
  constructor(public zone: NgZone, public geolocation: Geolocation) {
   
      /*Get Current location*/
      this.geolocation.getCurrentPosition().then((position) =>  {
          this.location.lat = position.coords.latitude;
          this.location.lng = position.coords.longitude;
      });
      /*Map options*/
      this.mapOptions = {
          center:  new google.maps.LatLng(this.location.lat,this.location.lng),
          zoom: 4,
          mapTypeControl: true,
          mapTypeId: 'satellite',
      };
      setTimeout(() => {
          this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapOptions);
          /*Marker Options*/
          this.markerOptions.position = new google.maps.LatLng(this.location.lat,this.location.lng);
          this.markerOptions.map = this.map;
          this.markerOptions.title = 'KL';
          this.marker = new google.maps.Marker(this.markerOptions);
      }, 3000);
  }
  initMap(){

  }
}
