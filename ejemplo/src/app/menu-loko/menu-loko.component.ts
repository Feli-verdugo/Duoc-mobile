import { IonicModule } from '@ionic/angular';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({

  selector: 'app-menu-loko',
  
  template: `

    <ion-list>

      <ion-item>

        <ion-label>Dark Mode</ion-label>

        <ion-toggle slot="end" [(ngModel)]="darkMode" (ionChange)="toggleTheme()"></ion-toggle>

      </ion-item>

    </ion-list>
    
  `,
})
export class MenuLoko {
  darkMode = false;

  constructor(private modalCtrl: ModalController) {}

  toggleTheme() {
    document.body.classList.toggle('dark', this.darkMode);
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
