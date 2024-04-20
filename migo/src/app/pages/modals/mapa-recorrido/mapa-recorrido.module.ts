import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapaRecorridoPageRoutingModule } from './mapa-recorrido-routing.module';

import { MapaRecorridoPage } from './mapa-recorrido.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapaRecorridoPageRoutingModule
  ],
  declarations: [MapaRecorridoPage]
})
export class MapaRecorridoPageModule {}
