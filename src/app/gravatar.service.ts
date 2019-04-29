import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GravatarService {

  constructor() { }

  get getImage(){
    //return 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?f=y'
    return '../assets/icon/avatar.png';
  }

 
}



