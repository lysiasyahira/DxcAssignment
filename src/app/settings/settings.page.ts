import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
 
  EmailAddress:string;

  constructor(private router:Router,private auth:AuthService) { }

  ngOnInit() {
  }
  register(){
   console.log(this.EmailAddress);
   if(this.auth.validateEmail(this.EmailAddress)){
    alert("This Email already used!");
   }
  else {
    this.router.navigateByUrl('/login');
  
  }
  //this.router.navigateByUrl('/home');
}
}



 

    

