import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Importamos AuthService
import { ModalController } from '@ionic/angular';
import { ViajesService } from '../services/viajes.service'; // Importamos el servicio ViajesService
import { Router } from '@angular/router';
import { MenuLoko } from '../menu-loko/menu-loko.component';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.page.html',
  styleUrls: ['./user-account.page.scss'],
})
export class UserAccountPage implements OnInit {
  userData: any = {}; // Objeto que almacenará los datos del usuario
  userTrips: any[] = []; // Lista de viajes del usuario

  constructor(
    private router: Router,
    private authService: AuthService, 
    private modalController: ModalController,
    private viajesService: ViajesService // Inyectamos el servicio de viajes
  ) {}

  ngOnInit() {
    this.loadUserTrips(); // Cargar los datos del usuario
  }

  
  loadUserTrips() {
    // Suscribirse al Observable que retorna todos los viajes desde Firestore
    this.viajesService.obtenerViajes().subscribe((viajes: any[]) => {
      const userEmail = this.authService.getAuthState().email;  // Obtener el correo del usuario autenticado
      const user = this.authService.getAuthState(); // Obtener los datos del usuario desde AuthService
      if (user) {
        this.userData = user; // Guardamos los datos del usuario // Cargamos los viajes del usuario
      } else {
        console.log('No hay usuario autenticado');
      }
    });
  }

  closeModal() {
    this.modalController.dismiss(); // Cerrar el modal
  }

  async onLogout() {
    try {
      await this.authService.logout();
      console.log('Sesión cerrada');
      this.router.navigate(['/login']); // Redirige a la página de login después de cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }


}
