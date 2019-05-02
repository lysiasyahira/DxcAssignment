import { Component, ElementRef, NgZone, ViewChild } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Platform, LoadingController } from "@ionic/angular";
import { MapService } from "../map.service";
import {
  NativeGeocoder,
  NativeGeocoderOptions
} from "@ionic-native/native-geocoder/ngx";
declare var google: any;
class Location {
  administrativeArea: string;
  locality: string;
  thoroughfare: string;
}
@Component({
  selector: "app-map",
  templateUrl: "map.page.html",
  styleUrls: ["map.page.scss"]
})
export class MapPage {
  @ViewChild("map") mapElement: ElementRef;
  map: any;
  mapOptions: any;
  location = { lat: null, lng: null };
  markerOptions: any = { position: null, map: null, title: null };
  marker: any;
  result = "";
  /////////////////////////////AUTOCOMPLETE///////////////////

  autocomplete: any;
  markers: any;

  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any;
  autocompleteItems: any;
  loading: any;

  ///////////////////////////////////////////////////////
  currentLocation: Location = {
    administrativeArea: "",
    locality: "",
    thoroughfare: ""
  };
  constructor(
    private mapService: MapService,
    public loader: LoadingController,
    public zone: NgZone,
    public geolocation: Geolocation,
    private plt: Platform,
    private nativeGeocoder: NativeGeocoder
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.geocoder = new google.maps.Geocoder();
    this.markers = [];
    this.autocomplete = { input: "" };
    this.autocompleteItems = [];
    this.plt.ready().then(() => {
      const loading = this.loader
        .create({
          message: "Please wait. . ."
        })
        .then(mapLoader => {
          mapLoader.present();
          this.initMap(mapLoader);
        });
    });
  }
  tryGeolocation() {
    this.loading.present();
    this.clearMarkers(); //remove previous markers

    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        let pos = {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        };
        let marker = new google.maps.Marker({
          position: pos,
          map: this.map,
          title: "I am here!"
        });
        this.markers.push(marker);
        this.map.setCenter(pos);
        this.loading.dismiss();
      })
      .catch(error => {
        console.log("Error getting location", error);
        this.loading.dismiss();
      });
  }

  ionViewDidEnter() {
    // let infoWindow = new google.maps.InfoWindow({map: map});
    //Set latitude and longitude of some place
    this.map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.9011, lng: -56.1645 },
      zoom: 15
    });
  }

  updateSearchResults() {
    if (this.autocomplete.input == "") {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions(
      { input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        if (predictions) {
          this.zone.run(() => {
            predictions.forEach(prediction => {
              this.autocompleteItems.push(prediction);
            });
          });
        }
      }
    );
  }
  clearMarkers() {
    for (var i = 0; i < this.markers.length; i++) {
      console.log(this.markers[i]);
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

  selectSearchResult(item) {
    this.clearMarkers();
    this.autocompleteItems = [];

    this.geocoder.geocode({ placeId: item.place_id }, (results, status) => {
      if (status === "OK" && results[0]) {
        let position = {
          lat: results[0].geometry.location.lat,
          lng: results[0].geometry.location.lng
        };
        let marker = new google.maps.Marker({
          position: results[0].geometry.location,
          map: this.map
        });
        this.markers.push(marker);
        this.map.setCenter(results[0].geometry.location);
      }
    });
  }
  initMap(r: HTMLIonLoadingElement) {
    /*Get Current location*/
    this.geolocation.getCurrentPosition().then(position => {
      this.location.lat = position.coords.latitude;
      this.location.lng = position.coords.longitude;
      this.getAddress(this.location.lat, this.location.lng);
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
      this.mapService.moveToLocation(
        this.map,
        this.location.lat,
        this.location.lng
      );
      this.mapService.displayRoute(this.map);

      r.dismiss();
    }, 3000);
  }

  getAddress(lat, lng) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder
      .reverseGeocode(lat, lng, options)
      .then(result => {
        console.log(JSON.stringify(result[0]));
        this.currentLocation.administrativeArea = result[0].administrativeArea;
        this.currentLocation.locality = result[0].locality;
        this.currentLocation.thoroughfare = result[0].thoroughfare;
        this.result = `${this.currentLocation.administrativeArea} ${
          this.currentLocation.locality
        } ${this.currentLocation.thoroughfare}`;
      })
      .catch((error: any) => console.log(error));

    this.nativeGeocoder
      .forwardGeocode("Berlin", options)
      .then(coordinates =>
        console.log(
          "The coordinates are latitude=" +
            coordinates[0].latitude +
            " and longitude=" +
            coordinates[0].longitude
        )
      )
      .catch((error: any) => console.log(error));
  }
}
