import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosRegistroPageRoutingModule } from './datos-registro-routing.module';

import { DatosRegistroPage } from './datos-registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosRegistroPageRoutingModule
  ],
  declarations: [DatosRegistroPage]
})
export class DatosRegistroPageModule {}
