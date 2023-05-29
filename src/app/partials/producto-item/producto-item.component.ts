import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
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

  caducidad: any = ""
  paquetes: any = 1;
  cantidad: any = 1;
  descCantidad: any = "kilogramos";

  constructor(public firestoreService: FirestoreService, private router: Router) {
  }

  aniadir() {
    //Creación de id único
    let pId = uuidv4();

    let pfId = this.producto.idProducto;
    let cId = this.idCajon

    let cant:[number,string]=[this.cantidad, this.descCantidad];

    this.firestoreService.productoExiste(pfId, cId, this.caducidad,cant).then(
      productos => {
        console.log(productos);

        if (productos.length == 0) {
          //Se añade el producto a la bd
          let producto = new Producto(pId, cId, pfId, this.producto.nombreProducto, this.producto.fotoProducto, cant, this.caducidad, this.paquetes);
          let prod = Object.assign({}, producto);
          this.firestoreService.subirProducto(prod);

          this.router.navigate(['/cajon', this.idCajon]);
        }else{
          //Como el producto existe solo se añade un paquete
          let prod= productos[0];
          prod["paquetes"]= prod["paquetes"]+this.paquetes;
          this.firestoreService.subirProducto(prod)
          
          this.router.navigate(['/cajon', this.idCajon]);
        }
      }

    )


  }

}
