import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { MenuLoko } from '../menu-loko/menu-loko.component';
@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})
export class ConductorPage implements OnInit {

  constructor(private navCtrl: NavController, private popoverController: PopoverController) { }

  clientes = [
    { nombre: 'Cliente 1', costo: '$2000' },
    { nombre: 'Cliente 2', costo: '$1800' },
    { nombre: 'Cliente 3', costo: '$1900' },
    { nombre: 'Cliente 4', costo: '$2300' },
    { nombre: 'Cliente 5', costo: '$3000' },
    { nombre: 'Cliente 6', costo: '$2500' },
  ];

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
