import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioAplicacionPage } from './formulario-aplicacion.page';
import { HomePage } from '../home/home.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioAplicacionPage
  },
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'solicitudes',
    component: HomePage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioAplicacionPageRoutingModule {}
