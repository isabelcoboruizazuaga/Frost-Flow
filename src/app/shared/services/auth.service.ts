import { Injectable } from '@angular/core';
import { GoogleAuthProvider, createUserWithEmailAndPassword, Auth, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, getAdditionalUserInfo } from '@angular/fire/auth';
import { DocumentData, Firestore, collection, doc, getDocs, getFirestore, query, setDoc, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Usuario } from '../modelos/usuario';
import { Familia } from '../modelos/familia';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuarioData: any;
  nombre: any = null;

/**
 * This function saves user data in local storage when the session starts and deletes it when it
 * ends.
 * @param {Auth} auth - An instance of the Firebase Authentication service.
 * @param {Router} router - The router parameter is an instance of the Angular Router service, which
 * is used for navigating between different views or components in an Angular application. It
 * provides methods for navigating to a specific route, navigating back to the previous route, and
 * navigating to a route with optional parameters.
 * @param {Firestore} db - Firestore instance used to interact with the Firebase Cloud Firestore
 * database.
 */
  constructor(
    public auth: Auth = getAuth(),
    public router: Router,
    public db: Firestore = getFirestore(),
  ) {
  
     /* User data saved in localstorage when login in and deletend when loging out.
     *  When the user status changes the user is redirected to the landing page.
     */
    onAuthStateChanged(auth, (usuario) => {
      if (usuario) {
        this.usuarioData = usuario;
        localStorage.setItem('usuario', JSON.stringify(this.usuarioData));
        JSON.parse(localStorage.getItem('usuario')!);

        localStorage.setItem('username', JSON.stringify(this.nombre));
        JSON.parse(localStorage.getItem('username')!);
      } else {
        this.usuarioData = null;

        localStorage.setItem('usuario', 'null');
        JSON.parse(localStorage.getItem('usuario')!);

        localStorage.setItem('username', 'null');
        JSON.parse(localStorage.getItem('username')!);
      }

      //Se devuelve al inicio 
      this.router.navigate(['inicio']);
    });
  }

  
  /**
   * This function logs in a user with their email and password and navigates them to the "inicio" page
   * if successful, or displays an error message if unsuccessful.
   * @param {string} email - a string representing the email address of the user trying to sign in.
   * @param {string} password - A string representing the password entered by the user trying to sign
   * in.
   */
  inicioSesion(email: string, password: string) {

    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.router.navigate(['inicio']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  /**
   * This function registers a user with their email, password, and name, creates a user with Firebase
   * authentication, and sets the user's information in Firestore.
   * @param {string} email - A string representing the email address of the user who wants to register.
   * @param {string} password - A string representing the password that the user wants to use for their
   * account.
   * @param {string} nombre - string variable representing the name of the user registering.
   */
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

  /* This function checks if the user is logged in and their email has been verified. It retrieves the
  user data from local storage, checks if it is not null and if the email verification status is not
  false, and returns true if both conditions are met, or false otherwise. */
  isLoogeado(): boolean {
    const user = JSON.parse(localStorage.getItem('usuario')!);
    return user !== null && user.emailVerificado !== false ? true : false;
  }

  /**
   * This function returns the result of starting a Google authentication session using the
   * GoogleAuthProvider.
   * @returns The `googleAuth()` function is returning the result of calling the `authInicioSes()`
   * function with a new instance of the `GoogleAuthProvider` class as its argument. The specific
   * return value of `authInicioSes()` is not shown in the code snippet provided.
   */
  googleAuth() {
    return this.authInicioSes(new GoogleAuthProvider())
  }

  /**
   * This function handles the authentication process for a user logging in with a third-party provider
   * and sets the user's information in Firestore if they are a new user.
   * @param {any} provider - The "provider" parameter is an object that represents the authentication
   * provider that the user wants to sign in with. It could be a Google provider, Facebook provider, or
   * any other supported provider. This parameter is passed to the "authInicioSes" function to initiate
   * the sign-in process with the specified
   */
  authInicioSes(provider: any) {
    signInWithPopup(this.auth, provider)
      .then((result) => {
        const isNewUser  = getAdditionalUserInfo(result)?.isNewUser;
        if(isNewUser){
          console.log(isNewUser);
          this.setUsuarioFirestore(result.user);
        }
        this.router.navigate(['inicio']);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  /**
   * This function sets a user's information in Firestore and generates a family for the user.
   * @param {any} user - The "user" parameter is an object that represents a user in Firebase
   * Authentication. It contains information such as the user's unique ID (uid), display name, email,
   * and photo URL.
   */
  setUsuarioFirestore(user: any) {
    const datoUsuario: Usuario = new Usuario(user.uid, user.displayName || this.nombre, user.email, user.photoURL);
    this.generaFamilia(datoUsuario);
  }

  /**
   * The function logs the user out, removes their information from local storage, and navigates them
   * to the registration page.
   * @returns The `cerrarSesion()` function is returning a Promise that resolves when the user signs
   * out successfully. It also removes the user's information from the local storage and navigates to
   * the 'registro' route using the Angular router.
   */
  cerrarSesion() {
    return this.auth.signOut().then(() => {
      localStorage.removeItem('usuario');
      this.router.navigate(['registro']);
    });
  }

  /**
   * This function returns the current user data.
   * @returns the value of the property `usuarioData` of the object that the function is a method of.
   */
  getUsuarioActual() {
    return this.usuarioData;
  }

  /**
   * This function generates a unique ID, creates a family object with a user added to it, formats the
   * objects for storage, and adds the user and family to a database.
   * @param {Usuario} usuario - The parameter "usuario" is an object of type "Usuario" which contains
   * information about a user.
   * @returns the result of the `setDoc` function, which is a Promise that resolves when the document
   * has been successfully written to the database.
   */
  generaFamilia(usuario: Usuario) {
    //Creación de id único
    let fId = uuidv4();

    //Creación de familia añadiendo el usuario
    let familia = new Familia(fId);
    usuario.setFamiliaID(fId);

    //Formato de los objetos para almacenarlos
    let usu = Object.assign({}, usuario);
    let fam = Object.assign({},familia);

    //Adición de usuario a la bd
    const usuarioaRef = doc(this.db, 'usuarios', usuario.uid);
    setDoc(usuarioaRef, usu, { merge: true });

    //Adición de familia a la bd
    const familiaRef = doc(this.db, 'familias', fId);
    return setDoc(familiaRef, fam, { merge: true });
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
