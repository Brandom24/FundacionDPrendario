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
import { NavigationOptions } from '@ionic/angular/dist/providers/nav-controller';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-consulta-similitud-confirmacion',
  templateUrl: './consulta-similitud-confirmacion.page.html',
  styleUrls: ['./consulta-similitud-confirmacion.page.scss'],
})
export class ConsultaSimilitudConfirmacionPage implements OnInit {
  origin: string;
  maxDate: string;

  analisis: any; fag: boolean;
  catalogoSexo: CatalogoValuesOut[];
  infoClienteForm: FormGroup;
  cliente: Cliente;
  regex = new Regex();
  secuenciaId: number;
  fecha: any;
  fechaCompleta: string;
  constructor(
    private saveS: GuardarStorageService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private catalogoService: CatalogoService,
    private login: LoginService,
    private activitiesService: ActivitiesService,
    private dataClient: DataClientesService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.origin = params.origin;
      }
    });
   
    const date: Date = new Date();
// tslint:disable-next-line: max-line-length
    this.maxDate = (date.getUTCFullYear() - 18) + '-' + (date.getUTCMonth() < 10 ? '0' + date.getUTCMonth(): date.getUTCMonth()) + '-' + (date.getUTCDay() < 10 ? '0' + date.getUTCDay() : date.getUTCDay());
    console.log(this.maxDate);
    this.secuenciaId = 24;
    /* if (this.saveS.getTipoFlujo() === 'alhajas') {
      this.secuenciaId = 2;
    } else {
      this.secuenciaId = 7;
    } */
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
    const catalogoValuesIn = new CatalogoValuesIn('Sexo');
    this.catalogoService.obtenerElementosCatalogo(catalogoValuesIn, this.login.token).subscribe(
      (resultado: CatalogoValuesOut[]) => {
        this.catalogoSexo = resultado;
      }, (error: HttpErrorResponse) => {
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
            this.ngOnInit();
              break;

            case 501:
            alert('Por favor, reintentar para continuar');
            this.ngOnInit();
              break;
          default:
            alert('Es necesario iniciar session, nuevamente para continuar');
              this.navCtrl.navigateRoot('login');
            break;
        }
      });
  }

  obtenerDatos() {
     // if con validaciones
     if (this.infoClienteForm.controls.materno.value === '' && origin.toUpperCase()==='NACIONAL') {
      alert('Verifique los campos.');
      return;
     }

     if (this.infoClienteForm.controls.nombre.value    === ''
     || this.infoClienteForm.controls.paterno.value    === ''
     || this.infoClienteForm.controls.sexo.value       === ''
     || this.infoClienteForm.controls.nacimiento.value === '' ) {
      alert('Verifique los campos.');
     } else {
      console.log('Log: obtenerDatos >> preparando datos para persistencia');
      
      this.cliente.setNombre(this.infoClienteForm.controls.nombre.value.toUpperCase());
      console.log('Log :1 ',this.infoClienteForm.controls.nombre.value);
      this.cliente.setPaterno(this.infoClienteForm.controls.paterno.value.toUpperCase());
      console.log('Log :2 ',this.infoClienteForm.controls.paterno.value);
      this.cliente.setMaterno(this.infoClienteForm.controls.materno.value.toUpperCase());
      console.log('Log :3 ',this.infoClienteForm.controls.materno.value);
      this.cliente.setAnioRegistro(this.infoClienteForm.controls.anioRegistro.value);
      console.log('Log :4 ',this.infoClienteForm.controls.anioRegistro.value);
      this.cliente.setEmision(this.infoClienteForm.controls.emision.value);
      console.log('Log :5 ',this.infoClienteForm.controls.emision.value);
      this.cliente.setClaveElector(this.infoClienteForm.controls.claveElector.value.toUpperCase());
      console.log('Log :6 ',this.infoClienteForm.controls.claveElector.value);
      this.cliente.setCurp(this.infoClienteForm.controls.curp.value.toUpperCase());
      console.log('Log :7 ',this.infoClienteForm.controls.curp.value);
      this.cliente.setRfc(this.infoClienteForm.controls.rfc.value.toUpperCase());
      console.log('Log :8 ',this.infoClienteForm.controls.rfc.value);
      this.cliente.setObservations('BID_Tracking');
      console.log('Log :9 ');
      this.cliente.setOcr(this.infoClienteForm.controls.ocr.value);
      console.log('Log :10 ',this.infoClienteForm.controls.ocr.value);
     
      let date2 = (new Date(this.infoClienteForm.controls.nacimiento.value.toString()));
      let date3 = date2.getFullYear()+"-"+ (date2.getMonth()+1 < 10 ? '0' + (date2.getMonth()+1): (date2.getMonth()+1)) +"-"+date2.getDate();

      this.cliente.setNacimiento(date3);
      // this.infoClienteForm.controls.nacimiento.value.toUpperCase()
      console.log('Log :11 ',this.fecha);
      this.cliente.setSexo( this.infoClienteForm.controls.sexo.value.toUpperCase());
      console.log('Log :12 ',this.infoClienteForm.controls.sexo.value.toUpperCase());
      this.cliente.setVigencia(this.infoClienteForm.controls.vigencia.value);
      console.log('Log :13 ');
      const phone = new Phone(0, this.infoClienteForm.controls.telefono.value,"","1","SAVE");
      console.log('Log :14 ',this.infoClienteForm.controls.telefono.value);
      this.cliente.setPhones([]);
      console.log('Log :15 ');
      this.cliente.getPhones().push(phone);
      console.log('Log :16');
      this.saveS.setCliente(this.cliente);
      
      console.log('Log: obtenerDatos >> obtenerDatosExt this.cliente');
      console.log(this.cliente);
      this.guardarDatos(this.cliente);
     }
  }

  guardarDatos(cliente: Cliente) {
    console.log('Depuración: enviando datos para persistencia');

    const jsonPersonalData = new JsonPersonalData(0, '',
    cliente.getNombre(),
    cliente.getPaterno(),
    cliente.getMaterno(),
    cliente.getSexo(),
    cliente.getNacimiento(),
    'es', '',
    cliente.getPaisS() !== null ? cliente.getPaisS() : cliente.getPaisDeNacimiento(),
    '', '1', '', '', cliente.getOcr(),
    cliente.getRfc(),
    cliente.getCurp(), [], '', cliente.getPhones());

    const operationData = new JsonOperationData('bid');
    const jsonInnerData = new JsonInnerData(jsonPersonalData);
    const jsonInnerDataString = JSON.stringify(jsonInnerData);
    const jsonData = new JsonData(1, '',
    'FINALIZADO', '2', jsonInnerDataString, this.secuenciaId, 1, 0);
    const jsonMetaData = new JsonMetadata(0, '', 0, 0, 1, 1);
    const jsonDatosActivity = new JsonDatosActivity(jsonData, jsonMetaData, this.saveS.getOperationID());
    this.saveS.setJsonDatosActivity(jsonDatosActivity);
    this.activitiesService.actualizarDatosActivity(jsonDatosActivity, this.saveS.getBearerToken()).subscribe(
    (resultado: any) => {
      console.log(resultado);
      if(resultado.code === -9999)
      {
        this.saveS.setCliente(cliente);
        this.saveS.setPersonId(resultado.data.personId);
// tslint:disable-next-line: max-line-length
        this.navCtrl.navigateRoot('biometria-dactilar' +  (this.origin === 'Extranjero' ? '?origin=ext' : '?client=' + JSON.stringify(jsonPersonalData)));
        // alert("Datos guardados");
        /* if (this.saveS.getTipoIdentificacion()=='INE') {
          this.navCtrl.navigateRoot('consulta-ine');
        } else {
          this.navCtrl.navigateRoot('info-grales');
        } */
      } else {
        alert('Error al Guardar los datos');
        // this.navCtrl.navigateRoot('biometria-dactilar');
      }
    },
    (err: HttpErrorResponse) => {
      console.log('Error: eror al enviar datos para persistencia:');
      console.log(err);
    });
  }

  consultarData() {
    if (this.fag === true) {
      console.log('Si han llegado datos');

    } else {
      console.log('NO han llegado datos');
      const timeOutBuscaDatos = setTimeout(() => {
        this.analisis = this.saveS.getDatosOCR();
        if (this.analisis === '' || this.analisis === undefined || this.analisis === null) {
          this.consultarData();
        } else {
          clearInterval(timeOutBuscaDatos);
          if (this.analisis === '' || this.analisis === undefined || this.analisis === null) {
            alert('Es necesario, reiniciar la extración de datos');
            this.navCtrl.navigateRoot('tipo-identificacion');
          } else {
            if (this.analisis.name === '' || this.analisis.name === undefined || this.analisis.name === null) {
              alert('Es necesario, reiniciar la extración de datos');
              this.navCtrl.navigateRoot('tipo-identificacion');
            } else {
              if (this.analisis.name === '' || this.analisis.name === undefined || this.analisis.name === null) {
                alert('Es necesario, reiniciar la extración de datos');
                this.navCtrl.navigateRoot('tipo-identificacion');
              } else {
                this.cargarData();
              }
            }
          }
        }
      }, 3000);
    }
  }

  cargarData  () {

    console.log('Depuración: cargar datos OCR');

    this.fag = true;
          this.cliente.setNombre(this.analisis.name);
          this.cliente.setPaterno(this.analisis.firstSurname);
          this.cliente.setMaterno(this.analisis.secondSurname);
          const registryYear = this.analisis.registry_YEAR?this.analisis.registry_YEAR.substring(0,4):"";
          this.cliente.setAnioRegistro(registryYear);
          const expedition_DATE = this.analisis.expedition_DATE?this.analisis.expedition_DATE.split("-")[0]:"";
          this.cliente.setEmision(expedition_DATE);
          this.cliente.setClaveElector(this.analisis.claveElector);
          this.cliente.setCurp(this.analisis.curp);
          this.cliente.setRfc("");
          let campoOcr = this.analisis.mrz?this.analisis.mrz.split('<<')[1].substring(0,13):"";
          this.cliente.setOcr(campoOcr);
          let dateOfExpiry = this.analisis.dateOfExpiry?this.analisis.dateOfExpiry.split("-")[0]:"";
          this.cliente.setVigencia(dateOfExpiry);
          this.cliente.setTelefono('');
          
          console.log('Depuración: this.analisis.dateOfBirth >> ',this.analisis.dateOfBirth);

          this.fecha = this.analisis.dateOfBirth; // dateOfBirth
          /* const dias = this.fecha.substr(8, 10);
          const subFecha = this.fecha.substr(0, 8);
          const numDias = Number(dias);
          console.log('dias');
          console.log(dias);
          console.log('subFecha');
          console.log(subFecha);
          console.log('numDias');
          console.log(numDias);
          console.log('Fecha completa');
          console.log(subFecha + numDias.toString());
          this.fechaCompleta = subFecha + numDias.toString(); */
          console.log('Depuración: this.analisis.dateOfBirth >> ',this.analisis.dateOfBirth);
          
          this.fecha=this.addDays(new Date(this.analisis.dateOfBirth),1);
          console.log('Depuración: this.fecha >> ',this.fecha);
          this.cliente.setNacimiento(this.fecha);
          this.cliente.setSexo(this.analisis.gender === 'H' ? 'MASCULINO' : 'FEMENINO');
          this.cliente.setPais(this.analisis.nationality);
          this.cliente.setNumId(this.analisis.documentNumber);

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
            rfc: [this.cliente.getCurp().substr(0, 10),
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
            sexo: [this.cliente.getSexo(), Validators.required],
            country: [this.cliente.getPais()],
            idNumber: [this.cliente.getNumId()]
          });
  }

  public obtenerDatosExt(): void {
    this.cliente.setNombre(this.infoClienteForm.controls.nombre.value.toUpperCase());
    this.cliente.setPaterno(this.infoClienteForm.controls.paterno.value.toUpperCase());
    this.cliente.setMaterno(this.infoClienteForm.controls.materno.value.toUpperCase());
    this.cliente.setAnioRegistro(this.infoClienteForm.controls.anioRegistro.value);
    this.cliente.setEmision(this.infoClienteForm.controls.emision.value);
    this.cliente.setClaveElector(this.infoClienteForm.controls.claveElector.value.toUpperCase());
    this.cliente.setCurp(this.infoClienteForm.controls.curp.value.toUpperCase());
    this.cliente.setRfc(this.infoClienteForm.controls.rfc.value.toUpperCase());
    this.cliente.setOcr(this.infoClienteForm.controls.ocr.value.toUpperCase());
    this.cliente.setNacimiento(this.fecha);
      // this.infoClienteForm.controls.nacimiento.value.toUpperCase()
    this.cliente.setSexo( this.infoClienteForm.controls.sexo.value.toUpperCase());
    this.cliente.setVigencia(this.infoClienteForm.controls.vigencia.value);
    const phone = new Phone(0, this.infoClienteForm.controls.telefono.value,"","1","SAVE");
    this.cliente.setPhones([]);
    this.cliente.getPhones().push(phone);
    this.guardarDatos(this.cliente);
  }

  resetOCR() {
    this.navCtrl.navigateRoot('identificacion-oficial');
    
    //this.navCtrl.navigateRoot('tipo-identificacion');
  }

  resetOCRex() {
    this.navCtrl.navigateRoot('identificacion-pasaporte');
    
    //this.navCtrl.navigateRoot('tipo-identificacion');
  }

  logout() {
    this.login.finalizar();
  }

  addDays(date: Date, days: number): String {
    try {
      date.setDate(date.getDate() + days);
    } catch (error) {
      console.log('Log: Error al procesar la fecha');
      return "";
    }
    return date.toDateString();

    
 }

}
