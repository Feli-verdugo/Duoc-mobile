import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Importamos AuthService
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.page.html',
  styleUrls: ['./user-account.page.scss'],
})
export class UserAccountPage implements OnInit {
  userData: any = {}; // Objeto que almacenará los datos del usuario

  constructor(
    private authService: AuthService, 
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.loadUserData(); // Cargar los datos del usuario
  }

  loadUserData() {
    const user = this.authService.getAuthState(); // Obtener los datos del usuario desde AuthService
    if (user) {
      this.userData = user;
    }
  }

  closeModal() {
    this.modalController.dismiss(); // Cerrar el modal
  }
}
