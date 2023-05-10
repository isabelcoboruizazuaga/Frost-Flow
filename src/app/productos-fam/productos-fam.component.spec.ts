import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosFamComponent } from './productos-fam.component';

describe('ProductosFamComponent', () => {
  let component: ProductosFamComponent;
  let fixture: ComponentFixture<ProductosFamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosFamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosFamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
