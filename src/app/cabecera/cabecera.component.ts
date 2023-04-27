import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss'],
})
export class CabeceraComponent {
  public page = 1;
  public pageSize = 8;
  public currentPage =1;

	public isCollapsed = true;
  
   monedasVigiladas= new Array();

  @Output() monedaSeleccionada=new EventEmitter<Object>();


}