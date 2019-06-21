import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { JsonData } from 'src/app/services/actividades/model/json-data.model';
import { AlertController, NavController } from '@ionic/angular';
import { DocumentosService } from 'src/app/services/documentos/documentos.service';
import { OauthService } from 'src/app/services/oauth.service';
import { LoginService } from 'src/app/services/login.service';
import { ActivitiesService } from 'src/app/services/actividades/activities-service';
import { GuardarStorageService } from 'src/app/services/guardar-storage.service';
import { JsonMetadata } from 'src/app/services/actividades/model/json-metadata.model';
import { JsonDatosActivity } from 'src/app/services/actividades/model/json-datos-activity.model';
import { HttpErrorResponse } from '@angular/common/http';
import { DataFile } from 'src/app/services/documentos/model/data-file.model';
import { JsonRequest } from 'src/app/services/documentos/model/jsonRequest.model';
import { Imagen } from 'src/app/herramientas/imagen';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { LoadingService } from 'src/app/services/loading.service';
import { Cliente } from '../../tipo-identificacion/consulta-similitud-confirmacion/model/Cliente.model';
import { JsonPersonalData } from 'src/app/services/actividades/model/json-personal-data.model';
import { JsonOperationData } from 'src/app/services/actividades/model/json-operation-data.model';
import { JsonInnerData } from 'src/app/services/actividades/model/json-inner-data.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consulta-ine',
  templateUrl: './consulta-ine.page.html',
  styleUrls: ['./consulta-ine.page.scss'],
})
export class ConsultaInePage implements OnInit {
  cardValid: boolean;

  browser: any;
  esCargando: boolean;
  capturasINE: string;
  frontImg: string;
  isenabled: boolean;
  isValidoSpinnerFront: boolean;
  frontImg2: any;
  secuenciaId: number;

  client: ClientData;

  pData: JsonPersonalData;
  validINE: string;

  constructor(
    private iab: InAppBrowser,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private documentosService: DocumentosService,
    private oauth: OauthService,
    private login: LoginService,
    private loading: LoadingService,
    private activityService: ActivitiesService,
    private saveS: GuardarStorageService,
    private activitiesService: ActivitiesService,
    private route: ActivatedRoute,
    public camera: Camera) { 
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.pData = JSON.parse(params.client);
        this.pData.observations = this.validINE;
      }
    });
    this.cardValid = true;
    this.validINE = 'Identificación válida';
    this.secuenciaId = 0;
    if(this.saveS.getTipoFlujo() == "alhajas")
    {
      this.secuenciaId = 4;
    }
    else
    {
      this.secuenciaId = 9;
    }
  }

  ngOnInit() {
}

getImagenFront() {
  this.isValidoSpinnerFront = true;
  const options: CameraOptions = {
   quality: 70,
   destinationType: this.camera.DestinationType.DATA_URL,
   encodingType: this.camera.EncodingType.JPEG,
   mediaType: this.camera.MediaType.PICTURE
 };

 this.camera.getPicture(options).then((imageData) => {
   this.frontImg = 'data:image/jpeg;base64,' + imageData;
   this.frontImg = imageData;
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
  console.log('Camera issue:' + err, );
 });
 this.isValidoSpinnerFront = false;
}

openB() {
  this.browser = this.iab.create('https://listanominal.ine.mx', '_system');
}

