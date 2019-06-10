import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CapturaDomicilioConfirmPage } from './captura-domicilio-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: CapturaDomicilioConfirmPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CapturaDomicilioConfirmPage]
})
export class CapturaDomicilioConfirmPageModule {}
