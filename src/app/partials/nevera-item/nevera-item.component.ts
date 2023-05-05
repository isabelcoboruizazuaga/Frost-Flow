import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nevera-item',
  templateUrl: './nevera-item.component.html',
  styleUrls: ['./nevera-item.component.scss']
})
export class NeveraItemComponent {

  constructor(private router: Router){

  }

  verNevera(){    
   this.router.navigate(['/nevera','Nevera 1']);
  }
  editar(){    
    
    alert("editado");
   }
   borrar(){    
    alert("Borrado");
   }
}
