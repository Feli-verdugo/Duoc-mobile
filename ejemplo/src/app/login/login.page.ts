import { Component } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';


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
    private navCtrl: NavController,
    private router: Router
  ) {}

  login() {
    console.log(this.loginData);
    
  }

  MandarAhome(){

    if (this.loginData.userType === 'driver') {

      this.router.navigate(['/conductor']);  

    } else if (this.loginData.userType === 'client') {

      this.router.navigate(['/pasajero']);  

    } else {
      
      console.log('Por favor seleccione un tipo de usuario');
    }
  }
  
}
