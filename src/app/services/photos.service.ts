import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { PhotosDTO } from '../objetosDTO/photosDTO';
import { AlertController, NavController } from '@ionic/angular';
import { GuardarStorageService } from './guardar-storage.service';
import { RazonesService } from './razones.service';
import { LoadingService } from './loading.service';
import { URL_SERVICIOS } from '../config/url.services';

@Injectable({
  providedIn: 'root'
})

export class PhotosService {

  dataP: PhotosDTO = new PhotosDTO();
  result: boolean;
  message: string;
  resultR: string;
  messageR: string;

  productoId: number;
  activityStatus: string;
  dataR: string;
  secuence: number;
  workflowId: number;
  personId: number;
  timeZoneId: number;
  userId: number;

  constructor(private http: HttpClient,
              private login: LoginService,
              private alertCtrl: AlertController,
              private navCtrl: NavController,
              private _store: GuardarStorageService,
              private razones: RazonesService,
              private loading: LoadingService) {}

  sendPhotos( photos: any, fecha: any) {

    this.loading.present('Finalizando..');

    const formData = new FormData();
    console.log(photos.size);

    console.log('Operation ID -------' + this.razones.getOperationId().toString());
    if (photos.has(1) && photos.has(2)) {

    this.dataP.setDocCode1('IDOFA');
    this.dataP.setDocCode2('IDOFB');
    this.dataP.setOperID1(this.razones.getOperationId().toString());
    this.dataP.setOperID2(this.razones.getOperationId().toString());
    this.dataP.setActivityStatus1('OK');
    this.dataP.setActivityStatus2('OK');
    this.dataP.setLat(photos.get(3) ? photos.get(3) : 19 );
    this.dataP.setLng(photos.get(4) ? photos.get(4) : -90);
    formData.append('jsonRequest', JSON.stringify(this.dataP));
    formData.append('file1', photos.get('blobP'));
    formData.append('dataFile1', JSON.stringify(this.generateJson('Vivienda_Exterior', fecha)));
    formData.append('file2', photos.get('blobS'));
    formData.append('dataFile2', JSON.stringify(this.generateJson('Vivienda_Interior', fecha)));

    } else {

    this.dataP.setDocCode1('IDOFA');
    this.dataP.setOperID1(this.razones.getOperationId().toString());
    this.dataP.setActivityStatus1('OK');
    this.dataP.setLat(photos.get(3));
    this.dataP.setLng(photos.get(4));
    formData.append('jsonRequest', JSON.stringify(this.dataP));
    formData.append('file1', photos.get('blobP'));
    formData.append('dataFile1', JSON.stringify(this.generateJson('Vivienda_Exterior', fecha)));

    }

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.login.token
    });

    //JSON.stringify(formData));

    return this.http.post(URL_SERVICIOS + '/documents/upload', formData, {headers})
              .subscribe( data => {
                this.result = data['resultOK'];
                this.message = data['message'];

                console.log(data);
                console.log('Servicios de fotos' + this.message);

                this.loading.dismiss();
                photos.clear();
                this.finishedVisit();

              }, async error => {
                this.result = error['resultOK'];
                this.message = error['message'];
                console.log(error);

                this.loading.dismiss();
                photos.clear();
                this.presentAlert(this.message);

              });

  }

  generateJson( name: string, fecha: string) {

    const jsonF = {
    'docType': 'bid:Anverso',
    'bid:Nombre': name,
    'bid:PrimerApellido': name,
    'bid:SegundoApellido': name,
    'bid:IDENTIFICACION': '123549',
    'bid:Fecha': fecha,
    'bid:TipoID': 'INE',
    'bid:ScanId': '123123'};

    return jsonF;

  }

  saveRazones( razon: string, actividad: string, define: boolean) {

    if (define) {
      this.loading.present('Finalizando..');
    } else {

    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.login.token
    });

    return this.http.put(URL_SERVICIOS + '/operations', JSON.stringify(this.razonesJ(razon, actividad)), {headers})
            .subscribe( data => {
              this.resultR = data['error'];
              this.messageR = data['message'];
              console.log('SaveRazones' + JSON.stringify(data));
              console.log('SaveRazones' + this.messageR);

              if (define) {
                this.loading.dismiss();
                this.finishedVisit();
              } else {

              }

            }, async error => {
              this.resultR = error['error'];
              this.messageR = error['message'];
              console.log('SaveRazones' + JSON.stringify(error));

              if (define) {

                this.loading.dismiss();
                this.presentAlert(this.messageR);

              } else {

              }

            });
  }

  razonesJ(razon: string, actividad: string) {

    const jsonR = {
      'data': {
        'activityStatus': actividad,
        'data': '{"razon": "' + razon + '" }',
        'productId': this.razones.getProductId(),
        'secuence': this.razones.getSecuence(),
        'workflowId': this.razones.getWorkflowId(),
        'personId': 1
      },
      'metadata': {
        'timeZoneId': 1,
        'userId': this.login.typeUser
      },
      'operationId': this.razones.getOperationId()
    };

    return jsonR;
  }

  finishedVisit() {
    this._store.cerrarSesion();
    this.navCtrl.navigateRoot('login');
  }

  async presentAlert( subHeader: string ) {

    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: 'Ups!',
      buttons: [{
        text: 'Reintentar',
        role: 'reintentar',
        cssClass: 'secondary',
        handler: () => {
          // accion del boton
        }
      },
    ]
    });
    await alert.present();

  }
}
