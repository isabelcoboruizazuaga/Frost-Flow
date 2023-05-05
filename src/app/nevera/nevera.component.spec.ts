import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeveraComponent } from './nevera.component';

describe('NeveraComponent', () => {
  let component: NeveraComponent;
  let fixture: ComponentFixture<NeveraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeveraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeveraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
