import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosRegistroPage } from './datos-registro.page';
import { HomePage } from '../../home/home.page';

const routes: Routes = [
  {
    path: '',
    component: DatosRegistroPage
  },
  {
    path: 'home',
    component: HomePage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosRegistroPageRoutingModule {}
