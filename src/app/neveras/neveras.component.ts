import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../shared/services/auth.service';
import { Nevera } from '../shared/modelos/nevera';
import { v4 as uuidv4 } from 'uuid';
import { FirestoreService } from '../shared/services/firestore.service';
import { getDownloadURL, getStorage, ref, uploadBytes } from '@angular/fire/storage';


@Component({
  selector: 'app-neveras',
  templateUrl: './neveras.component.html',
  styleUrls: ['./neveras.component.scss']
})
export class NeverasComponent {
  nombre: string = '';
  neveras = new Array();
  url = "";
  usuario: any;
  file: File;
  fid: any = "";


 /**
  * This is a constructor function that initializes variables for modal service, authentication
  * service, and Firestore service, and creates a new empty file object.
  * @param {NgbModal} modalService - The modalService is a service provided by the NgbModal module in
  * Angular. It allows you to open and manage modal windows in your application.
  * @param {AuthService} authService - It is an instance of the AuthService class, which is likely used
  * for handling user authentication and authorization within the application.
  * @param {FirestoreService} firestoreService - FirestoreService is a service that provides methods to
  * interact with the Firestore database in a Angular application. It allows the application to perform
  * CRUD (Create, Read, Update, Delete) operations on the Firestore database.
  */
  constructor(private modalService: NgbModal, public authService: AuthService, public firestoreService: FirestoreService) {
    this.file = new File([""], '');
  }

 /**
  * The function retrieves the current user's ID, their family's ID, and updates the list of
  * refrigerators.
  */
  ngOnInit() {
    //Se obtiene el id de usuario actual
    this.usuario = this.authService.getUsuarioActual();
    let uid = this.usuario.uid;

    //Se obtiene el id de la familia a la que pertenece el usuario 
    this.firestoreService.recuperarFamiliaID(uid).then(result => {
      this.fid = result;

      //Se obtiene la lista de neveras
      this.actualizarLista()
    })

  }

  /**
   * The function assigns the first selected file from an HTML input element to a variable.
   * @param {Event} event - The event parameter is an object that represents an event that has
   * occurred, in this case, the selection of a file by the user. It contains information about the
   * event, such as the target element that triggered the event.
   */
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
    }
  }

  /**
   * This function opens a modal and handles form submission, including uploading an image to Firestore
   * if one is selected.
   * @param {any} content - The content parameter is a reference to the modal content that will be
   * displayed when the modal is opened. It can be any valid HTML element or a component.
   */
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // Handle form submission
      if (result === 'submit') {
        let fotoURL = "";

        //Creación de id único
        let nId = uuidv4();

        //Guardar imagen en el storage 
        if (this.file.name) {
          if (this.file.size < 5242880) {
            fotoURL = "neveras/" + this.fid + "/" + nId;
            //this.firestoreService.subirFoto(this.file, fotoURL);

            /*Sube una imagen a firestore*/
            const storageRef = ref(getStorage(), fotoURL);
            uploadBytes(storageRef, this.file).then((snapshot) => {
              //Se obtiene la url
              getDownloadURL(storageRef).then(url => {
                console.log(this.file.size);
                this.url = url

                //Se crea la nevera
                this.addNevera(nId);

                this.file = new File([""], '');
              })
            });
          }else{
            alert("La imagen debe pesar menos de 5MB!");
            this.file = new File([""], '');
          }
        } else {
          //Se crea la nevera
          this.addNevera(nId);
        }

      }
    }, (reason) => {
      // Modal dismissed
    });
  }

 /**
  * This function adds a new fridge to the database and updates the list of refrigerators updating the view.
  * @param {string} nId - string type parameter representing the ID of the fridge being added to the
  * database.
  */
  addNevera(nId: string) {

    if(this.nombre!=""){
    //Se añade la nevera a la bd
    let nevera = new Nevera(nId, this.fid, this.nombre, this.url);
    let neve = Object.assign({}, nevera);
    this.firestoreService.subirNevera(neve);


    //Se ractualiza la vista
    this.actualizarLista()
  }else{
    alert("¡La nevera debe tener un nombre!")
  }
  }

  /**
   * The function updates the list of refrigerators using data from a Firestore service.
   */
  actualizarLista(){
    this.firestoreService.listarNeveras(this.fid).then(neveras => this.neveras = neveras)
  }

}

