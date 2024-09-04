import { Component } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginData = {
    username: '',
    password: '',
    userType: ''
  };

  constructor(
    private navCtrl: NavController
  ) {}

  login() {
    console.log(this.loginData);
    
  }

  MandarAhome(){
    this.navCtrl.navigateForward('/home');
  }
  
}
