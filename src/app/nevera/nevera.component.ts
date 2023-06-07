import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FirestoreService } from '../shared/services/firestore.service';
import { Cajon } from '../shared/modelos/cajon';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-nevera',
  templateUrl: './nevera.component.html',
  styleUrls: ['./nevera.component.scss']
})
export class NeveraComponent {
  idNevera: any;
  nevera:any;
  nombreNevera: string = '';
  urlNevera: string = '';
  nombreCajon:string="";
  tipoCajon:string="";
  cajones = new Array();
  
  /**
   * This is a constructor function that takes in the router, modalService, and firestoreService as
   * parameters.
   * @param {ActivatedRoute} router - The router parameter is an instance of the ActivatedRoute class,
   * which is used to retrieve information about the current activated route. It is typically used in
   * Angular applications to navigate between different views or components.
   * @param {NgbModal} modalService - The modalService is a service provided by the NgbModal module in
   * Angular. It allows you to open and close modal windows in your application.
   * @param {FirestoreService} firestoreService - `firestoreService` is an instance of a service that
   * provides methods for interacting with a Firestore database. It is likely injected into this
   * component or service using Angular's dependency injection system.
   */
  constructor(private router: ActivatedRoute, private modalService: NgbModal, public firestoreService: FirestoreService) {
  
  }

 /**
  * The function retrieves the ID of a fridge, retrieves its name and photo from a Firestore database,
  * and updates the view.
  */
  ngOnInit() {
    this.router.params.subscribe(params => {
      this.idNevera = params['id'];
      this.firestoreService.recuperarNevera(this.idNevera).then((nevera)=>{
        if(nevera!=0){
          this.nombreNevera=nevera["nombreNevera"];
          this.urlNevera=nevera["fotoNevera"];
        }
      })
    })

    //Se obtiene la lista de cajones
    this.actualizarLista()
  }

  /**
   * This function adds a new "Cajon" object to a database and updates the view.
   */
  addCajon() {
    //Creación de id único
    let cId = uuidv4();

    //Se añade el cajón a la bd
    let cajon = new Cajon(cId, this.idNevera,this.nombreCajon, this.tipoCajon);
    let caj = Object.assign({}, cajon);
    this.firestoreService.subirCajon(caj);


    //Se ractualiza la vista
    this.actualizarLista()
  }

  /**
   * The function updates a list of drawers using data from a Firestore service.
   */
  actualizarLista() {
    this.firestoreService.listarCajones(this.idNevera).then(cajones => this.cajones = cajones)
  }

 /**
  * This function opens a modal and handles form submission to add a "cajon" (drawer) in TypeScript.
  * @param {any} content - The content parameter is the component or template that will be displayed
  * inside the modal dialog. It can be any valid Angular component or template.
  */
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      // Handle form submission
      if (result === 'submit') {
      
          //Se crea la nevera
          this.addCajon();

      }
    }, (reason) => {
      // Modal dismissed
    });
  }



}
