
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

/* The CabeceraComponent class is an Angular component that handles the header section of a web
application and includes functionality for user authentication and displaying the user's name. */
export class CabeceraComponent {
  usuario: any;
  nombre = "Iniciar Sesión";

  /**
   * The constructor initializes the router, authService, firestoreService, and auth, and listens for
   * changes in the user's authentication state to update the user's name displayed in the header
   * section of the web application.
   * @param {Router} router - an instance of the Angular Router service, which is used for navigating
   * between different routes in the application.
   * @param {AuthService} authService - An instance of the AuthService class, which is likely used to
   * handle authentication-related functionality such as logging in, logging out, and registering
   * users.
   * @param {FirestoreService} firestoreService - FirestoreService is a service that provides methods
   * for interacting with the Firestore database in Firebase. It is used to perform CRUD (Create, Read,
   * Update, Delete) operations on the database, such as adding new data, retrieving existing data,
   * updating data, and deleting data.
   * @param {Auth} auth - The `auth` parameter is an instance of the Firebase Authentication library's
   * `Auth` class. It is used to authenticate users and manage their authentication state. In this
   * code, it is being passed as a parameter to the `onAuthStateChanged` method to listen for changes
   * in the user's authentication state
   */
  constructor(private router: Router, public authService: AuthService, public firestoreService: FirestoreService, public auth: Auth = getAuth()) {

    /* `onAuthStateChanged` is a method provided by the Firebase Authentication library that listens for
   changes in the user's authentication state. In this case, it is being used to update the user's
   name displayed in the header section of the web application whenever the user logs in or logs
   out. */
    onAuthStateChanged(auth, () => {
      this.actualizarNombre();
    })
  }

  /**
   * The ngOnInit function calls the actualizarNombre function.
   */
  ngOnInit() {
    this.actualizarNombre()
  }

  /**
   * This function navigates the user to the registration page.
   */
  adminSesion() {
    this.router.navigate(['/registro']);
  }

  /**
   * The function "cerrarSesion" logs out the user and changes the displayed name to "Iniciar Sesión".
   */
  cerrarSesion() {
    this.authService.cerrarSesion();

    this.nombre = "Iniciar Sesión";
  }

  /**
   * This function updates the name of a user by retrieving their ID and using it to fetch their name
   * from a Firestore database.
   */
  actualizarNombre() {
    //Se obtiene el id de usuario actual
    this.usuario = JSON.parse(localStorage.getItem('usuario')!);
    let uid = this.usuario.uid;

    this.firestoreService.getNombreUsuario(uid).then(result => {
      //Se obtiene solo el primer nombre
      let soloNombre = result.replace(/ .*/, '');
      this.nombre = soloNombre;
    })
  }

}