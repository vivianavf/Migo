import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehiculosModalPage } from './vehiculos-modal.page';
import { AgregarVehiculoPage } from '../../agregar-vehiculo/agregar-vehiculo.page';

const routes: Routes = [
  {
    path: '',
    component: VehiculosModalPage
  },
  {
    path: 'agregar-vehiculo',
    component: AgregarVehiculoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiculosModalPageRoutingModule {}
