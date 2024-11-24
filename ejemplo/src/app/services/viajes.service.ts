import { Injectable } from '@angular/core';

@Injectable({
providedIn: 'root',
})
export class ViajesService {
  private viajes: any[] = []; // Aquí se almacenarán los viajes registrados

constructor() {}

  // Agregar un nuevo viaje
  // Función para guardar un viaje
  guardarViaje(viaje: any) {
    // Recupera los viajes almacenados, si existen
    let viajes = JSON.parse(localStorage.getItem('viajes') || '[]');

    // Agregar el nuevo viaje
    viajes.push(viaje);

    // Guardar los viajes actualizados en localStorage
    localStorage.setItem('viajes', JSON.stringify(viajes));
  }

  // Función para cargar los viajes (si es necesario)
  cargarViajes() {
    return JSON.parse(localStorage.getItem('viajes') || '[]');
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
