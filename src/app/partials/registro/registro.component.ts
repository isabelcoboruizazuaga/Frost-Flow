import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
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
   * This is the ngOnInit function in TypeScript, which is a lifecycle hook that is called after the
   * component is initialized.
   */  
  ngOnInit() { }
}
