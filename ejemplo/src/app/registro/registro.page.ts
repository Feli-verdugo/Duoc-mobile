import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  registerData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: ''
  };

  constructor(private navCtrl: NavController) {}

  onRegister() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }

    console.log('Usuario registrado:', this.registerData);

    // Redirigir a la página de inicio de sesión después de registrarse
    this.navCtrl.navigateForward('/login');
  }
}
