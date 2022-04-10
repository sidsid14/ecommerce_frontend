import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoyMenuComponent } from './product-categoy-menu.component';

describe('ProductCategoyMenuComponent', () => {
  let component: ProductCategoyMenuComponent;
  let fixture: ComponentFixture<ProductCategoyMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCategoyMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCategoyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
