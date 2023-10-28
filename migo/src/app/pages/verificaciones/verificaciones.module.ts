import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificacionesPageRoutingModule } from './verificaciones-routing.module';

import { VerificacionesPage } from './verificaciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificacionesPageRoutingModule
  ],
  declarations: [VerificacionesPage]
})
export class VerificacionesPageModule {}
