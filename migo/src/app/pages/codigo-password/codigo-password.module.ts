import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CodigoPasswordPageRoutingModule } from './codigo-password-routing.module';

import { CodigoPasswordPage } from './codigo-password.page';
import { BackButtonsComponent } from '../components/back-buttons/back-buttons.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CodigoPasswordPageRoutingModule,
    BackButtonsComponent,
  ],
  declarations: [CodigoPasswordPage]
})
export class CodigoPasswordPageModule {}
