import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nevera-item',
  templateUrl: './nevera-item.component.html',
  styleUrls: ['./nevera-item.component.scss']
})
export class NeveraItemComponent {
  @Input() nevera: any;
  disabled=true;
  inputNombre: any=null;

  constructor(private router: Router) {

  }

  ngOnInit() {
    
  }

  verNevera() {
    this.router.navigate(['/nevera', 'Nevera 1']);
  }
  editar() {
    //Se recoge el campo del nombre
    this.inputNombre = document.getElementById('nombre-' +this.nevera.idNevera);  

    //Se activa para editar
    this.disabled=false;

    //Se setea el focus y el cursor
    setTimeout(()=>{
      this.inputNombre.focus();
      this.inputNombre.setSelectionRange(0,this.nevera.nombreNevera.length);
  },0);
  }
  
  guardarCambios() {
    alert(this.inputNombre.value);
    this.inputNombre.focusOut()
  }

  borrar() {
    alert("Borrado");
  }
}
