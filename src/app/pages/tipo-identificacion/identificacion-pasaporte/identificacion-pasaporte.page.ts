import { Component, OnInit } from '@angular/core';
import { JsonOcr } from 'src/app/services/documentos/model/json-ocr.model';
import { DocumentosService } from 'src/app/services/documentos/documentos.service';
import { OauthService } from 'src/app/services/oauth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Imagen } from 'src/app/herramientas/imagen';
import { JsonRequest } from 'src/app/services/documentos/model/jsonRequest.model';
import { DataFile } from 'src/app/services/documentos/model/data-file.model';
import { ActivitiesService } from 'src/app/services/actividades/activities-service';
import { JsonDatosActivity } from 'src/app/services/actividades/model/json-datos-activity.model';
import { JsonData } from 'src/app/services/actividades/model/json-data.model';
import { JsonMetadata } from 'src/app/services/actividades/model/json-metadata.model';
import { CatalogoService } from 'src/app/services/catalogos/catalogo.service';
import { CatalogoValuesOut } from 'src/app/services/catalogos/model/catalogo-values-out.model';
import { VariablesSesion } from 'src/app/services/model/variables-sesion.model';
import { AlertController, NavController, LoadingController, Platform } from '@ionic/angular';
import { LoginService } from 'src/app/services/login.service';
import { GuardarStorageService } from 'src/app/services/guardar-storage.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ResumenDoctos } from '../../contrato/firma-contrato/model/resumen-doctos.model';
import { NavigationOptions } from '@ionic/angular/dist/providers/nav-controller';


@Component({
  selector: 'app-identificacion-pasaporte',
  templateUrl: './identificacion-pasaporte.page.html',
  styleUrls: ['./identificacion-pasaporte.page.scss'],
})
export class IdentificacionPasaportePage implements OnInit {
  esCargando: boolean;
  isValidoSpinnerFront: boolean;
  anverso: string;
  reverso: string;
  esAnversoActiva: boolean;
  idTipo: string;
  fechaString: string;
  activityDataStorage: VariablesSesion;
  usuarioStorage: string;
  operationId: number;
  bearerToken: string;
  productId: string;
  // catalogoDoctos: CatalogoValuesOut[];
  doctoSelected: string;
  frontImg: string;
  isenabled: boolean;
  backImg: string;
  backImg2: any;
  isenabled2: boolean;
  frontImg2: any;
  secuenciaId: number;
  secuenciaOcr: number;

