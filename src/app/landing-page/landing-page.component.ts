import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})

export class LandingPageComponent {

  /**
   * This is a constructor function that takes in a router object as a parameter and assigns it to a
   * private property.
   * @param {Router} router - Used to navigate between different views or components.
   */
  constructor(private router: Router) {
  }

  /**
   * This function navigates the user to the registration page.
   */
  irSesion() {
    this.router.navigate(['/registro']);
  }
}
