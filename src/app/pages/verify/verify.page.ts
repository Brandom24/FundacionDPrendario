import { Component, OnInit } from '@angular/core';
import { JsonData } from 'src/app/services/actividades/model/json-data.model';
import { JsonMetadata } from 'src/app/services/actividades/model/json-metadata.model';
import { JsonDatosActivity } from 'src/app/services/actividades/model/json-datos-activity.model';
import { Enroll } from '../tipo-identificacion/biometria-dactilar/modal/Enroll.model';
import { AlertController, NavController, LoadingController, Platform } from '@ionic/angular';
import { OauthService } from 'src/app/services/oauth.service';
import { LoginService } from 'src/app/services/login.service';
import { ActivitiesService } from 'src/app/services/actividades/activities-service';
import { GuardarStorageService } from 'src/app/services/guardar-storage.service';
import { EnrollService } from 'src/app/services/enroll.service';
import { HttpErrorResponse } from '@angular/common/http';
import { JsonInnerData } from 'src/app/services/actividades/model/json-inner-data.model';
import { JsonPersonalData } from 'src/app/services/actividades/model/json-personal-data.model';
import { JsonCamposContrato } from '../contrato/firma-autografa/model/json-campos-contrato.model';
import { LoadingService } from 'src/app/services/loading.service';
import { VariablesSesion } from 'src/app/services/model/variables-sesion.model';
import { Cliente } from '../tipo-identificacion/consulta-similitud-confirmacion/model/Cliente.model';
import { DataFile } from 'src/app/services/documentos/model/data-file.model';
import { JsonRequest } from 'src/app/services/documentos/model/jsonRequest.model';

declare var FingersBidEnrollment: any;
declare var IdentyFingers: any;

