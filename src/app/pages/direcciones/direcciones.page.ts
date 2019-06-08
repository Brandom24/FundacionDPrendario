import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { DataClientesService } from '../../services/data-clientes.service';
import { GuardarStorageService } from '../../services/guardar-storage.service';
import { RazonesService } from '../../services/razones.service';
import { PhotosService } from '../../services/photos.service';

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.page.html',
  styleUrls: ['./direcciones.page.scss'],
})
export class DireccionesPage implements OnInit {

  user: any;

  constructor(private navCtrl: NavController,
              private dataClient: DataClientesService,
              private _store: GuardarStorageService,
              private razones: RazonesService,
              private photoS: PhotosService) {

                if (this._store.address_St) {
                  this.user = this._store.address_St;
                } else {
                  this.user = this.dataClient.getUser();
                }

              }

  ngOnInit() {
  }

  toVisit() {
    this.razones.setProductId(this.user.productId);
    this.razones.setSecuence(this.user.secuence);
    this.razones.setWorkflowId(this.user.workflowId);
    this.razones.setOperationId(this.user.operationId);
    this._store.guardarStorage(this.user);

    this.photoS.saveRazones('Inicio el proceso de visita', 'EN PROCESO', false);
    this.navCtrl.navigateRoot('vivienda');
  }

  listaC() {
    this.navCtrl.navigateRoot('clientes-lista');
  }

}
