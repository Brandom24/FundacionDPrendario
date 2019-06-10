import { Injectable } from '@angular/core';
import { Url } from '../url';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from '../../services/login.service';
import { JsonRequest } from '../documentos/model/jsonRequest.model';
import { FormatoDataFile } from '../../herramientas/formato-dataFile';
import { JsonOcr } from '../documentos/model/json-ocr.model';
import { DataFile } from './model/data-file.model';

@Injectable()
export class DocumentosService {

    private endpoint;
    private url: Url;
    private formatoDataFile: FormatoDataFile = new FormatoDataFile();

    constructor(
      private login: LoginService,
      private http: HttpClient) {
        this.url = new Url();
        this.endpoint = this.url.endPoint;
       }

  cargarDocumento(jsonRequest: JsonRequest,
    dataFile1: DataFile, file1: any, bearerToken: string,
    dataFile2?: DataFile, file2?: any): Observable<any> {
    const formData = new FormData();
    const jsonRequestString = JSON.stringify(jsonRequest);
    formData.append('jsonRequest', jsonRequestString);
    const dataFile1String = this.formatoDataFile.formatearDataFile(dataFile1);
    formData.append('dataFile1', dataFile1String);
    formData.append('file1', file1);
    let dataFile2String;
    if (dataFile2 && file2) {
      dataFile2String = this.formatoDataFile.formatearDataFile(dataFile2);
      formData.append('dataFile2', dataFile2String);
      formData.append('file2', file2);
    }
  return this.http.post<any>(this.endpoint + '/bid/rest/v1/documents/upload', formData, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + this.login.token)
      })
    .pipe(map(this.extractData));
}

extraerDatosOcr(jsonOcr: JsonOcr, file1: any, bearerToken: string, file2?:any): Observable<any> {
  const formData = new FormData();
  const jsonRequestString = JSON.stringify(jsonOcr);
  formData.append('json', jsonRequestString);
  formData.append('file1', file1);
  if (file2) {
    formData.append('file2', file2);
  }
  return this.http.post<any>(this.endpoint + '/bid/rest/v1/enrollment/ocr/document', formData, {
    headers: new HttpHeaders().set('Authorization', 'Bearer ' + bearerToken)
    })
  .pipe(map(this.extractData));
}

extraerDatosOcr2(operationId: number, personId: number,
  file1: any, docCode1: string, bearerToken: string,
  file2?: any, docCode2?: string): Observable<any> {
  const formData = new FormData();
  formData.append('json', '{}');
  formData.append('operationID', operationId.toString());
  formData.append('personID', personId.toString());
  formData.append('file1', file1);
  formData.append('docCode1', docCode1);
  if (file2 && docCode2) {
    formData.append('file2', file2);
  formData.append('docCode2', docCode2);
  }
  // content=application/pdf
  formData.append('content', 'image/jpeg');
  return this.http.post<any>(this.endpoint + '/bid/rest/v1/enrollment/ocr/document', formData, {
    headers: new HttpHeaders().set('Authorization', 'Bearer ' + bearerToken)
    })
  .pipe(map(this.extractData));
}

extraerDatosOcrDomicilio(operationId: number, file: any, b64File: string, bearerToken: string): Observable<any> {
  const formData = new FormData();
  const jsonOperationId = {operationID: operationId};
  formData.append('json', JSON.stringify(jsonOperationId));
  formData.append('fileb64', b64File);
  formData.append('file', file);
  return this.http.post<any>(this.endpoint + '/bid/rest/v1/enrollment/ocr/cd', formData, {
    headers: new HttpHeaders().set('Authorization', 'Bearer ' + bearerToken)
    })
  .pipe(map(this.extractData));
}

private extractData(res: Response) {
  const body = res;
  return body || { };
}
obtenerDocumento(idReference: string, bearerToken: string): Observable<any> {
  const headers = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + bearerToken
      }),
      params: new HttpParams()
      .set('reference', idReference)
    };
return this.http.get<any>(this.endpoint + '/bid/rest/v1/tas/tascontroller/file', headers).pipe(map(this.extractData));
}

}