import { Component, EventEmitter, NgZone, Output } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { FirestoreService } from '../shared/services/firestore.service';
import { Router } from '@angular/router';
import { Auth, getAuth, onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss'],
})
export class CabeceraComponent {
  usuario: any;
  nombre = "Iniciar Sesión";
  constructor(private router: Router, public authService: AuthService, public firestoreService: FirestoreService, public auth: Auth = getAuth()) {
    //this.router.navigate(['/nevera', 'Nevera 1']);


    onAuthStateChanged(auth, () => {
      this.actualizarNombre();
    })
  }

  ngOnInit() {
    this.actualizarNombre()
  }

  adminSesion() {
    this.router.navigate(['/registro']);
  }

  cerrarSesion() {
    this.authService.cerrarSesion();

    this.nombre = "Iniciar Sesión";
  }

  actualizarNombre() {
    //Se obtiene el id de usuario actual
    this.usuario = JSON.parse(localStorage.getItem('usuario')!);
    let uid = this.usuario.uid;

    this.firestoreService.getNombreUsuario(uid).then(result => {
        this.nombre = result;
      console.log(this.nombre)
    })
  }

}