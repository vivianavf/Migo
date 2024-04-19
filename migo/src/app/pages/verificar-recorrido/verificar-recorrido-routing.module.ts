import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificarRecorridoPage } from './verificar-recorrido.page';

const routes: Routes = [
  {
    path: '',
    component: VerificarRecorridoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificarRecorridoPageRoutingModule {}
