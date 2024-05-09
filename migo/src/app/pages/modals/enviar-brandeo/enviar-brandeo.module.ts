import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnviarBrandeoPageRoutingModule } from './enviar-brandeo-routing.module';

import { EnviarBrandeoPage } from './enviar-brandeo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnviarBrandeoPageRoutingModule
  ],
  declarations: [EnviarBrandeoPage]
})
export class EnviarBrandeoPageModule {}
