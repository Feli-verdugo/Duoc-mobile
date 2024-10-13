import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Asegúrate de tener AuthService correctamente importado

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginData = {
    email: '',  // Cambiado a 'email'
    password: '',
    userType: ''
  };

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthService
  ) {}

  // Método para iniciar sesión
  login() {
    const { email, password } = this.loginData;
    this.authService.login(email, password).then(res => {
      console.log('Inicio de sesión exitoso', res);
      this.MandarAhome();
    }).catch(error => {
      console.log('Error en el inicio de sesión', error);
    });
  }

  // Método para redirigir a la home según el tipo de usuario
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
