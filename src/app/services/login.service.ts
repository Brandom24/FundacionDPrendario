import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AlertController, NavController } from '@ionic/angular';
import { Usuario } from '../objetosDTO/usuario';
import { LoadingService } from '../services/loading.service';
import { GuardarStorageService } from './guardar-storage.service';
import { URL_TOKEN, URL_SERVICIOS } from '../config/url.services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  token: string;
  result: boolean;
  message: string;
  typeUser: number;
  dataUser: Usuario = new Usuario();
  boton: string;
  jsonFingerOperID: { 'data': { 'operationId': string, 'fingerPrint': string; }; };
  jsonFinger: { 'data': { 'fingerPrint': string; }; };
  finger: string;

  constructor(private http: HttpClient,
              private alertCtrl: AlertController,
              private navCtrl: NavController,
              private loading: LoadingService,
              private _store: GuardarStorageService) {
                this._store.cargarStorage();
                this.jsonFinger = {
                  'data': {
                    'fingerPrint': ''
                    }
              };
              this.jsonFingerOperID = {
                'data': {
                  'operationId': '',
                  'fingerPrint': ''
                  }
            };
              }

  generateToken() {

    this.loading.present('Conectando..');

    const headers = new HttpHeaders({
      'authorization': 'Basic dXNlcmFwcDpwYXNzd29yZA==',
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const params = new HttpParams()
    .set('grant_type', 'password')
    .set('username', 'frd')
    .set('password', 'password');

    return this.http.post(URL_TOKEN + '/uaa/oauth/token', params, {headers})
              .subscribe( async data => {
                this.token = data['access_token'];
                this._store.setBearerToken(this.token);
                this.loading.dismiss();

              }, async error => {
                this.loading.dismiss();

                const alert = await this.alertCtrl.create({
                  backdropDismiss: false,
                  header: 'Ups!',
                  subHeader: 'No se pudo conectar intente nuevamente',
                  buttons: [{
                    text: 'Reintentar',
                    role: 'reintentar',
                    cssClass: 'secondary',
                    handler: () => {
                      this.generateToken();
                    }
                  },
                ]
                });
                await alert.present();
              });
  }

  verifyUser(user: string, password: string) {

    this.loading.present('Verificando datos..');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token
    });

    this.dataUser.setUser(user);
    this.dataUser.setPassword(password);

    const formData = new FormData();
    formData.append('json', JSON.stringify(this.dataUser));

    return this.http.post(URL_SERVICIOS + '/auth/login', formData, {headers})
              .subscribe( async data => {

                console.log('verifyUser', data);
                this.result = data['resultOK'];
                this.message = data['message'];
                this.typeUser = data['user'];

                this.loading.dismiss();

                if (this.result) {
                  this.navCtrl.navigateRoot('menu-principal');

                } else {
                  const alert = await this.alertCtrl.create({
                    backdropDismiss: false,
                    header: 'Error al intentar iniciar sesión',
                    subHeader: this.message,
                    buttons: [{
                      text: 'Cambiar datos',
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

                // this.check_Storage();

              }, async error => {

                this.loading.dismiss();
                console.log(error);
                this.message = error.error.message;
                this.boton = 'Cambiar datos';

                if (error['status'] === 0 || error['status'] === 500) {
                  this.message = 'Problemas con la conexion, vuelva a intentarlo mas tarde.';
                  this.boton = 'Salir';
                }

                const alert = await this.alertCtrl.create({
                  backdropDismiss: false,
                  header: 'Error al intentar iniciar sesión',
                  subHeader: this.message,
                  buttons: [{
                    text: this.boton,
                    role: 'reintentar',
                    cssClass: 'secondary',
                    handler: () => {
                      // accion del boton
                      this.navCtrl.navigateRoot('login');
                    }
                  },
                ]
                });
                await alert.present();
              });
              this.loading.dismiss();
  }

  check_Storage() {
    if (this._store.address_St) {
      // this.navCtrl.navigateRoot('direcciones');
      this.navCtrl.navigateRoot('menu-principal');
    } else {
      // this.navCtrl.navigateRoot('clientes-lista');
      this.navCtrl.navigateRoot('menu-principal');
    }
  }

  finalizar() {
    this._store.setCliente(null);
    this._store.setAnversoIdContrato(null);
    this._store.setDatosDomicilio(null);
    this._store.setDatosOCR(null);
    this._store.setImagenDomicilio(null);
    this._store.setIneAnverso(null);
    this._store.setIneReverso(null);
    this._store.setJsonDatosActivity(null);
    this._store.setOperationID(null);
    this._store.setPersonId(null);
    this._store.setReversoIdContrato(null);
    this._store.setTasReferences(null);
    this._store.setTipoFlujo(null);
    this._store.setTipoINE(null);
    this._store.setTipoIdentificacion(null);
    this._store.setResumenDoctos(null);
    this.navCtrl.navigateRoot('menu-principal');
  }

  verifyFinger() {
    this.loading.present('Verificando datos..');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json',
      'Accept': '*/*',

    });

    this.jsonFinger.data.fingerPrint = this.finger;

    const formData = new FormData();
    formData.append('json', JSON.stringify(this.jsonFinger));

    return this.http.post(URL_SERVICIOS + '/enrollment/finger/identifyFinger', this.jsonFinger, {headers})
              .subscribe( async data => {
                console.log('data result identifyFinger');
                console.log(data, data['code'], data['error']);
                // code: -9601
                switch (data['code']) {
                  case -9601:
                      this.loading.dismiss();
                    this.navCtrl.navigateRoot('tipo-identificacion');
                    break;

                  case -9999:
                      this.loading.dismiss();
                    alert('Este usuario Ya esta registrado : ' + JSON.stringify(data));
                    this.navCtrl.navigateRoot('login');
                      break;

                     //-9401
                  case -9401:
                    this.loading.dismiss();
                      alert('Este usuario NO esta registrado');
                      this.navCtrl.navigateRoot('tipo-identificacion');
                      break;

                  default:
                    this.loading.dismiss();
                    alert('Este usuario NO esta registrado : ' + JSON.stringify(data));
                    this.navCtrl.navigateRoot('tipo-identificacion');
                    break;
                }
                this.loading.dismiss();
                // this.check_Storage();

              }, async error => {
                this.loading.dismiss();
                console.log(error);
                this.message = error.error.message;
                this.boton = 'Reintentar';

                if (error['status'] === 0 || error['status'] === 500) {
                  this.message = 'Problemas con la conexion, vuelva a intentarlo mas tarde.';
                  this.boton = 'Salir';
                }

                const alert = await this.alertCtrl.create({
                  backdropDismiss: false,
                  header: 'Error al intentar verificar datos',
                  subHeader: this.message,
                  buttons: [{
                    text: this.boton,
                    role: 'reintentar',
                    cssClass: 'secondary',
                    handler: () => {
                      // accion del boton
                      this.verifyFinger();
                    }
                  },
                ]
                });
                await alert.present();
              });

  }

  verifyFingerUser(operationID) {
    this.loading.present('Verificando datos..');

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
      'Content-Type': 'application/json',
      'Accept': '*/*',

    });

    this.jsonFingerOperID.data.operationId = operationID;
    this.jsonFingerOperID.data.fingerPrint = this.finger;

    const formData = new FormData();
    formData.append('json', JSON.stringify(this.jsonFingerOperID));

    return this.http.post('http://frd.buroidentidad.com:9421/bid/finger/verify', this.jsonFinger, {headers})
              .subscribe( async data => {
                console.log('data result identifyFinger');
                console.log(data, data['code'], data['error']);
                // code: -9601
                switch (data['code']) {
                  case -9601:
                      this.loading.dismiss();
                    console.log('Usuario NO encontrado');
                    this.navCtrl.navigateRoot('consulta-buro');
                    // this.navCtrl.navigateRoot('login');
                    break;

                  case -9999:
                      this.loading.dismiss();
                      console.log('Este usuario Ya esta registrado : ' + JSON.stringify(data));
                    this.navCtrl.navigateRoot('consulta-buro');
                      break;

                  //-9401
                  case -9401:
                      this.loading.dismiss();
                      console.log('Usuario NO encontrado');
                    this.navCtrl.navigateRoot('consulta-buro');
                    // this.navCtrl.navigateRoot('login');
                    break;

                  default:
                    console.log('Este usuario NO esta registrado : ' + JSON.stringify(data));
                    this.navCtrl.navigateRoot('tipo-identificacion');
                    break;
                }
                this.loading.dismiss();
                // this.check_Storage();

              }, async error => {
                this.loading.dismiss();
                console.log(error);
                this.message = error.error.message;
                this.boton = 'Reintentar';

                if (error['status'] === 0 || error['status'] === 500) {
                  this.message = 'Problemas con la conexion, vuelva a intentarlo mas tarde.';
                  this.boton = 'Salir';
                }

                const alert = await this.alertCtrl.create({
                  backdropDismiss: false,
                  header: 'Error al intentar verificar datos',
                  subHeader: this.message,
                  buttons: [{
                    text: this.boton,
                    role: 'reintentar',
                    cssClass: 'secondary',
                    handler: () => {
                      // accion del boton
                      this.verifyFingerUser(operationID);
                    }
                  },
                ]
                });
                await alert.present();
              });

  }

  setFingerVerify(finger) {
    this.finger = finger;
  }

  getFingerVerify(): any {
    return this.finger;
  }

}
