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
import { LoginHuella } from './model/LoginHuella.model';
import { Cliente } from '../tipo-identificacion/consulta-similitud-confirmacion/model/Cliente.model';
import { LoadingService } from 'src/app/services/loading.service';

declare var FingersBidEnrollment: any;
declare var IdentyFingers: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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
  user = '';
  password = '';

  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  estampaTiempo: string;
  date = new Date();

  loginH: LoginHuella;
  cliente: Cliente;
  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private oauth: OauthService,
    private login: LoginService,
    private activityService: ActivitiesService,
    private saveS: GuardarStorageService,
    private enroll: EnrollService,
    private loading: LoadingService,
    ) { }

  ngOnInit() {
    this.cliente = new Cliente();
    this.login.generateToken();
    this.estampaTiempo = (this.date.toLocaleDateString('es-MX', this.options)).toUpperCase();
  }

  verifyUser() {
    this.login.verifyUser(this.user, this.password);
  }

  async startFingersEnrollment() {
    this.desahilitarBotonHuellas();
    this.desahilitarBotonRostro();
    this.activarSpinnerHuellas();
    const loading = await this.loadingCtrl.create({
      spinner: null,
      message: 'Cargando...',
      duration: 5000,
      translucent: true,
      cssClass: 'loading_img'
    });
    // this.crearDatosActivity();
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
                FingersBidEnrollment.initializeVerify(0, 'Donde',
                  async (jsonFingerPrintsString) =>  {
                  // llamar metodo para VERIFICAR huellas en el back
                  this.verificarCliente(jsonFingerPrintsString);
                  // this.actualizarActivity('FINALIZADO', this.secuenceId);

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

  verificarCliente(jsonFingerPrintsString: any) {
    this.loading.present('Verificando datos...');
    // const finger = JSON.parse(jsonFingerPrintsString);
    this.loginH = new LoginHuella();
    this.loginH.operationId = this.saveS.getOperationID();
    this.loginH.personID = this.saveS.getPersonId();
    this.loginH.user = this.user;
    this.loginH.code = this.saveS.getSystemCode();
    this.loginH.uid = '';
    this.loginH.fingers = true;
    this.loginH.finger = jsonFingerPrintsString;
    // finger['leftindex'];
    // consumir servicio para guardar huellas
    // this.jsonEnroll, this.login.token

    this.login.loginUserFinger(this.loginH, this.login.token).subscribe(
      (result) => {
        this.saveS.setResultLogin(result);
        this.loading.dismiss();
        console.log('loginUserFinger');
        console.log(result);
        // this.presentAlertConfirm(JSON.stringify(result));
        this.validateCapture = true;
        this.idFinger = true;
        this.idFinger2 = false;
        this.habilitarButonHuellas();
        this.habilitarButonRostro();
        this.DesactivarSipnnerHuellas();
        // resultOK: false
        switch (result['resultOK']) {
          case true:
            this.goVerify();
            break;

            case false:
            alert('Cliente ó Huella no validas');
            break;
          default:
            break;
        }
      }, (error) => {
        this.loading.dismiss();
        console.log('Error guardarFingerEnroll');
        console.log(error);
        this.idFinger2 = true;
        this.idFinger = false;
        this.habilitarButonHuellas();
        this.habilitarButonRostro();
        this.DesactivarSipnnerHuellas();
        this.presentAlertConfirm('Tu huella y Cliente NO se han encontrado');

      }
    );
  }

  goVerify() {
    this.navCtrl.navigateRoot('verify');
  }

  jsonFinger() {

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

  async presentAlertConfirm(text: string) {
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

  actualizarActivity(estatus: string, secuenciaId: number) {
    const code = '';
    const productId = 1;
    const jsonData = new JsonData(productId, this.saveS.getSystemCode(), estatus, '1', '', secuenciaId, 1);
    const jsonMetaData = new JsonMetadata(0, '', 0, 0, 1, 1);
    const jsonDatosActivity = new JsonDatosActivity(jsonData, jsonMetaData, this.saveS.getOperationID());
    this.activityService.actualizarDatosActivity(jsonDatosActivity,
      this.login.token).subscribe(
      (resultado: any) => {
        console.log('actualizarDatosActivity');
        console.log(resultado);
      });
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
        this.actualizarDatosActivityInit();
        // this.navCtrl.navigateRoot('tipo-identificacion');
      }
      }, (err) => {
        console.log(err);
      }
    );
  }

  actualizarDatosActivityInit() {
    this.cliente = this.saveS.getCliente();
    const jsonPersonalData =
    new JsonPersonalData(0, this.saveS.getSystemCode(),
    '',
    '',
    '',
    '',
    '',
    'es',
    'SSN',
    '',
    '',
    '1',
    '',
    '',
    '',
    '',
    '', [], '');

    const jsonInnerData = new JsonInnerData(jsonPersonalData);
    const jsonInnerDataString = JSON.stringify(jsonInnerData);
    const jsonData = new JsonData(1, '', 'FINALIZADO', '1', jsonInnerDataString, 12, 1, 0);
    const jsonMetaData = new JsonMetadata(0, '', 0, 0, 1, 1);
    const jsonDatosActivity = new JsonDatosActivity(jsonData, jsonMetaData, this.saveS.getOperationID());
    this.activityService.actualizarDatosActivity(jsonDatosActivity, this.saveS.getBearerToken()).subscribe(
      (resultado: any) => {
        console.log('actualizarDatosActivity');
        console.log(resultado);
        if (resultado['code'] === -9999) {
          // get personId
          this.saveS.setPersonId(resultado.data.personId);
          /* let resumenDocto = new ResumenDoctos("document","CFE","Comprobante domicilio","");
          if(this.saveS.getResumenDoctos() != null) {
            this.saveS.getResumenDoctos().push(resumenDocto);
            // this.goFirmaContrato();
          } else {
            this.saveS.setResumenDoctos([]);
            this.saveS.getResumenDoctos().push(resumenDocto);
          } */
        } else {
          alert('Error al guardar la información, intentar de nuevo');
        }
      },
      (err: HttpErrorResponse) => {
        console.log('HttpErrorResponse');
        console.log(err);
      });
  }

  actualizarDatosActivity() {
    this.cliente = this.saveS.getCliente();
    const jsonPersonalData =
    new JsonPersonalData(0, this.saveS.getSystemCode(),
    this.cliente.getNombre(),
    this.cliente.getPaterno(),
    this.cliente.getMaterno(),
    this.cliente.getSexo(),
    this.cliente.getEmision(),
    'es',
    'SSN',
    this.cliente.getPaisDeNacimiento(),
    this.cliente.getAsociarEmail(),
    '1',
    '',
    this.cliente.getOcr(),
    this.cliente.getRfc(),
    this.cliente.getCurp(),
    '', this.cliente.getJsonAddress(), '', this.cliente.getPhones());

    const jsonInnerData = new JsonInnerData(jsonPersonalData);
    const jsonInnerDataString = JSON.stringify(jsonInnerData);
    const jsonData = new JsonData(1, '', 'FINALIZADO', '1', jsonInnerDataString, 12, 1, 0);
    const jsonMetaData = new JsonMetadata(0, '', 0, 0, 1, 1);
    const jsonDatosActivity = new JsonDatosActivity(jsonData, jsonMetaData, this.saveS.getOperationID());
    this.activityService.actualizarDatosActivity(jsonDatosActivity, this.saveS.getBearerToken()).subscribe(
      (resultado: any) => {
        console.log('actualizarDatosActivity');
        console.log(resultado);
        if (resultado['code'] === -9999) {
          // get personId
          this.saveS.setPersonId(resultado.data.personId);
          /* let resumenDocto = new ResumenDoctos("document","CFE","Comprobante domicilio","");
          if(this.saveS.getResumenDoctos() != null) {
            this.saveS.getResumenDoctos().push(resumenDocto);
            // this.goFirmaContrato();
          } else {
            this.saveS.setResumenDoctos([]);
            this.saveS.getResumenDoctos().push(resumenDocto);
          } */
        } else {
          alert('Error al guardar la información, intentar de nuevo');
        }
      },
      (err: HttpErrorResponse) => {
        console.log('HttpErrorResponse');
        console.log(err);
      });
  }

}
