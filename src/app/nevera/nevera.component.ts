import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nevera',
  templateUrl: './nevera.component.html',
  styleUrls: ['./nevera.component.scss']
})
export class NeveraComponent {
  id: any;

  constructor(private router: ActivatedRoute) {

  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.id = params['id'];
    })
  }
  
}
