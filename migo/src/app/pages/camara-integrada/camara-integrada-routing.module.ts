import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CamaraIntegradaPage } from './camara-integrada.page';

const routes: Routes = [
  {
    path: '',
    component: CamaraIntegradaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CamaraIntegradaPageRoutingModule {}
