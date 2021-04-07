import { Injectable } from '@angular/core';
import { NewUser } from '../models/new-user';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const AUTHORITIES_KEY = 'AuthAuthorities';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  roles: Array<string> = []
  public newUser = null;
  constructor() {
    this.isLogged();
  }

  /**
   * setToken
   */
  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);

  }

  /**
   * getToken
   */
  public getToken(): string {
    if (sessionStorage.getItem(TOKEN_KEY)) {
      return sessionStorage.getItem(TOKEN_KEY);
    }
  }

  /**
   * setUserName
   */
  public setUserName(userName: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, userName);
  }

  /**
   * getUserName
   */
  public getUserName(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  /**
   * setAuthorities
   */
  public setAuthorities(authorities: string[]): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
    this.isLogged();
  }

  /**
   * getAuthorities
   */
  public getAuthorities(): string[] {
    this.roles = [];
    if (sessionStorage.getItem(AUTHORITIES_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        this.roles.push(authority.authority);
      });
    }
    return this.roles;
  }

  /**
   * @name logOut
   * @description Metodo que sale de la cuenta del usuario
   */
  public signOut(): void {
    window.sessionStorage.clear();
    this.isLogged();
  }

  public isLogged(): void {
    if (sessionStorage.getItem(TOKEN_KEY)) {
      this.newUser = new NewUser();
      this.newUser.userName = this.getUserName();
      this.newUser.authorities = this.getAuthorities();
    }
    else {
      this.newUser = null;
    }
  }


}
