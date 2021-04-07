import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Enrollment } from 'src/app/models/Enrollment/enrollment';
import { Student } from 'src/app/models/Enrollment/student';
import { SubjectNrc } from 'src/app/models/Enrollment/subject-nrc';
import { NewUser } from 'src/app/models/new-user';
import { AuthService } from 'src/app/services/auth.service';
import { EnrollmentService } from 'src/app/services/enrollment/enrollment.service';
import { StudentService } from 'src/app/services/enrollment/student.service';
import { SubjectService } from 'src/app/services/enrollment/subject.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLogged: boolean = false;
  user: NewUser;
  student: Student;
  search: string;
  subjectsNrc: SubjectNrc[];
  subjectsNrcView: SubjectNrc[];
  enrollments: Enrollment[];
  p: number = 1;
  public formSearch: FormGroup;
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private tokenService: TokenService, private studentService: StudentService, private subjectService: SubjectService, private enrollmentService: EnrollmentService) {
    this.search = null;
    this.formSearch = this.formBuilder.group({
      search: ['', [Validators.required]],
    })
  }

  public onSearch() {
    if (this.subjectsNrc != null) {
      this.subjectsNrcView = this.subjectsNrc.filter(x => x.nrc.startsWith(this.search));
      if (this.subjectsNrcView?.length == 0) {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Ningun materia encontrada',
          showConfirmButton: true,
        })
      }
    }
  }

  ngOnInit(): void {
    if (this.logged) {
      this.getStudentByIdUser();
    }
  }
  //SubjectNrc
  getAllSubjectNrc() {
    this.subjectService.getAllSubjectsNrc().subscribe(result => {
      this.subjectsNrc = result;
      this.subjectsNrcView = this.subjectsNrc;
    }, err => {
      console.log(err)
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Sin materias',
        showConfirmButton: true,
      })
    })
  }
  //Student
  getStudentByIdUser() {
    this.studentService.getStudentByIdUser(this.user.idStudent).subscribe(result => {
      this.student = result;
      this.getAllSubjectNrc();
      this.getStudentByIdUser();
      this.getEnrollmentsByIdStudent();
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
  //Enrollments
  getEnrollmentsByIdStudent() {
    this.enrollmentService.getEnrollmentsByIdStudent(this.student.id).subscribe(result => {
      this.enrollments = result;
    }, err => {
      console.log(err)
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Sin matriculas',
        showConfirmButton: true,
      })
    })
  }
  //Delete Enrollment
  deleteByIdEnrollmentAndIdStudent(idEnrollment: number) {
    this.enrollmentService.deleteByIdEnrollmentAndIdStudent(idEnrollment).subscribe(result => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Matrícula eliminada correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    }, err => {
      console.log(err)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Algo salio mal porfavor vuelve a intentar',
        showConfirmButton: true,
      })
    })
  }

  //Create Enrollment
  createByIdEnrollmentAndIdStudent(idEnrollment: number) {
    this.enrollmentService.createByIdEnrollmentAndIdStudent(idEnrollment, this.student.id).subscribe(result => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Matrícula agregada correctamente',
        showConfirmButton: false,
        timer: 2500
      })
    }, err => {
      console.log(err)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Algo salio mal porfavor vuelve a intentar',
        showConfirmButton: true,
      })
    })
  }

  //Delete Enrollment
  public onDeleteEnrollment(idEnrollment: number) {
    if (this.student) {
      Swal.fire({
        title: 'Estas seguro?',
        text: "Tu no podras revertir este proceso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteByIdEnrollmentAndIdStudent(idEnrollment);
        }
      })
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Estudiante no reconocido porfavor recarga la página',
        showConfirmButton: true,
      })
    }
  }
  //Create Enrollment
  public onCreateEnrollment(idEnrollment: number) {
    if (this.student) {
      Swal.fire({
        title: 'Estas seguro?',
        text: "Tu no podras revertir este proceso!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, matricularme!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.createByIdEnrollmentAndIdStudent(idEnrollment);
        }
      })
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Estudiante no reconocido porfavor recarga la página',
        showConfirmButton: true,
      })
    }
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
