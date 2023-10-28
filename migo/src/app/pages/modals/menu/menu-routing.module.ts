import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';
import { VehiculosPage } from '../../vehiculos/vehiculos.page';
import { VerificacionesPage } from '../../verificaciones/verificaciones.page';
import { HistorialPagosPage } from '../../historial-pagos/historial-pagos.page';
import { PreguntasPage } from '../../preguntas/preguntas.page';
import { TipsPage } from '../../tips/tips.page';
import { ReclamosPage } from '../../reclamos/reclamos.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage
  },
  {
    path: 'vehiculos',
    component: VehiculosPage
  },
  {
    path: 'verificaciones',
    component: VerificacionesPage
  },
  {
    path: 'historial-pagos',
    component: HistorialPagosPage
  },
  {
    path: 'preguntas',
    component: PreguntasPage
  },
  {
    path: 'tips',
    component: TipsPage
  },
  {
    path: 'reclamos',
    component: ReclamosPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
