import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.scss']
})
export class InicioSesionComponent  implements OnInit {
  /**
   * This is a constructor function that takes an instance of the AuthService class as a parameter and
   * assigns it to a public property.
   * @param {AuthService} authService - The parameter `authService` is a dependency injection of the
   * `AuthService` class. It allows the class that contains this constructor to access the methods and
   * properties of the `AuthService` class. This is a common practice in Angular applications, where
   * services are injected into components or other services to provide functionality and
   */
  constructor(
    public authService: AuthService
  ) { }

  /**
   * The ngOnInit function is a lifecycle hook in Angular that is called after the component has been
   * initialized.
   * I don´t know if this does something but it's working so I left it here safe and sound
   */
  ngOnInit() { }
}
