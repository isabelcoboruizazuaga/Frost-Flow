import { Injectable, NgZone } from '@angular/core';
import { Usuario } from '../services/usuario';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    usuarioData: any; 

    constructor(
      public afs: AngularFirestore, //Servicio de Firestore
      public afAuth: AngularFireAuth, // Sevicio de Firebase auth
      public router: Router,
      public ngZone: NgZone
    ) {

      /*Guardamos los datos de usuario en localstorage cuando la sesión se inicia y se borran al cerrarla*/
      this.afAuth.authState.subscribe((usuario) => {
        if (usuario) {
          this.usuarioData = usuario;
          localStorage.setItem('usuario', JSON.stringify(this.usuarioData));
          JSON.parse(localStorage.getItem('usuario')!);
        } else {
          localStorage.setItem('usuario', 'null');
          JSON.parse(localStorage.getItem('usuario')!);
        }
      });
    }

    //Inicio de sesión  con email y contraseña
    InicioSesion(email: string, password: string) {
      return this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.SetUsuarioData(result.user);
          this.afAuth.authState.subscribe((user) => {
            if (user) {
              this.router.navigate(['inicio']);
            }
          });
        })
        .catch((error) => {
          window.alert(error.message);
        });
    }

    //Registro con email y contraseña
    Registrarse(email: string, password: string) {
      return this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          /* Se envía el email de verificación*/
          this.EnviarVerificacion();
          this.SetUsuarioData(result.user);
        })
        .catch((error) => {
          window.alert(error.message);
        });
    }

    //Enviar email de verificación
    EnviarVerificacion() {
      return this.afAuth.currentUser
        .then((u: any) => u.sendEmailVerification())
        .then(() => {
          this.router.navigate(['verify-email-address']);
        });
    }
    // Reset Forggot password
    ForgotPassword(passwordResetEmail: string) {
      return this.afAuth
        .sendPasswordResetEmail(passwordResetEmail)
        .then(() => {
          window.alert('Password reset email sent, check your inbox.');
        })
        .catch((error) => {
          window.alert(error);
        });
    }
    // Devuelve true cuando el usuario está logeado y se ha verificado el correo
    get isLoogeado(): boolean {
      const user = JSON.parse(localStorage.getItem('usuario')!);
      return user !== null && user.emailVerificado !== false ? true : false;
    }

    // Iniciar sesión con Google
    GoogleAuth() {
      return this.AuthInicioSes(new auth.GoogleAuthProvider()).then((res: any) => {
        this.router.navigate(['inicio']);
      });
    }

    //Lógica de autenticación para ejecutar proveedores de autenticación
    AuthInicioSes(provider: any) {
      return this.afAuth
        .signInWithPopup(provider)
        .then((result) => {
          this.router.navigate(['inicio']);
          this.SetUsuarioData(result.user);
        })
        .catch((error) => {
          window.alert(error);
        });
    }

    /* Guardando datos de usuario en firestore*/
    SetUsuarioData(user: any) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(
        `usuarios/${user.uid}`
      );
      const datoUsuario: Usuario = {
        uid: user.uid,
        email: user.email,
        nombre: user.displayName,
        fotoURL: user.photoURL,
        emailVerificado: user.emailVerified,
      };
      return userRef.set(datoUsuario, {
        merge: true,
      });
    }

    // Cerrar sesion
    CerrarSesion() {
      return this.afAuth.signOut().then(() => {
        localStorage.removeItem('usuario');
        this.router.navigate(['registro']);
      });
    }
  }

