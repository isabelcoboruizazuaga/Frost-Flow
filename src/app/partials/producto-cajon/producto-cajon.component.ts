import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CajonComponent } from 'src/app/cajon/cajon.component';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-producto-cajon',
  templateUrl: './producto-cajon.component.html',
  styleUrls: ['./producto-cajon.component.scss']
})
export class ProductoCajonComponent {
  @Input() producto: any;
  @Input() idCajon: any;
  caducidad: string = "";


  /**
   * This is a constructor function that takes in three parameters: a FirestoreService, a
   * CajonComponent, and a NgbModal.
   * @param {FirestoreService} firestoreService - It is a parameter of type FirestoreService, which is
   * likely a service that provides methods for interacting with a Firestore database. This parameter
   * is being injected into the constructor using Angular's dependency injection system.
   * @param {CajonComponent} cajonComponent - It is an instance of the CajonComponent class, which is
   * likely a component in the Angular application. It is being injected into the constructor using
   * dependency injection.
   * @param {NgbModal} modalService - The modalService parameter is an instance of the NgbModal
   * service, which is used to open and manage modal windows in Angular applications. It provides
   * methods for opening, closing, and dismissing modals, as well as events for tracking modal state
   * changes.
   */
  constructor(public firestoreService: FirestoreService, private cajonComponent: CajonComponent, private modalService: NgbModal) {
  }

  /**
   * The function formats a date object and assigns it to the caducidad variable.
   */
  ngOnInit() {
    let cadu = this.producto.caducidad.toDate();
    let month:number= cadu.getMonth() + 1;
    this.caducidad = cadu.getDate() + "/" + month + "/" + cadu.getFullYear();
  }

  
  /**
   * This function deletes a product and updates the list of products in a component.
   */
  borrar() {
    this.firestoreService.borraProducto(this.producto.idProducto);
    this.cajonComponent.actualizarLista();
  }

  /**
   * The function adds a package to a product and updates it in the Firestore database, then updates
   * the product list in the component.
   */
  sumarPaquete() {
    //Se le suman paquetes al producto
    let prod = this.producto;
    prod.paquetes = prod.paquetes + 1;

    this.firestoreService.subirProducto(prod);
    this.cajonComponent.actualizarLista();
  }

 /**
  * This function subtracts a package from a product and updates it in the Firestore database.
  */
  restarPaquete() {
    //Se le restan paquetes al producto
    let prod = this.producto;
    if (prod.paquetes > 1) {

      prod.paquetes = prod.paquetes - 1;

      this.firestoreService.subirProducto(prod);
      this.cajonComponent.actualizarLista();
    } else {
      alert("No puedes eliminar más paquetes!")
    }
  }


 /**
  * The function opens a modal and calls the "borrar()" method if the result is "borrar".
  * @param {any} content - The content parameter is an input that represents the content of the modal
  * that will be displayed. It can be any type of content such as HTML, text, or a component.
  */
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result === 'borrar') {
        this.borrar()
      }
    })
  }
}
