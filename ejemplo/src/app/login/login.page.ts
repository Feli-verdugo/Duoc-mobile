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
  // Asegúrate de que loginData incluya userType
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  loginData = {
    email: '',
    password: '',
  };

  errorMessage: string = ''; // Mensaje de error

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthService
  ) {}

  togglePasswordVisibility() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off';
    }
  }




  // Método para iniciar sesión
  async login() {
    const { email, password } = this.loginData;

    try {
      const userData = await this.authService.login(email, password);
      console.log('Inicio de sesión exitoso', userData);

      // Redirigir según el tipo de usuario
      this.MandarAhome(userData.userType);
    } catch (error) {
      this.errorMessage = 'Correo o contraseña incorrectos. Intenta nuevamente.';
      console.log('Error en el inicio de sesión:', error);
    }
  }

  // Método para redirigir al home según el tipo de usuario
  MandarAhome(userType: string) {
    if (userType === 'driver') {
      this.router.navigate(['/conductor']);
    } else if (userType === 'client') {
      this.router.navigate(['/pasajero']);
    } else {
      console.log('Por favor seleccione un tipo de usuario');
    }
  }
}
