import { Component } from '@angular/core';

@Component({
  selector: 'app-producto-cajon',
  templateUrl: './producto-cajon.component.html',
  styleUrls: ['./producto-cajon.component.scss']
})
export class ProductoCajonComponent {


  editar(){    
    
    alert("editado");
   }
   borrar(){    
    alert("Borrado");
   }
}
