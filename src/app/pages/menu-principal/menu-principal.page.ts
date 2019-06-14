import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { GuardarStorageService } from 'src/app/services/guardar-storage.service';
import { LoginService } from 'src/app/services/login.service';
import { JsonData } from 'src/app/services/actividades/model/json-data.model';
import { JsonMetadata } from 'src/app/services/actividades/model/json-metadata.model';
import { JsonDatosActivity } from 'src/app/services/actividades/model/json-datos-activity.model';
import { ActivitiesService } from 'src/app/services/actividades/activities-service';
import { LoadingService } from 'src/app/services/loading.service';
import { JsonPersonalData } from 'src/app/services/actividades/model/json-personal-data.model';
import { JsonInnerData } from 'src/app/services/actividades/model/json-inner-data.model';
import { HttpErrorResponse } from '@angular/common/http';

declare var FingersBidEnrollment: any;

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})
export class MenuPrincipalPage implements OnInit {

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private saveS: GuardarStorageService,
    private login: LoginService,
    private loading: LoadingService,
    private platform: Platform,
    private activityService: ActivitiesService
  ) { }

  ngOnInit() {

  }

  iniciarFlujo(flujo: string) {
    this.saveS.setTipoFlujo(flujo);
    // lla huellas, consultar y tomar desicion
    this.fingerVerify();
    this.crearDatosActivity();
    // this.navCtrl.navigateRoot('tipo-identificacion');
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
        this.actualizarDatosActivity();
        // this.navCtrl.navigateRoot('tipo-identificacion');
      }
      }, (err) => {
        console.log(err);
      }
    );
  }

  actualizarDatosActivity() {
    const jsonPersonalData =
    new JsonPersonalData(0, this.saveS.getSystemCode(),
    'PENDIENTE',
    'PENDIENTE',
    'PENDIENTE',
    'M',
    '2019-06-07',
    'es',
    '',
    'PENDIENTE', '', '1', '', 'PENDIENTE',
    'PENDIENTE', 'PENDIENTE', [], '', []);

    const jsonInnerData = new JsonInnerData(jsonPersonalData);
    const jsonInnerDataString = JSON.stringify(jsonInnerData);
    const jsonData = new JsonData(1, '', 'PENDIENTE', '1', jsonInnerDataString, 12, 1, 0);
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

  fingerVerify() {
    this.loading.present('Cargando...');
    if (this.platform.is('android')) {
      this.platform.ready().then(async () => {
      if (typeof FingersBidEnrollment !== 'undefined') {
        FingersBidEnrollment.initializeVerify('000', 'Donde',
          async (jsonFingerPrintsString) =>  {
              console.log('OnSucces initialize FingersBidEnrollment', JSON.stringify(jsonFingerPrintsString));
              console.log(jsonFingerPrintsString);
              if (jsonFingerPrintsString !== '') {
                this.loading.dismiss();
                this.login.setFingerVerify(jsonFingerPrintsString);
                this.login.verifyFinger();
              } else {
                this.loading.dismiss();
                alert('Tu huellas NO se ha encontrado correctamente');
              console.log('else jsonFingerPrintsString FingersBidEnrollment', jsonFingerPrintsString);
              }
            }, (error_initialize) => {
              this.loading.dismiss();
              alert('Tu huellas NO se han registrado correctamente');
              console.log('error_initialize FingersBidEnrollment', error_initialize);
            });
        } else {
          this.loading.dismiss();
          alert('Inicializando completomento, por favor vuelva intentarlo.');
        }
      });
    }
  }

}
