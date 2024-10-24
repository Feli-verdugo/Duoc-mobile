import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { MenuLoko } from '../menu-loko/menu-loko.component';
import { PopoverController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular'; // Importar el ModalController
import { UserAccountPage } from '../user-account/user-account.page'; // Importar la página del modal


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

  
  autocompleteItems: any[] = [];

  constructor(
    private navCtrl: NavController, 
    private platform: Platform,
    private zone: NgZone, 
    private popoverController: PopoverController,
    private authService: AuthService,  // Inyecta AuthService
    private router: Router,
    private modalController: ModalController  
  ) {}

  MandarACasita(){
    this.navCtrl.navigateForward('/home');
  }

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

  async presentAccountModal() {
    const modal = await this.modalController.create({
      component: UserAccountPage, // Referencia a la página de cuenta
    });
    return await modal.present();
  }



  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.initMap();
    });
  }

  
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

   
    this.calculateAndDisplayRoute();
  }

  
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

          
          const distanceInKilometers = (leg.distance.value / 1000).toFixed(2);
          this.distancia = `${distanceInKilometers} km`;

        
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

  
  updateSearchResults() {
    if (this.end.trim() === '') {
      this.autocompleteItems = [];
      return;
    }

    let service = new google.maps.places.AutocompleteService();
    service.getPlacePredictions(
      {
        input: this.end,
        componentRestrictions: { country: 'cl' }, 
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

  
  selectSearchResult(item: any) {
    this.end = item.description; 
    this.autocompleteItems = []; 
    this.calculateAndDisplayRoute(); 
  }


  
  ngOnInit() {}

  async onLogout() {
    try {
      await this.authService.logout();
      console.log('Sesión cerrada');
      this.router.navigate(['/login']); // Redirige a la página de login después de cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
}
}
