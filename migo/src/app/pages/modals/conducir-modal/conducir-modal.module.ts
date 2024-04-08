import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConducirModalPageRoutingModule } from './conducir-modal-routing.module';

import { ConducirModalPage } from './conducir-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConducirModalPageRoutingModule
  ],
  declarations: [ConducirModalPage]
})
export class ConducirModalPageModule {}
