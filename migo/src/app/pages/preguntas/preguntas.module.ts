import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreguntasPageRoutingModule } from './preguntas-routing.module';

import { PreguntasPage } from './preguntas.page';
import { AdsComponent } from '../components/ads/ads.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreguntasPageRoutingModule,
    AdsComponent,
  ],
  declarations: [PreguntasPage]
})
export class PreguntasPageModule {}
