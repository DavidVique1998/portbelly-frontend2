import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client';
import { ShoppingCart } from '../models/shopping-cart';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  url = `${environment.rootUrl}`;
  path: string = "/shoppingCart";
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
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + this.tokenService.getToken(),

    })
  }
  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  /**
   * @name setShoppingCart
   */
  setShoppingCart(shoppingCart: ShoppingCart): Observable<ShoppingCart> {
    if (!shoppingCart.idShoppingCart)
      return this.httpClient.post<ShoppingCart>(this.url + this.path, shoppingCart, this.httpOptionsJsonToken).pipe(retry(1));
    else
      return this.httpClient.put<ShoppingCart>(this.url + this.path, shoppingCart, this.httpOptionsJsonToken).pipe(retry(1));
  }

  /**
   * @name getShoppingCart
   */
  getShoppingCart(client: Client): Observable<ShoppingCart> {
    return this.httpClient.get<ShoppingCart>(this.url + this.path + '/client/typePendiente/' + client.idClient, this.httpOptionsJsonToken).pipe(retry(1));
  }

}
