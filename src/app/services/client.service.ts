import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Client } from '../models/client';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url = `${environment.rootUrl}`;
  path: string = "/client";
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
   * retrieveByUser
   */
  retriveByUserName(username: string): Observable<Client> {
    return this.httpClient.get<Client>(this.url + this.path + '/getClientByUsername/' + username, this.httpOptionsJsonToken)
      .pipe(
        retry(1)
      );
  }

}
