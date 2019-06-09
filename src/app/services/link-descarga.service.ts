import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GuardarStorageService } from './guardar-storage.service';
import { URL_SERVICIOS } from '../config/url.services';

@Injectable({
  providedIn: 'root'
})
export class LinkDescargaService {

  constructor(private http: HttpClient,
              private guardarS: GuardarStorageService) { }

  generateLink() {

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.guardarS.getBearerToken(),
      'Content-Type': 'application/json'
    });

    return this.http.post(URL_SERVICIOS + '/downloads/link', JSON.stringify(this.linkJ()), {headers})
                .subscribe( data => {
                  console.log(data);
                  
                }, error => {
                  console.log(error);
                  
                })
  }

  linkJ() {
    const dataJ = {
      'operationId': 168,
      'metadata': {
          'userId': 1,
          'latutide': 90,
          'longitude': 90,
          'accuracy': 3,
          'deviceInfo': 'deviceinfo',
          'timeZoneId': 1
      },
      'data': {
          'name': ''
      }
  };

  return dataJ;

  }
}
