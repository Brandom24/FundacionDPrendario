import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FirmaContratoPage } from './firma-contrato.page';
import { EnvioOtpComponent } from './envio-otp/envio-otp.component';
import { OtpService } from 'src/app/services/otp/otp-service';

const routes: Routes = [
  {
    path: '',
    component: FirmaContratoPage
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
  declarations: [
    FirmaContratoPage,
    EnvioOtpComponent
  ],
  providers:[
    OtpService
  ]
})
export class FirmaContratoPageModule {}