openGallery() {
  const cameraOptions = {
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    quality: 70,
    targetWidth: 1000,
    targetHeight: 1000,
    correctOrientation: true
  };

  /* this.camera.getPicture(cameraOptions)
    .then(file_uri => this.frontImg = file_uri,
    err => console.log(err)); */
    this.camera.getPicture(cameraOptions).then((imageData) => {
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

goCallBack() {
  console.log('Typescript callback has been called');
  this.browser.hide();
}

changeListenerINE($event): void {
  let mensajeError = '';
  const file: File = $event.target.files[0];
  console.log('changeListenerF');
  if ((file.type !== 'image/jpeg' && file.type !== 'image/png') || (file.size > 1000000)) {
    mensajeError = 'Formato y/o tamaño de imagen incorrecto';
  } else {
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (e) => {
      this.frontImg = myReader.result.toString();
      console.log('frontImg');
      console.log(this.frontImg);
      // this.saveS.guardarStorageImagenF(this.capturasINE);
      // this.imgCapturada.emit(capturas);
    };
    myReader.readAsDataURL(file);
  }
  if (this.frontImg) {
    // enable the button
    this.isenabled = true;
    this.isValidoSpinnerFront = false;
    } else {
    // disable the button
    this.isenabled = false;
    this.isValidoSpinnerFront = false;
    }
}

goCargarDocumento() {
  try {
    const imagen = new Imagen();
    const blobAnverso = imagen.convertirImagenEnBlob(this.frontImg);
    console.log('blobAnverso'); console.log(blobAnverso);
    if (blobAnverso) {
      this.cargarDocumento(blobAnverso, this.saveS.getBearerToken());
    } else {
      alert('Imagen Invalida');
    }
  } catch (error) {
    console.log(error);
  }
}

cargarDocumento(fileAnverso: any, bearerToken: string) {
  this.loading.present('Cargando...');
  // this.actualizarActivity('EN PROCESO');
    this.esCargando = true;
    const date = new Date();
    const dataFile1 = new DataFile(
      'bid:Anverso', 'Nombre', 'Primer apellido', 'Segundo apellido', '123549', date.toISOString(), 'RES_BURO', '123123');
    const jsonRequest = new JsonRequest('IDOFA', this.saveS.getOperationID(), 'OK', '', '');
    this.documentosService.cargarDocumento(jsonRequest, dataFile1, fileAnverso, bearerToken).subscribe(
    (respuesta: any) => {
      console.log('cargarDocumento respuesta', respuesta);
      if (respuesta['resultOK']) {
        // this.actualizarActivity('FINALIZADO');
        this.esCargando = false;
        this.loading.dismiss();
        // alert('Archivo guardado con éxito');
        // this.navCtrl.navigateRoot('info-grales');
        this.guardarDatos(this.pData);
      } else {
        // alert(respuesta['message']);
        this.loading.dismiss();
        this.esCargando = false;
      }
    },
    (error: HttpErrorResponse) => {
      this.loading.dismiss();
      console.log(error);
      switch (error['status']) {
        case 401:
          alert('Es necesario iniciar session, nuemente para continuar');
          this.navCtrl.navigateRoot('login');
          break;

          case 404:
          alert('Es necesario iniciar session, nuemente para continuar');
              this.navCtrl.navigateRoot('login');
            break;

          case 500:
          alert('Por favor, reintentar para continuar');
          this.cargarDocumento(fileAnverso, bearerToken);
            break;

          case 501:
          alert('Por favor, reintentar para continuar');
          this.cargarDocumento(fileAnverso, bearerToken);
            break;
        default:
          alert('Es necesario iniciar session, nuemente para continuar');
            this.navCtrl.navigateRoot('login');
          break;
      }
      // alert('Hubo un error al enviar los datos, intenta de nuevo');
    });
  }

  actualizarActivity(estatus: string) {
     const productId = 1;
    const jsonData = new JsonData( productId, this.saveS.getSystemCode(),
    estatus, '1', '', this.secuenciaId, 1, this.saveS.getPersonId());
    // {'id': this.saveS.getPersonId(), 'observations': this.validINE.toString()} 
    console.log('jsonData validINE :');
    console.log(jsonData);
    const jsonMetaData = new JsonMetadata(0, '', 0, 0, 1, 1);

    /* const jsonData = {
      'data': {
        'productId': 1,
        'code': '',
        'activityStatus': 'FINALIZADO',
        'activityValue': null,
        'data': '{"personal_data":{"id":' + this.saveS.getPersonId() + ',"observations":"' + this.validINE + '}}',
        'secuence': 17,
        'workflowId': 1,
        'personId': this.saveS.getPersonId()
      },
      'metadata': {
        'accuracy': 0,
        'deviceInfo': '',
        'latutide': 0,
        'longitude': 0,
        'timeZoneId': 1,
        'userId': this.saveS.getResultLogin()
      },
      'operationId': this.saveS.getOperationID()
    }; */
     const jsonDatosActivity = new JsonDatosActivity(jsonData, jsonMetaData, this.saveS.getOperationID());
    // jsonDatosActivity
    this.activityService.actualizarDatosActivityINE(jsonDatosActivity,
      this.login.token).subscribe(
      (resultado: any) => {
      });
  }
  guardarDatos(json: JsonPersonalData) {
    // tslint:disable-next-line: max-line-length
    let jsonPersonalData = json;
    this.pData = jsonPersonalData;
    let operationData = new JsonOperationData("bid");
    let jsonInnerData = new JsonInnerData(jsonPersonalData);
    let jsonInnerDataString = JSON.stringify(jsonInnerData);
    let jsonData = new JsonData(1, "","FINALIZADO","2",jsonInnerDataString,this.secuenciaId,1,0);
    let jsonMetaData = new JsonMetadata(0,"",0,0,1,1);
    let jsonDatosActivity = new JsonDatosActivity(jsonData,jsonMetaData, this.saveS.getOperationID());
    this.saveS.setJsonDatosActivity(jsonDatosActivity);
    this.activitiesService.actualizarDatosActivity(jsonDatosActivity, this.saveS.getBearerToken()).subscribe(
    (resultado: any) => {
      console.log(resultado);
      if(resultado.code == -9999)
      {
        this.navCtrl.navigateRoot('finalizar');
      } else {
        alert('Error al Guardar los datos');
      }
    },
    (err: HttpErrorResponse) => {
      console.log(err);
    });
  }

  logout() {
    this.login.finalizar();
  }

  isValidoChange(event) {
    if (this.cardValid === true) {
      this.validINE = 'Identificación válida';
    } else {
      this.validINE = 'Identificación no válida';
    }
  }

}
