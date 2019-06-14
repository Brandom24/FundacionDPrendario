import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Enroll } from '../pages/tipo-identificacion/biometria-dactilar/modal/Enroll.model';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Url } from './url';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnrollService {
  url: Url;
  endpoint: string;

  constructor(
    private http: HttpClient) {
      this.url = new Url();
      this.endpoint = this.url.endPoint;
    }

  guardarFingerEnroll(jsonEnroll: Enroll, bearerToken: string): Observable<any> {
    const formData = new FormData();
    const body = JSON.stringify(jsonEnroll);
    formData.append('json', body);
    const headers = {headers: new HttpHeaders().set('Authorization', 'Bearer ' + bearerToken)};
    return this.http.post<any>(this.endpoint + '/bid/rest/v1/enrollment/finger/enroll', formData, headers)
    .pipe(map(this.extractData));
  }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

}
