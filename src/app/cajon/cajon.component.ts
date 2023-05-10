import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cajon',
  templateUrl: './cajon.component.html',
  styleUrls: ['./cajon.component.scss']
})
export class CajonComponent {
  id: any;

  constructor(private router: ActivatedRoute) {

  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.id = params['id'];
    })
  }
}
