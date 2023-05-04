import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeveraItemComponent } from './nevera-item.component';

describe('NeveraItemComponent', () => {
  let component: NeveraItemComponent;
  let fixture: ComponentFixture<NeveraItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NeveraItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NeveraItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
