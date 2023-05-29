import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../shared/services/firestore.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
            this.nombre=this.nombreCajon;
          }
        })
      }
    })
  }

  actualizarLista() {
    this.firestoreService.listarProductos(this.id).then(productos => this.productos = productos)
  }


}
