import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/shared/modelos/producto';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-producto-item',
  templateUrl: './producto-item.component.html',
  styleUrls: ['./producto-item.component.scss']
})
export class ProductoItemComponent {
  @Input() producto: any;
  @Input() idCajon: any;

  model: any=""
  paquetes:any=1;
  cantidad:any=1;
  descCantidad:any="kilogramos";
  
  constructor(public firestoreService: FirestoreService,private router: Router) {
  }

  aniadir() {
    //Creación de id único
    let pId = this.producto.idProducto;
    let cId=this.idCajon

    //Se añade el producto a la bd
    let producto=new Producto(pId,cId,this.producto.nombreProducto, this.producto.fotoProducto,[this.cantidad,this.descCantidad],this.model,this.paquetes);
    let prod = Object.assign({}, producto);
    this.firestoreService.subirProducto(prod);

    this.router.navigate(['/cajon', this.idCajon]);
  }

}
