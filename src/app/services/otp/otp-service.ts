import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Url } from '../url';
import { JsonOtpModel } from './json-otp.model';

@Injectable()
export class OtpService {

    private endpoint;
    private url: Url;
    private httpOptions = {
    headers: new HttpHeaders({
      'Content-type':'application/json'
      })
    };
  
    constructor(
      private http: HttpClient) { 
        this.url = new Url();
        this.endpoint = this.url.endPoint;
      }

    enviarSmsOtp(otpModel: JsonOtpModel, bearerToken: string): Observable<any> {        
      let headers = {
          headers: new HttpHeaders({
            'Content-type':'application/json',
            'Authorization':'Bearer '+bearerToken
            }),
          };
      let body = JSON.stringify(otpModel);
    return this.http.post<any>(this.endpoint+'/bid/rest/v1/otp/smsSend',body,headers).pipe(map(this.extractData));        
  }

  verificarSmsOtp(otpModel: JsonOtpModel, bearerToken: string): Observable<any> {        
    let headers = {
        headers: new HttpHeaders({
          'Content-type':'application/json',
          'Authorization':'Bearer '+bearerToken
          }),
        };
    let body = JSON.stringify(otpModel);
    return this.http.post<any>(this.endpoint+'/bid/rest/v1/otp/smsValidate',body,headers).pipe(map(this.extractData));        
  }

    private extractData(res: Response) {
      let body = res;
      return body || { };
    }
  }
  