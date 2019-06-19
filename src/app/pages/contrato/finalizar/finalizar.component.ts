import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-finalizar',
  templateUrl: './finalizar.component.html',
  styleUrls: ['./finalizar.component.scss'],
})
export class FinalizarComponent implements OnInit {

  constructor(private nav: NavController) { }

  ngOnInit() {}

  finalizar(): void {
    this.nav.navigateRoot('verify');
  }

}
