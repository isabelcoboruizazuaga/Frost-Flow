import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { SesionRegistroComponent } from './sesion-registro/sesion-registro.component';
import { InicioSesionComponent } from './partials/inicio-sesion/inicio-sesion.component';
import { FormsModule } from '@angular/forms';
import { CajonItemAddComponent } from './partials/cajon-item-add/cajon-item-add.component';
import { AddProductosAdminComponent } from './add-productos-admin/add-productos-admin.component';
import { ProductoItemComponent } from './partials/producto-item/producto-item.component';
import { NgbDateCustomParserFormatter } from './shared/ngb-date-custom-parser-formatter';


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
    SesionRegistroComponent,
    InicioSesionComponent,
    CajonItemAddComponent,
    AddProductosAdminComponent,
    ProductoItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
