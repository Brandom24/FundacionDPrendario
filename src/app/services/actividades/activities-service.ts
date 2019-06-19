import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonCurrentActivity } from './model/json-current-activity.model';
import { map } from 'rxjs/operators';
import { JsonDatosActivity } from './model/json-datos-activity.model';
import { Url } from '../url';

@Injectable()
export class ActivitiesService {

    private endpoint;
    private url: Url;
    private httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json'
      })
    };

    constructor(
      private http: HttpClient) {
        this.url = new Url();
        this.endpoint = this.url.endPoint;
      }


    obtenerCurrentActivity(code: string, productId: string, bearerToken: string): Observable<any> {    
        const headers = {
            headers: new HttpHeaders({
              'Content-type':'application/json',
              'Authorization':'Bearer '+bearerToken
              }),
              params: new HttpParams()
              .set('code',code)
              .set('productId',productId)
            };
        return this.http.get<any>(this.endpoint + '/bid/rest/v1/activities/current', headers).pipe(map(this.extractData));
    }

    crearDatosActivity(jsonDatosActivity: JsonDatosActivity, bearerToken: string): Observable<any> {
      const headers = {
          headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + bearerToken
            }),
          };
      const body = JSON.stringify(jsonDatosActivity);
      return this.http.post<any>(this.endpoint + '/bid/rest/v1/operations', body, headers).pipe(map(this.extractData));
  }

  actualizarDatosActivity(jsonDatosActivity: JsonDatosActivity, bearerToken: string): Observable<any> {
    const headers = {
        headers: new HttpHeaders({
          'Content-type': 'application/json',
          'Authorization': 'Bearer ' + bearerToken
          }),
        };
    const body = JSON.stringify(jsonDatosActivity);
    return this.http.put<any>(this.endpoint + '/bid/rest/v1/operations', body, headers).pipe(map(this.extractData));
}

actualizarDatosActivityINE(jsonDatosActivity: any, bearerToken: string): Observable<any> {
  const headers = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + bearerToken
        }),
      };
  const body = JSON.stringify(jsonDatosActivity);
  return this.http.put<any>(this.endpoint + '/bid/rest/v1/operations', body, headers).pipe(map(this.extractData));
}

    private extractData(res: Response) {
      let body = res;
      return body || { };
    }
  }
  