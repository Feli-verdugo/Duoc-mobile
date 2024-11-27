import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

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

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private router: Router,
    private toastCtrl: ToastController // Añadimos el ToastController
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

  // Método para mostrar el toast
  async showToast(message: string, color: string = 'primary', duration: number = 3000) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      color,
      position: 'bottom', // Puedes cambiar a 'top' o 'middle'
    });
    await toast.present();
  }

  async onRegister() {

      // Validar si el nombre está vacío
      if (!this.registerData.name.trim()) {
        this.showToast('Debes agregar un nombre.', 'warning');
        return;
      }
  
      // Validar si el correo está vacío
      if (!this.registerData.email.trim()) {
        this.showToast('Debes agregar un correo.', 'warning');
        return;
      }

    if (!this.registerData.userType) {
      this.showToast('Debes seleccionar un tipo de usuario, por favor.', 'warning');
      return;
    }

    if (this.registerData.password !== this.registerData.confirmPassword) {
      this.showToast('Las contraseñas no coinciden', 'danger');
      return;
    }
  
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]'); // Obtener usuarios existentes
  
    if (usuarios.some((u: { email: string }) => u.email === this.registerData.email)) {
      this.showToast('El correo ya está registrado', 'danger');
      return;
    }
  
    // Agregar el nuevo usuario
    usuarios.push({
      nombre: this.registerData.name,
      email: this.registerData.email,
      clave: this.registerData.password,
      userType: this.registerData.userType,
    });
  
    localStorage.setItem('usuarios', JSON.stringify(usuarios)); // Guardar usuarios actualizados
    this.showToast('Usuario registrado exitosamente', 'success');
  
    this.router.navigate(['/login']); // Redirigir al login
  }
}
