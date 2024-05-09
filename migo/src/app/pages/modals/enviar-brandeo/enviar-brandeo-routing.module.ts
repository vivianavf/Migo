import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnviarBrandeoPage } from './enviar-brandeo.page';

const routes: Routes = [
  {
    path: '',
    component: EnviarBrandeoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnviarBrandeoPageRoutingModule {}
