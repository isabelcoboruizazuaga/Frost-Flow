import { Component } from '@angular/core';
import { FirestoreService } from '../shared/services/firestore.service';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';
import { v4 as uuidv4 } from 'uuid';
import { ProductoFamilia } from '../shared/modelos/producto-familia';
import { AuthService } from '../shared/services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productos-fam',
  templateUrl: './productos-fam.component.html',
  styleUrls: ['./productos-fam.component.scss']
})
export class ProductosFamComponent {
  nombre: string = '';
  file: File;
  url = "";
  fid = "";
  idCajon = "";
  productos = new Array();

  constructor(private router: ActivatedRoute, private modalService: NgbModal, public firestoreService: FirestoreService, public authService: AuthService) {
    this.file = new File([""], '');
  }
  ngOnInit() {

    this.router.params.subscribe(params => {
      //Id de cajón
      this.idCajon = params['id'];

      //Se obtiene el id de la familia a la que pertenece el usuario actual
      this.firestoreService.recuperarFamiliaID(this.authService.getUsuarioActual().uid).then(result => {
        this.fid = result;

        //Se obtiene la lista de productos
        this.actualizarLista();
      })
    })
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
    }
  }
  
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // Handle form submission
      if (result === 'submit') {
        let fotoURL = "";

        //Creación de id único
        let pId = uuidv4();

        //Guardar imagen en el storage 
        if (this.file.name) {
          if (this.file.size < 5242880) {
            fotoURL = "productos/" + "/" + pId;

            /*Sube una imagen a firestore*/
            const storageRef = ref(getStorage(), fotoURL);
            uploadBytes(storageRef, this.file).then((snapshot) => {
              //Se obtiene la url
              getDownloadURL(storageRef).then(url => {
                console.log(this.file.size);
                this.url = url

                //Se crea el producto
                this.addProducto(pId, this.fid);

                this.file = new File([""], '');
              })
            });
          } else {
            alert("La imagen debe pesar menos de 5MB!");
            this.file = new File([""], '');
          }
        } else {
          //Se crea el producto
          this.addProducto(pId, this.fid);
        }

      }
    }, (reason) => {
      // Modal dismissed
    });
  }
  crear() {

  }

  addProducto(pId: string, fId: string) {
    //Se añade el producto a la bd
    let producto = new ProductoFamilia(pId, fId, this.nombre, this.url);
    let produ = Object.assign({}, producto);
    this.firestoreService.subirProductoFam(produ);

    //Se ractualiza la vista
    this.actualizarLista()
  }

  actualizarLista() {
    this.firestoreService.listarProductos(this.fid).then(productos => this.productos = productos)
  }
}
