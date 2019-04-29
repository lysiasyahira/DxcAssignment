import { Component, ElementRef, NgZone, ViewChild, OnInit } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Platform, LoadingController } from "@ionic/angular";
import { MapService } from '../map.service';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: 'map.page.html',
  styleUrls: ['map.page.scss']
})
export class MapPage implements OnInit {
  ngOnInit(): void {
    //throw new Error("Method not implemented.");
  }
  @ViewChild("map") mapElement: ElementRef;
  map: any;
  mapOptions: any;
  location = { lat: null, lng: null };
  markerOptions: any = { position: null, map: null, title: null };
  marker: any;

  constructor(
    private mapService: MapService,
    public loader: LoadingController,
    public zone: NgZone,
    public geolocation: Geolocation,
    private plt: Platform
  ) {
    this.plt.ready().then(() => {
      const loading = this.loader.create({
        message: 'Please wait. . .'
      }).then(mapLoader => {

        mapLoader.present();
        this.initMap(mapLoader);
      });
    })
  }
   geocoder1 = new google.maps.Geocoder();
  convertToAddress(latlng,map){
    this.geocoder1.geocode({'address': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[0]) {
          console.log(results);
         
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
  initMap(r: HTMLIonLoadingElement) {
    /*Get Current location*/
    this.geolocation.getCurrentPosition().then(position => {
      this.location.lat = position.coords.latitude;
      this.location.lng = position.coords.longitude;
      this.convertToAddress(this.map,new google.maps.LatLng(this.location.lat, this.location.lng) );
    });
    /*Map options*/
    this.mapOptions = {
      center: new google.maps.LatLng(this.location.lat, this.location.lng),
      zoom: 16,
      mapTypeControl: true,
      mapTypeId: "roadmap"
    };
    setTimeout(() => {
      this.map = new google.maps.Map(
        this.mapElement.nativeElement,
        this.mapOptions
      );
      /*Marker Options*/
      this.markerOptions.position = new google.maps.LatLng(
        this.location.lat,
        this.location.lng
      );
      this.markerOptions.map = this.map;
      this.markerOptions.title = "KL";
      this.marker = new google.maps.Marker(this.markerOptions);
      this.mapService.moveToLocation(this.map, this.location.lat, this.location.lng);
      this.mapService.displayRoute(this.map);

      r.dismiss();
    }, 3000);
  }
}
