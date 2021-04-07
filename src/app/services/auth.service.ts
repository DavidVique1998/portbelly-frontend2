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

  authUrl = `${environment.rootUrl}/security`;

  headers_object = new HttpHeaders();


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
      'Authorization': 'Basic ' + btoa(`${environment.username}:${environment.password}`)
    })
  };

  // Paso 1: Primero declaramos lasvariables a usar en todo el aplicativo


  constructor(private httpClient: HttpClient) {
  }

  /**
   * signUp
   */
  public signUp(newUser: NewUser): Observable<any> {
    return this.httpClient.post<any>(this.authUrl + '/signup', newUser, { headers: this.headers_object });
  }
  /**
   * signIn
   */
  public signIn(loginUser: LoginUser): Observable<JwtDto> {
    let body = new URLSearchParams();
    body.set('username', loginUser.userName);
    body.set('password', loginUser.password);
    body.set('grant_type', 'password')
    console.log(body);
    console.log(loginUser);
    // { 'username': loginUser.userName, 'password': loginUser.password, 'grant_type': 'password' }
    return this.httpClient.post<JwtDto>(this.authUrl + '/oauth/token', body.toString(), this.httpOptions);
  }



}
