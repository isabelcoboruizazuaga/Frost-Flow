import { Injectable } from '@angular/core';
import { GoogleAuthProvider, createUserWithEmailAndPassword, Auth, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
import { DocumentData, Firestore, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { deleteObject, getStorage, ref, } from '@angular/fire/storage';

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

  /*Devuelve la familia de un usuario */
  async getFamiliaUsuario(uid: string) {
    const docRef = doc(this.db, "usuarios", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return (docSnap.data()["familiaId"]);
    } else {
      return "";
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

  /*Borra un producto*/
  async borraProducto(idProducto: string) {
    let exito = false;

    await deleteDoc(doc(this.db, "productos", idProducto)).then(() => {
      exito = true
    });
    return exito;
  }
  /*Borra un productoFam en firestore */
  async borraProductoFam(pId: string) {
    let exito = false;

    //Elimino el prod familia
    await deleteDoc(doc(this.db, "productosFam", pId)).then(() => {
      //Elimino todos los produzcos que salgan de él
      this.borraProductosConIDFam(pId).then(() => {
        //Elimino su imagen
        if (this.borrarImagen('productos/' + pId) == true) {
          exito = true
        }
      })
    });
    return exito;
  }

  /*Borra todos los prodictos que tengan el mismo id fe producto familia */
  async borraProductosConIDFam(pfId: string) {
    const q = query(collection(this.db, "productos"), where("idProductoFam", "==", pfId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((producto) => {
      this.borraProducto(producto.data()['idProducto']);
    });
  }

  /*Borrar imagen*/
  borrarImagen(referencia: string) {
    let exito = false;
    let refe = ref(this.storage, referencia);
    deleteObject(refe).then(() => {
      exito = true;
    }).catch((error) => {
      exito = false;
    });
    return exito;
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

    await deleteDoc(doc(this.db, "neveras", idNevera)).then(() => {
      //Elimino su imagen
      if (this.borrarImagen('neveras/' + idNevera) == true) {
        exito = true
      }
    });
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

    await deleteDoc(doc(this.db, "cajones", cId)).then(() => {
      //Elimino su imagen
      if (this.borrarImagen('cajones/' + cId) == true) {
        exito = true
      }
    })
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

  /*Cambia a un usuario de familia */
  async cambiaFamiliaUsuario(uId: string, fId: string, nuevaFamilia: string,moverNeveras:boolean) {
    let exito = false;
    const referencia = doc(this.db, "usuarios", uId);

    //Cambiamos la familia en el objeto usuario
    await updateDoc(referencia, {
      "familiaId": nuevaFamilia
    }).then(() => {
      if (moverNeveras==true) {
        //Actualizamos las neveras de la familia para que pertenezcan a la nueva
        this.cambiarFamiliaNeveras(fId, nuevaFamilia).then((exit) => (exit == 0) ? exito = true : exito = false)
      }
    });
    return exito;
  }

  /*Devuelve una promesa para recuperar las neveras de una familia*/
  async cambiarFamiliaNeveras(fId: string, nFid: string) {
    let exito = 0;
    const q = query(collection(this.db, "neveras"), where("idFamilia", "==", fId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.editarFamiliaNevera(doc.data(), nFid).then((exit) => exito = exito + exit)
    });
    /*Si exito es 0 ha ido bien, si es 1 o 2 algo ha fallado*/
    return exito;
  }

  /* Cambia el id de familia de una nevera */
  async editarFamiliaNevera(nevera: any, nFId: string) {
    let exito = 1;
    const referencia = doc(this.db, "neveras", nevera.idNevera);

    //Cambiamos la familia en el objeto nevera
    await updateDoc(referencia, {
      "idFamilia": nFId
    }).then(() => {
      exito = 0
    });
    return exito;
  }

  /*Determina si una familia existe en la base de datos */
  async familiaExiste(fId: string) {
    const referencia = doc(this.db, "familias", fId);

    const docSnap = await getDoc(referencia);
    if (docSnap.exists()) {
      return true;
    } else {
      return false;
    }
  }

}
