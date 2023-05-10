import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoCajonComponent } from './producto-cajon.component';

describe('ProductoCajonComponent', () => {
  let component: ProductoCajonComponent;
  let fixture: ComponentFixture<ProductoCajonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoCajonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoCajonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
