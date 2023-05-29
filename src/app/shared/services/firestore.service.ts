import { Injectable } from '@angular/core';
import { GoogleAuthProvider, createUserWithEmailAndPassword, Auth, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
import { DocumentData, Firestore, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
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

  /*Devuelve el nombre de un usuario */
  async getNombreUsuario(uid: string) {
    const docRef = doc(this.db, "usuarios", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return (docSnap.data()["nombre"]);
    } else {
      return "Iniciar Sesión";
    }
  }

  /*Sube una nevera a firestore*/
  subirNevera(neve: any) {
    const neveraRef = doc(this.db, 'neveras', neve.idNevera);
    setDoc(neveraRef, neve, { merge: true });
  }

  /*Sube un productoAdmin a firestore*/
  subirProductoAdmin(produ: any) {
    const productoRef = doc(this.db, 'productosAdmin', produ.idProducto);
    setDoc(productoRef, produ, { merge: true });
  }

  /*Sube un productoFam a firestore*/
  subirProductoFam(produ: any) {
    const productoRef = doc(this.db, 'productosFam', produ.idProducto);
    setDoc(productoRef, produ, { merge: true });
  }

  /*Sube un producto a firestore*/
  subirProducto(prod: any) {
    const productoRef = doc(this.db, 'productos', prod.idProducto);
    setDoc(productoRef, prod, { merge: true });
  }

  /*Devuelve una promesa para comprobar si un producto está ya en el cajón*/
  async productoExiste(pfId: string, cId: string, caducicad: any, cantidad: any) {
    let productos: DocumentData[] = [];
    const q = query(collection(this.db, "productos"),
      where("idProductoFam", "==", pfId),
      where("idCajon", "==", cId),
      where("caducicad", "==", caducicad),
      where("cantidad", "==", cantidad));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //console.log(doc.id, " => ", doc.data());

      productos.push(doc.data());
    });
    return (productos);
  }

  // /*Suma un paquete al producto dado y lo guarda en la bd*/
  // sumaPaquete(prod:any,numPaquetes:number=1){    
  //   const productRef = doc(this.db, 'productos', prod.idProducto);
  //   setDoc(productRef, caj, { merge: true });
  // }

  /*Sube un cajón a firestore*/
  subirCajon(caj: any) {
    const cajonRef = doc(this.db, 'cajones', caj.idCajon);
    setDoc(cajonRef, caj, { merge: true });
  }

  async borraNevera(idNevera: string) {
    let exito = false;

    await deleteDoc(doc(this.db, "neveras", idNevera)).then(() =>
      exito = true
    );
    return exito;
  }

  /*Edita una nevera en firestore */
  async editaNevera(idNevera: string, campoActualizar: string, valor: string) {
    let exito = false;
    const referencia = doc(this.db, "neveras", idNevera);

    await updateDoc(referencia, {
      [campoActualizar]: valor
    }).then(() =>
      exito = true
    );
    return exito;
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

  /*Devuelve una promesa para recuperar las neveras de una familia*/
  async listarNeveras(fId: string) {
    let neveras: DocumentData[] = [];
    const q = query(collection(this.db, "neveras"), where("idFamilia", "==", fId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //console.log(doc.id, " => ", doc.data());

      neveras.push(doc.data());
    });
    return (neveras);
  }

  /*Devuelve una promesa para recuperar los cajones de una nevera*/
  async listarCajones(nId: string) {
    let cajones: DocumentData[] = [];
    const q = query(collection(this.db, "cajones"), where("idNevera", "==", nId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      cajones.push(doc.data());
    });
    return (cajones);
  }
  /*Devuelve una promesa para recuperar los productos de una familia*/
  async listarProductosFam(fId: string) {
    let productos: DocumentData[] = [];
    const q = query(collection(this.db, "productosFam"), where("idFamilia", "==", fId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      productos.push(doc.data());
    });

    const querySnapshot2 = await getDocs(collection(this.db, "productosAdmin"));
    querySnapshot2.forEach((doc) => {
      productos.push(doc.data());
    });

    return (productos);
  }

 /*Devuelve una promesa para recuperar los productos de unn cajón*/
 async listarProductos(cId: string) {
  let productos: DocumentData[] = [];
  const q = query(collection(this.db, "productos"), where("idCajon", "==", cId));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    productos.push(doc.data());
  });

  return (productos);
}

  /*Devuelve una promesa para recuperar una nevera en concreto de una familia*/
  async recuperarNevera(nId: string) {
    const docRef = doc(this.db, "neveras", nId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return (docSnap.data());
    } else {
      return 0;
    }
  }

  /*Devuelve una promesa para recuperar una nevera en concreto de una familia*/
  async recuperarCajon(cId: string) {
    const docRef = doc(this.db, "cajones", cId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return (docSnap.data());
    } else {
      return 0;
    }
  }

  /*Borra un cajón en firestore */
  async borraCajon(cId: string) {
    let exito = false;

    await deleteDoc(doc(this.db, "cajones", cId)).then(() =>
      exito = true
    );
    return exito;
  }

  /*Edita un cajón en firestore */
  async editaCajon(cId: string, campoActualizar: string, valor: string) {
    let exito = false;
    const referencia = doc(this.db, "cajones", cId);

    await updateDoc(referencia, {
      [campoActualizar]: valor
    }).then(() =>
      exito = true
    );
    return exito;
  }




}
