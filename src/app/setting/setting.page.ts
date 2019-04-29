import { OnInit, Component } from "@angular/core";
import { UserService } from "../user.service";
import { AuthService } from "../auth.service";
import { AlertController } from '@ionic/angular';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: "app-setting",
  templateUrl: "./setting.page.html",
  styleUrls: ["./setting.page.scss"]
})
export class SettingPage implements OnInit {
  constructor(private user: UserService, private auth: AuthService,private alertCtrl:AlertController) {}

  ngOnInit() {}
  saveNotification(e) {
    if (e.detail.checked) {
      this.user.saveNotification(this.auth.userName);
    } else {
      this.user.removeNotification(this.auth.userName);
    }
  
  }
  get userNoti(){
    return localStorage.getItem(this.auth.userName);
  }
  changePassword(){
      this.alertCtrl.create({
        header: 'Change Pasword',
        message: '',
        inputs: [
          {
           
            type: 'password',
            placeholder: 'Old Password'
          },
          {
          
            type: 'password',
            placeholder: 'New Password'
          }],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler :()=>{
             
              }
             
            }, {
              text: 'Ok',
              handler:(data)=>{
                console.log(data);
              }

              
            }
          ]
      }).then(alert=>{
        alert.present();
      })
  }
}

  