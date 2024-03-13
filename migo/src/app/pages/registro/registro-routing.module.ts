import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroPage } from './registro.page';
import { LoginPage } from '../login/login.page';
import { HomePage } from '../home/home.page';
import { RegistroConductorPage } from '../registro-conductor/registro-conductor.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroPage
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'registro-conductor',
    component: RegistroConductorPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroPageRoutingModule {}
