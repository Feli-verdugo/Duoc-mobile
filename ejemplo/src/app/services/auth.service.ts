import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private afAuth: AngularFireAuth, private router: Router) {}

  // Registro de usuario con email y password
    async register(email: string, password: string) {
    try {
        const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
        console.log('Usuario registrado:', userCredential);
        return userCredential;
    } catch (error) {
        console.error('Error en el registro:', error);
        throw error;
    }
}

  // Inicio de sesión con email y password
    async login(email: string, password: string) {
    try {
        const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
        console.log('Usuario logueado:', userCredential);
        return userCredential;
    } catch (error) {
        console.error('Error en el login:', error);
        throw error;
    }
}

  // Cerrar sesión
    async logout() {
    try {
        await this.afAuth.signOut();
        this.router.navigate(['/login']);
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
    }
    }

  // Verificación de usuario autenticado
getAuthState() {
    return this.afAuth.authState;
}
}
