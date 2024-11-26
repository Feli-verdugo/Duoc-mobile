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
  
    // Recuperar usuarios del localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  
    // Buscar el usuario en el arreglo
    const usuarioEncontrado = usuarios.find(
      (u: { email: string; clave: string }) => u.email === email && u.clave === password
    );
  
    if (usuarioEncontrado) {
      console.log(`Inicio de sesión exitoso para: ${usuarioEncontrado.nombre}`);
      
      // Guardar el usuario autenticado en el localStorage
      localStorage.setItem('loggedInUser', email);
  
      this.MandarAhome(usuarioEncontrado.userType); // Redirigir según el tipo de usuario
    } else {
      console.error('Correo o contraseña incorrectos');
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
    const { email } = this.loginData;
  
    // Recuperar usuarios del localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  
    // Buscar el usuario por email
    const usuarioEncontrado = usuarios.find(
      (u: { email: string }) => u.email === email
    );
  
    if (usuarioEncontrado) {
      const nuevaClave = Math.random().toString(36).slice(-6); // Generar nueva contraseña
      usuarioEncontrado.clave = nuevaClave;
  
      // Guardar usuarios actualizados en localStorage
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
  
      const body = {
        email: email, // Email del usuario
        clave: nuevaClave, // Nueva contraseña
        app: "TellevoAPP", // Nombre de la app (ajusta según necesidad)
      };
  
      try {
        const loading = await this.loadingCtrl.create({
          message: 'Enviando correo...',
        });
        await loading.present();
  
        // Hacer la solicitud POST a la API
        this.http.post("https://myths.cl/api/reset_password.php", body)
          .subscribe(
            (response) => {
              console.log('Respuesta del servidor:', response);
              loading.dismiss();
              alert('Se ha enviado una nueva contraseña a tu correo.');
            },
            (error) => {
              console.error('Error al enviar la solicitud:', error);
              loading.dismiss();
              alert('Hubo un error al enviar el correo. Intenta nuevamente.');
            }
          );
      } catch (error) {
        console.error('Error en el proceso:', error);
        alert('Ocurrió un error inesperado.');
      }
    } else {
      alert('Correo no encontrado. Verifica tus datos.');
    }
  }
  
  

  ngOnInit() {
    // Inicializamos el localStorage si no existe
    if (!localStorage.getItem('usuarios')) {
      localStorage.setItem('usuarios', JSON.stringify([]));
    }
  }
  
}
