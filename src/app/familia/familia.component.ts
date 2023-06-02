import { AfterViewInit, Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { FirestoreService } from '../shared/services/firestore.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-familia',
  templateUrl: './familia.component.html',
  styleUrls: ['./familia.component.scss']
})
export class FamiliaComponent {
  @ViewChild('modal_cambio', { static: false }) private content: any;
  @ViewChild('modal_no_existe', { static: false }) private content2: any;

  nuevaFamilia = "";
  uid = "";
  fId = "";
  usuarios:any;
  modalReference: any;

  constructor(public authService: AuthService, public firestoreService: FirestoreService, private modalService: NgbModal) {

  }
  ngOnInit() {
    //Se obtiene el id de usuario actual
    let usuario = this.authService.getUsuarioActual();
    this.uid = usuario.uid;
    //Obtenemos la familia a la que pertenece ahora
    this.firestoreService.getFamiliaUsuario(this.uid).then((fId) => {
      this.fId = fId
      this.actualizarLista();
    });
  }


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
              this.actualizarLista();
            } else {
              if (result == 'no_mover') {
                //La cambiamos sin mover las neveras y productos
                this.firestoreService.cambiaFamiliaUsuario(this.uid, this.fId, this.nuevaFamilia, false);
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

  
  actualizarLista() {
    this.firestoreService.listarFamiliares(this.fId).then(usuarios => this.usuarios = usuarios);
  }
}
