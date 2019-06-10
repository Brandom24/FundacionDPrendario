import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { JsonOcr } from '../../../services/documentos/model/json-ocr.model';
import { DocumentosService } from '../../../services/documentos/documentos.service';
import { OauthService } from '../../../services/oauth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Imagen } from '../../../herramientas/imagen';
import { JsonRequest } from '../../../services/documentos/model/jsonRequest.model';
import { DataFile } from '../../../services/documentos/model/data-file.model';
import { ActivitiesService } from '../../../services/actividades/activities-service';
import { JsonDatosActivity } from '../../../services/actividades/model/json-datos-activity.model';
import { JsonData } from '../../../services/actividades/model/json-data.model';
import { JsonMetadata } from '../../../services/actividades/model/json-metadata.model';
import { CatalogoService } from '../../../services/catalogos/catalogo.service';
import { CatalogoValuesOut } from '../../../services/catalogos/model/catalogo-values-out.model';
import { VariablesSesion } from '../../../services/model/variables-sesion.model';
import { LoginService } from '../../../services/login.service';
import { GuardarStorageService } from 'src/app/services/guardar-storage.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ResumenDoctos } from '../../contrato/firma-contrato/model/resumen-doctos.model';

@Component({
  selector: 'app-identificacion-oficial',
  templateUrl: './identificacion-oficial.page.html',
  styleUrls: ['./identificacion-oficial.page.scss'],
})
export class IdentificacionOficialPage implements OnInit {
  capturasF: any; 
  // capturasB: any;
  anverso: string;
  reverso: string;
  esAnversoActiva: boolean;
  idTipo: string;
  esCargando: boolean;
  fechaString: string;
  activityDataStorage: VariablesSesion;
  usuarioStorage: string;
  operationId: number;
  bearerToken: string;
  productId: string = "1";
  // catalogoDoctos: CatalogoValuesOut[];
  doctoSelected: string;
  isValidoSpinnerFront: boolean;
  frontImg: string;
  isenabled: boolean;
  backImg: string;
  backImg2: any;
  isenabled2: boolean;
  frontImg2: any;
  secuenciaId: number
  secuenciaOcr: number

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private documentosService: DocumentosService,
    private oauth: OauthService,
    private login: LoginService,
    private activityService: ActivitiesService,
    private saveS: GuardarStorageService,
    public camera: Camera,
  ) {
    
    this.operationId = this.saveS.getOperationID();
    let tipoId = this.saveS.getTipoFlujo()
    this.secuenciaId = 0;
    if(tipoId == "alhajas")
    {
      this.secuenciaId = 1;
      this.secuenciaOcr = 2;
    }
    else
    {
      this.secuenciaId = 6
      this.secuenciaOcr = 7;
    }

   }

  ngOnInit() {
    this.anverso = '';
    this.reverso = '';
    this.esAnversoActiva = false;
    this.esCargando = false;
  }

  getImagenFront() {
    this.isValidoSpinnerFront = true;
    const options: CameraOptions = {
     quality: 100,
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

  getImagenBack() {
    this.isValidoSpinnerFront = true;
    const options: CameraOptions = {
     quality: 100,
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

  onBiometria() {
    this.navCtrl.navigateRoot('biometria-dactilar');
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

  extraerOCR() {
    
    if(this.backImg && this.frontImg){
        const imagen = new Imagen();
        const blobAnverso = imagen.convertirImagenEnBlob(this.frontImg);
        let blobReverso;
        if (this.backImg) {
          blobReverso = imagen.convertirImagenEnBlob(this.backImg);
        }
        
        this.actualizarActivity('EN PROCESO', this.secuenciaId);
        this.extraerDatosOcr(this.operationId, blobAnverso, this.login.token , blobReverso);
        this.onBiometria();
    } else {
      this.alerta();
    }

  }

  async alerta() {

    const alert = await this.alertCtrl.create({
      header: 'Lo sentimos',
      message: 'Para poder avanzar tiene que capturar ambas fotografias.',
      mode: 'ios',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Entiendo',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // Action button cancel
            // console.log('Button negado');
          }
        }
      ]
    });

    await alert.present();
  }

  extraerDatosOcr(operationId: any, fileAnverso: any, bearerToken: string, fileReverso?: any) {
    this.esCargando = true;
    // const jsonOcr = new JsonOcr('IDOFA', '8');
    this.actualizarActivity('FINALIZADO',this.secuenciaId);
    this.actualizarActivity('EN PROCESO',this.secuenciaOcr);
    this.documentosService.extraerDatosOcr2(+operationId,
      0, fileAnverso, 'IDOFA', bearerToken,
      fileReverso, 'IDOFB').subscribe(
    (respuesta: any) => {
      if (respuesta['resultOK']) {
        this.saveS.setDatosOCR(respuesta.analisys);
        let listaDoctos: ResumenDoctos[] = [];
        let doctoAnverso = new ResumenDoctos("document","INE Anverso","Id Oficial",null);
        listaDoctos.push(doctoAnverso);
        if(fileReverso)
        {
          let doctoReverso = new ResumenDoctos("document","INE Reverso","Id Oficial",null);
          listaDoctos.push(doctoReverso);
        }
        console.log(listaDoctos);
        this.saveS.setResumenDoctos(listaDoctos);
        // alert('Extracción de información completa');
      } else {
        this.actualizarActivity('ERROR', this.secuenciaOcr);
        // alert(respuesta['message']);
      }
      this.esCargando = false;
    },
    (error: HttpErrorResponse) => {
      this.esCargando = false;
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
          this.extraerOCR();
            break;

          case 501:
          alert('Por favor, reintentar para continuar');
          this.extraerOCR();
            break;
        default:
          alert('Es necesario iniciar session, nuemente para continuar');
            this.navCtrl.navigateRoot('login');
          break;
      }
      // this.navCtrl.navigateRoot('login');
    });
  }

  actualizarActivity(estatus: string, secuenciaId:number) {
      const code = '';
      const productId = 1;
      const jsonData = new JsonData(productId,'', estatus, '1','', secuenciaId, 1);
      const jsonMetaData = new JsonMetadata(0, '', 0, 0, 1, 1);
      const jsonDatosActivity = new JsonDatosActivity(jsonData,jsonMetaData, +this.operationId);
      this.activityService.actualizarDatosActivity(jsonDatosActivity,
        this.login.token).subscribe(
        (resultado: any) => {
          
        });
    }

}
