import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarPasswordPage } from './recuperar-password.page';
import { LoginPage } from '../login/login.page';


const routes: Routes = [
  {
    path: '',
    component: RecuperarPasswordPage
  },
  {
    path:'login',
    component: LoginPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarPasswordPageRoutingModule {}
