import { Injectable } from '@angular/core';
import { Url } from '../url';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CatalogoValuesIn } from './model/catalogo-values-in.model';
import { map } from 'rxjs/operators';

@Injectable()
export class CatalogoService {

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

      obtenerElementosCatalogo(catalogoValuesIn: CatalogoValuesIn, bearerToken:string): Observable<any> {        
        let formData = new FormData();
        let body = JSON.stringify(catalogoValuesIn);
        formData.append("json", body);
        let headers = {headers: new HttpHeaders().set('Authorization', 'Bearer '+bearerToken)};
        return this.http.post<any>(this.endpoint+'/bid/rest/v1/catalogues/catalogue/catalogueValues',formData,headers).pipe(map(this.extractData));        
    }

    obtenerElementosCatalogoPorNombreDep(nombreCatalogo: string, bearerToken:string, dependenciaCatalogo?: number): Observable<any> {        
      let formData = new FormData();
      let catalogoValuesIn = new CatalogoValuesIn(nombreCatalogo, dependenciaCatalogo);
      let body = JSON.stringify(catalogoValuesIn);
      formData.append("json", body);
      let headers = {headers: new HttpHeaders().set('Authorization', 'Bearer '+bearerToken)};
      return this.http.post<any>(this.endpoint+'/bid/rest/v1/catalogues/catalogue/catalogueValues',formData,headers).pipe(map(this.extractData));        
  }
      
    obtenerElementosCatalogoPorNombreDep2(nombreCatalogo: string, bearerToken:string): Observable<any> {        
      
      let parametros = {
        headers: new HttpHeaders().set('Authorization', 'Bearer '+bearerToken),
        params: new HttpParams()
      .set('value',nombreCatalogo)};
      return this.http.get<any>(this.url.endPoint9415+'/bid/rest/v1/catalogues/selector',parametros).pipe(map(this.extractData));        
  }

  obtenerElementosCatalogoPorNombreDepConFilter2(nombreCatalogo: string, bearerToken:string, filter?: string): Observable<any> {        
      
    let parametros = {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+bearerToken),
      params: new HttpParams()
    .set('value',nombreCatalogo)
    .set('filter',filter)};
    return this.http.get<any>(this.url.endPoint9415+'/bid/rest/v1/catalogues/selector',parametros).pipe(map(this.extractData));        
}
      obtenerCatalogoIds()
      {
          let ids = [];
          ids.push(
              {name:"INE",code:"IDOFA",document_group:"1",id:1},
              {name:"DOCMIGRA",code:"IDOFB",document_group:"2",id:4},
              {name:"PASAPORTE",code:"IDOFA",document_group:"3",id:5});
            return ids;
      }

    private extractData(res: Response) {
      let body = res;
      return body || { };
    }
  }