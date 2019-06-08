import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { URL_SERVICIOS } from '../config/url.services';

@Injectable({
  providedIn: 'root'
})
export class EstadosMunicipiosService {

  locality: any[];
  url = URL_SERVICIOS + '/catalogues/catalogue/catalogueValues';

  constructor(private http: HttpClient,
              private loginSrv: LoginService) { }

  generateMuni(municipio: string) {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.loginSrv.token
    });

    const formData = new FormData();
    formData.append('json', '{"nombre": "Ciudad", "dependencia": "' + municipio + '" }');

    return this.http.post( this.url , formData, {headers});
  }

  generateState() {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.loginSrv.token
    });

    const formData = new FormData();
    formData.append('json', '{"nombre": "Estado"}');

    return this.http.post(this.url, formData, {headers});
  }
}
