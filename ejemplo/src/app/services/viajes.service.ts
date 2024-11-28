import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs'
@Injectable({
providedIn: 'root',
})
export class ViajesService {

constructor(private firestore: AngularFirestore) {}

// En el servicio ViajesService:
actualizarEstadoViaje(id: string, estado: string) {
  return this.firestore
    .collection('viajes')
    .doc(id) // Obtener el documento por ID
    .update({ estado }); // Actualizar el estado
}


guardarViaje(viaje: any): Promise<any> {
  return this.firestore.collection('viajes').add(viaje); // Guardamos el viaje en la colección "viajes"
}

// Función para obtener todos los viajes desde Firestore
obtenerViajes(): Observable<any[]> {
  return this.firestore.collection('viajes').valueChanges(); // Obtiene los viajes en tiempo real
}

// Si necesitas cargar viajes previamente almacenados en localStorage
cargarViajes() {
  return JSON.parse(localStorage.getItem('viajes') || '[]');
}
}
