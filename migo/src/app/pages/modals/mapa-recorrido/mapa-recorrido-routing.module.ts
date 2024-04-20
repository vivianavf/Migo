import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapaRecorridoPage } from './mapa-recorrido.page';

const routes: Routes = [
  {
    path: '',
    component: MapaRecorridoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapaRecorridoPageRoutingModule {}
