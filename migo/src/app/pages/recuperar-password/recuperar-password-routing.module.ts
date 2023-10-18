import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from '../login/login.page';
import { RecuperarPasswordPage } from './recuperar-password.page';
import { CodigoPasswordPage } from '../codigo-password/codigo-password.page';


const routes: Routes = [
  {
    path: '',
    component: RecuperarPasswordPage
  },
  {
    path:'login',
    component: LoginPage
  },
  {
    path:'codigo-password',
    component: CodigoPasswordPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarPasswordPageRoutingModule {}
