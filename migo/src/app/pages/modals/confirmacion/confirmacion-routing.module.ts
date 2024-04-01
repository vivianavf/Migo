import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfirmacionPage } from './confirmacion.page';
import { SolicitudesPage } from '../../solicitudes/solicitudes.page';

const routes: Routes = [
  {
    path: '',
    component: ConfirmacionPage
  },
  {
    path: 'solicitudes',
    component: SolicitudesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfirmacionPageRoutingModule {}
