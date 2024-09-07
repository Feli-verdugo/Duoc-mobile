import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})
export class ConductorPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  MandarAlogin(){
    this.navCtrl.navigateForward('/login');
  }

  ngOnInit() {
  }

}
