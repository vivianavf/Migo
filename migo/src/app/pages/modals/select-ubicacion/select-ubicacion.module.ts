import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectUbicacionPageRoutingModule } from './select-ubicacion-routing.module';

import { SelectUbicacionPage } from './select-ubicacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectUbicacionPageRoutingModule
  ],
  declarations: [SelectUbicacionPage]
})
export class SelectUbicacionPageModule {}
