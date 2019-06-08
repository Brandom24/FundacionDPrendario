import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-localizacion',
  templateUrl: './localizacion.page.html',
  styleUrls: ['./localizacion.page.scss'],
})
export class LocalizacionPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  pageVivienda() {
    this.navCtrl.navigateForward('vivienda');
  }

}
