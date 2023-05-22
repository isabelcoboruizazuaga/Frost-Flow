import { Component, Input } from '@angular/core';
import { getDownloadURL, ref } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/shared/services/firestore.service';

@Component({
  selector: 'app-nevera-item',
  templateUrl: './nevera-item.component.html',
  styleUrls: ['./nevera-item.component.scss']
})
export class NeveraItemComponent {
  @Input() nevera: any;
  url = "po";

  constructor(private router: Router, public firestoreService: FirestoreService) {

  }

  ngOnInit() {
    try{
    this.cargarFoto();
    }catch(error){
      //Si falla probablemente aún no se haya subido así que esperamos unos segundos
      const delay = (ms: number | undefined) => new Promise(res => setTimeout(res, ms));
      const cargarFoto = async () => {
        await delay(50000);
        console.log("a");
        cargarFoto();

      };

    }
  }

  cargarFoto(){
    const storageRef = ref(this.firestoreService.storage, this.nevera.fotoNevera);
    getDownloadURL(storageRef).then(url => this.url = url);
  }

  verNevera() {
    this.router.navigate(['/nevera', 'Nevera 1']);
  }
  editar() {

    alert("editado");
  }
  borrar() {
    alert("Borrado");
  }
}
