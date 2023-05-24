import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/shared/services/firestore.service';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NeverasComponent } from 'src/app/neveras/neveras.component';

@Component({
  selector: 'app-nevera-item',
  templateUrl: './nevera-item.component.html',
  styleUrls: ['./nevera-item.component.scss']
})
export class NeveraItemComponent {
  @Input() nevera: any;
  disabled=true;
  inputNombre: any=null;
  nombreOriginal=""

  constructor(private router: Router,private neverasComponent: NeverasComponent, private firestoreService: FirestoreService,private modalService: NgbModal) {

  }

  ngOnInit() {
    
  }

  verNevera() {
    this.router.navigate(['/nevera', 'Nevera 1']);
  }
  editar() {
    //Se recoge el campo del nombre
    this.inputNombre = document.getElementById('nombre-' +this.nevera.idNevera);  

    //Se guarda el valor original
    this.nombreOriginal=this.inputNombre.value;

    //Se activa para editar
    this.disabled=false;

    //Se setea el focus y el cursor
    setTimeout(()=>{
      this.inputNombre.focus();
      this.inputNombre.setSelectionRange(0,this.nevera.nombreNevera.length);
  },0);
  }
  
  guardarCambios() {
      
   this.firestoreService.editaNevera(this.nevera.idNevera,"nombreNevera",this.inputNombre.value).then((exito)=>{
    if (exito==true){
      alert("editado");
    }
   })
    
    this.inputNombre.blur()
    this.disabled=true;
  }

  borrar() {
    alert("Borrado");
  }

  focusOutFunction(){
    this.inputNombre.value=this.nombreOriginal;
  }
  open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result === 'borrar') {
        this.firestoreService.borraNevera(this.nevera.idNevera).then((exito)=>{
          if (exito==true){
            alert("borrado");
            this.neverasComponent.actualizarLista();
          }
         })
      }
    })
	}

}
