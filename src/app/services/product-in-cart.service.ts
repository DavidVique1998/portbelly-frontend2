import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { ProductInCart } from '../models/product-in-cart';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ProductInCartService {

  url = `${environment.rootUrl}`;
  path: string = "/productInCart";
  publicPath: string = "/public" + this.path;

  httpOptionsJsonPublic = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
    })
  };
  httpOptionsJsonToken = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + this.tokenService.getToken(),

    })
  }
  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  /**
   * @name list
   */

  list(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url + this.publicPath, this.httpOptionsJsonPublic)
      .pipe(
        retry(1)
      );
  }

  /**
   * @name setProductInCart
   */
  setProductInCart(productInCart: ProductInCart): Observable<ProductInCart> {
    console.log(productInCart);
    if (!productInCart.idProductInCart)
      return this.httpClient.post<ProductInCart>(this.url + this.path, productInCart, this.httpOptionsJsonToken).pipe(retry(1));
    else
      return this.httpClient.put<ProductInCart>(this.url + this.path, productInCart, this.httpOptionsJsonToken).pipe(retry(1));
  }

}
