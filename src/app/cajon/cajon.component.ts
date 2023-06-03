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
export class CajonComponent {
  id: any;
  nombre: string = "";
  nombreCajon: string = "";
  tipoCajon: string = "";
  productos: any;
  orden: string = "caducidad"
  campoOrden: string = "caducidad";
  campoSentido: OrderByDirection = "desc"

  constructor(private router: ActivatedRoute, public miRouter: Router, public firestoreService: FirestoreService, private modalService: NgbModal) {

  }

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

  nuevoProducto() {
    this.miRouter.navigate(['productos', this.id]);
  };

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-borrar' }).result.then((result) => {
      if (result === 'borrar') {
        this.firestoreService.borraCajon(this.id).then((exito) => {
          if (exito == true) {
            alert("borrado");

            this.miRouter.navigate(['inicio']);
          }
        })
      }
    })
  }


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

  onChange($event: any) {
    this.actualizarLista();
    }

}
