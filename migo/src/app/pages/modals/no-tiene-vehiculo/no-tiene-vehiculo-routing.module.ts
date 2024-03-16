import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoTieneVehiculoPage } from './no-tiene-vehiculo.page';

const routes: Routes = [
  {
    path: '',
    component: NoTieneVehiculoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoTieneVehiculoPageRoutingModule {}
