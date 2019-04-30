import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";
import { Authv2Service } from '../authv2.service';

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

  constructor(private router: Router, private auth: Authv2Service) {}

  ngOnInit() {}
  register() {
    // this.auth.addUser(this.user.userName,this.user.password);

    this.auth.register(this.user.userName,this.user.password)
      .then(x=>{
        console.log(x);
        this.router.navigateByUrl("/login");
      }).catch(er=>{
        alert(er);
      })

      
  }
}
