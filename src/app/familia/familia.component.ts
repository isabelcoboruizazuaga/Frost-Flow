import { AfterViewInit, Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FirestoreService } from '../shared/services/firestore.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../shared/services/auth.service';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-familia',
  templateUrl: './familia.component.html',
  styleUrls: ['./familia.component.scss']
})

/* The FamiliaComponent class handles changing a user's family and updating the list of family members. */
export class FamiliaComponent {
  @ViewChild('modal_cambio', { static: false }) private content: any;
  @ViewChild('modal_no_existe', { static: false }) private content2: any;

  nuevaFamilia = "";
  uid = "";
  fId = "";
  usuarios: any;
  modalReference: any;

  elementType = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value = '';

  /**
   * This is a constructor function that takes in three parameters: authService, firestoreService, and
   * modalService.
   * @param {AuthService} authService - An instance of the AuthService class, which likely handles
   * authentication and authorization functionality in the application.
   * @param {FirestoreService} firestoreService - The `firestoreService` parameter is an instance of a
   * service that provides methods for interacting with the Firestore database in a Angular
   * application. It is likely injected into this constructor using Angular's dependency injection
   * system.
   * @param {NgbModal} modalService - The modalService is a service provided by the NgbModal module in
   * Angular. It allows for the creation and management of modal windows in an Angular application.
   * Modal windows are used to display content or prompts that require user interaction, and they
   * typically appear on top of the main application window. The modalService provides
   */
  constructor(public authService: AuthService, public firestoreService: FirestoreService, private modalService: NgbModal) {

  }

  /**
   * The function retrieves the current user's ID and their associated family ID, and then updates a
   * list based on that family ID.
   */
  ngOnInit() {
    //Se obtiene el id de usuario actual
    let usuario = this.authService.getUsuarioActual();
    this.uid = usuario.uid;
    //Obtenemos la familia a la que pertenece ahora
    this.firestoreService.getFamiliaUsuario(this.uid).then((fId) => {
      this.fId = fId
      this.value = this.fId;
      this.actualizarLista();
    });
  }

  /**
   * This function checks if a new family exists, and if it does, opens a modal for confirmation to
   * move or not move products and refrigerators to the new family, and updates the family and list
   * accordingly.
   */
  cambiarFamilia() {
    if (this.nuevaFamilia != "") {
      this.firestoreService.familiaExiste(this.nuevaFamilia).then((existe) => {
        if (existe) {
          //Si existe abrimos el modal de confirmación
          this.modalReference = this.modalService.open(this.content);
          this.modalReference.result.then((result: any) => {
            if (result === 'mover') {
              //La cambiamos moviendo las neveras y productos
              this.firestoreService.cambiaFamiliaUsuario(this.uid, this.fId, this.nuevaFamilia, true);
              this.actualizarFam();             
              this.actualizarLista();
            } else {
              if (result == 'no_mover') {
                //La cambiamos sin mover las neveras y productos
                this.firestoreService.cambiaFamiliaUsuario(this.uid, this.fId, this.nuevaFamilia, false);
                this.actualizarFam();
                this.actualizarLista();
              }
            }
          }, (reason: any) => { });
        } else {
          //Si no existe abrimos el modal de aviso y creación de familia
          this.modalReference = this.modalService.open(this.content2);
          this.modalReference.result.then((result: any) => {
            // if (result === 'crear') {
            //   console.log('crear')
            // } else {
            //   console.log('no crear')
            // }
          }, (reason: any) => { });

        }
      })
    }
  }


 /**
  * The function updates a list of users/family members using data from Firestore.
  */
  actualizarLista() {
    this.firestoreService.listarFamiliares(this.fId).then(usuarios => this.usuarios = usuarios);
  }

  /**
   * The function updates a family ID and value, clears the "nuevaFamilia" variable, and calls the "actualizarLista" function after a
   * delay.
   */
  actualizarFam(){
    this.fId = this.nuevaFamilia;
    this.value = this.fId;
    this.nuevaFamilia="";
    
    setTimeout(()=>{this.actualizarLista()}, 1000);
  }
}
