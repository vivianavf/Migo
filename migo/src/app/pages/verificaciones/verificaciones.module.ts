import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificacionesPageRoutingModule } from './verificaciones-routing.module';

import { VerificacionesPage } from './verificaciones.page';
import { AdsComponent } from '../components/ads/ads.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificacionesPageRoutingModule,
    AdsComponent,
  ],
  declarations: [VerificacionesPage]
})
export class VerificacionesPageModule {}
