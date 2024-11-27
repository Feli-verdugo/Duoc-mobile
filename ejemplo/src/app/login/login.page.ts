import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  loginData = {
    email: '',
    password: '',
  };

  isModalOpen = false;
  toastMessage: string = ''; // Mensaje para el ion-toast
  toastDuration: number = 3000; // Duración predeterminada del ion-toast
  toastColor: string = 'primary'; // Color predeterminado del ion-toast
  isToastOpen: boolean = false; // Controla la visibilidad del ion-toast

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    // Inicializamos el localStorage si no existe
    if (!localStorage.getItem('usuarios')) {
      localStorage.setItem('usuarios', JSON.stringify([]));
    }
  }

  togglePasswordVisibility() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off';
    }
  }

  // Método para mostrar un ion-toast
  async showToast(message: string, color: string = 'primary', duration: number = 3000) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      color,
      position: 'bottom', // Puedes cambiarlo a 'top' o 'middle'
    });
    await toast.present();
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
      this.showToast(`Inicio de sesión exitoso: ${usuarioEncontrado.nombre}`, 'success');
      this.MandarAhome(usuarioEncontrado.userType); // Redirigir según el tipo de usuario
      localStorage.setItem('loggedInUser', email);  
    } else {
      this.showToast('Correo o contraseña incorrectos', 'danger');
    }
  }

  // Método para redirigir al home según el tipo de usuario
  MandarAhome(userType: string) {
    if (userType === 'driver') {
      this.router.navigate(['/conductor']);
    } else if (userType === 'client') {
      this.router.navigate(['/pasajero']);
    } else {
      this.showToast('Por favor seleccione un tipo de usuario', 'warning');
    }
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  // Método para recuperar contraseña
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
        app: "TellevoAPP", // Nombre de la app
      };

      try {
        const loading = await this.loadingCtrl.create({
          message: 'Enviando correo...',
        });
        await loading.present();

        // Hacer la solicitud POST a la API
        this.http.post("https://myths.cl/api/reset_password.php", body).subscribe(
          async (response) => {
            console.log('Respuesta del servidor:', response);
            loading.dismiss();
            this.showToast('Se ha enviado una nueva contraseña a tu correo.', 'success');
          },
          async (error) => {
            console.error('Error al enviar la solicitud:', error);
            loading.dismiss();
            this.showToast('Hubo un error al enviar el correo. Intenta nuevamente.', 'danger');
          }
        );
      } catch (error) {
        console.error('Error en el proceso:', error);
        this.showToast('Ocurrió un error inesperado.', 'danger');
      }
    } else {
      this.showToast('Correo no encontrado. Verifica tus datos.', 'danger');
    }
  }
}
