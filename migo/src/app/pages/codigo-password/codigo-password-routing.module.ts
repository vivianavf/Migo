import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CodigoPasswordPage } from './codigo-password.page';
import { ReestablecerPasswordPage } from '../reestablecer-password/reestablecer-password.page';

const routes: Routes = [
  {
    path: '',
    component: CodigoPasswordPage
  },
  {
    path: 'reestablecer-password',
    component: ReestablecerPasswordPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CodigoPasswordPageRoutingModule {}
