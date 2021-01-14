import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = `${environment.rootUrl}`;
  path: string = "/category";
  publicPath: string = "/public" + this.path;

  httpOptionsJsonPublic = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
    })
  };
  constructor(private httpClient: HttpClient) { }

  /**
 * listArea
 */
  listAreas(): Observable<String[]> {
    return this.httpClient.get<String[]>(this.url + this.publicPath + '/areas', this.httpOptionsJsonPublic)
      .pipe(
        retry(1)
      );
  }
  /**
 * listCategories
 */
  listCategories(area: String): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.url + this.publicPath + '/area/' + area, this.httpOptionsJsonPublic)
      .pipe(
        retry(1)
      );
  }

}
