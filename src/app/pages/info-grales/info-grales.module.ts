import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { InfoGralesPage } from './info-grales.page';
import { CatalogoService } from 'src/app/services/catalogos/catalogo.service';

const routes: Routes = [
  {
    path: '',
    component: InfoGralesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InfoGralesPage],
  providers:[CatalogoService]
})
export class InfoGralesPageModule {}
