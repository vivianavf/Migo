import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanelPage } from './panel.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


const routes: Routes = [
  {
    path: '',
    component: PanelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PanelPageRoutingModule {}
