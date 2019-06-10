import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CapturaDomicilioPage } from './captura-domicilio.page';

const routes: Routes = [
  {
    path: '',
    component: CapturaDomicilioPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CapturaDomicilioPage]
})
export class CapturaDomicilioPageModule {}
