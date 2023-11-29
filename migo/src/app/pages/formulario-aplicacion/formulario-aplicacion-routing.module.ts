import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormularioAplicacionPage } from './formulario-aplicacion.page';

const routes: Routes = [
  {
    path: '',
    component: FormularioAplicacionPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormularioAplicacionPageRoutingModule {}
