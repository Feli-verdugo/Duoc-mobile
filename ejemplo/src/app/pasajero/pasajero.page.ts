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
  viajes: any[] = []; // Lista de viajes disponibles

  constructor(
    private navCtrl: NavController,
    private popoverController: PopoverController,
    private authService: AuthService,
    private router: Router,
    private modalController: ModalController,
    private viajesService: ViajesService
  ) {}

  ngOnInit() {
    this.loadViajes(); // Cargar viajes al iniciar la vista
  }

  loadViajes() {
    this.viajes = this.viajesService.obtenerViajes(); // Obtiene los viajes desde el servicio
    console.log('Viajes cargados:', this.viajes); // Verifica si los viajes están siendo cargados correctamente
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
