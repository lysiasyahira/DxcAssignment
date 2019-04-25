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
    return true;
  }
}
