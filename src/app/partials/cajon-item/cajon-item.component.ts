import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cajon-item',
  templateUrl: './cajon-item.component.html',
  styleUrls: ['./cajon-item.component.scss']
})
export class CajonItemComponent {
  constructor(private router: Router) {

  }

  verCajon() {
    this.router.navigate(['/cajon', 'Cajon 1']);
  }

}