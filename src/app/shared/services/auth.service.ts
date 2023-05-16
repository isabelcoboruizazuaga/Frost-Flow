import { Injectable } from '@angular/core';
import {
  Auth,
  getAuth,
  sendEmailVerification,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  updatePassword,
  sendPasswordResetEmail,
  updateEmail,
} from '@angular/fire/auth';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import {
  Firestore,
  setDoc,
  doc,
  getDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Usuario } from './usuario';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usuarioData: any;

  public isLogged: boolean = false;
  public userID: string = '';
  public userEmail: string = '';
  public userPhoto: string = '';
  public username: string = '';
  public failedError: string = '';
  public isTrainer: boolean = false;
  public isAdmin: boolean = false;
  public userExists: boolean = false;
  public userChecked: boolean = false;
  public thirdPartyLogin: boolean = false;


  constructor(
    public auth: Auth = getAuth(),
    public router: Router,
    public afs: Firestore//Servicio de Firestore
  ) {

    /*Guardamos los datos de usuario en localstorage cuando la sesión se inicia y se borran al cerrarla*/
    onAuthStateChanged(auth, (usuario) => {
      if (usuario) {
        this.usuarioData = usuario;
        localStorage.setItem('usuario', JSON.stringify(this.usuarioData));
        JSON.parse(localStorage.getItem('usuario')!);
      } else {
        localStorage.setItem('usuario', 'null');
        JSON.parse(localStorage.getItem('usuario')!);
      }

      //Se devuelve al inicio 
      this.router.navigate(['inicio']);
    });
  }

  //Inicio de sesión  con email y contraseña
  InicioSesion(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        this.SetUsuarioData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  //Registro con email y contraseña
  Registrarse(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((result) => {
        /* Se envía el email de verificación*/
        //this.EnviarVerificacion();
        this.SetUsuarioData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  /* //Enviar email de verificación
   EnviarVerificacion() {
     sendEmailVerification(auth.currentUser)
       .then((u: any) => u.sendEmailVerification())
       .then(() => {
         this.router.navigate(['verify-email-address']);
       });
   }
   // Reset Forggot password
   ForgotPassword(passwordResetEmail: string) {
     return this.auth
       .sendPasswordResetEmail(passwordResetEmail)
       .then(() => {
         window.alert('Password reset email sent, check your inbox.');
       })
       .catch((error) => {
         window.alert(error);
       });
   }*/
  // Devuelve true cuando el usuario está logeado y se ha verificado el correo
  get isLoogeado(): boolean {
    const user = JSON.parse(localStorage.getItem('usuario')!);
    return user !== null && user.emailVerificado !== false ? true : false;
  }

  // Iniciar sesión con Google
  GoogleAuth() {
    return this.AuthInicioSes(new GoogleAuthProvider())
  }

  //Lógica de autenticación para ejecutar proveedores de autenticación
  AuthInicioSes(provider: any) {
    signInWithPopup(this.auth, provider)
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
    const userRef = doc(this.afs, 'usuarios', user.uid);


    const datoUsuario: Usuario = {
      uid: user.uid,
      email: user.email,
      nombre: user.displayName,
      fotoURL: user.photoURL,
      emailVerificado: true//user.emailVerified,
    };
    return setDoc(userRef, datoUsuario, { merge: true });
  }

  // Cerrar sesion
  CerrarSesion() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem('usuario');
      this.router.navigate(['registro']);
    });
  }
}

