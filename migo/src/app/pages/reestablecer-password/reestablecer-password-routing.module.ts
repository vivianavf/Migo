import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReestablecerPasswordPage } from './reestablecer-password.page';
import { HomePage } from '../home/home.page';

const routes: Routes = [
  {
    path: '',
    component: ReestablecerPasswordPage
  },
  {
    path: 'home',
    component: HomePage
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReestablecerPasswordPageRoutingModule {}
