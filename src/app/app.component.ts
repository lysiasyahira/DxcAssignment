import { Component, ViewChild } from "@angular/core";

import { Platform, MenuController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { GravatarService } from "./gravatar.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { Authv2Service } from "./authv2.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  public appPages = [
    {
      title: "Home",
      url: "/home",
      icon: "home"
    },
    {
      title: "map",
      url: "/map",
      icon: "map"
    },
    {
      title: "Login",
      url: "/login",
      icon: "key"
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public auth: Authv2Service,
    private router: Router,
    public gv: GravatarService,
    public aAuth: AngularFireAuth,
    public menuCtrl: MenuController
  ) {
    this.initializeApp();
  }
  logout() {
    this.auth.logout();
    this.menuCtrl.close();
    this.router.navigateByUrl("/login");
  }

  color = "red";

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  get userName(){
    if(this.aAuth.auth.currentUser){
      return this.aAuth.auth.currentUser.email;
    }
  }
  get isAuthenticated() {
    if (this.aAuth.auth.currentUser) return this.aAuth.auth.currentUser.email != null;
  }
}
