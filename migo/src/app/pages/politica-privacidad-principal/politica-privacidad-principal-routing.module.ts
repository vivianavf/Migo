import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoliticaPrivacidadPrincipalPage } from './politica-privacidad-principal.page';

const routes: Routes = [
  {
    path: '',
    component: PoliticaPrivacidadPrincipalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoliticaPrivacidadPrincipalPageRoutingModule {}
