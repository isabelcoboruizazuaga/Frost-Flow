import { Component } from '@angular/core';
import { uploadBytes } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { ModalDismissReasons, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getStorage, ref } from "firebase/storage";
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector: 'app-neveras',
  templateUrl: './neveras.component.html',
  styleUrls: ['./neveras.component.scss']
})
export class NeverasComponent {
  nombre: string = '';
  storage: any;
  file: File;




  constructor(private modalService: NgbModal, public authService: AuthService) {
    //this.storage = getStorage();
    this.file = new File([""], '');
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0]; // Get the first selected file
      console.log("file cargado" + this.file.name)
      
      this.authService.prueba(this.file);
    }
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // Handle form submission
      if (result === 'submit') {

        console.log(this.nombre);
        // console.log(this.imagen);

      }
    }, (reason) => {
      // Modal dismissed
    });
  }
}

