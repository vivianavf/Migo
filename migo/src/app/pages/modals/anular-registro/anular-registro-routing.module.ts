import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnularRegistroPage } from './anular-registro.page';

const routes: Routes = [
  {
    path: '',
    component: AnularRegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnularRegistroPageRoutingModule {}
