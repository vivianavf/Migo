import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { AgregarVehiculoPageRoutingModule } from './agregar-vehiculo-routing.module';

import { AgregarVehiculoPage } from './agregar-vehiculo.page';
import { AdsComponent } from '../components/ads/ads.component';
import { BackButtonsComponent } from '../components/back-buttons/back-buttons.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarVehiculoPageRoutingModule,
    ReactiveFormsModule,
    AdsComponent,
    BackButtonsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [AgregarVehiculoPage],
  providers: [AdsComponent,]
})
export class AgregarVehiculoPageModule {}
