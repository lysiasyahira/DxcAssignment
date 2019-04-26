import { Injectable } from '@angular/core';
import { User } from './register/register.page';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor() { }

  
 addUser(username,password){
   
   var users=JSON.parse(localStorage.getItem("users")) as Array<User> || [];
   users.push({userName:username,password:password});
   localStorage.removeItem("users");
   localStorage.setItem("users",JSON.stringify(users));
 }

 getUsers(){
   if(localStorage.getItem("users")!=null){
    return JSON.parse(localStorage.getItem("users")) as Array<User>;
   }
   return [];
  
 }
}
