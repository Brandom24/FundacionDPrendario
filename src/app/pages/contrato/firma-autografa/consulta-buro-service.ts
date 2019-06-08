import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JsonContrato } from './model/json-contrato.model';
import { Url } from 'src/app/services/url';

@Injectable()
export class ConsultaBuroService {

    private endpoint;
    private url: Url;
  
    constructor(
      private http: HttpClient) { 
        this.url = new Url();
        this.endpoint = this.url.endPoint;
      }

    obtenerContrato(jsonContrato: JsonContrato, bearerToken: string): Observable<any> {        
      let headers = {
          headers: new HttpHeaders({
            'Authorization':'Bearer '+bearerToken,
            'Content-Type': 'application/json'
            }),
          };
      let body = JSON.stringify(jsonContrato);
      return this.http.post<any>(this.endpoint+'/bid/rest/v1/contract/getContract',body,headers).pipe(map(this.extractData));        
  }

    private extractData(res: Response) {
      let body = res;
      return body || { };
    }
  }
  