import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListPublicComponent } from './product-list-public.component';

describe('ProductListPublicComponent', () => {
  let component: ProductListPublicComponent;
  let fixture: ComponentFixture<ProductListPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListPublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
