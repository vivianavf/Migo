import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPage } from './login.page';
import { HomePage } from '../home/home.page';
import { InvitadoPage } from '../invitado/invitado.page';
import { RecuperarPasswordPage } from '../recuperar-password/recuperar-password.page';


const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'invitado',
    component: InvitadoPage
  },
  {
    path: 'recuperar-password',
    component: RecuperarPasswordPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
