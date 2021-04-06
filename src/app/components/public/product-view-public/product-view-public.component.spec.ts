import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductViewPublicComponent } from './product-view-public.component';

describe('ProductViewPublicComponent', () => {
  let component: ProductViewPublicComponent;
  let fixture: ComponentFixture<ProductViewPublicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductViewPublicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductViewPublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
