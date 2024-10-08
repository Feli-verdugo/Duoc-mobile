import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { MenuLoko } from '../menu-loko/menu-loko.component';
import { PopoverController } from '@ionic/angular';

declare var google: any;

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
})
export class PasajeroPage implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef | undefined;
  public map: any;
  public directionsService: any;
  public directionsDisplay: any;
  public start: string = "Duoc UC: Sede Melipilla - Serrano, Melipilla, Chile";
  public end: string = "Pomaire";
  
  carrito: any[] = [];
  distancia: string = "";
  duracion: string = "";

  // Nueva propiedad para autocompletar
  autocompleteItems: any[] = [];

  constructor(
    private navCtrl: NavController, 
    private platform: Platform,
    private zone: NgZone, 
    private popoverController: PopoverController
  ) {}

  MandarAlogin() {
    this.navCtrl.navigateForward('/login');
  }

  // Función para mostrar el menú Popover
  async presentOptionsPopover(event: Event) {
    const popover = await this.popoverController.create({
      component: MenuLoko,
      event: event,
      translucent: true,
    });
    await popover.present();
  }

  // Inicialización del mapa al cargar la vista
  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.initMap();
    });
  }

  // Inicializar el mapa con Google Maps API
  initMap() {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();

    let mapOptions = {
      zoom: 5,
      zoomControl: false,
      scaleControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.map = new google.maps.Map(this.mapElement!.nativeElement, mapOptions);
    this.directionsDisplay.setMap(this.map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          let infoWindow = new google.maps.InfoWindow({
            content: "Estás aquí.",
            position: pos,
          });
          infoWindow.open(this.map);
          this.map.setCenter(pos);
        }
      );
    }

    // Calcular y mostrar la ruta
    this.calculateAndDisplayRoute();
  }

  // Función para calcular la ruta entre dos ubicaciones
  calculateAndDisplayRoute() {
    this.directionsService.route(
      {
        origin: this.start,
        destination: this.end,
        travelMode: 'DRIVING',
      },
      (response: any, status: string) => {
        if (status === 'OK') {
          this.directionsDisplay.setDirections(response);
          const route = response.routes[0];
          const leg = route.legs[0];

          // Distancia total
          const distanceInKilometers = (leg.distance.value / 1000).toFixed(2);
          this.distancia = `${distanceInKilometers} km`;

          // Duración del viaje
          const durationInSeconds = leg.duration.value;
          const minutes = Math.floor(durationInSeconds / 60);
          const seconds = durationInSeconds % 60;
          const formattedDuration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          this.duracion = formattedDuration;

          console.log(`Inicio: ${leg.start_address}`);
          console.log(`Destino: ${leg.end_address}`);
        } else {
          window.alert('Error al solicitar direcciones: ' + status);
        }
      }
    );
  }

  // Función para actualizar los resultados de búsqueda
  updateSearchResults() {
    if (this.end.trim() === '') {
      this.autocompleteItems = [];
      return;
    }

    let service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions(
      {
        input: this.end,
        componentRestrictions: { country: 'cl' }, // Restringir a un país
      },
      (predictions: any[], status: string) => {
        this.zone.run(() => {
          this.autocompleteItems = [];
          if (predictions) {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          }
        });
      }
    );
  }

  // Función para manejar la selección de un resultado
  selectSearchResult(item: any) {
    this.end = item.description; // Actualiza el destino con el lugar seleccionado
    this.autocompleteItems = []; // Limpiamos la lista después de la selección
    this.calculateAndDisplayRoute(); // Recalcula la ruta con el nuevo destino
  }

  ngOnInit() {}
}
