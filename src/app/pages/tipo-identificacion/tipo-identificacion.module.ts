import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TipoIdentificacionPage } from './tipo-identificacion.page';

const routes: Routes = [
  {
    path: '',
    component: TipoIdentificacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TipoIdentificacionPage]
})
export class TipoIdentificacionPageModule {}
