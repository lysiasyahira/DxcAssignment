import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { Authv2Service } from "../authv2.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  userName: string;
  password: string;
  constructor(private router: Router, private auth: Authv2Service) {}

  ngOnInit() {}
  login() {
    this.auth.login(this.userName, this.password).then(res => {
      console.log(res);
      this.router.navigateByUrl("/home");
    });
  }
  goToSettigs() {
    this.router.navigateByUrl("/register");
  }
  goToHome() {
    this.router.navigateByUrl("/home");
  }
}
