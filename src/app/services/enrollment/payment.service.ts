import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat';
import { Payment } from 'src/app/models/Enrollment/payment';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token.service';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
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
  public getPaymentsByIdStudent(id: number): Observable<Payment[]> {
    return this.httpClient.get<Payment[]>(this.authUrl + '/enrollment-repository/payment/student/search/idStudent/' + id, this.httpOptionsJsonToken);
  }
}
