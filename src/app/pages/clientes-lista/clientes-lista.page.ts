import { Component, OnInit, ViewChild} from '@angular/core';
import { DataClientesService } from '../../services/data-clientes.service';
import { IonList, NavController, AlertController } from '@ionic/angular';
import { EstadosMunicipiosService } from '../../services/estados-municipios.service';
import { GuardarStorageService } from '../../services/guardar-storage.service';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.page.html',
  styleUrls: ['./clientes-lista.page.scss'],
})
export class ClientesListaPage implements OnInit {

  @ViewChild('lista') lista: IonList;
  clientes: any;
  arrayBuscar = '';
  selectSt: number;
  selectEs: string;
  loading = false;
  selectMuni = '';
  state: any;
  jsonMuni: any;
  arrayLocality: string[] = [];
  resMessage: string;
  resCode: number;

  constructor(private dataClient: DataClientesService,
              private navCtrl: NavController,
              private localityS: EstadosMunicipiosService,
              private _store: GuardarStorageService,
              private alertCtrl: AlertController) {

                  this.localityS.generateState().subscribe( data => {
                    this.state = data;
                    console.log(this.state);
                  });
               }

  ngOnInit() {
  }

  estatus(user) {
    this.lista.closeSlidingItems();
  }

  buscar(event) {
    this.arrayBuscar = event.detail.value;
  }

  selectState(event) {
    console.log(event);
    this.selectSt = event.detail.value.id_value;
    this.selectEs = event.detail.value.name;

    this.localityS.generateMuni(this.selectSt.toString()).subscribe( data => {
      this.jsonMuni = data;
      console.log(this.jsonMuni);
    });
  }

  selectMunicipio(event) {
    console.log(event);
    this.selectMuni = event.detail.value;
    this.clientes = null;
    this.loading = true;
    this.resCode = null;

    this.servicioLista();
  }

  direccion(user) {
    // this.lista.closeSlidingItems();
    this._store.address_St = null;
    // this.arrayLocality.push(this.selectSt);
    // this.arrayLocality.push(this.selectMuni);
    // console.log('Data del arrayLocalidad ::::' + JSON.stringify(user));
    // this._store.guardarStorage(this.arrayLocality);
    this.dataClient.setUser(user);
    this.navCtrl.navigateRoot('direcciones');
  }


  servicioLista() {

    this.dataClient.getUsers(this.selectEs, this.selectMuni).subscribe( data => {

      console.log(data);
      if (data['code'] === -9999) {
        this.clientes = data['data']['pendingsList'];

      } else {
        console.log(data);
        this.resCode = data['code'];

      }

    }, async error => {

      console.log(error);
      const alert = await this.alertCtrl.create({
        header: '¡Ups!',
        message: 'Ocurrio un problema en la comunicacion',
        buttons: [
          {
            text: 'Regresar',
            role: 'volver',
            cssClass: 'secondary',
            handler: (blah) => {
              // Accion del boton
            }
          }, {
            text: 'Reitentar',
            handler: () => {
              this.servicioLista();
            }
          }
        ]
      });
      await alert.present();
    });
  }

}
