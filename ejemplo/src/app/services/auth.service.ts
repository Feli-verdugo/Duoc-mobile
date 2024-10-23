import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  // Método de registro que incluye el tipo de usuario
  async register(email: string, password: string, userType: string) {
    const userData = { email, password, userType };
    
    // Guardar el usuario en Local Storage
    localStorage.setItem(email, JSON.stringify(userData));
    console.log('Usuario registrado:', userData);
    
    return userData;
  }

  // Método de inicio de sesión
  async login(email: string, password: string) {
    const userData = JSON.parse(localStorage.getItem(email) || '{}');

    if (userData && userData.password === password) {
      console.log('Usuario logueado:', userData);
      return userData; // Devuelve el objeto de usuario
    } else {
      console.error('Credenciales incorrectas');
      throw new Error('Credenciales incorrectas');
    }
  }

  // Cerrar sesión
  async logout() {
    // Remueve cualquier otro dato guardado localmente
    this.router.navigate(['/login']); // Redirige a la página de login
  }

  // Obtener el estado del usuario autenticado
  getAuthState() {
    const email = localStorage.getItem('email');
    return email ? JSON.parse(localStorage.getItem(email) || '{}') : null;
  }
}
