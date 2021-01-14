import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  realRol: string;
  realRols: Array<string> = [];
  constructor(private tokenService: TokenService, private router: Router) {

  };
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRol = route.data.expectedRol;
    const roles = this.tokenService.getAuthorities();
    //Get authorities roles and transform to expected rol
    roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.realRols.push('admin');
      }
      if (rol === 'ROLE_MEDIATOR') {
        this.realRols.push('mediator');
      }
      if (rol === 'ROLE_USER') {
        this.realRols.push('user');
      }
    })
    //Verify token and continue
    if (!this.tokenService.getToken()) {
      this.router.navigate(['']);
      alert('Inicia sesión o registrate para continuar');
      this.router.navigate(['/signup']);
      return false;
    }
    let key = false;
    //Search in realRols the expected rol
    this.realRols.forEach(rol => {
      if (expectedRol.indexOf(rol) === 0) {
        key = true;
      }
    });
    //If has the rol return true
    if (key) return true;
    //Else the rol return false
    alert('Se necesita ingresa con el perfil de usuario adecuado');
    return false;
  }
}
