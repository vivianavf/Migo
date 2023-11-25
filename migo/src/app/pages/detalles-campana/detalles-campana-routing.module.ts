import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesCampanaPage } from './detalles-campana.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesCampanaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesCampanaPageRoutingModule {}
