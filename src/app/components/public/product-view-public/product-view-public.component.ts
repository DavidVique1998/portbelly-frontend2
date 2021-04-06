import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Action } from 'src/app/models/action';
import { Client } from 'src/app/models/client';
import { Product } from 'src/app/models/product';
import { ProductInCart } from 'src/app/models/product-in-cart';
import { ShoppingCart } from 'src/app/models/shopping-cart';
import { ActionService } from 'src/app/services/action.service';
import { ProductInCartService } from 'src/app/services/product-in-cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-view-public',
  templateUrl: './product-view-public.component.html',
  styleUrls: ['./product-view-public.component.css']
})
export class ProductViewPublicComponent implements OnInit, OnChanges {
  //Product
  @Input() product: Product = new Product();
  public formProduct: FormGroup;
  numbers: Array<number>;


  //ProductInCart
  productInCart: ProductInCart = new ProductInCart();

  public formProductInCart: FormGroup;

  //ShoppingCart
  @Input() shoppingCart: ShoppingCart = new ShoppingCart();

  //Client
  @Input() client: Client = new Client();
  //Action
  action: Action = new Action();


  //Path
  path: string;

  //like
  like: boolean = false;

  //Sizes
  sizes: Array<string> = []

  //Colors
  colors: Array<string> = []
  constructor(private productService: ProductService, private formBuilder: FormBuilder, private actionService: ActionService, private productInCartService: ProductInCartService,) {
    this.formProduct = this.formBuilder.group({
      quantity: [0, [Validators.required]],
      sizes: this.formBuilder.array([this.formBuilder.group({ size: [{ value: 'XXL', checked: false }] })]),
      colors: this.formBuilder.array([this.formBuilder.group({ color: [{ value: '#000000', checked: true }] })]),
    })
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['client']) {
      this.getAction();
    }

