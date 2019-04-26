import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

export class User{
  userName:string;
  password:string;
}

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  user:User={userName:"",password:""}; 

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {}
  register() {
    this.auth.addUser(this.user.userName,this.user.password);
    this.router.navigateByUrl("/login");
      
  }
}
