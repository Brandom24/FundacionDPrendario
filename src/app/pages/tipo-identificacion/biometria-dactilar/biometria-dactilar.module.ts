import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { BiometriaDactilarPage } from './biometria-dactilar.page';

const routes: Routes = [
  {
    path: '',
    component: BiometriaDactilarPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [BiometriaDactilarPage]
})
export class BiometriaDactilarPageModule {}
