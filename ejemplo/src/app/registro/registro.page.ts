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

  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  
  registerData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: ''
  };

  constructor(private navCtrl: NavController, private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.passwordIcon = 'eye';
    } else {
      this.passwordType = 'password';
      this.passwordIcon = 'eye-off';
    }
  }

  async onRegister() {
    if (this.registerData.password !== this.registerData.confirmPassword) {
      console.error('Las contraseñas no coinciden');
      return;
    }
  
    // Recuperar usuarios del localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  
    // Verificar si el correo ya está registrado
    if (usuarios.some((u: { email: string }) => u.email === this.registerData.email)) {
      console.error('El correo ya está registrado');
      return;
    }
  
    // Agregar el nuevo usuario al arreglo
    usuarios.push({
      nombre: this.registerData.name,
      email: this.registerData.email,
      clave: this.registerData.password,
      userType: this.registerData.userType,
    });
  
    // Guardar el arreglo actualizado en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    console.log('Usuario registrado exitosamente:', this.registerData);
  
    // Redirigir al login
    this.router.navigate(['/login']);
  }
  
}
