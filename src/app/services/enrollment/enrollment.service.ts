import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token.service';
import { Observable } from 'rxjs-compat';
import { Enrollment } from 'src/app/models/Enrollment/enrollment';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  authUrl = `${environment.rootUrl}/enrollment`;

  headers_object = new HttpHeaders();

  httpOptionsJsonToken = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.tokenService.getToken(),
    })
  }

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  /**
 * getEnrollmentsByIdStudent
 */
  public getEnrollmentsByIdStudent(id: number): Observable<Enrollment[]> {
    return this.httpClient.get<Enrollment[]>(this.authUrl + '/enrollment-repository/enrollment/student/search/idStudent/' + id, this.httpOptionsJsonToken);
  }

  public deleteByIdEnrollmentAndIdStudent(idEnrollment: number): Observable<any> {
    return this.httpClient.delete<any>(this.authUrl + '/enrollment-repository/enrollment/student/delete/' + idEnrollment, this.httpOptionsJsonToken);
  }

  public createByIdEnrollmentAndIdStudent(idEnrollment: number, idStudent: number,): Observable<Enrollment> {
    return this.httpClient.get<Enrollment>(this.authUrl + '/enrollment-repository/enrollment/student/create/' + idEnrollment + '/' + idStudent, this.httpOptionsJsonToken);
  }

}
