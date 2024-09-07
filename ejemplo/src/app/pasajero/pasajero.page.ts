import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
})
export class PasajeroPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  MandarAlogin(){
    this.navCtrl.navigateForward('/login');
  }
  ngOnInit() {
  }

}
