import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevoRecorridoPageRoutingModule } from './nuevo-recorrido-routing.module';

import { NuevoRecorridoPage } from './nuevo-recorrido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevoRecorridoPageRoutingModule
  ],
  declarations: [NuevoRecorridoPage]
})
export class NuevoRecorridoPageModule {}
