import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Url } from './url';

@Injectable()
export class OauthService {

    private endpoint: string;
    private url: Url;
    private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic dXNlcmFwcDpwYXNzd29yZA=='
      })
    };

    constructor(
      private http: HttpClient) {
        this.url = new Url();
        this.endpoint = this.url.endPointOauth + '/uaa/oauth/token';
       }

    obtenerBearerToken(grant_type: string, username: string, password: string): Observable<any> {
        const body = 'grant_type=' + grant_type + '&username=' + username + '&password=' + password;
        return this.http.post<any>(this.endpoint, body, this.httpOptions)
            .pipe(map(this.extractData));
    }

    private extractData(res: Response) {
      const body = res;
      return body || { };
    }
  }
