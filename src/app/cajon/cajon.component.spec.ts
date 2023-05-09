import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajonComponent } from './cajon.component';

describe('CajonComponent', () => {
  let component: CajonComponent;
  let fixture: ComponentFixture<CajonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CajonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
