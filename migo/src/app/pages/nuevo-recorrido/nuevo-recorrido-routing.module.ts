import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NuevoRecorridoPage } from './nuevo-recorrido.page';

const routes: Routes = [
  {
    path: '',
    component: NuevoRecorridoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NuevoRecorridoPageRoutingModule {}
