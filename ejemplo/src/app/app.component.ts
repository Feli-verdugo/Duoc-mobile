import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private navCtrl: NavController) {
    this.initializeApp();
  }

  initializeApp() {
    // Aquí puedes controlar la navegación inicial
    this.navCtrl.navigateRoot('/home'); // Redirige a la página de inicio
  }
}
