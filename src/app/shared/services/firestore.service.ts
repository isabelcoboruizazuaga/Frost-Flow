import { Injectable } from '@angular/core';
import { GoogleAuthProvider, createUserWithEmailAndPassword, Auth, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
import { DocumentData, Firestore, collection, doc, getDocs, getFirestore, query, setDoc, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Usuario } from '../modelos/usuario';
import { Familia } from '../modelos/familia';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  storage = getStorage();
  constructor(
    public auth: Auth = getAuth(),
    public router: Router,
    public db: Firestore = getFirestore(),
  ) {
}

/*Sube una nevera a firestore*/
subirNevera(neve:any){    
  const neveraRef = doc(this.db, 'neveras', neve.idNevera);
  setDoc(neveraRef, neve, { merge: true });
}

/*Sube una imagen a firestore*/
subirFoto(file: File, ruta: string) {
  const storageRef = ref(this.storage, ruta);

  uploadBytes(storageRef, file).then((snapshot) => {
    console.log('Subido a ' + ruta);
  });
}

getFoto(ruta:string){
  const storageRef = ref(this.storage, ruta);
  let urlfoto=""

  getDownloadURL(storageRef).then(url => urlfoto=url );

  return "pepe";
}


/*Devuelve una promesa para recuperar el id de familia de un usuario*/
async recuperarFamiliaID(uID: string) {
  let fId = "";
  const q = query(collection(this.db, "usuarios"), where("uid", "==", uID));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    //console.log(doc.id, " => ", doc.data());

    fId = doc.data()['familiaId'];
  });
  return (fId);
}

/*Devuelve una promesa para recuperar el id de familia de un usuario*/
async listarNeveras(fId: string) {
  let neveras: DocumentData[]=[];
  const q = query(collection(this.db, "neveras"), where("idFamilia", "==", fId));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    //console.log(doc.id, " => ", doc.data());

    neveras.push(doc.data());
  });
  return (neveras);

}

}
