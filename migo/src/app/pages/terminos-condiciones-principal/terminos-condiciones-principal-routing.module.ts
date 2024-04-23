import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TerminosCondicionesPrincipalPage } from './terminos-condiciones-principal.page';

const routes: Routes = [
  {
    path: '',
    component: TerminosCondicionesPrincipalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TerminosCondicionesPrincipalPageRoutingModule {}
