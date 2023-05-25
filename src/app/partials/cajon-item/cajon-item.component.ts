import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-cajon-item',
  templateUrl: './cajon-item.component.html',
  styleUrls: ['./cajon-item.component.scss']
})
export class CajonItemComponent {
  @Input() cajon: any;
  nombre="";
  
  constructor(private router: Router,public firestoreService: FirestoreService) {
   
  }
  ngOnInit() {
    this.firestoreService.recuperarCajon(this.cajon.idCajon).then((cajon)=>{
      if(cajon!=0){
        this.nombre=cajon["nombreCajon"];
      }
    })
  }

  verCajon() {
    this.router.navigate(['/cajon', 'Cajon 1']);
  }

}