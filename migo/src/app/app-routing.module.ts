import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'invitado',
    loadChildren: () => import('./pages/invitado/invitado.module').then( m => m.InvitadoPageModule)
  },
  {
    path: 'recuperar-password',
    loadChildren: () => import('./pages/recuperar-password/recuperar-password.module').then( m => m.RecuperarPasswordPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'codigo-password',
    loadChildren: () => import('./pages/codigo-password/codigo-password.module').then( m => m.CodigoPasswordPageModule)
  },
  {
    path: 'reestablecer-password',
    loadChildren: () => import('./pages/reestablecer-password/reestablecer-password.module').then( m => m.ReestablecerPasswordPageModule)
  },
  {
    path: 'terminos-condiciones',
    loadChildren: () => import('./pages/modals/terminos-condiciones/terminos-condiciones.module').then( m => m.TerminosCondicionesPageModule)
  },
  {
    path: 'privacidad',
    loadChildren: () => import('./pages/modals/privacidad/privacidad.module').then( m => m.PrivacidadPageModule)
  },
  {
    path: 'datos-registro',
    loadChildren: () => import('./pages/modals/datos-registro/datos-registro.module').then( m => m.DatosRegistroPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
