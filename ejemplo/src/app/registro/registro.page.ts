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
      
      // Aqui llamamos el registro completo

      await this.authService.register(this.registerData.email, this.registerData.password, this.registerData.userType);
      console.log('Usuario registrado y guardado en Firebase e Ionic Storage:', this.registerData);

      this.router.navigate(['/login']);  // Redirige a login despues de registrarse sin dramas yera
    
    } catch (error) {
      console.log('Error en el registro:', error);
    }
  }
}
