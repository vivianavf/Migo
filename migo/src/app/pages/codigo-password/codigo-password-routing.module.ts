import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodigoPasswordPage } from './codigo-password.page';

const routes: Routes = [
  {
    path: '',
    component: CodigoPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodigoPasswordPageRoutingModule {}
