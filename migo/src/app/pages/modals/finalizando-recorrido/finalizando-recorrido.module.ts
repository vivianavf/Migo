import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinalizandoRecorridoPageRoutingModule } from './finalizando-recorrido-routing.module';

import { FinalizandoRecorridoPage } from './finalizando-recorrido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinalizandoRecorridoPageRoutingModule
  ],
  declarations: [FinalizandoRecorridoPage]
})
export class FinalizandoRecorridoPageModule {}
