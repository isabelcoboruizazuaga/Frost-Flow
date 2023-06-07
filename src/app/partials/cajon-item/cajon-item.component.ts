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
  
  /**
   * This is a constructor function that takes in a router object as a parameter.
   * @param {Router} router - The "router" parameter is an instance of the Angular Router service. It
   * is used to navigate between different views or components in an Angular application. The Router
   * service provides methods to navigate to a specific route, retrieve information about the current
   * route, and listen for changes to the route. It is typically injected
   */
  constructor(private router: Router) {
   
  }

  /**
   * The ngOnInit function assigns the value of the nombreCajon property of the cajon object to the
   * nombre property.
   */
  ngOnInit() {
    this.nombre=this.cajon.nombreCajon;
  }

  /**
   * This function navigates to a specific page for a given cajon ID using Angular router.
   */
  verCajon() {
    this.router.navigate(['/cajon', this.cajon.idCajon]);
  }

}