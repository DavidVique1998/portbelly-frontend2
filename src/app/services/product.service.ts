import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProductCreateComponent } from '../components/admin/product-admin/product-create/product-create.component';
import { Product } from '../models/product';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = `${environment.rootUrl}`;
  path: string = "/product";
  publicPath: string = "/public" + this.path;

  public pathImages = this.url + '/images/';

  httpOptionsJsonPublic = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
    })
  };
  httpOptionsMultiPart = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + this.tokenService.getToken(),
    })
  };

  httpOptionsJsonToken = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + this.tokenService.getToken(),

    })
  }

  //Products View
  array: Array<Product> = [];
  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  /**
   * list
   */
  list(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url + this.publicPath, this.httpOptionsJsonPublic)
      .pipe(
        retry(1)
      );
  }
  /**
   * delete
   */
  delete(p: Product): Observable<any> {
    return this.httpClient.delete<any>(this.url + '/' + p.idProduct,
      this.httpOptionsJsonToken);
  }

  /**
   * view
   */
  view(p: Product): Observable<Product> {
    return this.httpClient.get<Product>(this.url + '/' + p.idProduct, this.httpOptionsJsonPublic)
      .pipe(
        retry(1)
      );
  }
  /**
   * createWithImage
   */
  createWithImage(f: File, p: Product): Observable<any> {
    console.log(f);
    console.log(p);
    const fd = new FormData();
    fd.append('file', f);
    fd.append('object', JSON.stringify(p));
    return this.httpClient.post<Product[]>(this.url + this.path + '/withimage', fd, this.httpOptionsJsonToken);
  }

  /**
   * create
   */
  create(p: Product): Observable<any> {
    this.httpOptionsJsonToken = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.tokenService.getToken(),

      })
    }
    return this.httpClient.post<Product[]>(this.url, p, this.httpOptionsJsonToken);
  }

  /**
   * retrieve
   */
  retrive(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.url + '/' + id, this.httpOptionsJsonToken)
      .pipe(
        retry(1)
      );
  }
  /**
   * update
   */
  update(p: Product): Observable<any> {
    this.httpOptionsJsonToken = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.tokenService.getToken(),

      })
    }
    // const alumnoBody = JSON.stringify(p);
    return this.httpClient.put<any>(this.url, p, this.httpOptionsJsonToken).pipe(
      retry(1)
    );
  }
  /**
   * getProductPenInCartByCli
   */
  getProductPenInCartByCli(id: number): Observable<any> {
    return this.httpClient.get<Product[]>(this.url + '/' + 'MisProductosEnCarritoPen?id=' + id, this.httpOptionsJsonToken).pipe(retry(1));
  }

  /**
   * Local Storage And Session Storage
   */

  /**
   * @name addProductsView
   * @desc Set a product in local Storage productsView
   */
  addProductsView(p: Product) {
    if (!localStorage.getItem('productsView')) {
      this.createProductsView();
    }
    this.array = JSON.parse(localStorage.getItem('productsView'));
    this.deleteproductReview(p);
    // this.array = this.array.filter(e => e.idProduct != p.idProduct);
    this.array.unshift(p);
    localStorage.setItem('productsView', JSON.stringify(this.array));
  }

  /**
   * @name getProductsView
   * @desc get list of products view in local Storage productsView
   */
  get getProductsView(): Array<Product> {
    if (!localStorage.getItem('productsView')) {
      this.createProductsView();
    }
    this.array = JSON.parse(localStorage.getItem('productsView'));
    return this.array;
  }

  /**
 * @name createProductsView
 * @desc create a products view in local Storage productsView
 */
  createProductsView(): void {
    if (!localStorage.getItem('productsView')) {
      this.array = [];
      localStorage.setItem('productsView', JSON.stringify(this.array));
    }
  }


  /**
   * @name deleteproductReview
   * @desc delete Product and reduce list to 3 elements, before of add  new product
   */

  deleteproductReview(p: Product): void {
    this.array = this.array.filter(e => e.idProduct != p.idProduct).slice(0, 2);
  }
}
