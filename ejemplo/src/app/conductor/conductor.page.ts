import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { MenuLoko } from '../menu-loko/menu-loko.component';
import { PopoverController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular'; // Importar el ModalController
import { UserAccountPage } from '../user-account/user-account.page'; // Importar la página del modal
import { ViajesService } from '../services/viajes.service'; // Importa el servicio
declare var google: any;

interface Viaje {
  nombreConductor: string;
  patente: string;
  nombreVehiculo: string;
  precio: number;
  destino: string;
  estado: string;
  userEmail: string;  // Puede ser "pendiente", "aceptado", "en progreso", etc.
}

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
})
export class ConductorPage implements OnInit {
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

  // Nuevo: Controla la visibilidad del formulario y almacena los datos del viaje
  public showForm: boolean = false;
  public viajes: any[] = [];
  viajeAceptado: any = null; // Arreglo para almacenar los viajes disponibles
  public viaje = {
    nombreConductor: '',
    patente: '',
    nombreVehiculo: '',
    precio: 0,
    destino: '',
    estado: 'pendiente',
    userEmail: ''
  };

  clientes = [
    { nombre: 'Cliente 1', costo: '$2000' },
    { nombre: 'Cliente 2', costo: '$1800' },
    { nombre: 'Cliente 3', costo: '$1900' },
    { nombre: 'Cliente 4', costo: '$2300' },
    { nombre: 'Cliente 5', costo: '$3000' },
    { nombre: 'Cliente 6', costo: '$2500' },
  ];

  constructor(
    private viajesService: ViajesService, // Inyecta el servicio
    private navCtrl: NavController,
    private platform: Platform,
    private zone: NgZone,
    private popoverController: PopoverController,
    private authService: AuthService,  // Inyecta AuthService
    private router: Router,  // Inyecta Router
    private modalController: ModalController ,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {this.loadViajes();}

  async showToast(message: string, color: string = 'danger') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }

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

  // Nuevo: Lógica para el botón y formulario
  toggleForm() {
    this.showForm = !this.showForm;
  }

  registrarViaje() {
    // Validar que todos los campos estén completos
    if (!this.viaje.nombreConductor.trim()) {
      this.showToast('Debes ingresar el nombre del conductor.');
      return;
    }
    if (!this.viaje.patente.trim()) {
      this.showToast('Debes ingresar la patente del vehículo.');
      return;
    }
    if (!this.viaje.nombreVehiculo.trim()) {
      this.showToast('Debes ingresar el nombre del vehículo.');
      return;
    }
    if (!this.end.trim()) {
      this.showToast('Debes ingresar el lugar de destino.');
      return;
    }
    if (!this.viaje.precio || this.viaje.precio <= 0) {
      this.showToast('Debes ingresar un precio válido.');
      return;
    }

    // Si todas las validaciones pasan, registrar el viaje
    this.viaje.destino = this.end;
    this.viaje.estado = 'pendiente'; // Establecemos el estado del viaje como pendiente

    // Obtener el correo del usuario autenticado
    const user = this.authService.getAuthState(); // Obtenemos el usuario autenticado
    if (user) {
      this.viaje.userEmail = user.email; // Añadimos el correo al objeto viaje
    }

    console.log('Viaje registrado:', this.viaje);
    this.viajesService.guardarViaje({ ...this.viaje }); // Guardamos el viaje con el correo del usuario
    this.showForm = false; // Ocultamos el formulario
    this.showToast('Viaje guardado exitosamente', 'success');
  }

  loadViajes() {
    const viajes: Viaje[] = JSON.parse(localStorage.getItem('viajes') || '[]');

    // Buscar el viaje que esté aceptado
    this.viajeAceptado = viajes.find(viaje => viaje.estado === 'aceptado') || null;
  }

  // Iniciar el viaje cuando se hace clic en el botón
  iniciarViaje() {
    if (this.viajeAceptado) {
      this.viajeAceptado.estado = 'en progreso'; // Cambiar el estado del viaje
      localStorage.setItem('viajes', JSON.stringify([this.viajeAceptado])); // Guardar el cambio en localStorage
      alert('El viaje ha comenzado.');
    }
  }

  finalizarViaje() {
    if (this.viajeAceptado) {
      this.viajeAceptado.estado = 'finalizado'; // Cambiar el estado a finalizado
      this.updateViajes(); // Actualizar los viajes en localStorage
      alert('El viaje ha finalizado.');
    }
  }

  // Función para actualizar los viajes en localStorage
  updateViajes() {
    const viajes: Viaje[] = JSON.parse(localStorage.getItem('viajes') || '[]');
    const viajeIndex = viajes.findIndex(v => v.patente === this.viajeAceptado?.patente);
    if (viajeIndex !== -1) {
      viajes[viajeIndex] = this.viajeAceptado!; // Actualizamos el viaje
      localStorage.setItem('viajes', JSON.stringify(viajes)); // Guardamos los cambios
    }
  }

  saveViajes() {
    localStorage.setItem('viajes', JSON.stringify(this.viajes)); // Guardar los viajes en localStorage
  }



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
