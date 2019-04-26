import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  users = [
    { userName: "nur", password: 123 },
    { userName: "demo", password: 123 }
  ];
  constructor() {}

  validateUser(username,password):boolean{
    let user=this.users.some(x=>x.userName==username && x.password==password);
    
    if(!user){
     
      return false;
    }
    localStorage.setItem("loggedIn","true");
    return true;
  }

  get IsAuthenticated(){
    return !!localStorage.getItem("loggedIn");
  }
  logout(){
    localStorage.removeItem("loggedIn");
  }

  emails = [
    { EmailAddress: "nur@demo" },
    { EmailAddress: "alia@demo" }
  ];
  validateEmail(Email):boolean{
    let email=this.emails.some(x=>x.EmailAddress==Email);
    
    if(!email){
     
      return false;
    }
    localStorage.setItem("registered","true");
    return true;
  }

  get IsAuthenticate(){
    return !!localStorage.getItem("registered");
  }
}
