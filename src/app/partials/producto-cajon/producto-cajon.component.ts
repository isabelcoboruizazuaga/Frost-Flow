import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-producto-cajon',
  templateUrl: './producto-cajon.component.html',
  styleUrls: ['./producto-cajon.component.scss']
})
export class ProductoCajonComponent {
  @Input() producto: any;
  @Input() idCajon: any;

  editar(){    
    
    alert("editado");
   }
   borrar(){    
    alert("Borrado");
   }
}
