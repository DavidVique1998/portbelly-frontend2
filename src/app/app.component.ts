import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from './models/Enrollment/student';
import { NewUser } from './models/new-user';
import { AuthService } from './services/auth.service';
import { PaymentService } from './services/enrollment/payment.service';
import { StudentService } from './services/enrollment/student.service';
import { TokenService } from './services/token.service';
import Swal from 'sweetalert2';
import { Payment } from './models/Enrollment/payment';

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
  payments: Payment[];
  total: number = 0;
  constructor(private tokenService: TokenService, private studentService: StudentService, private paymentService: PaymentService) {
  }
  ngOnInit(): void {
    if (this.logged) {
      this.getStudentByIdUser();
    }
  }

  getStudentByIdUser() {
    this.studentService.getStudentByIdUser(this.user.idStudent).subscribe(result => {
      this.student = result;
      this.getPaymentsByIdStudent();
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Informacón cargada correctamente',
        showConfirmButton: false,
        timer: 2500
      })
    }, err => {
      console.log(err)
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Algo salio mal porfavor vuelve recargar la página',
        showConfirmButton: true,
      })
    })
  }

  getPaymentsByIdStudent() {
    this.paymentService.getPaymentsByIdStudent(this.student.id).subscribe(result => {
      this.payments = result;
      this.total = 0;
      this.payments.forEach(element => {
        this.total += element.quantity;
      });
    }, err => {
      console.log(err)
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Algo salio mal porfavor vuelve recargar la página',
        showConfirmButton: true,
      })
    })
  }

  onDeletePayment(id: number) {

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