  document_ext: string;

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private oauth: OauthService,
    private login: LoginService,
    private activityService: ActivitiesService,
    private saveS: GuardarStorageService,
    private documentosService: DocumentosService,
    public camera: Camera,
  ) {

    this.document_ext = 'p';
    this.operationId = this.saveS.getOperationID();
    this.secuenciaId = 23;
    /* if(this.saveS.getTipoFlujo() == "alhajas")
    {
      this.secuenciaId = 1;
      this.secuenciaOcr = 2;
    }
    else
    {
      this.secuenciaId = 6
      this.secuenciaOcr = 7;
    }  */
  }

  public restart(): void {
    this.frontImg = null;
    this.frontImg2 = null
    this.backImg = null;
    this.backImg2 = null;
  }

  ngOnInit() {
    this.saveS.setDatosOCR('');
    this.anverso = '';
    this.reverso = '';
    this.esAnversoActiva = false;
    this.esCargando = false;
  }

  extraerOCR() {
    let options: NavigationOptions = {};
    if(this.document_ext === 'p'){
      const imagen = new Imagen();
      const blobAnverso = imagen.convertirImagenEnBlob(this.frontImg);
      let blobReverso;
      if (this.backImg) {
        blobReverso = imagen.convertirImagenEnBlob(this.backImg);
        if (!blobAnverso) {
          alert('Imagen Invalida');
        }
      }

      this.actualizarActivity('EN PROCESO', this.secuenciaId);
      this.extraerDatosOcr(this.operationId, blobAnverso, this.login.token , blobReverso);
      // this.onBiometria();
      options.queryParams = {
        origin: 'ext-passport'
      };
      this.navCtrl.navigateRoot('consulta-similitud-confirmacion?origin=Extranjero', options);
      // crearDatosActivity
      //  try {
      //    const productId = 1;
      //    const jsonData = new JsonData(+productId,
      //      '', 'EN PROCESO', '1', '', 2, 1);
      //    const jsonMetaData = new JsonMetadata(0, '', 0, 0, 1, 1);
      //    const jsonDatosActivity = new JsonDatosActivity(jsonData, jsonMetaData, +this.operationId);
      //    this.activityService.crearDatosActivity(jsonDatosActivity, this.login.token).subscribe(
      //      (response) => {
      //        console.log('Response');
      //        console.log(response);
      //        console.log('OperationID');
      //        console.log(response.data.operationId);

      //        this.operationId = JSON.stringify(response.data.operationId);
      //        this.saveS.setOperationID(this.operationId);
      //        const imagen = new Imagen();
      //        const blobAnverso = imagen.convertirImagenEnBlob(this.frontImg);
      //        this.extraerDatosOcr(this.operationId, blobAnverso, this.login.token);
      //        this.onBiometria();
      //      }, (err) => {
      //        alert(err);
      //      }
      //    );
      //  } catch (error) {
      //    alert(error);
      //  }
    }else{
      const imagen = new Imagen();
      const blobAnverso = imagen.convertirImagenEnBlob(this.frontImg);
      let blobReverso = imagen.convertirImagenEnBlob(this.backImg);

      this.actualizarActivity('EN PROCESO', this.secuenciaId);
      this.extraerDatosOcr(this.operationId, blobAnverso, this.login.token , blobReverso);
      // this.onBiometria();
      this.navCtrl.navigateRoot('consulta-similitud-confirmacion?origin=Extranjero', options);
      // crearDatosActivity
      //  try {
      //    const productId = 1;
      //    const jsonData = new JsonData(+productId,
      //      '', 'EN PROCESO', '1', '', 2, 1);
      //    const jsonMetaData = new JsonMetadata(0, '', 0, 0, 1, 1);
      //    const jsonDatosActivity = new JsonDatosActivity(jsonData, jsonMetaData, +this.operationId);
      //    this.activityService.crearDatosActivity(jsonDatosActivity, this.login.token).subscribe(
      //      (response) => {
      //        console.log('Response');
      //        console.log(response);
      //        console.log('OperationID');
      //        console.log(response.data.operationId);

      //        this.operationId = JSON.stringify(response.data.operationId);
      //        this.saveS.setOperationID(this.operationId);
      //        const imagen = new Imagen();
      //        const blobAnverso = imagen.convertirImagenEnBlob(this.frontImg);
      //        this.extraerDatosOcr(this.operationId, blobAnverso, this.login.token);
      //        this.onBiometria();
      //      }, (err) => {
      //        alert(err);
      //      }
      //    );
      //  } catch (error) {
      //    alert(error);
      //  }
    }
   }

   onBiometria() {
    this.navCtrl.navigateRoot('biometria-dactilar');
  }

  getImagenFront() {
    this.isValidoSpinnerFront = true;
    const options: CameraOptions = {
     quality: 70,
     destinationType: this.camera.DestinationType.DATA_URL,
     encodingType: this.camera.EncodingType.JPEG,
     mediaType: this.camera.MediaType.PICTURE,
     correctOrientation: true
   };

   this.camera.getPicture(options).then((imageData) => {
     this.frontImg = 'data:image/jpeg;base64,' + imageData;
     this.frontImg2 = imageData;
     this.saveS.guardarStorageImagenF(this.frontImg);
     if (this.frontImg) {
         // enable the button
         this.isenabled = true;
         this.isValidoSpinnerFront = false;
         } else {
         // disable the button
         this.isenabled = false;
         this.isValidoSpinnerFront = false;
         }
   }, (err) => {
    // Handle error
    console.log('Camera issue:' + err);
   });
   this.isValidoSpinnerFront = false;
  }

  extraerDatosOcr(operationId: number, fileAnverso: any, bearerToken: string, fileReverso?: any) {
    this.esCargando = true;
    // const jsonOcr = new JsonOcr('IDOFA', '8');
    this.actualizarActivity('FINALIZADO', this.secuenciaId);
    this.actualizarActivity('EN PROCESO', this.secuenciaOcr);
    this.documentosService.extraerDatosOcr2(operationId,
      0, fileAnverso, 'IDOFA', bearerToken,
      fileReverso, 'IDOFB').subscribe(
    (respuesta: any) => {
      console.log(respuesta);
      if (respuesta['resultOK']) {
        this.saveS.setDatosOCR(respuesta.analisys);
        let listaDoctos: ResumenDoctos[] = [];
        let doctoAnverso = new ResumenDoctos("document","Pasaporte","Id Oficial",null);
        listaDoctos.push(doctoAnverso);
        this.saveS.setResumenDoctos(listaDoctos);
        // alert('Extracción de información completa');
      } else {
        this.actualizarActivity('ERROR', this.secuenciaOcr);
        alert(respuesta['message']);
      }

      this.esCargando = false;
    },
    (error: HttpErrorResponse) => {
      this.esCargando = false;
      console.log(error);
      switch (error['status']) {
        case 401:
          alert('Es necesario iniciar session, nuevamente para continuar');
          this.navCtrl.navigateRoot('login');
          break;

          case 404:
          alert('Es necesario iniciar session, nuevamente para continuar');
              this.navCtrl.navigateRoot('login');
            break;

          case 500:
          alert('Por favor, reintentar para continuar');
          this.extraerOCR();
            break;

          case 501:
          alert('Por favor, reintentar para continuar');
          this.extraerOCR();
            break;
        default:
          alert('Es necesario iniciar session, nuevamente para continuar');
            this.navCtrl.navigateRoot('login');
          break;
      }
    });
  }

  actualizarActivity(estatus: string, secuenciaId: number) {
      const code = '';
      const productId = 1;
      const jsonData = new JsonData( productId, this.saveS.getSystemCode(), estatus,'1', '', secuenciaId, 1, 0);
      const jsonMetaData = new JsonMetadata(0, '', 0, 0, 1, 1);
      const jsonDatosActivity = new JsonDatosActivity(jsonData, jsonMetaData, this.saveS.getOperationID());
      this.activityService.actualizarDatosActivity(jsonDatosActivity,
        this.login.token).subscribe(
        (resultado: any) => {
        });
    }


    changeListenerF($event): void {
      let mensajeError = '';
      this.frontImg = '';
      const file: File = $event.target.files[0];
      if ((file.type !== 'image/jpeg' && file.type !== 'image/png') || (file.size > 1000000)) {
        mensajeError = 'Formato y/o tamaño de imagen incorrecto';
      } else {
        const myReader: FileReader = new FileReader();
        myReader.onloadend = (e) => {
          this.frontImg = myReader.result.toString();
          this.saveS.guardarStorageImagenF(this.frontImg);
        };
        myReader.readAsDataURL(file);
      }
    }

    public getImagenBack(): void {
      this.isValidoSpinnerFront = true;
      const options: CameraOptions = {
        quality: 70,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        correctOrientation: true
      };

      this.camera.getPicture(options).then((imageData) => {
        this.backImg = 'data:image/jpeg;base64,' + imageData;
        this.backImg2 = imageData;
        this.saveS.guardarStorageImagenB(this.backImg);
        if (this.backImg) {
            // enable the button
            this.isenabled2 = true;
            this.isValidoSpinnerFront = false;
            } else {
            // disable the button
            this.isenabled2 = false;
            this.isValidoSpinnerFront = false;
            }
      }, (err) => {
      // Handle error
      console.log('Camera issue:' + err);
      });
      this.isValidoSpinnerFront = false;
    }

    changeListenerB($event): void {
      let mensajeError = '';
      this.backImg = '';
      const file: File = $event.target.files[0];
      if ((file.type !== 'image/jpeg' && file.type !== 'image/png') || (file.size > 1000000)) {
        mensajeError = 'Formato y/o tamaño de imagen incorrecto';
      } else {
        const myReader: FileReader = new FileReader();
        myReader.onloadend = (e) => {
          this.backImg  = myReader.result.toString();
          this.saveS.guardarStorageImagenB(this.backImg);
        };
        myReader.readAsDataURL(file);
      }
    }

    logout() {
      this.login.finalizar();
    }
}
