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

  errorMessage: string = '';  // Esta weaita muestra el mensaje de error

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthService
  ) {}

  // Con esto de abajo iniciamos sesion

  async login() {
    const { email, password } = this.loginData;

    try {

      // Con esta otra wea llamamos al login y asi obtenemos el tipo de usuario o algo asi era, creo xd
      
      const { userCredential, userType } = await this.authService.login(email, password);
      console.log('Inicio de sesión exitoso', userCredential);
      this.loginData.userType = userType;

      // pa limpiar el mensaje de error

      this.errorMessage = '';

      // Esto de abajo te redirige segun el tipo de usuario

      this.MandarAhome();
    } catch (error) {

      // Este de aca!! esta wea es para mostrar el mensaje de error, en este caso, y por ahora la wea sera para avisar que las credenciales del login tan malitas
      
      this.errorMessage = 'Correo o contraseña incorrectos. Intenta nuevamente.';
      console.log('Error en el inicio de sesión:', error);
    }
  }

  // Esto de aca abajo es todo el entrañado que se encarga de redirigir al home segun el tipo de usuario que tienes

  MandarAhome() {
    if (this.loginData.userType === 'driver') {
      this.router.navigate(['/conductor']);
    } else if (this.loginData.userType === 'client') {
      this.router.navigate(['/pasajero']);
    } else {
      console.log('Por favor seleccione un tipo de usuario');
    }
  }
}
