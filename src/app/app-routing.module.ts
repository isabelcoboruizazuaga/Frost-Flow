import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CabeceraComponent } from './cabecera/cabecera.component';


const routes: Routes=[
  {path: '', component: LandingPageComponent},
  {path: 'inicio', component: LandingPageComponent},
  {path: 'cabecera', component: CabeceraComponent},
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
