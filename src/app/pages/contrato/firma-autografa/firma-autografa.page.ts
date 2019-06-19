import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { JsonInnerData } from 'src/app/services/actividades/model/json-inner-data.model';
import { VariablesSesion } from 'src/app/services/model/variables-sesion.model';
import { LoginService } from 'src/app/services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { JsonData } from 'src/app/services/actividades/model/json-data.model';
import { JsonMetadata } from 'src/app/services/actividades/model/json-metadata.model';
import { JsonDatosActivity } from 'src/app/services/actividades/model/json-datos-activity.model';
import { ActivitiesService } from 'src/app/services/actividades/activities-service';
import { JsonCamposContrato } from './model/json-campos-contrato.model';
import { Imagen } from 'src/app/herramientas/imagen';
import { DataFile } from 'src/app/services/documentos/model/data-file.model';
import { JsonRequest } from 'src/app/services/documentos/model/jsonRequest.model';
import { DocumentosService } from 'src/app/services/documentos/documentos.service';
import { JsonDataContrato } from './model/json-data-contrato.model';
import { JsonContrato } from './model/json-contrato.model';
import { ConsultaBuroService } from './consulta-buro-service';
import { GuardarStorageService } from 'src/app/services/guardar-storage.service';
import { Cliente } from '../../tipo-identificacion/consulta-similitud-confirmacion/model/Cliente.model';
import { ResumenDoctos } from '../firma-contrato/model/resumen-doctos.model';
import { LoadingService } from 'src/app/services/loading.service';

declare var getPdf: any;
declare var FingersBidEnrollment: any;


@NgModule({
  imports: [
    SignaturePad
  ],
  declarations: [FirmaAutografaPage]
})

@Component({
  selector: 'app-firma-autografa',
  templateUrl: './firma-autografa.page.html',
  styleUrls: ['./firma-autografa.page.scss'],
})
export class FirmaAutografaPage implements OnInit {
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  firma: string;
  esConsultar: boolean = false;
  bearerToken: string;
  // operationId: string;
  cliente: Cliente;
  options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
  estampaTiempo: string;
  date = new Date();
  esMostrarFirma: boolean = false;
  activityData: VariablesSesion;
  pdfContrato: any;
  esCargando: boolean = false;
  autografa: boolean;
  digital: boolean;
  jsonData: JsonDataContrato;
  documentPDF: any;
  fag: boolean;
  constructor(
    private loading: LoadingService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private loginService: LoginService,
    private activityService: ActivitiesService,
    private documentosService: DocumentosService,
    private consultaBuroService: ConsultaBuroService,
    private saveS: GuardarStorageService,
    private platform: Platform,
  ) {
    this.cliente = this.saveS.getCliente();
    this.autografa = false;
    this.digital = false;
    this.fag = false;
  }

  public signaturePadOptions: Object = {
    // passed through to szimek/signature_pad constructor
    'minWidth': 2,
    'canvasWidth': 480,
    // 'canvasHeight': 400,
    'backgroundColor': 'rgb(255,255,255)'
  };

  ngOnInit() {
  }

