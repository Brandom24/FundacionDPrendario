import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Imagen } from 'src/app/herramientas/imagen';
import { GuardarStorageService } from 'src/app/services/guardar-storage.service';
import { LoginService } from 'src/app/services/login.service';
import { DocumentosService } from 'src/app/services/documentos/documentos.service';
import { JsonResDomicilio } from './model/json-res-domicilio.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { JsonData } from 'src/app/services/actividades/model/json-data.model';
import { JsonMetadata } from 'src/app/services/actividades/model/json-metadata.model';
import { JsonDatosActivity } from 'src/app/services/actividades/model/json-datos-activity.model';
import { ActivitiesService } from 'src/app/services/actividades/activities-service';
import { LoadingService } from 'src/app/services/loading.service';


@Component({
  selector: 'app-captura-domicilio',
  templateUrl: './captura-domicilio.page.html',
  styleUrls: ['./captura-domicilio.page.scss'],
})
export class CapturaDomicilioPage implements OnInit {

  esAnversoActiva: boolean;
  activityData: any;
  bearerToken: string;
  esDatosObtenidos: boolean;
  imagen = new Imagen();
  blobComprobante: any;
  b64File: any;
  comprobante: any;
  frontImg: string;
  frontImg2: any;
  isenabled: boolean;
  isValidoSpinnerFront: boolean;

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private saveS: GuardarStorageService,
    private login: LoginService,
    private loading: LoadingService,
    private documentosService: DocumentosService,
    public camera: Camera,
    private activityService: ActivitiesService
  ) { 
  }

  ngOnInit() {
    this.esDatosObtenidos = false;
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
     this.saveS.setImagenDomicilio(this.frontImg);
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

  onFirmaAutografa() {
    this.navCtrl.navigateRoot('firma-autografa');
  }

  changeListenerD($event): void {
    let mensajeError = '';
    const file: File = $event.target.files[0];
    if ((file.type !== 'image/jpeg' && file.type !== 'image/png') || (file.size > 1000000)) {
      mensajeError = 'Formato y/o tamaño de imagen incorrecto';
    } else {
      const myReader: FileReader = new FileReader();
      myReader.onloadend = (e) => {
        this.frontImg = myReader.result.toString();
        this.saveS.setImagenDomicilio(this.frontImg);
      };
      myReader.readAsDataURL(file);
    }
  }

  extraerDatosDomicilio() {
    this.loading.present('Verificando datos..');
    if(this.frontImg) {
    this.actualizarActivity("EN PROCESO",11);
    this.esDatosObtenidos = false;
    this.imagen = new Imagen();
    this.blobComprobante = this.imagen.convertirImagenEnBlob(this.frontImg);
    this.b64File = this.frontImg.split(',')[1];
    let jsonResDomic: JsonResDomicilio;
    this.navCtrl.navigateRoot('captura-domicilio-confirm');
    this.documentosService.extraerDatosOcrDomicilio( this.saveS.getOperationID(),this.blobComprobante,this.b64File, this.login.token).subscribe(
      (respuesta: any) => {
        this.loading.dismiss();
        jsonResDomic = respuesta;
        if (jsonResDomic.resultOK) {
          // guardar informacion del domicilio
          this.actualizarActivity("FINALIZADO",11);
          this.actualizarActivity("EN PROCESO",12);
          this.saveS.setDatosDomicilio(jsonResDomic);
          
          
          // this.localStorage.set("comprobanteDomic",jsonResDomic.tasReference);
          // this.domicilioForm.controls.calle.setValue(jsonResDomic.calle);
          // this.domicilioForm.controls.colonia.setValue(jsonResDomic.colonia);
          // let cpLocation = JSON.stringify(jsonResDomic).search('C . P . ');
          // let cp = '';

          // if (cpLocation >= -1)
          // cp = JSON.stringify(jsonResDomic).substr(cpLocation+8,5);
          // this.domicilioForm.controls.cp.setValue(cp);
          // this.domicilioForm.controls.ciudad.setValue(jsonResDomic.ciudad);
          // this.domicilioForm.controls.nombre.setValue(jsonResDomic.nombre);
          this.esDatosObtenidos = true;
        } else {
          this.loading.dismiss();
          alert('Por el momento no es posible extraer la información, llena los campos manualmente o intenta de nuevo');
        }
      },
      (err: HttpErrorResponse) => {
        this.loading.dismiss();
        console.log('Ocurrió un error en la extracción');
        console.log(err);
      });
    } else {
      this.loading.dismiss();
      this.alerta();
    }
    
  }

  async alerta() {
    const alert = await this.alertCtrl.create({
      header: 'Faltan datos',
      message: 'Para poder avanzar capture la foto',
      buttons: [
        {
          text: 'Entiendo',
          role: 'volver',
          cssClass: 'secondary',
          handler: (blah) => {
            // Accion del boton
          }
        }
      ]
    });
    await alert.present();
  }
  
  actualizarActivity(estatus: string, secuenciaId:number) {
    const productId = 1;
    const jsonData = new JsonData( productId,'', estatus,'1', '', secuenciaId, 1, this.saveS.getPersonId());
    const jsonMetaData = new JsonMetadata(0, '', 0, 0, 1, 1);
    const jsonDatosActivity = new JsonDatosActivity(jsonData,jsonMetaData, this.saveS.getOperationID());
    this.activityService.actualizarDatosActivity(jsonDatosActivity,
      this.login.token).subscribe(
      (resultado: any) => {
      });
  }
}
