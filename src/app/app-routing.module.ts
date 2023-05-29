import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { RegistroComponent } from './partials/registro/registro.component';
import { FamiliaComponent } from './familia/familia.component';
import { NeverasComponent } from './neveras/neveras.component';
import { NeveraComponent } from './nevera/nevera.component';
import { CajonComponent } from './cajon/cajon.component';
import { SesionRegistroComponent } from './sesion-registro/sesion-registro.component';
import { AddProductosAdminComponent } from './add-productos-admin/add-productos-admin.component';
import { ProductosFamComponent } from './productos-fam/productos-fam.component';


const routes: Routes=[
  {path: '', component: LandingPageComponent},
  {path: 'inicio', component: LandingPageComponent},
  {path: 'cabecera', component: CabeceraComponent},
  {path: 'registro', component: SesionRegistroComponent},
  {path: 'familia', component: FamiliaComponent},
  {path: 'neveras', component: NeverasComponent},
  {path: 'nevera/:id', component: NeveraComponent},
  {path: 'cajon/:id', component: CajonComponent},
  {path: 'productos/:id', component: ProductosFamComponent},
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
