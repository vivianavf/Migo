import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { VehiculosModalPageRoutingModule } from './vehiculos-modal-routing.module';

import { VehiculosModalPage } from './vehiculos-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VehiculosModalPageRoutingModule
  ],
  declarations: [VehiculosModalPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VehiculosModalPageModule {}
