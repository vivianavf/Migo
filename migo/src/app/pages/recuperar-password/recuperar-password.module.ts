import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { RecuperarPasswordPageRoutingModule } from './recuperar-password-routing.module';

import { RecuperarPasswordPage } from './recuperar-password.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BackButtonsComponent } from '../components/back-buttons/back-buttons.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RecuperarPasswordPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BackButtonsComponent,
  ],
  declarations: [RecuperarPasswordPage]
})
export class RecuperarPasswordPageModule {}
