import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDto } from '../models/jwt-dto';
import { LoginUser } from '../models/login-user';
import { NewUser } from '../models/new-user';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = `${environment.rootUrl}/auth`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE',
    })
  };

  // Paso 1: Primero declaramos lasvariables a usar en todo el aplicativo

  constructor(private httpClient: HttpClient) { }

  /**
   * signUp
   */
  public signUp(newUser: NewUser): Observable<any> {
    return this.httpClient.post<any>(this.authUrl + '/signup', newUser, this.httpOptions);
  }
  /**
   * signIn
   */
  public signIn(loginUser: LoginUser): Observable<any> {
    return this.httpClient.post<JwtDto>(this.authUrl + '/signin', loginUser, this.httpOptions);
  }



}
