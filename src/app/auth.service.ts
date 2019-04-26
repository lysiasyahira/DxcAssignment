import { Injectable } from "@angular/core";
import { UserService } from './user.service';

@Injectable({
  providedIn: "root"
})
export class AuthService {
 
  constructor(private userSvc:UserService) {
  
  }

  validateUser(username, password): boolean {
    let user = this.userSvc.getUsers().some(
      x => x.userName == username && x.password == password
    );

    if (!user) {
      return false;
    }
    localStorage.setItem("loggedIn", "true");
    return true;
  }

  get IsAuthenticated() {
    return !!localStorage.getItem("loggedIn");
  }
  logout() {
    localStorage.removeItem("loggedIn");
  }

  addUser(username, password) {
    this.userSvc.addUser(username,password);
    }
  get IsAuthenticate() {
    return !!localStorage.getItem("registered");
  }
}
