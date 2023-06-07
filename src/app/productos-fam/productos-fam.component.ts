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

 /**
  * This is a constructor function that initializes variables and dependencies for a TypeScript class.
  * @param {ActivatedRoute} router - The router parameter is an instance of the ActivatedRoute class,
  * which is used to retrieve information about the current activated route, including the route's
  * parameters, data, and URL segments.
  * @param {NgbModal} modalService - The modalService is a service provided by the NgbModal module in
  * Angular. It allows for the creation and management of modal windows in an Angular application.
  * Modal windows are used to display content or prompts that require user interaction, and they
  * typically appear on top of the current page or view. The modalService
  * @param {FirestoreService} firestoreService - FirestoreService is a service that provides methods to
  * interact with the Firestore database in a Angular application. It allows the application to perform
  * CRUD (Create, Read, Update, Delete) operations on the Firestore database.
  * @param {AuthService} authService - This parameter is an instance of the AuthService class, which is
  * likely used for handling user authentication and authorization within the application.
  */
  constructor(private router: ActivatedRoute, private modalService: NgbModal, public firestoreService: FirestoreService, public authService: AuthService) {
    this.file = new File([""], '');
  }

  /**
   * The function retrieves the ID of a drawer, the ID of the family to which the current user belongs,
   * and updates the list of products.
   */
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

  /**
   * The function assigns the first selected file from an HTML input element to a variable.
   * @param {Event} event - The event parameter is an object that represents an event that has
   * occurred, in this case, the selection of a file by the user. It contains information about the
   * event, such as the target element that triggered the event.
   */
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
    }
  }

  /**
   * This function opens a modal and handles form submission, including uploading an image to Firestore
   * if one is selected. It calls the "addProducto()" method to upload the product.
   * @param {any} content - The content parameter is a reference to the modal content that will be
   * displayed when the modal is opened. It can be any valid HTML element or a component.
   */
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

  /**
   * This function adds a product to a database and updates the view.
   * @param {string} pId - string - represents the ID of the product being added
   * @param {string} fId - fId stands for "family ID" and it is likely a unique identifier for a
   * product family or category to which the product belongs.
   */
  addProducto(pId: string, fId: string) {
    //Se le pone el formato adecuado al nombre
    let nombre = this.nombre.toLowerCase();
    nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);

    //Se añade el producto a la bd
    let producto = new ProductoFamilia(pId, fId,nombre, this.url);
    let produ = Object.assign({}, producto);
    this.firestoreService.subirProductoFam(produ);

    //Se ractualiza la vista
    this.actualizarLista()
  }

  /**
   * This function updates the list of products from this family ID using Firestore service in
   * TypeScript.
   */
  actualizarLista() {
    this.firestoreService.listarProductosFam(this.fid).then(productos => this.productos = productos)
  }
}
