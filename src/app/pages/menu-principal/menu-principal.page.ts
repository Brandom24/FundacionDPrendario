import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { GuardarStorageService } from 'src/app/services/guardar-storage.service';
import { LoginService } from 'src/app/services/login.service';
import { JsonData } from 'src/app/services/actividades/model/json-data.model';
import { JsonMetadata } from 'src/app/services/actividades/model/json-metadata.model';
import { JsonDatosActivity } from 'src/app/services/actividades/model/json-datos-activity.model';
import { ActivitiesService } from 'src/app/services/actividades/activities-service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})
export class MenuPrincipalPage implements OnInit {

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private saveS: GuardarStorageService,
    private login: LoginService,
    private activityService: ActivitiesService
  ) { }

  ngOnInit() {
    
  }

  iniciarFlujo(flujo: string) {
    
    this.saveS.setTipoFlujo(flujo);
    // crearDatosActivity
    const productId = 1;
    let secuence = 0;
    if(this.saveS.getTipoFlujo()=='alhajas')
      secuence = 1;
    else
      secuence = 6;
    const jsonData = new JsonData(+productId,'', 'PENDIENTE', '1', '', secuence, 1);
    const jsonMetaData = new JsonMetadata(0, '', 0, 0, 1, 1);
    const jsonDatosActivity = new JsonDatosActivity(jsonData, jsonMetaData, 0);
    this.activityService.crearDatosActivity(jsonDatosActivity, this.saveS.getBearerToken()).subscribe(
      (response: any) => {
      if(response.code == -9999)
      {
        let operationId = response.data.operationId;
        this.saveS.setOperationID(operationId);
        this.navCtrl.navigateRoot('tipo-identificacion');
      }
      }, (err) => {
        console.log(err);
      }
    );
   
  }


}
