import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinalizandoRecorridoPage } from './finalizando-recorrido.page';

const routes: Routes = [
  {
    path: '',
    component: FinalizandoRecorridoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinalizandoRecorridoPageRoutingModule {}
