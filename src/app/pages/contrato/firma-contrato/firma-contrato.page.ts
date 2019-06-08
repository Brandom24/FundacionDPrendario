import { Component, OnInit } from '@angular/core';
import { DocumentosService } from '../../../services/documentos/documentos.service';
import { Imagen } from '../../../herramientas/imagen';
import { LoginService } from '../../../services/login.service';
import { GuardarStorageService } from 'src/app/services/guardar-storage.service';
import { JsonAddress } from 'src/app/services/actividades/model/json-address.model';
import { Cliente } from '../../tipo-identificacion/consulta-similitud-confirmacion/model/Cliente.model';
import { NavController } from '@ionic/angular';
import { ResumenDatos } from './model/resumen-datos.model';
import { ResumenDoctos } from './model/resumen-doctos.model';

@Component({
  selector: 'app-firma-contrato',
  templateUrl: './firma-contrato.page.html',
  styleUrls: ['./firma-contrato.page.scss'],
})
export class FirmaContratoPage implements OnInit {
  tasReferences: any; anversoId: any; reversoId: any;
  jsonAddress: JsonAddress;
  cliente: Cliente;
  comprobante: any;
  esAnversoActiva: boolean;
  activityData: any;
  bearerToken: string;
  esCargando: boolean;
  esDatosObtenidos: boolean;
  imagen = new Imagen();
  blobComprobante: any;
  b64File: any;
  analisis: any;
  consultaBuro: any;
  comprobanteCFE: any;
  nombre: string;
  curp: string;
  telefono: string;
  esVerificado: boolean = false;
  doctosResumen: ResumenDoctos[];

  constructor(
    private saveS: GuardarStorageService,
    private login: LoginService,
    private documentosService: DocumentosService,
    private navCtrl: NavController
  ) { 
    this.cliente = this.saveS.getCliente();
    if(!this.cliente)
      this.cliente = new Cliente();
    if(this.cliente.getPhones() && this.cliente.getPhones().length > 0)
    {
      this.telefono = this.cliente.getPhones()[0].number;
    }
  }

  ngOnInit() {
    console.log(this.saveS.getResumenDoctos());
    this.doctosResumen = this.saveS.getResumenDoctos();
    this.analisis = this.saveS.getDatosOCR();
    this.esCargando = false;
    this.esDatosObtenidos = false;
    this.tasReferences = this.saveS.getTasReferences();
    for (let i = 0; i < this.tasReferences.length; i++) {
      if (i === 0) {
        this.anversoId = 'anversoId';
      } else {
        this.reversoId = 'reversoId';
      }
      this.documentosService
      .obtenerDocumento(this.tasReferences[i]['repository_reference'], this.login.token)
      .subscribe(
                (respuesta: any) => {
                  if (respuesta['resultOK']) {
                    if (this.tasReferences[i] === 0) {
                      this.saveS.setAnversoIdContrato('data:image/jpeg;base64,' + respuesta['content']);
                    }
                    if (this.tasReferences[i] === 1) {}
                    this.saveS.setReversoIdContrato('data:image/jpeg;base64,' + respuesta['content']);
                    }
            });
    }
  }
  
  comprobarEsVerficado($event:boolean)
  {
    this.esVerificado = $event;
  }

  finalizar()
  {
    this.saveS.setCliente(null);
    this.saveS.setAnversoIdContrato(null);
    this.saveS.setDatosDomicilio(null);
    this.saveS.setDatosOCR(null);
    this.saveS.setImagenDomicilio(null);
    this.saveS.setIneAnverso(null);
    this.saveS.setIneReverso(null);
    this.saveS.setJsonDatosActivity(null);
    this.saveS.setOperationID(null);
    this.saveS.setPersonId(null);
    this.saveS.setReversoIdContrato(null);
    this.saveS.setTasReferences(null);
    this.saveS.setTipoFlujo(null);
    this.saveS.setTipoINE(null);
    this.saveS.setTipoIdentificacion(null);
    this.saveS.setResumenDoctos(null);
    this.navCtrl.navigateRoot('menu-principal');    
  }

}