  onChangerFirma(tipoFirma) {
    switch (tipoFirma) {
      case 'autografa':
          this.autografa = true;
          this.digital = false;
        break;

      case 'digital':
          this.autografa = false;
          this.digital = true;
            break;

      default:
        break;
    }
  }

// tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewInit() {
    if (this.signaturePad) {
      this.signaturePad.set('minWidth', 2);
      this.signaturePad.clear();
    }
  }

  drawComplete() {
    this.firma = this.signaturePad.toDataURL();
  }

  repetir() {
    this.signaturePad.clear();
  }

  // autorizarConsulta() {
  //   this.esMostrarFirma = true;
  // }

  // negarConsulta() {
  //   this.esMostrarFirma = false;

  // }

  finalizar() {
    // this.loginService.finalizar();
    this.navCtrl.navigateRoot('consulta-buro');
    }

  repetirContrato() {
    this.pdfContrato = null;
  }

  onFirmaAutografa() {
    this.navCtrl.navigateRoot('firma-autofraga');
  }

  verificarUser() {
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
                this.loginService.setFingerVerify(jsonFingerPrintsString);
                this.loginService.verifyFingerUser(this.saveS.getOperationID());
                // evaluar resultado para llamar a la funcion enviar()
                if (this.autografa === true && this.digital === false) {
                  this.enviar();
                }
                if (this.digital === true && this.autografa === false) {
                  this.enviarDigital(jsonFingerPrintsString);
                }
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

  enviarDigital(jsonFingerPrintsString: any) { 
    this.loading.present('Cargando...');
    if (jsonFingerPrintsString) {
      this.esCargando = true;
      // this.cliente = new Cliente();
      this.cliente = this.saveS.getCliente();
      let campos: JsonCamposContrato[] = [];
      console.log('enviarDigital this.cliente');
      console.log(this.cliente);
      let nombre = this.cliente.getNombre() + ' ' + this.cliente.getPaterno()+" "+this.cliente.getMaterno();
      let jsonCamposNombre = new JsonCamposContrato(1,"nombreSolicitante");
      campos.push(jsonCamposNombre);
      let jsonCamposRfc = new JsonCamposContrato(1,"RFC",this.cliente.getRfc());
      campos.push(jsonCamposRfc);
      let jsonCamposDomicilio = new JsonCamposContrato(1,"domicilio",this.cliente.getCalle());
      campos.push(jsonCamposDomicilio);
      let jsonCamposColonia = new JsonCamposContrato(1,"colonia",this.cliente.getColonia());
      campos.push(jsonCamposColonia);
      let jsonCamposMunicipio = new JsonCamposContrato(1,"municipio","1");
      campos.push(jsonCamposMunicipio);
      let jsonCamposEstado = new JsonCamposContrato(1,"estado","1");
      campos.push(jsonCamposEstado);
      let jsonCamposCodigoPostal = new JsonCamposContrato(1,"codigoPostal",this.cliente.getCodigoPostal()?this.cliente.getCodigoPostal().toString():"");
      campos.push(jsonCamposCodigoPostal);
      let celular = "";    
      if(this.cliente.getPhones() && this.cliente.getPhones().length > 0)
      {
        celular = this.cliente.getPhones()[0].number;
      }
      let jsonCamposTelefonos = new JsonCamposContrato(1,"telefonos",celular);
      campos.push(jsonCamposTelefonos);
      this.estampaTiempo = (this.date.toLocaleDateString('es-MX', this.options)).toUpperCase();
      let jsonCamposFechaFirma = new JsonCamposContrato(1,"fechaFirma",this.estampaTiempo);
      campos.push(jsonCamposFechaFirma);
      let jsonCamposNombreFirma = new JsonCamposContrato(1,"nombreFirma",nombre);
      campos.push(jsonCamposNombreFirma);
      let jsonCamposFechaConsulta = new JsonCamposContrato(1,"fechaConsulta",this.estampaTiempo);
      campos.push(jsonCamposFechaConsulta);
      if(jsonFingerPrintsString)
      {
        let jsonCamposImgFirma = new JsonCamposContrato(1,"imgFirma",jsonFingerPrintsString);
        campos.push(jsonCamposImgFirma);
      }
      this.actualizarActivity("EN PROCESO");
      //Guardar firma en tas
      // let imagen = new Imagen();
      // let blobFirma = imagen.convertirImagenEnBlob(jsonFingerPrintsString);  
      let date = new Date();
      let fechaString = date.toISOString();
      let dataFile1 = new DataFile("bid:Anverso","Nombre","Primer apellido","Segundo apellido","123549",fechaString,"FIRMA","123123");
  
      let jsonRequest = new JsonRequest("IDOFA",this.saveS.getOperationID(),"OK");
      
      this.esCargando = false;
          let idTasFirma = 'SIN ID TAS';
          //Llamando servicio para crear contrato  
          if (this.autografa === true && this.digital === false) {
            this.jsonData = new JsonDataContrato('0', idTasFirma,"ACIC",campos);
          }
          if (this.digital === true && this.autografa === false){
            this.jsonData  = new JsonDataContrato('2', idTasFirma,"ACIC",campos);
          }
          const jsonContratos = new JsonContrato(this.saveS.getOperationID(), this.jsonData);
          this.consultaBuroService.obtenerContrato(jsonContratos, this.saveS.getBearerToken()).subscribe(
            ((response: any)=>{
              console.log(response)
              if(response['code']==-9999)
              {
                console.log(response)
                this.actualizarActivity("FINALIZADO");
                this.saveS.setResBuro(idTasFirma);
                this.pdfContrato = 'data:application/pdf;base64,' + response['data'];
                // this.navCtrl.navigateRoot('consulta-buro');
                this.loading.dismiss();
                // getPdf(this.pdfContrato);
              }
            }), async (error: HttpErrorResponse) => {
              this.loading.dismiss();
              if (error['status'] === 0 || error['status'] === 500) {
                const alert = await this.alertCtrl.create({
                  backdropDismiss: false,
                  header: 'Error al intentar guardar los datos',
                  buttons: [{
                    text: 'Reintentar',
                    role: 'reintentar',
                    cssClass: 'secondary',
                    handler: () => {
                      // accion del boton
                      this.enviarDigital(jsonFingerPrintsString);
                    }
                  },
                ]
                });
                await alert.present();
              } else {
                const alert = await this.alertCtrl.create({
                  backdropDismiss: false,
                  header: 'Error al intentar guardar los datos',
                  buttons: [{
                    text: 'Reintentar',
                    role: 'reintentar',
                    cssClass: 'secondary',
                    handler: () => {
                      // accion del boton
                      this.enviarDigital(jsonFingerPrintsString);
                    }
                  },
                ]
                });
                await alert.present();
              }
              console.log(error);
              this.loading.dismiss();
            });
    } else {
      this.alerta();
      this.loading.dismiss();
    }
  }

  enviar() {
    this.loading.present('Cargando...');
    if (this.firma) {
      this.esCargando = true;
      // this.cliente = new Cliente();
      this.cliente = this.saveS.getCliente();
      console.log('this.cliente');
      console.log(this.cliente);
      let campos: JsonCamposContrato[] = []
      let nombre = this.cliente.getNombre()+" "+this.cliente.getPaterno()+" "+this.cliente.getMaterno();
      let jsonCamposNombre = new JsonCamposContrato(1,"nombreSolicitante", this.cliente.getNombre());
      campos.push(jsonCamposNombre);
      let jsonCamposRfc = new JsonCamposContrato(1,"RFC",this.cliente.getRfc());
      campos.push(jsonCamposRfc);
      let jsonCamposDomicilio = new JsonCamposContrato(1,"domicilio", this.cliente.getCalle());
      campos.push(jsonCamposDomicilio);
      let jsonCamposColonia = new JsonCamposContrato(1,"colonia", this.cliente.getColonia());
      campos.push(jsonCamposColonia);
      let jsonCamposMunicipio = new JsonCamposContrato(1,"municipio", this.cliente.getCiudad().toString());
      campos.push(jsonCamposMunicipio);
      let jsonCamposEstado = new JsonCamposContrato(1,"estado", this.cliente.getEstado().toString());
      campos.push(jsonCamposEstado);
      let jsonCamposCodigoPostal = new JsonCamposContrato(1,"codigoPostal", this.cliente.getCodigoPostal());
      campos.push(jsonCamposCodigoPostal);
      let celular = "";    
      if(this.cliente.getPhones() && this.cliente.getPhones().length > 0)
      {
        celular = this.cliente.getPhones()[0].number;
      }
      let jsonCamposTelefonos = new JsonCamposContrato(1,"telefonos", celular);
      campos.push(jsonCamposTelefonos);
      this.estampaTiempo = (this.date.toLocaleDateString('es-MX', this.options)).toUpperCase();
      let jsonCamposFechaFirma = new JsonCamposContrato(1,"fechaFirma",this.estampaTiempo);
      campos.push(jsonCamposFechaFirma);
      let jsonCamposNombreFirma = new JsonCamposContrato(1,"nombreFirma", nombre);
      campos.push(jsonCamposNombreFirma);
      let jsonCamposFechaConsulta = new JsonCamposContrato(1,"fechaConsulta",this.estampaTiempo);
      campos.push(jsonCamposFechaConsulta);
      if(this.firma)
      {
        let jsonCamposImgFirma = new JsonCamposContrato(1,"imgFirma",this.firma.split(",")[1]);
        campos.push(jsonCamposImgFirma);
      }
      this.actualizarActivity("EN PROCESO");
      //Guardar firma en tas
      let imagen = new Imagen();
      let blobFirma = imagen.convertirImagenEnBlob(this.firma);  
      let date = new Date();
      let fechaString = date.toISOString();
      let dataFile1 = new DataFile("bid:Anverso","Nombre","Primer apellido","Segundo apellido","123549",fechaString,"FIRMA","123123");
  
      let jsonRequest = new JsonRequest("IDOFA",this.saveS.getOperationID(),"OK");
      this.documentosService.cargarDocumento(jsonRequest,dataFile1,blobFirma,this.bearerToken).subscribe(
      (respuesta:any)=>{
        if(respuesta["resultOK"])
        {
          this.esCargando = false;
          let idTasFirma = respuesta["create1"]["id"];
          //Llamando servicio para crear contrato  
          if (this.autografa === true && this.digital === false) {
            this.jsonData = new JsonDataContrato('0', idTasFirma,"ACIC",campos);
          }
          if (this.digital === true && this.autografa === false){
            this.jsonData  = new JsonDataContrato('1', idTasFirma,"ACIC",campos);
          }
          const jsonContratos = new JsonContrato(this.saveS.getOperationID(), this.jsonData);
          this.consultaBuroService.obtenerContrato(jsonContratos, this.saveS.getBearerToken()).subscribe(
            ((response: any)=>{
              console.log(response)
              if(response['code']==-9999)
              {
                console.log(response)
                this.actualizarActivity("FINALIZADO");
                this.saveS.setResBuro(idTasFirma)
                // this.pdfContrato = atob(response['data']);
                this.pdfContrato = 'data:application/pdf;base64,' + response['data'];
                // this.navCtrl.navigateRoot('consulta-buro');
                this.loading.dismiss();
                // getPdf(this.pdfContrato);
              }
            }), async (error: HttpErrorResponse) => {
              this.loading.dismiss();
              if (error['status'] === 0 || error['status'] === 500) {
                const alert = await this.alertCtrl.create({
                  backdropDismiss: false,
                  header: 'Error al intentar guardar los datos',
                  buttons: [{
                    text: 'Reintentar',
                    role: 'reintentar',
                    cssClass: 'secondary',
                    handler: () => {
                      // accion del boton
                      this.enviar();
                    }
                  },
                ]
                });
                await alert.present();
              }
              console.log(error);
            });
        }
        else
        {
          this.actualizarActivity("ERROR");
          this.loading.dismiss();
          //alert(respuesta["message"]);
        }
      },
      async (error: HttpErrorResponse)=>
      {
        this.loading.dismiss();
        if (error['status'] === 0 || error['status'] === 500) {
          const alert = await this.alertCtrl.create({
            backdropDismiss: false,
            header: 'Error al intentar guardar los datos',
            buttons: [{
              text: 'Reintentar',
              role: 'reintentar',
              cssClass: 'secondary',
              handler: () => {
                // accion del boton
                this.enviar();
              }
            },
          ]
          });
          await alert.present();
        }
        console.log(error);
        this.loading.dismiss();
      });
      //-------------------------------------------------------//
    } else {
      this.alerta();
      this.loading.dismiss();
    }
    
  }
  
  actualizarActivity(estatus: string)
    {
      let jsonData = new JsonData(1,"",estatus,"1","",13,1,this.saveS.getPersonId());
      let jsonMetaData = new JsonMetadata(0,"",0,0,1,1);
      let jsonDatosActivity = new JsonDatosActivity(jsonData,jsonMetaData, this.saveS.getOperationID());
      this.activityService.actualizarDatosActivity(jsonDatosActivity, this.saveS.getBearerToken()).subscribe(
        (resultado: any) => {
          console.log("actualizarDatosActivity", resultado);                        
        });
    }

    async alerta() {

      const alert = await this.alertCtrl.create({
        header: 'Lo sentimos',
        message: 'Para poder avanzar tiene que ingresar su firma.',
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
}
