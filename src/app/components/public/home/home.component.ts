import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/models/Enrollment/student';
import { SubjectNrc } from 'src/app/models/Enrollment/subject-nrc';
import { NewUser } from 'src/app/models/new-user';
import { AuthService } from 'src/app/services/auth.service';
import { StudentService } from 'src/app/services/enrollment/student.service';
import { SubjectService } from 'src/app/services/enrollment/subject.service';
import { TokenService } from 'src/app/services/token.service';

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
  public formSearch: FormGroup;
  constructor(private authService: AuthService, private formBuilder: FormBuilder, private tokenService: TokenService, private studentService: StudentService, private subjectService: SubjectService) {
    this.search = null;
    this.formSearch = this.formBuilder.group({
      search: ['', [Validators.required]],
    })
  }

  public onSubmit() {
    if (this.subjectsNrc != null) {
      this.subjectsNrcView = this.subjectsNrc.filter(x => x.nrc.startsWith(this.search));
    }
  }

  ngOnInit(): void {
    if (this.logged) {
      this.getStudentByIdUser();
    }
  }

  getAllSubjectNrc() {
    this.subjectService.getAllSubjectsNrc().subscribe(result => {
      this.subjectsNrc = result;
      this.subjectsNrcView = this.subjectsNrc;
    }, err => {
      console.log(err)
    })
  }

  getStudentByIdUser() {
    this.studentService.getStudentByIdUser(this.user.idStudent).subscribe(result => {
      this.student = result;
      this.getAllSubjectNrc();
      this.getStudentByIdUser();
    }, err => {
      console.log(err)
    })
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
