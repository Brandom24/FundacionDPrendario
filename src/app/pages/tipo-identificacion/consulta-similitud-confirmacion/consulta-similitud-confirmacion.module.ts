import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConsultaSimilitudConfirmacionPage } from './consulta-similitud-confirmacion.page';
import { CatalogoService } from 'src/app/services/catalogos/catalogo.service';

const routes: Routes = [
  {
    path: '',
    component: ConsultaSimilitudConfirmacionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ConsultaSimilitudConfirmacionPage],
  providers:[CatalogoService]
})
export class ConsultaSimilitudConfirmacionPageModule {}
