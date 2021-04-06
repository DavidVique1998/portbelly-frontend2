import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { Promotion } from 'src/app/models/promotion';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  //Product
  product: Product;
  promotion: Promotion;
  category: Category;
  public formProduct: FormGroup;
  //Upload Images
  uploadedFiles: Array<File> = [];
  changeImage: boolean;
  fileToUpload: File = null;
  path: string = `${environment.rootUrl}/images/`;
  fileUploadControl = new FileUploadControl([FileUploadValidators.fileSize(2000000), FileUploadValidators.accept(['image/'])]);
  files: File[] = [];
  file: File;
  //Categories
  area: String;
  areas: Array<String> = [];
  categories: Array<Category> = [];
  //Promotion
  promotions: Array<Promotion> = [];
  //Sizes
  sizes: Array<string> = [];
  //Colors



  constructor(private productService: ProductService, private formBuilder: FormBuilder, private categoryService: CategoryService, private promotionService: PromotionService) {
    this.product = new Product();
    this.promotion = new Promotion();
    this.category = new Category();
    this.product.category = this.category;
    this.product.promotion = this.promotion;
    this.formProduct = this.formBuilder.group({
      name: ['', [Validators.required]],//
      sizes: this.formBuilder.array([this.formBuilder.group({ size: [{ value: 'XXL', checked: false }] })]),
      characteristics: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      promotion: [[Validators.required]],//
      area: [[Validators.required]],//
      category: [[Validators.required]],//
      colors: this.formBuilder.array([this.formBuilder.group({ color: ['#000000'] })]),
    })
  }

  ngOnInit(): void {
    this.sizes = ['XXL', 'XL', 'L', 'M', 'S', 'XS', 'XXS'];
    this.refactorSizes(this.sizes);
    this.getArea();
    this.getPromotion();
  }

  /**
   * onSelect
   */
  onSelect(event): void {
    this.files = [];
    this.files.push(...event.addedFiles);
    this.validate();
  }

  /**
   * validate
   */
  validate(): void {
    this.files.forEach(element => {
      if (!(/\.(jpg|png|jpeg|gif)$/i).test(element.name)) {
        alert('El archivo a adjuntar no es una imagen permitida');
      } else {
        this.fileToUpload = element;
      }
    });
  }

  /**
   * onRemove
   */
  onRemove(event) {
    // this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
    this.uploadedFiles = [];
    this.fileToUpload = null;
    this.changeImage = false;
    this.files.splice(this.files.indexOf(event), 1);
  }
  /**
   * dropped
   */
  dropped(): void {
    this.validate();
    this.changeImage = true;
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

    if (this.product.category.area == "-1") {
      alert('Selecciona una Area');
    }
    if (this.product.category.idCategory == -1) {
      alert('Selecciona una Categoría');
    }
    if (this.product.promotion.idPromotion == -1) {
      alert('Selecciona una Promoción');
    }

    this.product.colors = this.convertColorToString();
    if (this.product.colors == null) {
      alert('Selecciona un color');
      return;
    }
    this.product.sizes = this.convertSizesToString();
    if (this.product.sizes == null) {
      alert('Selecciona una talla');
      return;
    }
    alert("Las tallas o colores repetidos se eliminarán")
    this.productService.createWithImage(this.fileToUpload, this.product).subscribe(result => {
      alert('Producto registrado');
      //Developer
      console.log('Producto guardado, función onSubmit');
      this.onReset();
    })
  }

  /**
 * onReset
 */
  public onReset() {
    // this.formProduct.reset();
    this.refactorSizes(this.sizes);
    this.product = new Product();
    this.promotion = new Promotion();
    this.category = new Category();
    this.product.category = this.category;
    this.product.promotion = this.promotion;
  }

  /**
   * getArea
   */
  public getArea() {
    this.categoryService.listAreas().subscribe(result => {
      this.areas = result;
    })
  }

  /**
 * getCategories
 */
  public getCategories(area: String) {
    if (area != "false") {
      this.categoryService.listCategories(area).subscribe(result => {
        this.categories = result;
      })
    }
    else {
      this.categories = [];
    }

  }
  /**
   * getPromotion
   */
  public getPromotion() {
    this.promotionService.list().subscribe(result => {
      this.promotions = result;
    })
  }

  /**
   * Colors
   */
  get getColors() {
    return this.formProduct.get('colors') as FormArray;
  }

  addColor() {
    const control = <FormArray>this.formProduct.controls['colors'];
    control.push(this.formBuilder.group({ color: ['#000000'] }));
  }
  removeColor(index: number) {
    const control = <FormArray>this.formProduct.controls['colors'];
    control.removeAt(index);
  }

  convertColorToString(): string {
    let cols: Array<string> = [];
    let colors = '';
    const control = <FormArray>this.formProduct.controls['colors'];
    control.value.forEach(element => {
      if (element.color != null || element.color != "" || element.color != "null") {
        cols.push(element.color);
      }
    });
    cols = [...new Set(cols)];
    this.refactorColor(cols);
    cols.forEach(element => {
      colors += element + ';';
    });
    return colors;
  }

  refactorColor(cols: Array<string>): void {
    const control = <FormArray>this.formProduct.controls['colors'];
    control.clear();
    cols.forEach(element => {
      control.push(this.formBuilder.group({ color: [element] }));
    });
  }

  /**
   * Sizes
   */
  get getSizes() {
    return this.formProduct.get('sizes') as FormArray;
  }

  addSize() {
    const control = <FormArray>this.formProduct.controls['sizes'];
    control.push(this.formBuilder.group({ size: [{ value: 'XXL', checked: true }] }));
    // console.log(control);
  }
  removeSize(index: number) {
    const control = <FormArray>this.formProduct.controls['sizes'];
    control.removeAt(index);
  }
  //Convert the formArray of sizes to String separated ";"
  convertSizesToString(): string {
    let sizs: Array<string> = [];
    let sizes = ';';
    const control = <FormArray>this.formProduct.controls['sizes'];
    sizs = control.value.filter(opt => opt.size.checked).map(opt => opt.size.value);
    console.log(sizs);
    sizs = [...new Set(sizs)];
    //this.refactorSizes(sizs);
    sizs.forEach(element => {
      sizes += element + ';';
    });
    return sizes;
  }

  //Refactor formArray od sizes with array of strings
  refactorSizes(sizs: Array<string>): void {
    const control = <FormArray>this.formProduct.controls['sizes'];
    control.clear();
    sizs.forEach(element => {
      control.push(this.formBuilder.group({ size: [{ value: element, checked: false }] }));
    });
  }
  //Update a checkbox with true or false in formArray of sizes
  updateCheckedSize(pointIndex, event) {
    this.getSizes.controls[pointIndex].value.size.checked = event.target.checked;
  }
}
