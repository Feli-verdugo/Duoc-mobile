import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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

  constructor(private navCtrl: NavController, private authService: AuthService, private router: Router) {}

  async onRegister() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }

    if (!this.registerData.userType) {
      console.error('Por favor selecciona un tipo de usuario');
      return;
    }

    try {
      await this.authService.register(this.registerData.email, this.registerData.password, this.registerData.userType);
      console.log('Usuario registrado y guardado en Firebase:', this.registerData);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  }
}
