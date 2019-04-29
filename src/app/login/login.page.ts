import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userName:string;
  password:string;
  constructor(private router:Router,private auth:AuthService) { }
  //Typescript is a transpiler not compiler
  ngOnInit() {
  }
  login() {
    console.log(this.userName, this.password);
    if (this.auth.validateUser(this.userName, this.password)) {
      this.router.navigateByUrl('/home');
    }
    else{
      alert("You are not authorized");
    }
    //this.router.navigateByUrl('/home');
  }
  goToSettigs(){
    this.router.navigateByUrl('/register');
  }
  goToHome(){
    this.router.navigateByUrl('/home');
  }
}
