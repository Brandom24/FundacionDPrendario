import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConsultaSimilitudPage } from './consulta-similitud.page';

const routes: Routes = [
  {
    path: '',
    component: ConsultaSimilitudPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConsultaSimilitudPage]
})
export class ConsultaSimilitudPageModule {}
