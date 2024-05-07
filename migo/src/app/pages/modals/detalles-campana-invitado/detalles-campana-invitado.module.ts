import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesCampanaInvitadoPageRoutingModule } from './detalles-campana-invitado-routing.module';

import { DetallesCampanaInvitadoPage } from './detalles-campana-invitado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesCampanaInvitadoPageRoutingModule
  ],
  declarations: [DetallesCampanaInvitadoPage]
})
export class DetallesCampanaInvitadoPageModule {}
