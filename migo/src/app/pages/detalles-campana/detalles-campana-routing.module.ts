import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesCampanaPage } from './detalles-campana.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormularioAplicacionPage } from '../formulario-aplicacion/formulario-aplicacion.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesCampanaPage
  },

  {
    path: 'formulario-aplicacion',
    component: FormularioAplicacionPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetallesCampanaPageRoutingModule {}
