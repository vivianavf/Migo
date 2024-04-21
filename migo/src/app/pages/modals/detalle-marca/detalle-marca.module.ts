import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleMarcaPageRoutingModule } from './detalle-marca-routing.module';

import { DetalleMarcaPage } from './detalle-marca.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleMarcaPageRoutingModule
  ],
  declarations: [DetalleMarcaPage]
})
export class DetalleMarcaPageModule {}
