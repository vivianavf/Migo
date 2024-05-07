import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesCampanaInvitadoPage } from './detalles-campana-invitado.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesCampanaInvitadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesCampanaInvitadoPageRoutingModule {}
