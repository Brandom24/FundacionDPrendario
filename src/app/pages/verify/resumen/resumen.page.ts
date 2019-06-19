import { Component, OnInit } from '@angular/core';
import { GuardarStorageService } from 'src/app/services/guardar-storage.service';
import { NavController } from '@ionic/angular';
import { JsonData } from 'src/app/services/actividades/model/json-data.model';
import { JsonMetadata } from 'src/app/services/actividades/model/json-metadata.model';
import { JsonDatosActivity } from 'src/app/services/actividades/model/json-datos-activity.model';
import { LoginService } from 'src/app/services/login.service';
import { ActivitiesService } from 'src/app/services/actividades/activities-service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
})
export class ResumenPage implements OnInit {
  resumen: any;
  secuenceId: number;

  constructor(
    private saveS: GuardarStorageService,
    private navCtrl: NavController,
    private login: LoginService,
    private activityService: ActivitiesService,
    ) { }

  ngOnInit() {
    this.resumen = this.saveS.getIdentifyFinger();
    this.secuenceId = 27;
  }

  finalizar() {
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
    this.navCtrl.navigateRoot('verify');
    this.actualizarActivity('EN PROCESO', this.secuenceId);
  }

  actualizarActivity(estatus: string, secuenciaId: number) {
    const productId = 1;
    const jsonData = new JsonData(productId,
    this.saveS.getSystemCode(), estatus, '1', '', secuenciaId, 1);
    const jsonMetaData = new JsonMetadata(0, '', 0, 0, 1, 1);
    const jsonDatosActivity = new JsonDatosActivity(jsonData,
    jsonMetaData, this.saveS.getOperationID());
    this.activityService.actualizarDatosActivity(jsonDatosActivity,
      this.login.token).subscribe(
      (resultado: any) => {
        console.log('actualizarDatosActivity');
        console.log(resultado);
      });
  }

}
