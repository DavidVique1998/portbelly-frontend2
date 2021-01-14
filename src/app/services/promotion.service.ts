import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Promotion } from '../models/promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  url = `${environment.rootUrl}`;
  path: string = "/promotion";
  publicPath: string = "/public" + this.path;

  httpOptionsJsonPublic = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  };
  constructor(private httpClient: HttpClient) { }

  /**
 * list
 */
  list(): Observable<Promotion[]> {
    return this.httpClient.get<Promotion[]>(this.url + this.publicPath, this.httpOptionsJsonPublic)
      .pipe(
        retry(1)
      );
  }
}