@Component({
  selector: 'app-verify',
  templateUrl: './verify.page.html',
  styleUrls: ['./verify.page.scss'],
})
export class VerifyPage implements OnInit {
  userId: any;
  idFinger: boolean;
  idFinger2: any;
  isValidoHuellas: boolean;
  idSelfie: any;
  idSelfie2: any;
  isValidoRostroSpinner: boolean;
  isValidoHuellasSpinner: boolean;
  isValidoRostro: boolean;
  secuenceId: number;
  validateCapture: boolean;
  jsonEnroll: Enroll;
  esCargando: boolean;
  estampaTiempo: any;
  firma: string;
  esConsultar: boolean = false;
  bearerToken: string;
  // operationId: string;
  cliente: Cliente;
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
   date = new Date();
  esMostrarFirma: boolean = false;
  activityData: VariablesSesion;
  pdfContrato: any;
  autografa: boolean;
  digital: boolean;
  documentPDF: any;
  fag: boolean;
  finger: any;
  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private loading: LoadingService,
    private platform: Platform,
    private oauth: OauthService,
    private login: LoginService,
    private activityService: ActivitiesService,
    private saveS: GuardarStorageService,
    private enroll: EnrollService
  ) { }

  ngOnInit() {
    this.saveS.setDatosOCR('');
    this.secuenceId = 19;
  }

  async selectBio() {
    const alert = await this.alertCtrl.create({
      header: 'Modo de captura dactilar.',
      mode: 'ios',
      message: '<img src="../../assets/img/huella_2.png" class=""><br/>'
      + 'Selecione el modo de captura para huella dactilar.',
      buttons: [
        {
          text: '2F',
          handler: () => {
            // Llamar 2F
            this.startFingersEnrollment2F();
          }
        },
        {
          text: '4F',
          handler: () => {
            // llamar 4F
            this.startFingersEnrollment();
          }
        }
      ]
    });
    await alert.present();
  }

  async startFingersEnrollment2F() {
    this.crearDatosActivity();
    this.desahilitarBotonHuellas();
    this.desahilitarBotonRostro();
    this.activarSpinnerHuellas();
    const loading = await this.loadingCtrl.create({
      spinner: null,
      message: 'Cargando',
      duration: 5000,
      translucent: true,
      cssClass: 'loading_img'
    });
    await loading.present();

    if (this.platform.is('ios')) {
        this.platform.ready().then(async () => {
            if (typeof IdentyFingers !== 'undefined') {
              this.userId = 0;
            const encryptionSecret: any = this.userId;
            const { role, data } = await loading.onDidDismiss();
            IdentyFingers.initialize(this.userId, this.login.token , 'Donde',
              // idFinger
              (result) =>  {
                  this.idFinger = true;
                  console.log('OnSucces FingersBidEnrollment', result);
                  this.habilitarButonHuellas();
                  this.habilitarButonRostro();
                  this.DesactivarSipnnerHuellas();
                  this.presentAlertConfirm('Tu huellas se han registrado correctamente');
                  this.actualizarActivity('FINALIZADO', this.secuenceId);
                  this.validateCapture = true;
                  return (this.idFinger);
                },
              (error) =>  {
                  this.idFinger = true;
                  console.log('OnSucces FingersBidEnrollment', error);
                  this.habilitarButonHuellas();
                  this.habilitarButonRostro();
                  this.DesactivarSipnnerHuellas();
                  this.presentAlertConfirm('Tu huellas NO se han registrado correctamente');
                  return (this.idFinger2);
                });
              setInterval(() => {
                this.getIdFinger();
                this.getIdFinger2();
                   }, 100);
                   this.habilitarButonHuellas();
                   this.habilitarButonRostro();
                   this.DesactivarSipnnerHuellas();
                } else {
                  this.presentAlertConfirm('Inicializando complemento, por favor vuelva intentarlo.');
                  this.habilitarButonHuellas();
                  this.habilitarButonRostro();
                  this.DesactivarSipnnerHuellas();
                    }
             });
      } else {
        if (this.platform.is('android')) {
              this.platform.ready().then(async () => {
              if (typeof FingersBidEnrollment !== 'undefined') {
                FingersBidEnrollment.initializeVerify(0, 'Donde',
                  async (jsonFingerPrintsString) =>  {
                  console.log('Tu huellas son : ');
                  console.log(jsonFingerPrintsString);
                  // llamar metodo para guardar huellas en el back
                 this.enviarDigital(jsonFingerPrintsString);
                 this.actualizarActivity('FINALIZADO', this.secuenceId);

                  const { role, data } = await loading.onDidDismiss();
                  console.log('Se inicializo correctamente ó termino');
                   } , (error_initialize) => {
                      console.log('error_initialize FingersBidEnrollment', error_initialize);
                    });

                 setInterval(() => {
                          this.getIdFinger();
                          this.getIdFinger2();
                       }, 100);
                } else {
                  this.presentAlertConfirm('Inicializando completomento, por favor vuelva intentarlo.');
                      this.habilitarButonHuellas();
                      this.habilitarButonRostro();
                      this.DesactivarSipnnerHuellas();
                }
            });
          }
        }

  }

  async startFingersEnrollment() {
    this.crearDatosActivity();
    this.desahilitarBotonHuellas();
    this.desahilitarBotonRostro();
    this.activarSpinnerHuellas();
    const loading = await this.loadingCtrl.create({
      spinner: null,
      message: 'Cargando',
      duration: 5000,
      translucent: true,
      cssClass: 'loading_img'
    });
    await loading.present();
    this.actualizarActivity('EN PROCESO', this.secuenceId);
    if (this.platform.is('ios')) {
        this.platform.ready().then(async () => {
            if (typeof IdentyFingers !== 'undefined') {
              this.userId = 0;
            const encryptionSecret: any = this.userId;
            const { role, data } = await loading.onDidDismiss();
            IdentyFingers.initialize(this.userId, this.login.token , 'Donde',
              // idFinger
              (result) =>  {
                  this.idFinger = true;
                  console.log('OnSucces FingersBidEnrollment', result);
                  this.habilitarButonHuellas();
                  this.habilitarButonRostro();
                  this.DesactivarSipnnerHuellas();
                  this.presentAlertConfirm('Tu huellas se han registrado correctamente');
                  this.actualizarActivity('FINALIZADO', this.secuenceId);
                  this.validateCapture = true;
                  return (this.idFinger);
                },
              (error) =>  {
                  this.idFinger = true;
                  console.log('OnSucces FingersBidEnrollment', error);
                  this.habilitarButonHuellas();
                  this.habilitarButonRostro();
                  this.DesactivarSipnnerHuellas();
                  this.presentAlertConfirm('Tu huellas NO se han registrado correctamente');
                  return (this.idFinger2);
                });
              setInterval(() => {
                this.getIdFinger();
                this.getIdFinger2();
                   }, 100);
                   this.habilitarButonHuellas();
                   this.habilitarButonRostro();
                   this.DesactivarSipnnerHuellas();
                } else {
                  this.presentAlertConfirm('Inicializando complemento, por favor vuelva intentarlo.');
                  this.habilitarButonHuellas();
                  this.habilitarButonRostro();
                  this.DesactivarSipnnerHuellas();
                    }
             });
      } else {
        if (this.platform.is('android')) {
              this.platform.ready().then(async () => {
              if (typeof FingersBidEnrollment !== 'undefined') {
                FingersBidEnrollment.initializeVerify4F(0, 'Donde',
                  async (jsonFingerPrintsString) =>  {
                  console.log('Tu huellas son : ');
                  console.log(jsonFingerPrintsString);
                  // llamar metodo para guardar huellas en el back
                 this.enviarDigital2F(jsonFingerPrintsString);
                  this.actualizarActivity('FINALIZADO', this.secuenceId);

                  const { role, data } = await loading.onDidDismiss();
                  console.log('Se inicializo correctamente ó termino');
                   } , (error_initialize) => {
                      console.log('error_initialize FingersBidEnrollment', error_initialize);
                    });

                 setInterval(() => {
                          this.getIdFinger();
                          this.getIdFinger2();
                       }, 100);
                } else {
                  this.presentAlertConfirm('Inicializando completomento, por favor vuelva intentarlo.');
                      this.habilitarButonHuellas();
                      this.habilitarButonRostro();
                      this.DesactivarSipnnerHuellas();
                }
            });
          }
        }

  }

  enviarDigital2F(jsonFingerPrintsString: any) {
    // this.loading.present('Cargando...');
    console.log('guardarHuellas jsonFingerPrintsString');
    console.log(jsonFingerPrintsString);
    const finger = JSON.parse(jsonFingerPrintsString);
    // if (jsonFingerPrintsString) {
      // this.jsonEnroll = new Enroll();
    /* this.jsonEnroll.enrollmentCode = this.saveS.getSystemCode();
    this.jsonEnroll.personID = this.saveS.getPersonId(); */
    // this.jsonEnroll.leftindex = finger['leftindex'];
    // this.jsonEnroll.rightindex = finger['rightindex'];
    console.log('finger leftindex');
    console.log(finger['leftindex']);
    //this.loading.dismiss();
    //}
    if (finger['leftindex']) {
      // this.loading.dismiss();
      this.login.verifyFinger(finger['leftindex']);
    } else {
      alert('Error');
      // this.loading.dismiss();
    }
  }

  enviarDigital(jsonFingerPrintsString: any) {
    // this.loading.present('Cargando...');
    if (jsonFingerPrintsString) {
      // this.loading.dismiss();
      this.login.verifyFinger(jsonFingerPrintsString);
    } else {
      alert('Error');
      // this.loading.dismiss();
    }
  }


  habilitarButonRostro() {
    return this.isValidoRostro = false;
  }

  habilitarButonHuellas() {
    console.log('this.isValidoHuellas', this.isValidoHuellas);
    return this.isValidoHuellas = false;
  }

  desahilitarBotonRostro() {
    console.log('this.isValidoRostro', this.isValidoRostro);
    return this.isValidoRostro = true;
  }

  desahilitarBotonHuellas() {
    console.log('this.isValidoHuellas', this.isValidoHuellas);
    return this.isValidoHuellas = true;
  }

  getIdSelfie() {
    return this.idSelfie;
  }

  getIdSelfie2() {
    return this.idSelfie2;
  }

  getIdFinger() {
    return this.idFinger;
  }

  getIdFinger2() {
    return this.idFinger2;
  }

  activarSpinnerRostro() {
    console.log('this.isValidoRostroSpinner', this.isValidoRostroSpinner);
    return this.isValidoRostroSpinner = true;
  }

  DesactivarSipnnerRostro() {
    console.log('this.isValidoRostroSpinner', this.isValidoRostroSpinner);
    return this.isValidoRostroSpinner = false;
  }

  activarSpinnerHuellas() {
    console.log('this.isValidoHuellasSpinner', this.isValidoHuellasSpinner);
    return this.isValidoHuellasSpinner = true;
  }

  DesactivarSipnnerHuellas() {
    console.log('this.isValidoHuellasSpinner', this.isValidoHuellasSpinner);
    return this.isValidoHuellasSpinner = false;
  }

  async presentAlertConfirm(text) {
    const alert = await this.alertCtrl.create({
      header: '¡Notificación!',
      message: text,
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  crearDatosActivity() {
    // crearDatosActivity
    const productId = 1;
    let secuence = 0;
    if (this.saveS.getTipoFlujo() === 'alhajas') {
      secuence = 1;
    } else {
      secuence = 6;
    }
    const jsonData = new JsonData(+productId, '', 'PENDIENTE', '1', '', secuence, 1);
    const jsonMetaData = new JsonMetadata(0, '', 0, 0, 1, 1);
    const jsonDatosActivity = new JsonDatosActivity(jsonData, jsonMetaData, 0);
    this.activityService.crearDatosActivity(jsonDatosActivity, this.saveS.getBearerToken()).subscribe(
      (response: any) => {
        console.log('crearDatosActivity');
        console.log(response);
      if (response.code === -9999) {

        // const operationId = response.data.operationId;
        this.saveS.setOperationID(response.data.operationId);
        // systemCode
        // const systemCode = response.data.systemCode;
        this.saveS.setSystemCode(response.data.systemCode);
        this.actualizarActivity('EN PROCESO', this.secuenceId);
        // this.navCtrl.navigateRoot('tipo-identificacion');
      }
      }, (err) => {
        console.log(err);
      }
    );
  }


  actualizarActivity(estatus: string, secuenciaId: number) {
    const productId = 1;
    const jsonData = new JsonData(productId,
      this.saveS.getSystemCode(), estatus, '1', '', secuenciaId, 1);
    const jsonMetaData = new JsonMetadata(0, '', 0, 0, 1, 1);
    const jsonDatosActivity = new JsonDatosActivity(jsonData,
      jsonMetaData, this.saveS.getOperationID());
    this.activityService.actualizarDatosActivity(jsonDatosActivity,
      this.login.token).subscribe(
      (resultado: any) => {
        console.log('actualizarDatosActivity');
        console.log(resultado);
      });
  }

  goIdentificacionOficial() {
    this.crearDatosActivity();
    this.navCtrl.navigateForward('tipo-identificacion');
  }

  logout() {
    this.login.finalizar();
  }
}
