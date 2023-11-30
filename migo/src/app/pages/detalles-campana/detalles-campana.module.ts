import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesCampanaPageRoutingModule } from './detalles-campana-routing.module';

import { DetallesCampanaPage } from './detalles-campana.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesCampanaPageRoutingModule
  ],
  declarations: [DetallesCampanaPage]
})
export class DetallesCampanaPageModule {}