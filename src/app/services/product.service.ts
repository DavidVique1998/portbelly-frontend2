import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = `${environment.rootUrl}`;
  path: string = "/product";
  publicPath: string = "/public" + this.path;


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
      Authorization: 'Bearer ' + localStorage.getItem('token'),
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
}
