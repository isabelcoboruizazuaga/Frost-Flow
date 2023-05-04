import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeverasComponent } from './neveras.component';

describe('NeverasComponent', () => {
  let component: NeverasComponent;
  let fixture: ComponentFixture<NeverasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeverasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeverasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
