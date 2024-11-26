import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Importamos AuthService
import { ModalController } from '@ionic/angular';
import { ViajesService } from '../services/viajes.service'; // Importamos el servicio ViajesService

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.page.html',
  styleUrls: ['./user-account.page.scss'],
})
export class UserAccountPage implements OnInit {
  userData: any = {}; // Objeto que almacenará los datos del usuario
  userTrips: any[] = []; // Lista de viajes del usuario

  constructor(
    private authService: AuthService, 
    private modalController: ModalController,
    private viajesService: ViajesService // Inyectamos el servicio de viajes
  ) {}

  ngOnInit() {
    this.loadUserData(); // Cargar los datos del usuario
  }

  loadUserData() {
    const user = this.authService.getAuthState(); // Obtener los datos del usuario desde AuthService
    if (user) {
      this.userData = user; // Guardamos los datos del usuario
      this.loadUserTrips(user.email); // Cargamos los viajes del usuario
    } else {
      console.log('No hay usuario autenticado');
    }
  }

  loadUserTrips(userEmail: string) {
    const viajes = this.viajesService.obtenerViajes(); // Obtener los viajes almacenados
    // Filtrar los viajes por el correo electrónico del usuario
    this.userTrips = viajes.filter((viaje) => viaje.userEmail === userEmail);
    console.log('Viajes del usuario:', this.userTrips); // Log para verificar los viajes
  }

  closeModal() {
    this.modalController.dismiss(); // Cerrar el modal
  }
}
