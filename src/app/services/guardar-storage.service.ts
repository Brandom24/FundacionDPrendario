import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { JsonDatosActivity } from './actividades/model/json-datos-activity.model';
import { Cliente } from '../pages/tipo-identificacion/consulta-similitud-confirmacion/model/Cliente.model';
import { ResumenDoctos } from '../pages/contrato/firma-contrato/model/resumen-doctos.model';

@Injectable({
  providedIn: 'root'
})

export class GuardarStorageService {

  address_St = '';
  state_St = '';
  municipio_St = '';
  capturasF: any; capturasB: any;
  analisisOCR: any;
  tasReferences: any = [];
  anversoIdContrato: any; 
  reversoIdContrato: any;
  operationID: any; 
  datosDomicilio: any; 
  imagenDomicilio: any;
  private tipoINE: any;
  private ineAnverso: any;
  private ineReverso: any;
  private personId: number;
  private jsonDatosActivity: JsonDatosActivity;
  private bearerToken: string;
  private tipoFlujo: string;
  private tipoIdentificacion: string;
  private cliente: Cliente;
  private resumenDoctos: ResumenDoctos[];
  private resBuro: string;
  systemCode: any;
  identifyFinger: any;
  resultLogin: any;
  user: string;


    public getResBuro(): string {
        return this.resBuro;
    }

    public setResBuro(resBuro: string): void {
        this.resBuro = resBuro;
    }

    public getUser(): string {
      return this.user;
  }

  public setUser(user: string): void {
      this.user = user;
  }


    public getResumenDoctos(): ResumenDoctos[] {
        return this.resumenDoctos;
    }

    public setResumenDoctos(resumenDoctos: ResumenDoctos[]): void {
        this.resumenDoctos = resumenDoctos;
    }

    public getCliente(): Cliente {
        return this.cliente;
    }

    public setCliente(cliente: Cliente): void {
        this.cliente = cliente;
    }


  public getIneAnverso(): any {
    return this.ineAnverso;
}

public setIneAnverso(ineAnverso: any): void {
    this.ineAnverso = ineAnverso;
}

public getIneReverso(): any {
    return this.ineReverso;
}

public setIneReverso(ineReverso: any): void {
    this.ineReverso = ineReverso;
}

    public getTipoINE(): any {
        return this.tipoINE;
    }

    public setTipoINE(tipoINE: any): void {
        this.tipoINE = tipoINE;
    }

    public getTipoIdentificacion(): string {
        return this.tipoIdentificacion;
    }

    public setTipoIdentificacion(tipoIdentificacion: string): void {
        this.tipoIdentificacion = tipoIdentificacion;
    }

  public getPersonId(): number {
    return this.personId;
  }

  public setPersonId(personId: number): void {
      this.personId = personId;
  }
    public getJsonDatosActivity(): JsonDatosActivity {
      return this.jsonDatosActivity;
  }

public setJsonDatosActivity(jsonDatosActivity: JsonDatosActivity): void {
    this.jsonDatosActivity = jsonDatosActivity;
}

    public getTipoFlujo(): string {
        return this.tipoFlujo;
    }

    public setTipoFlujo(tipoFlujo: string): void {
        this.tipoFlujo = tipoFlujo;
    }




  constructor(private platform: Platform,
              private storage: Storage,
              private sqlite: SQLite) { }

  // getDatosDomicilio
  setIdentifyFinger(identifyFinger: any) {
    this.identifyFinger = identifyFinger;
  }

  getIdentifyFinger() {
    return this.identifyFinger;
  }

   // getDatosDomicilio
   setImagenDomicilio(imagenDomicilio: any) {
    this.imagenDomicilio = imagenDomicilio;
  }

  getImagenDomicilio() {
    return this.imagenDomicilio;
  }

  // getDatosDomicilio
  setDatosDomicilio(datosDomicilio: any) {
    this.datosDomicilio = datosDomicilio;
  }

  getDatosDomicilio() {
    return this.datosDomicilio;
  }

  setResultLogin(resultLogin: any) {
    this.resultLogin = resultLogin;
  }

  getResultLogin() {
    return this.resultLogin;
  }

  setOperationID(operationID: any) {
    this.operationID = operationID;
  }

  getOperationID() {
    return this.operationID;
  }

  setSystemCode(systemCode: any) {
    this.systemCode = systemCode;
  }

  getSystemCode() {
    return this.systemCode;
  }

  setAnversoIdContrato(anversoIdContrato: any) {
    this.anversoIdContrato = anversoIdContrato;
  }

  getAnversoIdContrato() {
    return this.anversoIdContrato;
  }

