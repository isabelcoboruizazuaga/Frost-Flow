import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajonItemAddComponent } from './cajon-item-add.component';

describe('CajonItemAddComponent', () => {
  let component: CajonItemAddComponent;
  let fixture: ComponentFixture<CajonItemAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajonItemAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CajonItemAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
