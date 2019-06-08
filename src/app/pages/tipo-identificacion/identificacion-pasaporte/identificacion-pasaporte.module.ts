import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IdentificacionPasaportePage } from './identificacion-pasaporte.page';

const routes: Routes = [
  {
    path: '',
    component: IdentificacionPasaportePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IdentificacionPasaportePage]
})
export class IdentificacionPasaportePageModule {}
