import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { GuardarStorageService } from 'src/app/services/guardar-storage.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-consulta-similitud',
  templateUrl: './consulta-similitud.page.html',
  styleUrls: ['./consulta-similitud.page.scss'],
})
export class ConsultaSimilitudPage implements OnInit {
  capturasF: any; capturasB: any;
  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private saveS: GuardarStorageService,
    private login: LoginService,
  ) { }

  ngOnInit() {
    this.capturasB = this.saveS.obtenerStorageImagenB();
    console.log('capturasB');
    console.log(this.capturasB);
    this.capturasF = this.saveS.obtenerStorageImagenF();
    console.log('capturasF');
    console.log(this.capturasF);
  }

  onConsultaSimilitudConfirmar() {
    this.navCtrl.navigateRoot('consulta-similitud-confirmacion');
  }

  logout() {
    this.login.finalizar();
  }

}
