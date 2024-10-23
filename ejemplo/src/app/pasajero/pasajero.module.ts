import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasajeroPageRoutingModule } from './pasajero-routing.module';

import { PasajeroPage } from './pasajero.page';

import { Component, EventEmitter, Output } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasajeroPageRoutingModule
  ],
  declarations: [PasajeroPage]
})
export class PasajeroPageModule {

  @Output() logoutEvent = new EventEmitter<void>();


  logout() {
    this.logoutEvent.emit(); // Emitir el evento
  }
}
