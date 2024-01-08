import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CamaraIntegradaPageRoutingModule } from './camara-integrada-routing.module';

import { CamaraIntegradaPage } from './camara-integrada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CamaraIntegradaPageRoutingModule
  ],
  declarations: [CamaraIntegradaPage]
})
export class CamaraIntegradaPageModule {}
