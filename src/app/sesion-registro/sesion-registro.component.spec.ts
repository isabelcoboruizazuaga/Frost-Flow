import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SesionRegistroComponent } from './sesion-registro.component';

describe('SesionRegistroComponent', () => {
  let component: SesionRegistroComponent;
  let fixture: ComponentFixture<SesionRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SesionRegistroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SesionRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
