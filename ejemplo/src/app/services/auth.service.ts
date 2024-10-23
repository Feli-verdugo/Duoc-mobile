import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private _storage: Storage | null = null;

    constructor(private afAuth: AngularFireAuth, private router: Router, private storage: Storage) {
        this.init();
    }

    async init() {
        const storage = await this.storage.create();
        this._storage = storage;
    }

    async register(email: string, password: string, userType: string) {
        try {
            const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
            console.log('Usuario registrado:', userCredential);
            await this._storage?.set('userType', userType);
            return userCredential;
        } catch (error) {
            console.error('Error en el registro:', error);
            throw error;
        }
    }

    async login(email: string, password: string) {
        try {
            const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
            console.log('Usuario logueado:', userCredential);
            const userType = await this._storage?.get('userType'); 
            return { userCredential, userType };
        } catch (error) {
            console.error('Error en el login:', error);
            throw error; // Lanza el error para ser manejado en el componente
        }
    }

    async logout() {
        try {
            await this.afAuth.signOut();
            await this._storage?.remove('userType'); // Limpiar el tipo de usuario
            this.router.navigate(['/login']);
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    }

    getAuthState() {
        return this.afAuth.authState;
    }
}
