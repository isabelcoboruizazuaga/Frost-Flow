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
  nombreOriginal="";

  /**
   * This is a constructor function that takes in several dependencies as parameters.
   * @param {Router} router - The router parameter is an instance of the Angular Router service, which
   * is used for navigating between different views or components in an Angular application.
   * @param {NeverasComponent} neverasComponent - neverasComponent is an instance of the
   * NeverasComponent class, which is likely a component in the Angular application. It is being
   * injected into the constructor using dependency injection.
   * @param {FirestoreService} firestoreService - The `firestoreService` parameter is an instance of a
   * service that provides methods for interacting with a Firestore database. It is likely used to
   * perform CRUD (Create, Read, Update, Delete) operations on Firestore documents.
   * @param {NgbModal} modalService - The modalService is a service provided by the NgbModal module in
   * Angular. It is used to open and manage modal windows in an Angular application. Modal windows are
   * used to display content on top of the current page, and are commonly used for displaying forms,
   * alerts, and other types of user input.
   */
  constructor(private router: Router,private neverasComponent: NeverasComponent, private firestoreService: FirestoreService,private modalService: NgbModal) {

  }

  /**
   * This function navigates to a specific page related to a fridge object.
   */
  verNevera() {
    this.router.navigate(['/nevera', this.nevera.idNevera]);
  }

  /**
   * The function enables editing of the "nombre" (name) field by setting it to active and setting the focus and cursor.
   */
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
  
  /**
   * The function saves changes made to a fridge's name in a Firestore database.
   */
  guardarCambios() {
      let nombre=this.inputNombre.value;
   this.firestoreService.editaNevera(this.nevera.idNevera,"nombreNevera",this.inputNombre.value).then((exito)=>{
    if (exito==true){
      this.inputNombre.value=nombre;
    }
   })
    
    this.inputNombre.blur()
    this.disabled=true;
  }

 /**
  * The function sets the value of an input field to its original value and disables it when it loses
  * focus.
  */
  focusOutFunction(){
      this.inputNombre.value=this.nombreOriginal;
      this.inputNombre.blur()
      this.disabled=true;
  }
  
 /**
  * This function opens a modal and deletes a fridge from Firestore if the user confirms the deletion.
  * @param {any} content - The content parameter is an input that represents the content of the modal
  * that will be opened. It can be any type of data, such as HTML, a component, or a template.
  */ 
  open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result === 'borrar') {
        this.firestoreService.borraNevera(this.nevera.idNevera).then((exito)=>{
          if (exito==true){
            setTimeout(()=>{
              this.neverasComponent.actualizarLista();
              console.log("a")
            }, 2000);
          }
         })
      }
    })
	}

}
