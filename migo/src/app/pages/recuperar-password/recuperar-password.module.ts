import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { RecuperarPasswordPageRoutingModule } from './recuperar-password-routing.module';

import { RecuperarPasswordPage } from './recuperar-password.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RecuperarPasswordPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [RecuperarPasswordPage]
})
export class RecuperarPasswordPageModule {}
