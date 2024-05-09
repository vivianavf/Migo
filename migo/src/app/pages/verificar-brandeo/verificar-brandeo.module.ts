import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificarBrandeoPageRoutingModule } from './verificar-brandeo-routing.module';

import { VerificarBrandeoPage } from './verificar-brandeo.page';
import { AdsComponent } from '../components/ads/ads.component';
import { BackButtonsComponent } from '../components/back-buttons/back-buttons.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificarBrandeoPageRoutingModule,
    AdsComponent,
    BackButtonsComponent,
  ],
  declarations: [VerificarBrandeoPage]
})
export class VerificarBrandeoPageModule {}
