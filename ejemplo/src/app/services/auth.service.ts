import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  // Método de registro que incluye el nombre de usuario y tipo de usuario
  async register(email: string, password: string, userType: string, name: string) {
    const userData = { email, password, userType, name };
    
    // Guardar el usuario en Local Storage
    localStorage.setItem(email, JSON.stringify(userData));
    console.log('Usuario registrado:', userData);
    
    return userData;
  }

  // Método de inicio de sesión
  async login(email: string, password: string) {
    const userData = JSON.parse(localStorage.getItem(email) || '{}');

    if (userData && userData.password === password) {
      // Guardar la referencia del usuario autenticado
      localStorage.setItem('loggedInUser', email);  // Clave para el usuario logueado
      console.log('Usuario logueado:', userData);
      return userData; // Devuelve el objeto de usuario
    } else {
      console.error('Credenciales incorrectas');
      throw new Error('Credenciales incorrectas');
    }
  }

  // Cerrar sesión
  async logout() {
    // Elimina el estado de usuario autenticado
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']); // Redirige a la página de login
  }

  // Obtener el estado del usuario autenticado
  getAuthState() {
    const loggedInUserEmail = localStorage.getItem('loggedInUser'); // Recuperar el email del usuario logueado
    return loggedInUserEmail ? JSON.parse(localStorage.getItem(loggedInUserEmail) || '{}') : null;
  }
}
