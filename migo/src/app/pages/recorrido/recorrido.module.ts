import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecorridoPageRoutingModule } from './recorrido-routing.module';

import { RecorridoPage } from './recorrido.page';
import { BarraNavegacionComponent } from '../barra-navegacion/barra-navegacion.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecorridoPageRoutingModule,
    BarraNavegacionComponent,
  ],
  declarations: [RecorridoPage]
})
export class RecorridoPageModule {}
