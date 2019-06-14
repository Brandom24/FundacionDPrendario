import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { JsonOcr } from '../../services/documentos/model/json-ocr.model';
import { DocumentosService } from '../../services/documentos/documentos.service';
import { OauthService } from '../../services/oauth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Imagen } from '../../herramientas/imagen';
import { JsonRequest } from '../../services/documentos/model/jsonRequest.model';
import { DataFile } from '../../services/documentos/model/data-file.model';
import { ActivitiesService } from '../../services/actividades/activities-service';
import { JsonDatosActivity } from '../../services/actividades/model/json-datos-activity.model';
import { JsonData } from '../../services/actividades/model/json-data.model';
import { JsonMetadata } from '../../services/actividades/model/json-metadata.model';
import { CatalogoService } from '../../services/catalogos/catalogo.service';
import { CatalogoValuesOut } from '../../services/catalogos/model/catalogo-values-out.model';
import { VariablesSesion } from '../../services/model/variables-sesion.model';
import { GuardarStorageService } from 'src/app/services/guardar-storage.service';
import { DataClientesService } from '../../services/data-clientes.service';

@Component({
  selector: 'app-tipo-identificacion',
  templateUrl: './tipo-identificacion.page.html',
  styleUrls: ['./tipo-identificacion.page.scss'],
})
export class TipoIdentificacionPage implements OnInit {
 

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private guardarS: GuardarStorageService,
    private dataClient: DataClientesService
  ) { }

  ngOnInit() {

  }

  onIdentificacionOficial() {
    this.guardarS.setTipoIdentificacion('INE');
    this.navCtrl.navigateRoot('identificacion-oficial');
  }

  onIdentificacionPasaporte() {
    this.dataClient.typePaspport = true;
    this.guardarS.setTipoIdentificacion('PASAPORTE');
    this.navCtrl.navigateRoot('identificacion-pasaporte');
  }


}
