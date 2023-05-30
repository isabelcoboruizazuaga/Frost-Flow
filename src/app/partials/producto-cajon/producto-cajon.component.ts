import { Component, Input } from '@angular/core';
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

  
  constructor(public firestoreService: FirestoreService,private cajonComponent: CajonComponent) {
  }
  
  ngOnInit() {
    let str = JSON.stringify( this.producto);
    console.log(str);
  }

  editar() {

    alert("editado");
  }
  borrar() {
    this.firestoreService.borraProducto(this.producto.idProducto);
    this.cajonComponent.actualizarLista();
  }

  sumarPaquete(){
    //Se le suman paquetes al producto
    let prod= this.producto;
    prod.paquetes=prod.paquetes+1;

     this.firestoreService.subirProducto(prod);
     this.cajonComponent.actualizarLista();
  }

  restarPaquete(){
    //Se le restan paquetes al producto
    let prod= this.producto;
    if(prod.paquetes>1){

      prod.paquetes=prod.paquetes-1;

      this.firestoreService.subirProducto(prod);
      this.cajonComponent.actualizarLista();
    }else{
      alert("No puedes eliminar más paquetes!")
    }
  }
}
