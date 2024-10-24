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

    try {
      // Registro del usuario en el servicio de autenticación
      await this.authService.register(this.registerData.email, this.registerData.password, this.registerData.userType);
      console.log('Usuario registrado y guardado en LocalStorage:', this.registerData);

      // Redirigir a la página de inicio de sesión
      this.router.navigate(['/login']);
    } catch (error) {
      console.log('Error en el registro:', error);
    }
  }
}
