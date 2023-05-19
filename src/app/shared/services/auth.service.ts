import { Injectable } from '@angular/core';
import { GoogleAuthProvider, createUserWithEmailAndPassword, Auth, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
import { Firestore, doc, getFirestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Usuario } from '../modelos/usuario';
import { Familia } from '../modelos/familia';
import {v4 as uuidv4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuarioData: any;
  nombre: any = null;
  constructor(
    public auth: Auth = getAuth(),
    public router: Router,
    public db: Firestore = getFirestore(),
  ) {


    /*Guardamos los datos de usuario en localstorage cuando la sesión se inicia y se borran al cerrarla*/
    onAuthStateChanged(auth, (usuario) => {
      if (usuario) {
        this.usuarioData = usuario;
        localStorage.setItem('usuario', JSON.stringify(this.usuarioData));
        JSON.parse(localStorage.getItem('usuario')!);

        localStorage.setItem('username', JSON.stringify(this.nombre));
        JSON.parse(localStorage.getItem('username')!);
      } else {
        localStorage.setItem('usuario', 'null');
        JSON.parse(localStorage.getItem('usuario')!);

        localStorage.setItem('username', 'null');
        JSON.parse(localStorage.getItem('username')!);
      }

      //Se devuelve al inicio 
      this.router.navigate(['inicio']);
    });
  }

  //Inicio de sesión  con email y contraseña
  inicioSesion(email: string, password: string) {

    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  //Registro con email y contraseña
  registrarse(email: string, password: string, nombre: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        /* Se envía el email de verificación*/
        //this.EnviarVerificacion();

        this.nombre = nombre;
        this.setUsuarioFirestore(userCredential.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  // Devuelve true cuando el usuario está logeado y se ha verificado el correo
  isLoogeado(): boolean {
    const user = JSON.parse(localStorage.getItem('usuario')!);
    return user !== null && user.emailVerificado !== false ? true : false;
  }

  // Iniciar sesión con Google
  googleAuth() {
    return this.authInicioSes(new GoogleAuthProvider())
  }

  //Lógica de autenticación para ejecutar proveedores de autenticación
  authInicioSes(provider: any) {
    signInWithPopup(this.auth, provider)
      .then((result) => {
        this.router.navigate(['inicio']);
        this.setUsuarioFirestore(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  /* Guardando datos de usuario en firestore*/
  setUsuarioFirestore(user: any) {
    //const userRef = doc(this.db, 'usuarios', user.uid);


    const datoUsuario: Usuario = {
      uid: user.uid,
      email: user.email,
      nombre: user.displayName || this.nombre,
      fotoURL: user.photoURL,
      emailVerificado: true//user.emailVerified,
    };
    //return setDoc(userRef, datoUsuario, { merge: true });

    this.generaFamilia(datoUsuario);
  }

  generaFamilia(usuario:Usuario) {
    //Creación de id único
    let fId=uuidv4();

    //Creación de familia añadiendo el usuario
    let familia = new Familia(fId);
    familia.addUsuario(usuario);

    let fam = Object.assign({}, familia)

    console.log(familia);
    
    //Adición de familia a la bd
    const familiaRef = doc(this.db, 'familias', fId);
    return setDoc(familiaRef,fam,{merge:true});
  }

  // Cerrar sesion
  cerrarSesion() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem('usuario');
      this.router.navigate(['registro']);
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

}
