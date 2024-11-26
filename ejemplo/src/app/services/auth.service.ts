import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {}

  // Método de inicio de sesión
  async login(email: string, password: string) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    console.log('Usuarios registrados:', usuarios);
    
    const user = usuarios.find((u: any) => u.email === email);
    console.log('Usuario encontrado:', user);
  
    if (user && user.clave === password) {
      localStorage.setItem('loggedInUser', email);
      console.log('loggedInUser guardado en localStorage:', email);
      return user;
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
    const loggedInUserEmail = localStorage.getItem('loggedInUser'); // Recuperar el correo del usuario autenticado
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]'); // Obtener todos los usuarios

    // Encontrar al usuario autenticado por su email
    return usuarios.find((user: any) => user.email === loggedInUserEmail) || null;
  }
}
