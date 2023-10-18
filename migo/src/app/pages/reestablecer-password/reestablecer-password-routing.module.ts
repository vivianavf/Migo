import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReestablecerPasswordPage } from './reestablecer-password.page';

const routes: Routes = [
  {
    path: '',
    component: ReestablecerPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReestablecerPasswordPageRoutingModule {}
