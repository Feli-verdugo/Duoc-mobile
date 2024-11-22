import { Injectable } from '@angular/core';

@Injectable({
providedIn: 'root',
})
export class ViajesService {
  private viajes: any[] = []; // Aquí se almacenarán los viajes registrados

constructor() {}

  // Agregar un nuevo viaje
guardarViaje(viaje: any) {
    this.viajes.push(viaje);
    localStorage.setItem('viajes', JSON.stringify(this.viajes)); // Guardar los viajes en localStorage
}

  // Obtener todos los viajes
obtenerViajes() {
    const viajesGuardados = localStorage.getItem('viajes');
    if (viajesGuardados) {
    this.viajes = JSON.parse(viajesGuardados);
    }
    return this.viajes;
}
}
