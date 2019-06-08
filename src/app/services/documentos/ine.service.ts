import { Injectable } from '@angular/core';
import { Url } from '../url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IneModel } from '../../services/documentos/ine/model/ine.model';

@Injectable()
export class IneService {

    private endpoint;
    private url: Url;
  
    constructor(
      private http: HttpClient) {
        this.url = new Url();
        this.endpoint = this.url.endPoint
       }
  
    consultarIne(operationId: string, personID: string, ineModel: IneModel, bearerToken: string): Observable<any> {
      let ineModelString = JSON.stringify(ineModel);
      let formData = new FormData();
      formData.append("operationId", operationId);
      formData.append("personID", personID);
      formData.append("arg0", ineModelString);
      let headers = { headers: new HttpHeaders().set('Authorization', 'Bearer ' + bearerToken)}
      return this.http.post<any>(this.endpoint+'/bid/rest/v1/enrollment/ine/newOperation', formData, headers)
      .pipe(map(this.extractData));
    }
  
    private extractData(res: Response) {
      let body = res;
      return body || { };
    }
  }
  