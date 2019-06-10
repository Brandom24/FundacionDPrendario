import { Component, OnInit } from '@angular/core';
import { GuardarStorageService } from 'src/app/services/guardar-storage.service';
import { AlertController, NavController } from '@ionic/angular';
import { CatalogoValuesOut } from 'src/app/services/catalogos/model/catalogo-values-out.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Cliente } from './model/Cliente.model';
import { Regex } from 'src/app/herramientas/regex';
import { Storage } from '@ionic/storage';
import { CatalogoService } from 'src/app/services/catalogos/catalogo.service';
import { LoginService } from 'src/app/services/login.service';
import { CatalogoValuesIn } from 'src/app/services/catalogos/model/catalogo-values-in.model';
import { Phone } from './model/Phone.model';
import { ActivitiesService } from 'src/app/services/actividades/activities-service';
import { JsonDatosActivity } from 'src/app/services/actividades/model/json-datos-activity.model';
import { JsonData } from 'src/app/services/actividades/model/json-data.model';
import { JsonPersonalData } from 'src/app/services/actividades/model/json-personal-data.model';
import { JsonOperationData } from 'src/app/services/actividades/model/json-operation-data.model';
import { JsonInnerData } from 'src/app/services/actividades/model/json-inner-data.model';
import { JsonMetadata } from 'src/app/services/actividades/model/json-metadata.model';
import { HttpErrorResponse } from '@angular/common/http';
import { DataClientesService } from '../../../services/data-clientes.service';

@Component({
  selector: 'app-consulta-similitud-confirmacion',
  templateUrl: './consulta-similitud-confirmacion.page.html',
  styleUrls: ['./consulta-similitud-confirmacion.page.scss'],
})
export class ConsultaSimilitudConfirmacionPage implements OnInit {
  analisis: any; fag: boolean;
  catalogoSexo: CatalogoValuesOut[];
  infoClienteForm: FormGroup;
  cliente: Cliente;
  regex = new Regex();
  secuenciaId: number;
  constructor(
    private saveS: GuardarStorageService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private catalogoService: CatalogoService,
    private login: LoginService,
    private activitiesService: ActivitiesService,
    private dataClient: DataClientesService
  ) { 
    
    this.secuenciaId = 0;
    if(this.saveS.getTipoFlujo() == "alhajas")
    {
      this.secuenciaId = 2;
    }
    else
    {
      this.secuenciaId = 7;
    }
  }

  validation_messages = {
    'nombre': [
      {type: 'required', message: 'El campo es necesario'},
      {type: 'pattern', message: 'El formato no es valido'}
    ],
    'paterno': [
      {type: 'required', message: 'El campo es necesario'},
      {type: 'pattern', message: 'El formato no es valido'}
    ],
    'materno': [
      {type: 'required', message: 'El campo es necesario'},
      {type: 'pattern', message: 'El formato no es valido'}
    ],
    'curp': [
      {type: 'required', message: 'El campo es necesario'},
      {type: 'pattern', message: 'El formato no es valido'}
    ],
    'rfc': [
      {type: 'required', message: 'El campo es necesario'},
      {type: 'pattern', message: 'El formato no es valido'}
    ],
    'anioRegistro': [
      {type: 'required', message: 'El campo es necesario'},
      {type: 'pattern', message: 'El formato no es valido'}
    ],
    'emision': [
      {type: 'required', message: 'El campo es necesario'},
      {type: 'pattern', message: 'El formato no es valido'}
    ],
    'claveElector': [
      {type: 'required', message: 'El campo es necesario'},
      {type: 'pattern', message: 'El formato no es valido'},
      {type: 'minLength', message: 'Se esperan 18 caracteres'}
    ],
    'vigencia': [
      {type: 'required', message: 'El campo es necesario'},
      {type: 'pattern', message: 'El formato no es valido'}
    ],
    'telefono': [
      {type: 'required', message: 'El campo es necesario'},
      {type: 'pattern', message: 'El formato no es valido'}
    ],
    'ocr': [
      {type: 'required', message: 'El campo es necesario'},
      {type: 'pattern', message: 'El formato no es valido'}
    ]
  };

  ngOnInit() {
    this.fag = false;
    this.consultarData();
    this.cliente = new Cliente();
    let catalogoValuesIn = new CatalogoValuesIn("Sexo")
    this.catalogoService.obtenerElementosCatalogo(catalogoValuesIn,this.login.token).subscribe(
      (resultado:CatalogoValuesOut[])=>{
        this.catalogoSexo = resultado;
      }
    )
  }

