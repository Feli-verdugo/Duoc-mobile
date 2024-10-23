import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginData = {
    email: '',
    password: '',
    userType: ''
  };

  errorMessage: string = '';

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthService
  ) {}

  async login() {
    const { email, password } = this.loginData;

    try {
      const { userCredential, userType } = await this.authService.login(email, password);
      console.log('Inicio de sesión exitoso', userCredential);

      // Asegúrate de que el userType no sea nulo
      if (userType) {
        this.MandarAhome(userType);
      } else {
        console.log('No se pudo obtener el tipo de usuario');
        this.errorMessage = 'No se pudo determinar el tipo de usuario.';
      }
    } catch (error: any) {
      // Mensaje específico para errores de credenciales
      if (error.code === 'auth/user-not-found') {
        this.errorMessage = 'No se encontró un usuario con este correo.';
      } else if (error.code === 'auth/wrong-password') {
        this.errorMessage = 'Contraseña incorrecta.';
      } else {
        this.errorMessage = 'Error en el inicio de sesión. Intenta nuevamente.';
      }
      console.log('Error en el inicio de sesión:', error);
    }
  }

  MandarAhome(userType: string) {
    console.log('Tipo de usuario en MandarAhome:', userType);
    if (userType === 'driver') {
      this.router.navigate(['/conductor']);
    } else if (userType === 'client') {
      this.router.navigate(['/pasajero']);
    } else {
      console.log('Por favor seleccione un tipo de usuario');
    }
  }
}
