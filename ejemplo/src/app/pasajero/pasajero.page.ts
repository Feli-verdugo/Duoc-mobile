import { Component, OnInit } from '@angular/core';
import { NavController, PopoverController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MenuLoko } from '../menu-loko/menu-loko.component';
import { UserAccountPage } from '../user-account/user-account.page';
import { ViajesService } from '../services/viajes.service'; // Importar el servicio

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
})
export class PasajeroPage implements OnInit {
  public viajes: any[] = []; // Arreglo para almacenar los viajes disponibles
  
  constructor(
    private navCtrl: NavController,
    private popoverController: PopoverController,
    private authService: AuthService,
    private router: Router,
    private modalController: ModalController,
    private viajesService: ViajesService
  ) {}

  ngOnInit() {
    this.loadViajes();
    console.log(this.viajes); // Cargar viajes al iniciar la vista
  }


  aceptarViaje(index: number) {
    let viajes = JSON.parse(localStorage.getItem('viajes') || '[]'); // Cargar viajes desde localStorage
    
    if (viajes[index].estado === 'pendiente') {
      viajes[index].estado = 'aceptado'; // Cambiar estado del viaje a 'aceptado'
      localStorage.setItem('viajes', JSON.stringify(viajes)); // Guardar los cambios en localStorage
  
      alert('Has aceptado el viaje.');
      this.loadViajes(); // Recargar los viajes (actualiza la vista)
    }
  }

  loadViajes() {
    const storedViajes = localStorage.getItem('viajes');
    this.viajes = storedViajes ? JSON.parse(storedViajes) : [];
    console.log(this.viajes);
  }

  saveViajes() {
    localStorage.setItem('viajes', JSON.stringify(this.viajes));
  }

  async presentOptionsPopover(event: Event) {
    const popover = await this.popoverController.create({
      component: MenuLoko,
      event: event,
      translucent: true,
    });
    await popover.present();
  }

  async presentAccountModal() {
    const modal = await this.modalController.create({
      component: UserAccountPage,
    });
    return await modal.present();
  }

  async onLogout() {
    try {
      await this.authService.logout();
      console.log('Sesión cerrada');
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
