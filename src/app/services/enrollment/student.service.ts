import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from '../token.service';
import { Student } from 'src/app/models/Enrollment/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  authUrl = `${environment.rootUrl}/enrollment`;

  headers_object = new HttpHeaders();

  httpOptionsJsonToken = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Bearer ' + this.tokenService.getToken(),

    })
  }
  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  /**
   * getStudentByIdUSer
   */
  public getStudentByIdUser(id: number): Observable<Student> {
    return this.httpClient.get<Student>(this.authUrl + '/enrollment-repository/student/search/idUser/' + id, this.httpOptionsJsonToken);
  }


}