  setReversoIdContrato(reversoIdContrato: any) {
    this.reversoIdContrato = reversoIdContrato;
  }

  getReversoIdContrato() {
    return this.reversoIdContrato;
  }

  setTasReferences(tasReferences: any) {
    this.tasReferences = tasReferences;

  }

  getTasReferences() {
    return this.tasReferences;
  }

  setDatosOCR(analisis: any) {
    this.analisisOCR = analisis;
  }

  getDatosOCR() {
    return this.analisisOCR;
  }
  public getBearerToken(): string {
      return this.bearerToken;
  }

  public setBearerToken(bearerToken: string): void {
      this.bearerToken = bearerToken;
  }

  obtenerStorageImagenF() {
    return this.capturasF;
  }

  obtenerStorageImagenB() {
   return this.capturasB;
  }

  guardarStorageImagenB(data: any) {
  console.log('Data del guardarStorage B' + JSON.stringify(data) + ' Tamaño' + data.length);
  //this.storage.set('capturasB', JSON.stringify(data));
  this.capturasB = data;
  }

  guardarStorage(data: any) {
    console.log('Data del guardarStorage F' + JSON.stringify(data) + ' Tamaño' + data.length);
  }

  guardarStorageImagenF(data: any) {

    // console.log('Data del guardarStorage F' + JSON.stringify(data) + ' Tamaño' + data.length);

    // this.storage.set('capturasF', JSON.stringify(data));
    this.capturasF = data;
    // if (this.platform.is('cordova')) {
    //   // Dispositivo
    //   if (data.length > 1) {
    //     this.storage.set('state', data[0]);
    //     this.storage.set('municipio', data[1]);
    //   } else {
    //     this.storage.set('address', JSON.stringify(data));
    //   }

    //   console.log('Datos guardados en dispositivo');

    // } else {
    //   // Computadora
    //   if (data.length > 1) {
    //     localStorage.setItem('state', data[0]);
    //     localStorage.setItem('municipio', data[1]);
    //   } else {
    //     localStorage.setItem('address', JSON.stringify(data));
    //   }
    // }

  }

  cargarStorage() {

    // this.createConexion().then((db: SQLiteObject) => {

    //   db.executeSql('select tabla direcciones').then( info => {
    //     console.log(Object.keys(info).join(' - '));
    //     console.log(info);
    //     /*info.data.forEach(e => {
    //       insercion += ' \'' + data[e] + '\',';
    //     });
    //     db.executeSql('insert into direcciones values(' + insercion.substring(0, insercion.length - 1) + ')').then(infos => {
    //       // procedimiento de toast
    //     });*/
    //   });
    // });

    this.storage.get('address').then((data) => {
      this.address_St = data;
      // console.log('Caragar datos guardados en dispositivo' + data);
    });

    // return new Promise( (resolve, reject) => {

    //   if (this.platform.is('cordova')) {
    //     // Dispositivo
    //     this.storage.ready().then(() => {

    //       this.storage.get('address').then( (data) => {
    //         if (data) {
    //           this.address_St = data;
    //         }
    //         // resolve();
    //       });
    //       this.storage.get('state').then( (data) => {
    //         if (data) {
    //           this.state_St = data;
    //         }
    //       });
    //       this.storage.get('municipio').then( (data) => {
    //         if (data) {
    //           this.municipio_St = data;
    //         }
    //         resolve();
    //       });

    //     });

    //     console.log('Caragar datos guardados en dispositivo');

    //   } else {
    //     // Computadora
    //     if (localStorage.getItem('address')) {
    //       this.address_St = JSON.parse(localStorage.getItem('address'));
    //     }
    //     if (localStorage.getItem('state')) {
    //       this.state_St = localStorage.getItem('state');
    //     }
    //     if (localStorage.getItem('municipio')) {
    //       this.municipio_St = localStorage.getItem('municipio');
    //     }
    //     resolve();
    //   }

    // });

  }

  cerrarSesion() {
    this.address_St = null;
    this.state_St = null;
    this.municipio_St = null;

    // Guardar storage
    this.limpiarStorage();
  }

  limpiarStorage() {

    // if (this.platform.is('cordova')) {
    //   // Dispositivo
        this.storage.remove('state');
        this.storage.remove('municipio');
        this.storage.remove('address');

    // } else {
    //   // Computadora
    //     localStorage.removeItem('state');
    //     localStorage.removeItem('municipio');
    //     localStorage.removeItem('address');

    // }

  }

  // createConexion(): Promise<SQLiteObject> {
  //   const config = {
  //     name: 'data.db',
  //     location: 'default',
  //     key: 'jkkjklhkjklj'
  //   };
  //   return this.sqlite.create(config);
  // }
}
