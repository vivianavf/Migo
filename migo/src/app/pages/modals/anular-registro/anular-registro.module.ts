import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnularRegistroPageRoutingModule } from './anular-registro-routing.module';

import { AnularRegistroPage } from './anular-registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnularRegistroPageRoutingModule
  ],
  declarations: [AnularRegistroPage]
})
export class AnularRegistroPageModule {}
