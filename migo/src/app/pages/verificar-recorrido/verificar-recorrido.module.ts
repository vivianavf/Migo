import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificarRecorridoPageRoutingModule } from './verificar-recorrido-routing.module';

import { VerificarRecorridoPage } from './verificar-recorrido.page';
import { AdsComponent } from '../components/ads/ads.component';
import { BackButtonsComponent } from '../components/back-buttons/back-buttons.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificarRecorridoPageRoutingModule,
    AdsComponent,
    BackButtonsComponent,
  ],
  declarations: [VerificarRecorridoPage]
})
export class VerificarRecorridoPageModule {}
