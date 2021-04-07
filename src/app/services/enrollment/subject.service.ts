import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat';
import { SubjectNrc } from 'src/app/models/Enrollment/subject-nrc';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
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
   * getAllSubjectsNrc
   */
  public getAllSubjectsNrc(): Observable<SubjectNrc[]> {
    return this.httpClient.get<SubjectNrc[]>(this.authUrl + '/enrollment-repository/subjectnrc/all/', this.httpOptionsJsonToken);
  }

}
