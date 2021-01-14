import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/models/login-user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  //SignIn
  public formLoginUser: FormGroup;
  public loginUser: LoginUser;

  private isLogged: boolean;
  private isLoginFail: boolean;
  private errMss: string;
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private tokenService: TokenService, private router: Router) {
    this.loginUser = new LoginUser();
    this.formLoginUser = this.formBuilder.group({
      userNameL: ['', [Validators.required]],
      passwordL: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  get fSignIn(): any {
    return this.formLoginUser.controls;
  }

  /**
 * onSubmitL
 */
  public onSubmit() {
    if (this.formLoginUser.invalid) {
      // Swal.fire({
      //   title: 'Error',
      //   text: 'Error en formulario',
      //   icon: 'error',
      // });
      alert('Por favor ingrese todos los datos')
      //Developer
      console.error('Error en formulario, función onSubmitL');
      return;
    }

    this.authService.signIn(this.loginUser).subscribe(result => {

      //Developer
      console.log('Usuario logeado, token verificar, función onSubmit');
      this.onReset();
      this.isLogged = true;
      this.isLoginFail = false;
      this.tokenService.setToken(result.token);
      this.tokenService.setUserName(result.userName);
      this.tokenService.setAuthorities(result.authorities);
      this.tokenService.isLogged();
      this.router.navigate(['']);
      window.location.reload();
      alert('Usuario Logeado');
    }, err => {
      this.isLogged = false;
      this.isLoginFail = true;
      this.errMss = err.error.message;
      console.error(this.errMss);
      alert(this.errMss);
    })
  }
  /**
   * onReset
   */
  public onReset() {
    this.formLoginUser.reset();
    this.loginUser = new LoginUser();

  }
}
