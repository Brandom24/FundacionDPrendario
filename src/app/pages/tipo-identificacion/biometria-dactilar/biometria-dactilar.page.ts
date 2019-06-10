import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, LoadingController, Platform } from '@ionic/angular';
import { OauthService } from 'src/app/services/oauth.service';
import { LoginService } from 'src/app/services/login.service';
import { ActivitiesService } from 'src/app/services/actividades/activities-service';
import { GuardarStorageService } from 'src/app/services/guardar-storage.service';
import { JsonData } from 'src/app/services/actividades/model/json-data.model';
import { JsonMetadata } from 'src/app/services/actividades/model/json-metadata.model';
import { JsonDatosActivity } from 'src/app/services/actividades/model/json-datos-activity.model';

declare var IdentyFingers: any;
declare var ZoomAuthenticationHybrid: any;
declare var FingersBidEnrollment: any;
declare var FaceBidEnrollment: any;
declare var Buffer: any;
declare var fag: boolean;

@Component({
  selector: 'app-biometria-dactilar',
  templateUrl: './biometria-dactilar.page.html',
  styleUrls: ['./biometria-dactilar.page.scss'],
})
export class BiometriaDactilarPage implements OnInit {
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


  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private oauth: OauthService,
    private login: LoginService,
    private activityService: ActivitiesService,
    private saveS: GuardarStorageService,
  ) { 
    if(this.saveS.getTipoFlujo() == 'alhajas')
      this.secuenceId = 3;
    else
      this.secuenceId = 8;
  }

  ngOnInit() {
  }

  onConsultaSimilitud() {
    this.navCtrl.navigateRoot('consulta-similitud-confirmacion');
    // if(this.validateCapture) {
    // this.navCtrl.navigateRoot('consulta-similitud-confirmacion');

    // } else {
    //   this.alerta();

    // }
  }

  async alerta() {
    const alert = await this.alertCtrl.create({
      backdropDismiss: false,
      header: 'Advertencia',
      subHeader: 'Para continuar es necesario capturar las huellas',
      buttons: [{
        text: 'Entiendo',
        role: 'reintentar',
        cssClass: 'secondary',
        handler: () => {
          // Accion del boton
        }
      },
    ]
    });
    await alert.present();
  }

  async startFingersEnrollment() {
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
    this.actualizarActivity("EN PROCESO",this.secuenceId);
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
                  this.actualizarActivity("FINALIZADO",this.secuenceId);
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
              // FingersBidEnrollment.initialize(userId, this.onSuccess, this.onError);
              this.userId = 0;
                FingersBidEnrollment.initialize(this.userId, 'Donde',
                  async (jsonFingerPrintsString) =>  {
                  this.idFinger = true;
                  this.idFinger2 = false;
                  this.habilitarButonHuellas();
                  this.habilitarButonRostro();
                  this.DesactivarSipnnerHuellas();
                  this.presentAlertConfirm('Tu huellas se han registrado correctamente');
                  this.actualizarActivity("FINALIZADO",this.secuenceId);
                  this.validateCapture = true;
                  const { role, data } = await loading.onDidDismiss();
                    FingersBidEnrollment.enroll(jsonFingerPrintsString,
                      (result_enroll) =>  {
                        this.idFinger = true;
                        this.idFinger2 = false;
                        this.habilitarButonHuellas();
                        this.habilitarButonRostro();
                        this.DesactivarSipnnerHuellas();
                        console.log('OnSucces FingersBidEnrollment', result_enroll);
                      }, (error_enroll) =>  {
                        if ('Falla al enrolar:422' === error_enroll) {
                        this.idFinger = true;
                        this.idFinger2 = false;
                        this.habilitarButonHuellas();
                        this.habilitarButonRostro();
                        this.DesactivarSipnnerHuellas();
                        console.log('Usuario Ya esta registrado en FingersBidEnrollment', error_enroll);
                        } else {
                          this.idFinger = false;
                          this.idFinger2 = true;
                          this.habilitarButonHuellas();
                          this.habilitarButonRostro();
                          this.DesactivarSipnnerHuellas();
                          alert('Error de comunicacion: ' + error_enroll);
                          console.log('OnError FingersBidEnrollment', error_enroll);
                        }
                    });
                      console.log('Se inicializo correctamente ó termino');
                    }, (error_initialize) => {
                      this.idFinger2 = true;
                      this.idFinger = false;
                      this.habilitarButonHuellas();
                      this.habilitarButonRostro();
                      this.DesactivarSipnnerHuellas();
                      this.presentAlertConfirm('Tu huellas NO se han registrado correctamente');
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

 

  sigPagCancel() {
   // this.navCtrl.push(DashboardPage);
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

  actualizarActivity(estatus: string, secuenciaId:number) {
    const code = '';
    const productId = 1;
    const jsonData = new JsonData(productId,'', estatus, '1','', secuenciaId, 1);
    const jsonMetaData = new JsonMetadata(0, '', 0, 0, 1, 1);
    const jsonDatosActivity = new JsonDatosActivity(jsonData,jsonMetaData, this.saveS.getOperationID());
    this.activityService.actualizarDatosActivity(jsonDatosActivity,
      this.login.token).subscribe(
      (resultado: any) => {
        
      });
  }
}
