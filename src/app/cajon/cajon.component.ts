import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../shared/services/firestore.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderByDirection } from '@angular/fire/firestore';

@Component({
  selector: 'app-cajon',
  templateUrl: './cajon.component.html',
  styleUrls: ['./cajon.component.scss']
})
/* This is a TypeScript class that represents a component for managing a storage box and its products,
including adding, editing, and deleting products, as well as sorting them by different criteria. */
export class CajonComponent {
  id: any;
  nombre: string = "";
  nombreCajon: string = "";
  tipoCajon: string = "";
  productos: any;
  orden: string = "caducidad"
  campoOrden: string = "caducidad";
  campoSentido: OrderByDirection = "desc"

  /**
   * This is a constructor function that initializes various dependencies for a TypeScript class.
   * @param {ActivatedRoute} router - The router parameter is an instance of the ActivatedRoute class,
   * which is used to retrieve information about the current activated route, including the route's
   * parameters, data, and URL segments.
   * @param {Router} miRouter - miRouter is an instance of the Angular Router service, which is used
   * for navigating between different views or components in an Angular application. It allows you to
   * define routes for your application and navigate to those routes programmatically.
   * @param {FirestoreService} firestoreService - FirestoreService is a service that provides methods
   * to interact with the Firestore database in a Angular application. It is likely that this service
   * has methods to read, write, update, and delete data from the Firestore database.
   * @param {NgbModal} modalService - The modalService is a service provided by the NgbModal module in
   * Angular. It allows for the creation and management of modal windows in an Angular application.
   * Modal windows are used to display content or prompts that require user interaction, while
   * temporarily blocking access to the rest of the application. The modalService provides methods
   */
  constructor(private router: ActivatedRoute, public miRouter: Router, public firestoreService: FirestoreService, private modalService: NgbModal) {

  }

  /**
   * The function retrieves a specific "cajon" object from Firestore based on its ID, updates the
   * "nombre" property of the object if it exists, and then calls another function to update the list.
   */
  ngOnInit() {
    this.router.params.subscribe(params => {
      this.id = params['id'];
      this.firestoreService.recuperarCajon(this.id).then((cajon) => {
        if (cajon != 0) {
          this.nombre = cajon["nombreCajon"];
        }

        this.actualizarLista();
      })
    })
  }

  /* `nuevoProducto()` is a function that is called when the user clicks on a button to add a new
  product to the storage box. It uses the Angular Router service (`miRouter`) to navigate to the
  "productos" route with the current `id` parameter, which will display a form for adding a new
  product to the storage box with the specified `id`. */
  nuevoProducto() {
    this.miRouter.navigate(['productos', this.id]);
  };

 /**
  * This function opens a modal and deletes a "cajon" (drawer) from a Firestore database if the user
  * confirms the deletion.
  * @param {any} content - The content parameter is an input that represents the content of the modal
  * that will be opened. It can be any type of content, such as HTML, a component, or a template.
  */
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-borrar' }).result.then((result) => {
      if (result === 'borrar') {
        this.firestoreService.borraCajon(this.id).then((exito) => {
          if (exito == true) {
            this.miRouter.navigate(['inicio']);
          }
        })
      }
    })
  }


/**
 * This function opens a modal and allows the user to edit a "cajon" object's name in a Firestore
 * database.
 * @param {any} content - The content parameter is an input that represents the content of the modal
 * that will be opened. It can be any type of data, such as HTML, a component, or a template.
 */
  abre(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-editar' }).result.then((result) => {
      if (result === 'editar') {
        this.firestoreService.editaCajon(this.id, "nombreCajon", this.nombreCajon).then((exito) => {
          if (exito == true) {
            alert("editado");
            this.nombre = this.nombreCajon;
          }
        })
      }
    })
  }

  /**
   * This function updates a list of products based on a selected sorting order.
   */
  actualizarLista() {
    console.log(this.orden)
    switch (this.orden) {
      case "caducidad":
        this.campoOrden = "caducidad";
        this.campoSentido = "asc";
        break;
      case "nombreProducto_asc":
        this.campoOrden = "nombreProducto";
        this.campoSentido = "asc";
        break;
      case "nombreProducto_desc":
        this.campoOrden = "nombreProducto";
        this.campoSentido = "desc";
        break;
      case "paquetes_asc":
        this.campoOrden = "paquetes";
        this.campoSentido = "asc";
        break;
      case "paquetes_desc":
        this.campoOrden = "paquetes";
        this.campoSentido = "desc";
        break;
      default:
        break;
    }
    this.firestoreService.listarProductos(this.id, this.campoOrden, this.campoSentido).then(productos => this.productos = productos)
  }

 /**
  * The function calls another function to update a list when a change event occurs.
  * @param {any}  -  is a parameter that represents the event object that is triggered when
  * the value of an input element is changed. It contains information about the event, such as the
  * target element, the type of event, and the new value of the input. In this code snippet, the
  * onChange() function is called
  */
  onChange($event: any) {
    this.actualizarLista();
    }

}
