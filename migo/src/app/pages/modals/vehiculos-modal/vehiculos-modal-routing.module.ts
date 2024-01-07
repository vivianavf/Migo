import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehiculosModalPage } from './vehiculos-modal.page';

const routes: Routes = [
  {
    path: '',
    component: VehiculosModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiculosModalPageRoutingModule {}
