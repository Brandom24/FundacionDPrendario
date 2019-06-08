import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { IdentificacionOficialPage } from './identificacion-oficial.page';

const routes: Routes = [
  {
    path: '',
    component: IdentificacionOficialPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IdentificacionOficialPage]
})
export class IdentificacionOficialPageModule {}
