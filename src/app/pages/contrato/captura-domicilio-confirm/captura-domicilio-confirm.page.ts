import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { GuardarStorageService } from 'src/app/services/guardar-storage.service';
import { LoginService } from 'src/app/services/login.service';
import { DocumentosService } from 'src/app/services/documentos/documentos.service';
import { JsonPersonalData } from 'src/app/services/actividades/model/json-personal-data.model';
import { JsonOperationData } from 'src/app/services/actividades/model/json-operation-data.model';
import { JsonInnerData } from 'src/app/services/actividades/model/json-inner-data.model';
import { JsonData } from 'src/app/services/actividades/model/json-data.model';
import { JsonMetadata } from 'src/app/services/actividades/model/json-metadata.model';
import { JsonDatosActivity } from 'src/app/services/actividades/model/json-datos-activity.model';
import { VariablesSesion } from 'src/app/services/model/variables-sesion.model';
import { Cliente } from '../../tipo-identificacion/consulta-similitud-confirmacion/model/Cliente.model';
import { ActivitiesService } from 'src/app/services/actividades/activities-service';
import { HttpErrorResponse } from '@angular/common/http';
import { ResumenDoctos } from '../firma-contrato/model/resumen-doctos.model';

@Component({
  selector: 'app-captura-domicilio-confirm',
  templateUrl: './captura-domicilio-confirm.page.html',
  styleUrls: ['./captura-domicilio-confirm.page.scss'],
})
export class CapturaDomicilioConfirmPage implements OnInit {
  externalLink: any;
  imgenDomicilio: any;
  analisis: any;
  fag: boolean;
  cp: string;
  cliente: Cliente;
  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private saveS: GuardarStorageService,
    private login: LoginService,
    private documentosService: DocumentosService,
    private activityService: ActivitiesService
  ) { }

  ngOnInit() {
    this.imgenDomicilio = this.saveS.getImagenDomicilio();
    this.fag = false;
    this.consultarData();
    console.log("cliente", this.saveS.getCliente());
    this.cliente = this.saveS.getCliente();
    
  }

  consultarData() {
    if (this.fag === true) {
      console.log('Si han llegado datos');

    } else {
      console.log('NO han llegado datos');
      setTimeout(() => {
        this.analisis = this.saveS.getDatosDomicilio();
        console.log('consultando data', this.analisis);
        if (this.analisis === '' || this.analisis === undefined || this.analisis === null) {
          this.consultarData();
        } else {
          this.fag = true;        
          let cpLocation = this.analisis.colonia.search("C . P . ");     
          if(cpLocation > -1)
          {
            this.cp = this.analisis.colonia.substr(cpLocation+8,5);
            this.analisis.cp = this.cp;
            this.guardarDatos()
          }
        }
      }, 3000);
    }
  }

  goFirmaContrato() 
  {
    alert("Datos guardados");
    this.navCtrl.navigateRoot('firma-autografa');
  }

   guardarDatos()
  {
    const jsonPersonalData = new JsonPersonalData(0,"", this.cliente.getPaterno(),
    this.cliente.getNombre(),this.cliente.getMaterno(),
    this.cliente.getSexo(),this.cliente.getNacimiento(),"es","",
    this.cliente.getPaisDeNacimiento(),"","1","",this.cliente.getOcr(), 
    this.cliente.getRfc(),this.cliente.getCurp(),[],"",this.cliente.getPhones());
    let jsonInnerData = new JsonInnerData(jsonPersonalData);
    let jsonInnerDataString = JSON.stringify(jsonInnerData);
    let jsonData = new JsonData(1, "","FINALIZADO","1",jsonInnerDataString,12,1,0);
    let jsonMetaData = new JsonMetadata(0,"",0,0,1,1);
    let jsonDatosActivity = new JsonDatosActivity(jsonData,jsonMetaData, this.saveS.getOperationID());
    this.activityService.actualizarDatosActivity(jsonDatosActivity, this.saveS.getBearerToken()).subscribe(
      (resultado: any) => {
        if(resultado["code"] == -9999)
        {
          console.log(resultado);
          let resumenDocto = new ResumenDoctos("document","CFE","Comprobante domicilio","");
          if(this.saveS.getResumenDoctos() != null)
          {
            this.saveS.getResumenDoctos().push(resumenDocto);
            this.goFirmaContrato();
          }
          else
          {
            this.saveS.setResumenDoctos([]);
            this.saveS.getResumenDoctos().push(resumenDocto);
          }
        }
        else{
          alert("Error al guardar la información, intentar de nuevo");
        }                      
      },
      (err:HttpErrorResponse)=>{
        console.log(err);
      });
  } 


}
