import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MenuLoko } from '../menu-loko/menu-loko.component';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
})
export class PasajeroPage implements OnInit {

  constructor(private navCtrl: NavController,  private popoverController: PopoverController) { }

  MandarAlogin(){
    this.navCtrl.navigateForward('/login');
  }

  async presentOptionsPopover(event: Event) {
    const popover = await this.popoverController.create({
      component: MenuLoko,
      event: event,
      translucent: true,
    });
    await popover.present();
  }

  ngOnInit() {
  }

}
