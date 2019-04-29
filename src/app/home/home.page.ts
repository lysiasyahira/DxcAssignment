import { Component, ElementRef, NgZone, ViewChild } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Platform, LoadingController } from "@ionic/angular";
import { initDomAdapter } from '@angular/platform-browser/src/browser';
import { MapService } from '../map.service';

declare var google: any;
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
 
}
