import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from './models/Enrollment/student';
import { NewUser } from './models/new-user';
import { AuthService } from './services/auth.service';
import { PaymentService } from './services/enrollment/payment.service';
import { StudentService } from './services/enrollment/student.service';
import { TokenService } from './services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend-portbelly';
  isLogged: boolean = false;
  user: NewUser;
  student: Student;
  constructor(private tokenService: TokenService, private studentService: StudentService, private paymentService: PaymentService) {
  }
  ngOnInit(): void {
  }

  getStudentByIdUser() {
    this.studentService.getStudentByIdUser(this.user.idStudent).subscribe(result => {
      this.student = result;
    }, err => {
      console.log(err)
    })
  }


  onSignOut(): void {
    this.tokenService.signOut();
    this.isLogged = false;
    this.user = null;
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Saliste correctamente',
      showConfirmButton: false,
      timer: 1500
    })
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
