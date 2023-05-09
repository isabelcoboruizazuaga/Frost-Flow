import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajonItemComponent } from './cajon-item.component';

describe('CajonItemComponent', () => {
  let component: CajonItemComponent;
  let fixture: ComponentFixture<CajonItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajonItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CajonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
