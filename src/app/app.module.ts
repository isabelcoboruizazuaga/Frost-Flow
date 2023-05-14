import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CabeceraComponent } from './cabecera/cabecera.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PruebasComponent } from './pruebas/pruebas.component';
import { PieComponent } from './pie/pie.component';
import { RegistroComponent } from './partials/registro/registro.component';
import { FamiliaComponent } from './familia/familia.component';
import { NeverasComponent } from './neveras/neveras.component';
import { NeveraItemComponent } from './partials/nevera-item/nevera-item.component';
import { CarouselComponent } from './partials/carousel/carousel.component';
import { NeveraComponent } from './nevera/nevera.component';
import { CajonComponent } from './cajon/cajon.component';
import { CajonItemComponent } from './partials/cajon-item/cajon-item.component';
import { ProductoCajonComponent } from './partials/producto-cajon/producto-cajon.component';
import { ProductosFamComponent } from './productos-fam/productos-fam.component';
import { AuthService } from "./shared/services/auth.service";
import { InicioSesionComponent } from './partials/inicio-sesion/inicio-sesion.component';
import { SesionRegistroComponent } from './sesion-registro/sesion-registro.component';
import { environment } from 'src/environments/environment.prod';


@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    LandingPageComponent,
    CarouselComponent,
    PruebasComponent,
    PieComponent,
    RegistroComponent,
    FamiliaComponent,
    NeverasComponent,
    NeveraItemComponent,
    NeveraComponent,
    CajonComponent,
    CajonItemComponent,
    ProductoCajonComponent,
    ProductosFamComponent,
    InicioSesionComponent,
    SesionRegistroComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [AuthService, { provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent]
})
export class AppModule { }
