import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
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
declare var getPdf: any;

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

  constructor(

    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private loginService: LoginService,
    private activityService: ActivitiesService,
    private documentosService: DocumentosService,
    private consultaBuroService: ConsultaBuroService,
    private saveS: GuardarStorageService
  ) { 
    this.cliente = this.saveS.getCliente();
  }

  public signaturePadOptions: Object = {
    // passed through to szimek/signature_pad constructor
    'minWidth': 2,
    // 'canvasWidth': 800,
    // 'canvasHeight': 400,
    'backgroundColor': 'rgb(255,255,255)'
  };

  ngOnInit() {
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

  repetir(){
    this.signaturePad.clear();
  }

  // autorizarConsulta() {
  //   this.esMostrarFirma = true;
  // }

  // negarConsulta() {
  //   this.esMostrarFirma = false;

  // }

  finalizar() {
    this.loginService.finalizar();
  }

  repetirContrato() {
    this.pdfContrato = null;
  }

  onFirmaAutografa() {
    this.navCtrl.navigateRoot('firma-autofraga');
  }

  enviar() {
    if (this.firma) {
      this.esCargando = true;
      this.cliente = new Cliente();
      let campos: JsonCamposContrato[] = []
      console.log(this.cliente)
      let nombre = this.cliente.getNombre+" "+this.cliente.getPaterno()+" "+this.cliente.getMaterno();
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
          let jsonData = new JsonDataContrato(idTasFirma,"ACIC",campos);
          let jsonContratos = new JsonContrato(this.saveS.getOperationID(),jsonData);
          this.consultaBuroService.obtenerContrato(jsonContratos,this.saveS.getBearerToken()).subscribe(
            ((response: any)=>{
              console.log(response)
              if(response['code']==-9999)
              {
                console.log(response)
                this.actualizarActivity("FINALIZADO");
                this.saveS.setResBuro(idTasFirma)
                this.pdfContrato =atob(response['data']);
                this.navCtrl.navigateRoot('consulta-buro');
                // getPdf(this.pdfContrato);
              }
            })
          );
        }
        else
        {
          this.actualizarActivity("ERROR");
          alert(respuesta["message"]);
        }
      },
      (err:HttpErrorResponse)=>
      {
        console.log(err);
        alert("Hubo un error al enviar los datos, intenta de nuevo");
      });
      //-------------------------------------------------------//
    } else {
      this.alerta();
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
