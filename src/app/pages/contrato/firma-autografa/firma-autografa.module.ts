import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FirmaAutografaPage } from './firma-autografa.page';

import { SignaturePadModule } from 'angular2-signaturepad';
import { ConsultaBuroService } from './consulta-buro-service';


const routes: Routes = [
  {
    path: '',
    component: FirmaAutografaPage
  }
];

@NgModule({
  imports: [
    CommonModule, SignaturePadModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FirmaAutografaPage],
  providers:[ConsultaBuroService]
})
export class FirmaAutografaPageModule {}
