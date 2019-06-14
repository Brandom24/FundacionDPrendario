import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { DocumentosService } from 'src/app/services/documentos/documentos.service';
import { OauthService } from 'src/app/services/oauth.service';
import { LoginService } from 'src/app/services/login.service';
import { ActivitiesService } from 'src/app/services/actividades/activities-service';
import { GuardarStorageService } from 'src/app/services/guardar-storage.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Imagen } from 'src/app/herramientas/imagen';
import { DataFile } from 'src/app/services/documentos/model/data-file.model';
import { JsonRequest } from 'src/app/services/documentos/model/jsonRequest.model';
import { JsonData } from 'src/app/services/actividades/model/json-data.model';
import { JsonMetadata } from 'src/app/services/actividades/model/json-metadata.model';
import { JsonDatosActivity } from 'src/app/services/actividades/model/json-datos-activity.model';
import { ResumenDoctos } from '../../firma-contrato/model/resumen-doctos.model';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-consulta-buro',
  templateUrl: './consulta-buro.page.html',
  styleUrls: ['./consulta-buro.page.scss'],
})
export class ConsultaBuroPage implements OnInit {

  browser: any;
  esCargando: boolean;
  capturasINE: string;
  frontImg: string;
  isenabled: boolean;
  isValidoSpinnerFront: boolean;
  frontImg2: any;
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
    public camera: Camera) { 
      
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
  this.browser = this.iab.create('https://www.burodecredito.com.mx/', '_system');
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
      // this.saveS.guardarStorageImagenF(this.capturasINE);
      // this.imgCapturada.emit(capturas);
    };
    myReader.readAsDataURL(file);
  }
}

goCargarDocumento() {
  try {
    const imagen = new Imagen();
    const blobAnverso = imagen.convertirImagenEnBlob(this.frontImg);
    this.cargarDocumento(blobAnverso, this.saveS.getBearerToken());
  } catch (error) {
    console.log(error);
  }
}

cargarDocumento(fileAnverso: any, bearerToken: string) {
    this.loading.present('Cargando...');
    this.esCargando = true;
    const date = new Date();
    const dataFile1 = new DataFile(
      'bid:Anverso', 'Nombre', 'Primer apellido', 'Segundo apellido',
      '123549', date.toISOString(), 'RES_BURO', '123123');
    const jsonRequest = new JsonRequest(
      'IDOFA',this.saveS.getOperationID(), 'OK', '', '');
      let resumenDocto = new ResumenDoctos("document","Reporte buró crédito","Contrato","");
        if(this.saveS.getResumenDoctos() != null)
          this.saveS.getResumenDoctos().push(resumenDocto);
        else
        {
          this.saveS.setResumenDoctos([]);
          this.saveS.getResumenDoctos().push(resumenDocto);
        }
        this.documentosService.cargarDocumento(jsonRequest, dataFile1, fileAnverso, bearerToken).subscribe(
        (respuesta: any) => {
          console.log('cargarDocumento respuesta',respuesta);
          if (respuesta['resultOK']) {
            this.actualizarActivity('FINALIZADO');
            //alert('Archivo guardado con éxito');
            this.loading.dismiss();
            this.navCtrl.navigateRoot('firma-contrato');
          } else {
            this.loading.dismiss();
            alert(respuesta['message']);
            this.esCargando = false;
          }
        },
        (err: HttpErrorResponse) => {
          this.loading.dismiss();
          console.log(err);
          alert('Hubo un error al enviar los datos, intenta de nuevo');
        });
  }

  actualizarActivity(estatus: string) {
    const productId = 1;
    const jsonData = new JsonData( productId, '', estatus,'1', '', 15, 1,this.saveS.getPersonId());
    const jsonMetaData = new JsonMetadata(0, '', 0, 0, 1, 1);
    const jsonDatosActivity = new JsonDatosActivity(jsonData,jsonMetaData, this.saveS.getOperationID());
    this.activityService.actualizarDatosActivity(jsonDatosActivity,
      this.login.token).subscribe(
      (resultado: any) => {
      });
  }


}
