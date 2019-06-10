import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginService } from './login.service';
import { URL_SERVICIOS } from '../config/url.services';

@Injectable({
  providedIn: 'root'
})
export class DataClientesService {

  user: any;
  url = URL_SERVICIOS + '/operation/listas';
  typePaspport: boolean;

  constructor(private http: HttpClient,
              private login: LoginService) { }

  getUsers(state: string, municipio: string) {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.login.token
    });

    return this.http.get(`${ this.url }?idUser=${ 1 }&State=${ state }&City=${ municipio }` , {headers});
  }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  public setUser(user: string) {
    this.user = user;
  }

  public getUser() {
    return this.user;
  }

}
