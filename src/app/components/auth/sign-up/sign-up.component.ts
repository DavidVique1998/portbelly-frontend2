import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/models/login-user';
import { NewUser } from 'src/app/models/new-user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  //SignUp
  public formNewUser: FormGroup;
  public newUser: NewUser;
  //SignIn
  public formLoginUser: FormGroup;
  public loginUser: LoginUser;

  private isLogged: boolean;
  private isLoginFail: boolean;
  private errMss: string;
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private tokenService: TokenService, private router: Router) {
    this.newUser = new NewUser();
    this.formNewUser = this.formBuilder.group({
      name: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      repassword: ['', [Validators.required]],
      email: ['', [Validators.required]],
    })

    this.loginUser = new LoginUser();
    this.formLoginUser = this.formBuilder.group({
      userNameL: ['', [Validators.required]],
      passwordL: ['', [Validators.required]],
    })

  }

  ngOnInit(): void {
  }

  get fSignUp(): any {
    return this.formNewUser.controls;
  }

  get fSignIn(): any {
    return this.formLoginUser.controls;
  }

  /**
   * onSubmit
   */
  public onSubmit() {
    if (this.formNewUser.invalid) {
      // Swal.fire({
      //   title: 'Error',
      //   text: 'Error en formulario',
      //   icon: 'error',
      // });
      alert('Por favor ingrese todos los datos')
      //Developer
      console.error('Error en formulario, función onSubmit');
      return;
    }
    this.newUser.authorities = [""];
    this.authService.signUp(this.newUser).subscribe(result => {
      alert('Usuario registrado');
      //Developer
      console.log('Usuario guardado, función onSubmit');
      this.onReset();
    })
  }
  /**
   * onSubmitL
   */
  public onSubmitL() {
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
      alert('Usuario Logeado');
      //Developer
      console.log('Usuario logeado, token verificar, función onSubmit');
      this.isLogged = true;
      this.isLoginFail = false;
      this.tokenService.setToken(result.token);
      this.tokenService.setUserName(result.userName);
      this.tokenService.setAuthorities(result.authorities);
      this.tokenService.isLogged();
      this.router.navigate(['']);
    }, err => {
      this.isLogged = false;
      this.isLoginFail = true;
      this.errMss = err.error.message;
      console.error(this.errMss);
    })
  }

  /**
   * onReset
   */
  public onReset() {
    this.formNewUser.reset();
    this.newUser = new NewUser();
  }


  /**
   * onResetL
   */
  public onResetL() {
    this.formLoginUser.reset();
    this.loginUser = new LoginUser();

  }

}
