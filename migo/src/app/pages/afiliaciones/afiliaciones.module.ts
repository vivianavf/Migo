import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AfiliacionesPageRoutingModule } from './afiliaciones-routing.module';

import { AfiliacionesPage } from './afiliaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AfiliacionesPageRoutingModule
  ],
  declarations: [AfiliacionesPage]
})
export class AfiliacionesPageModule {}
