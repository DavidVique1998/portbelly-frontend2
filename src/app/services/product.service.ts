import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  path: string = "/product";
  userPath: string = "/user" + this.path;
  url = `${environment.rootUrl}`;

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
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    })
  };

  constructor(private httpClient: HttpClient) { }

  /**
   * list
   */
  list(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.url + this.userPath, this.httpOptionsJsonPublic)
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
    const fd = new FormData();
    fd.append('file', f, f.name);
    fd.append('object', JSON.stringify(p));
    return this.httpClient.post<Product[]>(this.url + '/withImage', p, this.httpOptionsJsonToken);
  }

  /**
   * create
   */
  create(p: Product): Observable<any> {
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
