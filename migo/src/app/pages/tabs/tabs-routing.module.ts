import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'home',
        loadChildren: () => import('../home/home.page').then(m => m.HomePage)
      },
      {
        path: 'panel',
        loadChildren: () => import('../panel/panel.page').then(m => m.PanelPage)
      },
      {
        path: 'afiliaciones',
        loadChildren: () => import('../afiliaciones/afiliaciones.page').then(m => m.AfiliacionesPage)
      },
      {
        path: 'recorrido',
        loadChildren: () => import('../recorrido/recorrido.page').then(m => m.RecorridoPage)
      },
      {
        path: 'perfil',
        loadChildren: () => import('../perfil/perfil.page').then(m => m.PerfilPage)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
