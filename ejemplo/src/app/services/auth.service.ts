import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';  // Para el Ionic Storage

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private _storage: Storage | null = null;  // Variable pal almacenamiento

    constructor(private afAuth: AngularFireAuth, private router: Router, private storage: Storage) {
        
        this.init();  // Esta maldita wea me cago, es para inicializar todo el leseo del storage y que funcione el registro
    }

    // Método para inicializar el Ionic Storage

    async init() {
        const storage = await this.storage.create();  // Crea la base de datos 
        this._storage = storage;
    }

    // Registro de usuario completo pal nombre, mail, la contra, y el tipo de usuario

    async register(email: string, password: string, userType: string) {
        try {
            const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);
            console.log('Usuario registrado:', userCredential);
            
            // Esto guarda el tipo de usuario en el Ionic Storage

            await this._storage?.set('userType', userType);  // cada vez que queramos webear con algo de esto, considerar usar el  "_storage"
            
            return userCredential;
        } catch (error) {
            console.error('Error en el registro:', error);
            throw error;
        }
    }

    // Pa iniciar sesion con el con correo y la contra

    async login(email: string, password: string) {
        try {
            const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
            console.log('Usuario logueado:', userCredential);
            
            // Esto obtiene el tipo de usuario desde el Ionic Storage

            const userType = await this._storage?.get('userType');
            return { userCredential, userType };
        } catch (error) {
            console.error('Error en el login:', error);
            throw error;
        }
    }

    // Y lo ultimo pa cerrar sesion

    async logout() {
        try {
            await this.afAuth.signOut();
            this.router.navigate(['/login']);
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    }

    // Esta wea verifica al usuario que se autentifico 

    getAuthState() {
        return this.afAuth.authState;
    }
}
