import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.page.html',
  styleUrls: ['./user-account.page.scss'],
})
export class UserAccountPage implements OnInit {
  userData: any = {}; // Datos del usuario autenticado

  constructor(
    private authService: AuthService, 
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadUserData(); // Cargar datos del usuario al inicializar
  }

  loadUserData() {
    const user = this.authService.getAuthState(); // Obtener los datos del usuario autenticado
    if (user) {
      console.log('Usuario autenticado:', user); // Agregar un log para verificar el usuario
      this.userData = user;
    } else {
      console.log('No hay usuario autenticado');
    }
  }

  closeModal() {
    this.modalController.dismiss(); // Cerrar el modal
  }
}