  obtenerDatos() {
    this.cliente.setNombre(this.infoClienteForm.controls.nombre.value);
    this.cliente.setPaterno(this.infoClienteForm.controls.paterno.value);
    this.cliente.setMaterno(this.infoClienteForm.controls.materno.value);
    this.cliente.setAnioRegistro(this.infoClienteForm.controls.anioRegistro.value);
    this.cliente.setEmision(this.infoClienteForm.controls.emision.value);
    this.cliente.setClaveElector(this.infoClienteForm.controls.claveElector.value);
    this.cliente.setCurp(this.infoClienteForm.controls.curp.value);
    this.cliente.setRfc(this.infoClienteForm.controls.rfc.value);
    this.cliente.setOcr(this.infoClienteForm.controls.ocr.value);
    this.cliente.setNacimiento(this.infoClienteForm.controls.nacimiento.value);
    this.cliente.setSexo( this.infoClienteForm.controls.sexo.value);
    this.cliente.setVigencia(this.infoClienteForm.controls.vigencia.value);
    let phone = new Phone(0,this.infoClienteForm.controls.telefono.value,"","1","SAVE");
    this.cliente.setPhones([]);
    this.cliente.getPhones().push(phone);
    this.guardarDatos(this.cliente);
  }

  guardarDatos(cliente: Cliente)
  {
    let jsonPersonalData = new JsonPersonalData(0,"",cliente.getPaterno(),cliente.getNombre(),cliente.getMaterno(),cliente.getSexo(),cliente.getNacimiento(),"es","",cliente.getPaisDeNacimiento(),"","1","",cliente.getOcr(), cliente.getRfc(),cliente.getCurp(),[],"",cliente.getPhones());
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
        this.saveS.setCliente(cliente);
        this.saveS.setPersonId(resultado.data.personId);
        // alert("Datos guardados");
        if(this.saveS.getTipoIdentificacion()=='INE')
          this.navCtrl.navigateRoot('consulta-ine');
        else
          this.navCtrl.navigateRoot('info-grales');
      }
      else{
        // alert("Error");
      }                      
    },
    (err:HttpErrorResponse)=>{
      console.log(err);
    });
  }

  consultarData() {
    if (this.fag === true) {
      console.log('Si han llegado datos');

    } else {
      console.log('NO han llegado datos');
      let timeOutBuscaDatos = setTimeout(() => {
        this.analisis = this.saveS.getDatosOCR();
        if (this.analisis === '' || this.analisis === undefined || this.analisis === null) {
          this.consultarData();
        } else 
        {
          clearInterval(timeOutBuscaDatos);
          this.fag = true;
          this.cliente.setNombre(this.analisis.name);
          this.cliente.setPaterno(this.analisis.firstSurname);
          this.cliente.setMaterno(this.analisis.secondSurname);
          let registryYear = this.analisis.registry_YEAR?this.analisis.registry_YEAR.substring(0,4):"";
          this.cliente.setAnioRegistro(registryYear);
          let expedition_DATE = this.analisis.expedition_DATE?this.analisis.expedition_DATE.split("-")[0]:"";
          this.cliente.setEmision(expedition_DATE);
          this.cliente.setClaveElector(this.analisis.claveElector);
          this.cliente.setCurp(this.analisis.curp);
          this.cliente.setRfc("");
          let campoOcr = this.analisis.mrz?this.analisis.mrz.split('<<')[1].substring(0,13):"";
          this.cliente.setOcr(campoOcr);
          let dateOfExpiry = this.analisis.dateOfExpiry?this.analisis.dateOfExpiry.split("-")[0]:"";
          this.cliente.setVigencia(dateOfExpiry)
          this.cliente.setTelefono("");
          this.cliente.setNacimiento(this.analisis.dateOfBirth);
          this.cliente.setSexo(this.analisis.gender);

          this.infoClienteForm = this.formBuilder.group({

            nombre: [this.cliente.getNombre(), [Validators.required,
              Validators.pattern(this.regex.validarNombre())]],

            paterno: [this.cliente.getPaterno(), [Validators.required, 
              Validators.pattern(this.regex.validarNombre()),
              Validators.minLength(3)]],
            materno: [this.cliente.getMaterno(), [Validators.required, 
              Validators.pattern(this.regex.validarNombre()),
              Validators.minLength(3)]],
            anioRegistro: [this.cliente.getAnioRegistro()?this.cliente.getAnioRegistro():"",
              [Validators.pattern(this.regex.validarAnioRegistro()),
              Validators.minLength(4),
              Validators.maxLength(7)]],
            emision: [this.cliente.getEmision(),
              [Validators.max(9999)]],
            claveElector: [this.cliente.getClaveElector(),
              [Validators.pattern(this.regex.validarClaveIne()),
              Validators.minLength(18)]],
            curp: [this.cliente.getCurp(), 
              [Validators.pattern(this.regex.validarCurp()),
              Validators.minLength(18)]],
            rfc: [this.cliente.getRfc(), 
              [Validators.required,
                Validators.minLength(10),
                Validators.pattern(this.regex.validarRfc())]],
            ocr: [this.cliente.getOcr(),
                [Validators.pattern(this.regex.validarSoloNumeros(13)),
                Validators.minLength(13)]],
            vigencia: [this.cliente.getVigencia(), 
              [Validators.required,
               Validators.max(9999)]],
            telefono: [this.cliente.getTelefono(),
               [Validators.required,
                Validators.minLength(10),
                Validators.maxLength(10)]],
            nacimiento: [this.cliente.getNacimiento(), Validators.required],
            sexo: [this.cliente.getSexo()=='H'?'Masculino':'Femenino', Validators.required]
          });
        }
      }, 3000);
    }
  }

}
