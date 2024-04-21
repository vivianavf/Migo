import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleMarcaPage } from './detalle-marca.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleMarcaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleMarcaPageRoutingModule {}
