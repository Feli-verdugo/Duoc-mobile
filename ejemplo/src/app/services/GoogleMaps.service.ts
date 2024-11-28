import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root',
})
export class GoogleMapsService {
private googleMapsUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';
  private apiKey = 'AIzaSyBWRdsh2J4NxYfKSbhsoaxOQI3rSptJ2Mw'; // Tu API Key de Google Maps

constructor(private http: HttpClient) {}

  // Obtener sugerencias de lugares según el texto ingresado
getSuggestedDestinations(query: string): Observable<any> {
    const url = `${this.googleMapsUrl}?input=${query}&key=${this.apiKey}`;
    return this.http.get<any>(url);
}
}