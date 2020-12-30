import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewUser } from './models/new-user';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend-portbelly';
  isLogged: boolean = false;
  user: NewUser;
  constructor(private authService: AuthService, private tokenService: TokenService,) {
  }
  ngOnInit(): void {
  }

  onSignOut(): void {
    this.tokenService.signOut();
    this.isLogged = false;
  }

  // Paso 6 Comparamos en donde querramos muy importante hacer este paso para cada rol y apoyarse del guardian
  get isAdmin(): any {
    return this.user && this.user.authorities.includes("ROLE_ADMIN");
  }
  get isUser(): any {
    return this.user && this.user.authorities.includes("ROLE_USER");
  }
  get logged(): boolean {
    this.user = this.tokenService.newUser;
    if (this.user != null) {
      if (this.user.userName)
        this.isLogged = true;
      return true;
    }
    else {
      this.isLogged = false;
      return false;
    }
  }

}
