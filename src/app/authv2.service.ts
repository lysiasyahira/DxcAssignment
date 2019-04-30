import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root"
})
export class Authv2Service {
  constructor(private aAuth: AngularFireAuth) {}
  currentUser;
  login(userName, password) {
    return this.aAuth.auth.signInWithEmailAndPassword(
      userName + "@example.com",
      password
    );
  }
  register(userName, password) {
    return this.aAuth.auth.createUserWithEmailAndPassword(
      userName + "@example.com",
      password
    );
  }
  get userName(){
    if(this.aAuth.auth.currentUser){
      return this.aAuth.auth.currentUser.email;
    }
  }
  get isAuthenticated() {
    if (this.aAuth.auth.currentUser) return this.aAuth.auth.currentUser.email != null;
  }
  logout() {
    this.aAuth.auth.signOut();
  }
}
