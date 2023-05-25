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
  nombreCajon:string=""
  cajones = new Array();
  constructor(private router: ActivatedRoute, private modalService: NgbModal, public firestoreService: FirestoreService) {
  
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.idNevera = params['id'];
      this.firestoreService.recuperarNevera(this.idNevera).then((nevera)=>{
        if(nevera!=0){
          this.nombreNevera=nevera["nombreNevera"];
        }
      })
    })

    //Se obtiene la lista de cajones
    this.actualizarLista()
  }

  addCajon() {
    //Creación de id único
    let cId = uuidv4();

    //Se añade el cajón a la bd
    let cajon = new Cajon(cId, this.idNevera,this.nombreCajon, "tipo");
    let caj = Object.assign({}, cajon);
    this.firestoreService.subirCajon(caj);


    //Se ractualiza la vista
    this.actualizarLista()
  }

  actualizarLista() {
    this.firestoreService.listarCajones(this.idNevera).then(cajones => this.cajones = cajones)
  }

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
