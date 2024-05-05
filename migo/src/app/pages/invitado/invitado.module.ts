import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { InvitadoPageRoutingModule } from './invitado-routing.module';
import { InvitadoPage } from './invitado.page';

import { AdsComponent } from '../components/ads/ads.component';
import { BackButtonsComponent } from '../components/back-buttons/back-buttons.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InvitadoPageRoutingModule,
    AdsComponent,
    BackButtonsComponent,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [InvitadoPage,],
})
export class InvitadoPageModule {}
