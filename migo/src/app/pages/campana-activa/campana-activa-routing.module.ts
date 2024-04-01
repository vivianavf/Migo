import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampanaActivaPage } from './campana-activa.page';

const routes: Routes = [
  {
    path: '',
    component: CampanaActivaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampanaActivaPageRoutingModule {}
