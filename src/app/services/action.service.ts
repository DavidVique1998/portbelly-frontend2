import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Action } from '../models/action';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  url = `${environment.rootUrl}`;
  path: string = "/action";
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
   * retrieveByClientIDAndProductID
   */
  retrieveByClientIDAndProductID(idClient: number, idProduct: number): Observable<Action> {
    return this.httpClient.get<Action>(this.url + this.path + '/' + idClient + '/' + idProduct, this.httpOptionsJsonToken);
  }

  /**
   * setAction
   */
  setAction(action: Action): Observable<Action> {
    if (!action.idAction)
      return this.httpClient.post<Action>(this.url + this.path, action, this.httpOptionsJsonToken).pipe(retry(1));
    else
      return this.httpClient.put<Action>(this.url + this.path, action, this.httpOptionsJsonToken).pipe(retry(1));
  }

}
