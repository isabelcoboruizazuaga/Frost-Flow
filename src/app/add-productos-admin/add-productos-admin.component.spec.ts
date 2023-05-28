import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductosAdminComponent } from './add-productos-admin.component';

describe('AddProductosAdminComponent', () => {
  let component: AddProductosAdminComponent;
  let fixture: ComponentFixture<AddProductosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductosAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProductosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
