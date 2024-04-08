import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConducirModalPage } from './conducir-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ConducirModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConducirModalPageRoutingModule {}
