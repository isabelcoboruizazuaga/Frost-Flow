import { Injectable } from '@angular/core';
import { Auth, getAuth } from '@angular/fire/auth';
import { DocumentData, Firestore, OrderByDirection, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, orderBy, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { deleteObject, getStorage, ref, } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  storage = getStorage();

  /**
   * This is a constructor function that initializes the auth, router, and db properties with default
   * values or values passed as arguments.
   * @param {Auth} auth - The `auth` parameter is an instance of the `Auth` class, which is used for
   * authentication and user management in Firebase. It is used to authenticate users, manage user
   * accounts, and handle user sessions.
   * @param {Router} router - The router parameter is an instance of the Angular Router service, which
   * is used for navigating between different views or components in an Angular application. It provides
   * methods for navigating to a specific route, navigating back to the previous route, and more.
   * @param {Firestore} db - db is a parameter that represents an instance of the Firestore database.
   * Firestore is a NoSQL document database that is used to store and manage data for web and mobile
   * applications. In this code snippet, the db parameter is initialized with the getFirestore()
   * function, which returns an instance of the Firestore database.
   */
  constructor(
    public auth: Auth = getAuth(),
    public router: Router,
    public db: Firestore = getFirestore(),
  ) {
  }

  /**
   * This is an asynchronous function that retrieves the name of a user from a Firestore database based
   * on their unique ID, and returns either the name or a default "Iniciar Sesión" message if the user
   * does not exist.
   * @param {string} uid - The uid parameter is a string that represents the unique identifier of a user
   * in a database. In this case, it is used to retrieve the name of a user from a "usuarios" collection
   * in the database.
   * @returns {string} If the document with the specified `uid` exists in the "usuarios" collection, the function
   * will return the value of the "nombre" field in that document. Otherwise, it will return the string
   * "Iniciar Sesión".
   */
  async getNombreUsuario(uid: string) {
    const docRef = doc(this.db, "usuarios", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return (docSnap.data()["nombre"]);
    } else {
      return "Iniciar Sesión";
    }
  }

  /**
   * This function retrieves the family ID of a user from a Firestore database using their UID.
   * @param {string} uid - The uid parameter is a string that represents the unique identifier of a user
   * in a database.
   * @returns {string} the value of the "familiaId" field from the document with the specified "uid" in the
   * "usuarios" collection. If the document does not exist, an empty string is returned.
   */
  async getFamiliaUsuario(uid: string) {
    const docRef = doc(this.db, "usuarios", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return (docSnap.data()["familiaId"]);
    } else {
      return "";
    }
  }

  /**
   * The function uploads a document in a Firestore database with the data of a fridge object.
   * @param {any} neve - Nevera which we are uploading.
   */
  subirNevera(neve: any) {
    const neveraRef = doc(this.db, 'neveras', neve.idNevera);
    setDoc(neveraRef, neve, { merge: true });
  }

  /**
   * This function uploads a product in the "productosAdmin" collection in a Firestore database.
   * @param {any} produ - Object 'ProductoAdmin' to upload to upload.
   */
  subirProductoAdmin(produ: any) {
    const productoRef = doc(this.db, 'productosAdmin', produ.idProducto);
    setDoc(productoRef, produ, { merge: true });
  }

  /**
   * This function updates a product in a Firestore collection called "productosFam".
   * @param {any} produ - Object 'ProductoFamilia' to upload
   */
  subirProductoFam(produ: any) {
    const productoRef = doc(this.db, 'productosFam', produ.idProducto);
    setDoc(productoRef, produ, { merge: true });
  }

  /**
   * This function updates a product in a Firestore database.
   * @param {any} prod - Object 'Producto' to being stored
   */
  subirProducto(prod: any) {
    const productoRef = doc(this.db, 'productos', prod.idProducto);
    setDoc(productoRef, prod, { merge: true });
  }

  /**
   * This is an asynchronous function that deletes a product document from a database using its ID and
   * returns a boolean indicating whether the deletion was successful or not.
   * @param {string} idProducto - A string representing the ID of the product to be deleted from the
   * "productos" collection in the database.
   * @returns {boolean} - The `borraProducto` function returns a boolean value indicating whether the deletion of
   * the document with the specified `idProducto` was successful or not.
   */
  async borraProducto(idProducto: string) {
    let exito = false;

    await deleteDoc(doc(this.db, "productos", idProducto)).then(() => {
      exito = true
    });
    return exito;
  }

  /**
   * This function deletes a product family and all associated products and images.
   * @param {string} pId - string parameter representing the ID of the product family to be deleted.
   * @returns {boolean} - A boolean value indicating whether the deletion of the product family and its associated
   * products and image was successful or not.
   */
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

  /**
   * This function deletes all products with a specific family ID from the Firestore database.
   * @param {string} pfId - pfId is a string parameter representing the ID of a product family. The
   * function uses this ID to query the "productos" collection in the database and retrieve all products
   * that belong to this family. It then calls the "borraProducto" function to delete each of these
   * products.
   */
  async borraProductosConIDFam(pfId: string) {
    const q = query(collection(this.db, "productos"), where("idProductoFam", "==", pfId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((producto) => {
      this.borraProducto(producto.data()['idProducto']);
    });
  }

  /**
   * This TypeScript function deletes an image from storage and returns a boolean indicating whether
   * the deletion was successful or not.
   * @param {string} referencia - string - a reference to the image that needs to be deleted from the
   * storage.
   * @returns {boolean} - a boolean value indicating whether the deletion of the image was successful or not.
   * However, the value returned may not be accurate as the deletion operation is asynchronous and the
   * `exito` variable may not have been updated by the time the function returns.
   */
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

  /**
   * This function checks if a product exists in a database based on its product family ID, drawer ID,
   * expiration date, and quantity.
   * @param {string} pfId - The ID of the product family.
   * @param {string} cId - cId likely stands for "cajon ID", which is a unique identifier for a
   * specific drawer or compartment where a product is stored.
   * @param {any} caducicad - It is a variable that represents the expiration date of a product.
   * @param {any} cantidad - The parameter "cantidad" represents the quantity of a product. It is used
   * in the query to check if there is a product with the specified quantity in the database.
   * @returns The function `productoExiste` returns an array of `DocumentData` objects that match the
   * specified query parameters.
   */
  async productoExiste(pfId: string, cId: string, caducicad: any, cantidad: any) {
    let productos: DocumentData[] = [];
    const q = query(collection(this.db, "productos"),
      where("idProductoFam", "==", pfId),
      where("idCajon", "==", cId),
      where("caducicad", "==", caducicad),
      where("cantidad", "==", cantidad));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      productos.push(doc.data());
    });
    return (productos);
  }

  /**
   * This function updates a document in a Firestore database with the data of a given "cajón" object.
   * @param {any} caj - The parameter "caj" is an object 'cajon'
   */
  subirCajon(caj: any) {
    const cajonRef = doc(this.db, 'cajones', caj.idCajon);
    setDoc(cajonRef, caj, { merge: true });
  }

  /**
   * This is an asynchronous function that deletes a document from a Firestore database and its
   * corresponding image.
   * @param {string} idNevera - A string representing the ID of a "nevera" (refrigerator) document in a
   * Firestore database.
   * @returns {boolean} - a boolean value indicating whether the deletion of a document and its corresponding image
   * was successful or not.
   */
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

  /**
   * This is an async function that updates a specific field of a document in a Firestore database
   * collection for a given fridge ID.
   * @param {string} idNevera - a string representing the ID of a "nevera" (refrigerator) document in a
   * Firestore database.
   * @param {string} campoActualizar - campoActualizar is a string parameter that represents the name of
   * the field to be updated in a Firestore document.
   * @param {string} valor - valor is a string parameter that represents the new value to be updated for
   * the specified field (campoActualizar) in the document with the given id (idNevera) in the "neveras"
   * collection.
   * @returns {boolean} - a boolean value indicating whether the update operation was successful or not.
   */
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

  /**
   * This function retrieves the family ID associated with a given user ID from a Firestore database.
   * @param {string} uID - a string representing the user ID to be used in the database query.
   * @returns {string} - The function `recuperarFamiliaID` is returning a string value which represents the `fId`
   * (family ID) of a user with the given `uID` (user ID).
   */
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

  /**
   * This function retrieves a list of refrigerators associated with a specific family ID from a
   * Firestore database.
   * @param {string} fId - fId is a string parameter that represents the ID of a family. This function
   * uses the ID to query a collection of "neveras" (refrigerators) and returns an array of
   * DocumentData objects that match the specified family ID.
   * @returns {string} The function `listarNeveras` is returning an array of `DocumentData` objects representing
   * the neveras (refrigerators) that belong to a specific family, identified by the `fId` parameter.
   */
  async listarNeveras(fId: string) {
    let neveras: DocumentData[] = [];
    const q = query(collection(this.db, "neveras"), where("idFamilia", "==", fId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      neveras.push(doc.data());
    });
    return (neveras);
  }

  /**
    * This function retrieves a list of documents from a Firestore collection based on a specific query
    * and returns them as an array.
    * @param {string} nId - nId is a string parameter that represents the ID of a refrigerator. The
    * function uses this parameter to query the database and retrieve all the "cajones" (drawers) that
    * belong to the specified refrigerator.
    * @returns {Array} - The function `listarCajones` returns an array of `DocumentData` objects representing the
    * cajones (drawers) that belong to a specific nevera (fridge) identified by the `nId` parameter.
    */
  async listarCajones(nId: string) {

    let cajones: DocumentData[] = [];
    const q = query(collection(this.db, "cajones"), where("idNevera", "==", nId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      cajones.push(doc.data());
    });
    return (cajones);
  }

  /**
   * This function retrieves a list of products based on a given family ID by querying two collections
   * in a Firestore database.
   * @param {string} fId - string parameter representing the ID of a family of products.
   * @returns {Array} - an array of DocumentData objects that represent the products belonging to a certain
   * family (identified by the fId parameter) and all the products in the "productosAdmin" collection.
   */
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

  /**
   * This is an async function that lists products based on a given cajon ID, order and direction.
   * @param {string} cId - a string representing the ID of a "cajon" (drawer) in a collection of
   * products.
   * @param {string} orden - a string representing the field to order the products by (e.g. "nombre",
   * "precio", "fecha").
   * @param {OrderByDirection | undefined} sentido - The "sentido" parameter is an optional parameter
   * that specifies the direction of the ordering. It can be either "asc" for ascending order or "desc"
   * for descending order. If it is not provided, the default value is ascending order.
   * @returns {Array}- an array of DocumentData objects representing the products that match the given cId and
   * are sorted by the given orden and sentido parameters.
   */
  async listarProductos(cId: string, orden: string, sentido: OrderByDirection | undefined) {
    let productos: DocumentData[] = [];
    console.log(orden)
    const q = query(collection(this.db, "productos"), where("idCajon", "==", cId), orderBy(orden, sentido));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      productos.push(doc.data());
    });

    return (productos);
  }

 /**
  * This function retrieves a list of users from a specific family ID in a Firestore database.
  * @param {string} fId - fId is a string parameter that represents the ID of a family. The function
  * uses this parameter to query the "usuarios" collection in the database and retrieve all the
  * documents that have a "familiaId" field matching the provided fId value.
  * @returns {Array} The function `listarFamiliares` returns an array of `DocumentData` objects representing
  * the users that belong to a specific family, identified by the `fId` parameter.
  */
  async listarFamiliares(fId: string) {
    let usuarios: DocumentData[] = [];
    const q = query(collection(this.db, "usuarios"), where("familiaId", "==", fId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      usuarios.push(doc.data());
    });

    return (usuarios);
  }

  /**
   * This is an asynchronous function that retrieves data from a Firestore document with a given ID and
   * returns the data if it exists, or 0 if it does not.
   * @param {string} nId - nId is a string parameter that represents the ID of a "nevera" document in a
   * Firestore database.
   * @returns {Object} - If the document with the specified ID exists in the "neveras" collection, the function
   * will return the nevera searched. Otherwise, it will return 0.
   */
  async recuperarNevera(nId: string) {
    const docRef = doc(this.db, "neveras", nId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return (docSnap.data());
    } else {
      return 0;
    }
  }

  /**
   * This function retrieves data from a Firestore document with a given ID and returns it, or returns
   * 0 if the document does not exist.
   * @param {string} cId - cId is a string parameter that represents the ID of a "cajón" (drawer)
   * document in a Firestore database.
   * @returns {Object} - It returns the cajon if it exists or the value 0 if it does not exist
   */
  async recuperarCajon(cId: string) {
    const docRef = doc(this.db, "cajones", cId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return (docSnap.data());
    } else {
      return 0;
    }
  }
  
  /**
   * This is an asynchronous function that deletes a document from a Firestore database and its
   * corresponding image.
   * @param {string} cId - cId is a string parameter that represents the ID of a "cajón" (drawer)
   * document in a Firestore database. The function uses this ID to delete the document and its
   * associated image.
   * @returns {boolean} - a boolean value indicating whether the deletion of the document and its associated image
   * was successful or not.
   */
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

 /**
  * This is an async function that updates a specific field in a document in a Firestore database
  * collection.
  * @param {string} cId - a string representing the ID of the "cajón" (drawer) to be edited.
  * @param {string} campoActualizar - campoActualizar is a string parameter that represents the name of
  * the field that needs to be updated in the Firestore document.
  * @param {string} valor - The value that will be updated in the specified field of the document with
  * the given cId.
  * @returns {boolean} - a boolean value indicating whether the update operation was successful or not.
  */
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

 /**
  * This function changes the family of a user and optionally moves their products and refrigerators to
  * the new family.
  * @param {string} uId - string variable representing the user ID
  * @param {string} fId - The ID of the current family that the user belongs to.
  * @param {string} nuevaFamilia - A string representing the new family that the user will belong to
  * after the function is executed.
  * @param {boolean} moverNeveras - A boolean value that determines whether or not to move the
  * refrigerators associated with the user to the new family. If it is true, the function will call the
  * methods to update the products and refrigerators associated with the user's old family to the new
  * family. If it is false, only the user will be moved
  * @returns {boolean} - a boolean value indicating whether the operation was successful or not.
  */
  async cambiaFamiliaUsuario(uId: string, fId: string, nuevaFamilia: string, moverNeveras: boolean) {
    let exito = false;
    const referencia = doc(this.db, "usuarios", uId);

    //Cambiamos la familia en el objeto usuario
    await updateDoc(referencia, {
      "familiaId": nuevaFamilia
    }).then(() => {
      if (moverNeveras == true) {
        //Actualizamos los productos de la familia para que pertenezcan a la nueva
        this.cambiarFamiliaProductos(fId, nuevaFamilia).then((exit) => {
          (exit == 0) ? exito = true : exito = false;
          //Actualizamos las neveras de la familia para que pertenezcan a la nueva
          this.cambiarFamiliaNeveras(fId, nuevaFamilia).then((exit) => (exit == 0) ? exito = true : exito = false)
        })
      }
    });
    return exito;
  }

 /**
  * This function changes the family ID of all refrigerators with a given family ID and returns a
  * success or failure status.
  * @param {string} fId - a string representing the ID of the current family of refrigerators that need
  * to be updated.
  * @param {string} nFid - The new family ID to which the refrigerators will be assigned.
  * @returns {number} -a number that indicates whether the operation was successful or not. If the value of
  * `exito` is 0, it means that the operation was successful. If the value is 1 or 2, it means that
  * something went wrong.
  */
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

  /**
   * This is an async function that updates the family ID of a fridge object in a Firestore database.
   * @param {any} nevera - an object representing a fridge, containing an "idNevera" property
   * @param {string} nFId - nFId is a string parameter that represents the ID of the family that the
   * user wants to assign to a refrigerator.
   * @returns {number} - a number, either 1 or 0 depending on whether the update operation was successful or not.
   */
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

  /**
   * This is an async function that changes the family ID of products in a collection and returns a
   * success or failure status.
   * @param {string} fId - A string representing the ID of the current family of products.
   * @param {string} nFid - The new family ID to which the products will be changed.
   * @returns {number} - a number that indicates whether the operation was successful or not. If the value of
   * `exito` is 0, it means that the operation was successful. If the value is 1 or 2, it means that
   * something went wrong.
   */
  async cambiarFamiliaProductos(fId: string, nFid: string) {
    let exito = 0;
    const q = query(collection(this.db, "productosFam"), where("idFamilia", "==", fId));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.editarFamiliaProducto(doc.data(), nFid).then((exit) => exito = exito + exit)
    });
    /*Si exito es 0 ha ido bien, si es 1 o 2 algo ha fallado*/
    return exito;
  }

  /**
   * This is an async function that edits the family of a product in a database and returns a success
   * status.
   * @param {any} producto - It is an object that represents a product and contains information such as
   * its ID, name, description, price, and the ID of the family it belongs to.
   * @param {string} nFId - nFId is a string parameter representing the new family ID that the product
   * will be updated to.
   * @returns {number} - a number, either 1 or 0 depending on whether the update operation was successful or not.
   */
  async editarFamiliaProducto(producto: any, nFId: string) {
    let exito = 1;
    const referencia = doc(this.db, "productosFam", producto.idProducto);

    //Cambiamos la familia en el objeto nevera
    await updateDoc(referencia, {
      "idFamilia": nFId
    }).then(() => {
      exito = 0
    });
    return exito;
  }


  /**
   * This function checks if a family with a specific ID exists in a collection called "familias".
   * @param {string} fId - fId is a string parameter that represents the ID of a family document in a
   * Firestore database.
   * @returns {boolean} - The function `familiaExiste` returns a boolean value (`true` or `false`) depending on
   * whether a document with the specified `fId` exists in the "familias" collection of the database.
   */
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
