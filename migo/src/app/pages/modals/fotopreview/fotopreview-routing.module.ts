import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FotopreviewPage } from './fotopreview.page';

const routes: Routes = [
  {
    path: '',
    component: FotopreviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FotopreviewPageRoutingModule {}
