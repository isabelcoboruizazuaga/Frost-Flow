import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PruebasComponent } from './pruebas/pruebas.component';
import { PieComponent } from './pie/pie.component';
import { RegistroComponent } from './registro/registro.component';
import { FamiliaComponent } from './familia/familia.component';
import { NeverasComponent } from './neveras/neveras.component';
import { NeveraItemComponent } from './partials/nevera-item/nevera-item.component';
import { CarouselComponent } from './partials/carousel/carousel.component';


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
    NeveraItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
