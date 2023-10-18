import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReestablecerPasswordPageRoutingModule } from './reestablecer-password-routing.module';

import { ReestablecerPasswordPage } from './reestablecer-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReestablecerPasswordPageRoutingModule
  ],
  declarations: [ReestablecerPasswordPage]
})
export class ReestablecerPasswordPageModule {}
