import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { FamiliaComponent } from './familia/familia.component';
import { NeverasComponent } from './neveras/neveras.component';
import { NeveraComponent } from './nevera/nevera.component';
import { CajonComponent } from './cajon/cajon.component';
import { SesionRegistroComponent } from './sesion-registro/sesion-registro.component';
import { RegistroComponent } from './partials/registro/registro.component';


const routes: Routes=[
  {path: '', component: LandingPageComponent},
  {path: 'inicio', component: LandingPageComponent},
  {path: 'cabecera', component: CabeceraComponent},
  {path: 'registro', component: SesionRegistroComponent},
  {path: 'sesion',component:SesionRegistroComponent},
  {path: 'familia', component: FamiliaComponent},
  {path: 'neveras', component: NeverasComponent},
  {path: 'nevera/:id', component: NeveraComponent},
  {path: 'cajon/:id', component: CajonComponent},
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
