import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cajon-item',
  templateUrl: './cajon-item.component.html',
  styleUrls: ['./cajon-item.component.scss']
})
export class CajonItemComponent {
  @Input() cajon: any;
  nombre="";
  
  constructor(private router: Router) {
   
  }
  ngOnInit() {
    this.nombre=this.cajon.nombreCajon;
    /*this.firestoreService.recuperarCajon(this.cajon.idCajon).then((cajon)=>{
      if(cajon!=0){
        this.nombre=cajon["nombreCajon"];
      }
    }) */
  }

  verCajon() {
    this.router.navigate(['/cajon', this.cajon.idCajon]);
  }

}