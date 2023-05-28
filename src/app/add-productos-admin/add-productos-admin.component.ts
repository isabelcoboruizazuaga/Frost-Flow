import { Component } from '@angular/core';
import { FirestoreService } from '../shared/services/firestore.service';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { v4 as uuidv4 } from 'uuid';
import { ProductoAdmin } from '../shared/modelos/producto-admin';

@Component({
  selector: 'app-add-productos-admin',
  templateUrl: './add-productos-admin.component.html',
  styleUrls: ['./add-productos-admin.component.scss']
})
export class AddProductosAdminComponent {
  nombre: string = '';
  file: File;
  url = "";

  constructor(public firestoreService: FirestoreService) {
    this.file = new File([""], '');
  }

  
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
    }
  }

  crear(){
    let fotoURL = "";

        //Creación de id único
        let pId = uuidv4();

        //Guardar imagen en el storage 
        if (this.file.name) {
          if (this.file.size < 5242880) {
            fotoURL = "productos/"+ "/" + pId;

            /*Sube una imagen a firestore*/
            const storageRef = ref(getStorage(), fotoURL);
            uploadBytes(storageRef, this.file).then((snapshot) => {
              console.log('Subido a ' + fotoURL);
              //Se obtiene la url
              getDownloadURL(storageRef).then(url => {
                console.log(this.file.size);
                console.log('AHORA SOY ' + url);
                this.url = url

                //Se crea el producto
                this.addProducto(pId);

                this.file = new File([""], '');
              })
            });
          }else{
            alert("La imagen debe pesar menos de 5MB!");
            this.file = new File([""], '');
          }
        } else {
          //Se crea el producto
          this.addProducto(pId);
        }
  }

  addProducto(pId: string) {
    //Se añade el producto a la bd
    let producto = new ProductoAdmin(pId, this.nombre, this.url);
    let produ = Object.assign({}, producto);
    this.firestoreService.subirProductoAdmin(produ);
  }
}
