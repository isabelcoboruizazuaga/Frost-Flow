import { Component, Input } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { getStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductosFamComponent } from 'src/app/productos-fam/productos-fam.component';
import { Producto } from 'src/app/shared/modelos/producto';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-producto-item',
  templateUrl: './producto-item.component.html',
  styleUrls: ['./producto-item.component.scss']
})
export class ProductoItemComponent {
  @Input() producto: any;
  @Input() idCajon: any;

  caducidad: any = {
    day: "",
    month: "",
    year: "",
  }
  paquetes: any = 1;
  cantidad: any = 0.5;
  descCantidad: any = "kilogramos";

  disabled = true;

 /**
  * This function initializes a date object with the current date and sets it as the default value for
  * a "caducidad" object.
  * @param {FirestoreService} firestoreService - This is a parameter of type FirestoreService, which is
  * likely a service that provides access to the Firestore database in a Firebase project.
  * @param {Router} router - The router parameter is an instance of the Angular Router service, which
  * is used to navigate between different views or components in an Angular application.
  * @param {ProductosFamComponent} productosFam - It is an instance of the ProductosFamComponent class,
  * which is likely a component used to display and manage a list of products or families of products.
  * It is being injected into the constructor of the current class, possibly to access its methods or
  * properties.
  * @param {NgbModal} modalService - The modalService parameter is an instance of the NgbModal service,
  * which is used to open and manage modal windows in Angular applications. It allows developers to
  * create and customize modal windows with various options and features, such as size, animation, and
  * content.
  */
  constructor(public firestoreService: FirestoreService, private router: Router, public productosFam: ProductosFamComponent, private modalService: NgbModal) {
    const fechaHoy = new Date();
    const anio = fechaHoy.getFullYear();
    const dia = fechaHoy.getDate();
    const mes = fechaHoy.getMonth() + 1;

    this.caducidad = {
      day: dia,
      month: mes,
      year: anio,
    }
  }

  /**
   * This function adds a new product or updates the amount of "paquetes" an existing one in a Firestore
   * database based on the productId, expiration date and quantity.
   */
  aniadir() {
    //Creación de id único
    let pId = uuidv4();

    let pfId = this.producto.idProducto;
    let cId = this.idCajon

    let cant: [number, string] = [this.cantidad, this.descCantidad];
    let caducidad= Timestamp.fromDate(new Date(this.caducidad.year, this.caducidad.month, this.caducidad.day));

    this.firestoreService.productoExiste(pfId, cId, caducidad, cant).then(
      productos => {
        if (productos.length == 0) {
          //Se añade el producto a la bd
          let producto = new Producto(pId, cId, pfId, this.producto.nombreProducto, this.producto.fotoProducto, cant, caducidad, this.paquetes);
          let prod = Object.assign({}, producto);
          this.firestoreService.subirProducto(prod);

          this.router.navigate(['/cajon', this.idCajon]);
        } else {
          //Como el producto existe solo se añade un paquete
          let prod = productos[0];
          prod["paquetes"] = prod["paquetes"] + this.paquetes;
          this.firestoreService.subirProducto(prod)

          this.router.navigate(['/cajon', this.idCajon]);
        }
      }

    )
  }

  /**
   * This function deletes a product from the family product list and updates the list showed.
   */
  borrar() {
    if (this.producto.idFamilia) {
      this.firestoreService.borraProductoFam(this.producto.idProducto);
      this.productosFam.actualizarLista();
    }
  }

  /**
   * The function opens a modal and performs a delete action if the user selects the "borrar" option.
   * @param {any} content - The content parameter is a reference to the modal component that will be
   * opened by the modal service. It is usually a template or component that defines the content of the
   * modal.
   */
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result === 'borrar') {
        this.borrar()
      }
    })
  }


}
