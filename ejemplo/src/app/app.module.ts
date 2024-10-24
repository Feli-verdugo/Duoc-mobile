import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MenuLoko } from './menu-loko/menu-loko.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment.prod';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: 
  [AppComponent
  ,MenuLoko], // Eliminar PasajeroPage aquí
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule, 
    FormsModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    IonicStorageModule.forRoot(), // Pa la base de datos
    HttpClientModule
  ],
  providers: 
  [{ provide: RouteReuseStrategy, 
  useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
