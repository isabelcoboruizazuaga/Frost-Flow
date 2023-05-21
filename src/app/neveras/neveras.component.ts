import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../shared/services/auth.service';
import { Nevera } from '../shared/modelos/nevera';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-neveras',
  templateUrl: './neveras.component.html',
  styleUrls: ['./neveras.component.scss']
})
export class NeverasComponent {
  nombre: string = '';
  usuario: any;
  storage: any;
  file: File;
  fid: any = "";


  constructor(private modalService: NgbModal, public authService: AuthService) {
    this.file = new File([""], '');
  }

  ngOnInit() {
    //Se obtiene el id de usuario actual
    this.usuario = this.authService.getUsuarioActual();
    let uid = this.usuario.uid;

    //Se obtiene el id de la familia a la que pertenece el usuario 
    this.authService.recuperarFamiliaID(uid).then(result => this.fid = result)
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
    }
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // Handle form submission
      if (result === 'submit') {
        let fotoURL = "";

        console.log(this.nombre);

        //Guardar imagen en el storage 
        if (this.file.name) {
          fotoURL = "neveras/" + this.fid + "/" + this.file.name;
          this.authService.subirArchivo(this.file, fotoURL);
          this.file = new File([""], '');
        }
        //Creación de id único
        let nId = uuidv4();

        //Se añade la nevera a la bd
        let nevera = new Nevera(nId,this.fid,this.nombre,fotoURL);
        let neve = Object.assign({}, nevera);
        this.authService.subirNevera(neve);
      }
    }, (reason) => {
      // Modal dismissed
    });
  }

  
}

