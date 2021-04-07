import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtDto } from 'src/app/models/jwt-dto';
import { LoginUser } from 'src/app/models/login-user';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  //SignIn
  public formLoginUser: FormGroup;
  public loginUser: LoginUser;
  private jwtDto: JwtDto;

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
      this.jwtDto = result;

      //Developer
      console.log('Usuario logeado, token verificar, función onSubmit');
      this.onReset();
      this.isLogged = true;
      this.isLoginFail = false;
      this.tokenService.setToken(this.jwtDto.access_token);
      this.tokenService.setUserName(this.jwtDto.username);
      let roles = [];
      if (this.jwtDto.authorities) {
        this.jwtDto.authorities.forEach(element => {
          roles.push(element.name);
        });
      }
      this.tokenService.setAuthorities(roles);
      this.tokenService.isLogged();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Información cargada correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    }, err => {
      this.isLogged = false;
      this.isLoginFail = true;
      this.errMss = err.error.message;
      console.error(this.errMss);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Algo salio mal porfavor vuelve a intentar',
        showConfirmButton: true,
      })
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
