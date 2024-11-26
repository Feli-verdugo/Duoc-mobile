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
  
    // Buscar el usuario en localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find((u: any) => u.email === email && u.clave === password);
  
    if (usuario) {
      console.log(`Bienvenido/a ${usuario.nombre}!`);
      this.MandarAhome(usuario.userType || 'client'); // Ajusta según el tipo de usuario
    } else {
      this.errorMessage = 'Correo o contraseña incorrectos. Intenta nuevamente.';
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
  
    const email = this.loginData.email; // Email del formulario actual
  
    // Buscar el usuario en el localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]'); // Asegúrate de guardar usuarios en localStorage
    const usuario = usuarios.find((u: any) => u.email === email);
  
    if (usuario) {
      let nuevaClave = Math.random().toString(36).slice(-6); // Generar nueva contraseña
      let body = {
        "email": email,
        "clave": nuevaClave,
        "app": "TeLlevoAPP" // Nombre de la app
      };
  
      // Realizar la petición HTTP
      this.http.post("https://myths.cl/api/reset_password.php", body)
        .subscribe((data) => {
          console.log('Respuesta del servidor:', data);
          // Actualizar contraseña en localStorage
          usuario.clave = nuevaClave;
          localStorage.setItem('usuarios', JSON.stringify(usuarios));
          loading.dismiss();
          alert('Se ha enviado una nueva contraseña a tu correo.');
        }, error => {
          console.error('Error en la petición', error);
          loading.dismiss();
        });
    } else {
      alert('Usuario no encontrado.');
      loading.dismiss();
    }
  }

  ngOnInit() {
    // Solo agrega usuarios si no están en localStorage
    if (!localStorage.getItem('usuarios')) {
      const usuarios = [
        { nombre: "Sebastian Negro", email: "seba.negro@gmail.com", clave: "elnegro23" },
        { nombre: "jose", email: "tomi231tomi@gmail.com", clave: "tomito231" }
      ];
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
  }
}
