import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificarBrandeoPage } from './verificar-brandeo.page';

const routes: Routes = [
  {
    path: '',
    component: VerificarBrandeoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificarBrandeoPageRoutingModule {}
