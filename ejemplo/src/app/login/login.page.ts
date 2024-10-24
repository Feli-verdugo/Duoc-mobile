import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';


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

  isModalOpen = false;

  errorMessage: string = ''; // Mensaje de error

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthService,
    private http : HttpClient,
    private loadingCtrl: LoadingController
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

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }


  async resetPass() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...'
    });
    loading.present();

    const usuarioEncontrado = this.loginData.email; // Usa el email del formulario actual
    if (usuarioEncontrado) {
      let nuevaClave = Math.random().toString(36).slice(-6); // Genera nueva contraseña
      let body = {
        "email": this.loginData.email, // Email del usuario que solicitó el reset
        "clave": nuevaClave,
        "app": "TellevoAPP" // Cambia por el nombre de tu aplicación si es necesario
      };

      // Realiza la petición HTTP
      this.http.post("https://myths.cl/api/reset_password.php", body)
        .subscribe((data) => {
          console.log('Respuesta del servidor:', data);
          loading.dismiss();
          alert('Se ha enviado una nueva contraseña a tu correo.');
        }, error => {
          console.error('Error en la petición', error);
          loading.dismiss();
        });
    } else {
      console.log("Email no encontrado");
      loading.dismiss();
    }
  }
  
}