    if (changes['product']) {
      this.getSizes();
      this.getColors();
    }
  }

  ngOnInit(): void {
    this.path = this.productService.pathImages;
  }

  /**
   * onSubmit
   */
  public onSubmit() {
    if (this.formProduct.invalid) {
      // Swal.fire({
      //   title: 'Error',
      //   text: 'Error en formulario',
      //   icon: 'error',
      // });
      alert('Por favor ingrese todos los datos')
      //Developer
      console.error('Error en formulario, función onSubmit');
      return;
    }

    if (this.productInCart.quantity == 0) {
      alert('Selecciona una Cantidad mayor a cero');
    }


    this.productInCart.color = this.convertColorsToString();
    if (this.productInCart.color == null) {
      alert('Selecciona un color');
      return;
    }
    this.productInCart.size = this.convertSizesToString();
    if (this.productInCart.size == null) {
      alert('Selecciona una talla');
      return;
    }

    this.productInCart.price = this.product.price;
    this.productInCart.product = this.product;
    this.productInCart.shoppingCart = this.shoppingCart;
    this.productInCartService.setProductInCart(this.productInCart).subscribe(result => {
      alert('Producto agregado al carrito');
      //Developer
      console.log('Producto en carrito guardado, función onSubmit');
      this.onReset();
    })
  }

  /**
 * onReset
 */
  public onReset() {
    this.formProduct.reset();
    this.productInCart = new ProductInCart();
    this.refactorSizes(this.sizes);
    this.refactorColors(this.colors);

  }

  /**
   * @name  getAction
   * @description "Get action respect product and client"
   */
  public getAction(): void {
    this.action = new Action();
    if (this.client && this.product) {
      if (this.client.idClient && this.product.idProduct) {
        this.actionService.retrieveByClientIDAndProductID(this.client.idClient, this.product.idProduct).subscribe(result => {
          this.action = result;
          if (this.action) {
            this.action.client = this.client;
            this.action.product = this.product;
          }
        }, err => {
          console.error('Product View getAction', err);
        });
      }
    }
  }

  /**
   * @name setLike
   * @description "Set like about a product respect client"
   */
  setLike(key: boolean): void {
    if (!this.action)
      this.action = new Action();
    if (this.client && this.product) {
      if (this.client.idClient && this.product.idProduct) {
        this.action.client = this.client;
        this.action.product = this.product;
        this.action.myLike = key;
        this.actionService.setAction(this.action).subscribe(result => {
          this.action = result;
          console.log(this.action);
        })
      }
    }
  }

  /**
   * Sizes
   */
  get getSizesControl() {
    return this.formProduct.get('sizes') as FormArray;
  }
  /**
   * @name getSizes
   * @description "list of sizes in a product "
   */
  getSizes(): void {
    this.sizes = this.product.sizes.split(';');
    if (this.sizes.length != 0) {
      this.refactorSizes(this.sizes);
    }
  }

  //Refactor formArray od sizes with array of strings
  refactorSizes(sizs: Array<string>): void {
    const control = <FormArray>this.formProduct.controls['sizes'];
    control.clear();
    sizs.forEach(element => {
      if (element != ';' && element != '')
        control.push(this.formBuilder.group({ size: [{ value: element, checked: false }] }));
    });
  }

  //Convert the formArray of sizes to String separated ";"
  convertSizesToString(): string {
    let sizs: Array<string> = [];
    let sizes = '';
    const control = <FormArray>this.formProduct.controls['sizes'];
    sizs = control.value.filter(opt => opt.size.checked).map(opt => opt.size.value);
    console.log(sizs);
    sizs = [...new Set(sizs)];
    sizs.forEach(element => {
      sizes += element + ';';
    });
    if (sizs.length != 0)
      return sizs[0];
    return null;
  }

  //Update a checkbox with true or false in formArray of sizes
  updateCheckedSize(pointIndex, event) {
    const control = <FormArray>this.formProduct.controls['sizes'];
    control.controls.forEach((element, index) => {
      if (pointIndex != index) {
        this.getSizesControl.controls[index].value.size.checked = false;
      }
      else
        this.getSizesControl.controls[index].value.size.checked = event.target.checked;
    });
  }

  /**
    * Colors
    */
  get getColorsControl() {
    return this.formProduct.get('colors') as FormArray;
  }
  /**
   * @name getSizes
   * @description "list of sizes in a product "
   */
  getColors(): void {
    this.colors = this.product.colors.split(';');
    if (this.colors.length != 0) {
      this.refactorColors(this.colors);
    }
  }

  //Refactor formArray od sizes with array of strings
  refactorColors(cls: Array<string>): void {
    const control = <FormArray>this.formProduct.controls['colors'];
    control.clear();
    cls.forEach((element, index) => {
      if (element != ';' && element != '')
        if (index == 0)
          control.push(this.formBuilder.group({ color: [{ value: element, checked: true }] }));
        else
          control.push(this.formBuilder.group({ color: [{ value: element, checked: false }] }));
    });
  }

  //Convert the formArray of sizes to String separated ";"
  convertColorsToString(): string {
    let sizs: Array<string> = [];
    let sizes = '';
    const control = <FormArray>this.formProduct.controls['colors'];
    sizs = control.value.filter(opt => opt.color.checked).map(opt => opt.color.value);
    console.log(sizs);
    sizs = [...new Set(sizs)];
    sizs.forEach(element => {
      sizes += element + ';';
    });
    if (sizs.length != 0)
      return sizs[0];
    return null;
  }

  //Update a checkbox with true or false in formArray of sizes
  updateCheckedColor(pointIndex, event) {
    const control = <FormArray>this.formProduct.controls['colors'];
    control.controls.forEach((element, index) => {
      if (pointIndex != index) {
        this.getColorsControl.controls[index].value.color.checked = false;
      }
      else
        this.getColorsControl.controls[index].value.color.checked = event.target.checked;
    });
  }

  /**
   * @name addProductView
   * @desc set a product to local storage JSON Stringify productsView
   */
  public addProductView() {
    this.productService.addProductsView(this.product);
  }


}
