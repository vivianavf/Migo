import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoTieneVehiculoPageRoutingModule } from './no-tiene-vehiculo-routing.module';

import { NoTieneVehiculoPage } from './no-tiene-vehiculo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoTieneVehiculoPageRoutingModule
  ],
  declarations: [NoTieneVehiculoPage]
})
export class NoTieneVehiculoPageModule {}
