import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPageModule } from './pages/tabs/tabs.module';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'invitado',
    loadChildren: () =>
      import('./pages/invitado/invitado.module').then(
        (m) => m.InvitadoPageModule
      ),
  },
  {
    path: 'recuperar-password',
    loadChildren: () =>
      import('./pages/recuperar-password/recuperar-password.module').then(
        (m) => m.RecuperarPasswordPageModule
      ),
  },
  {
    path: 'registro',
    loadChildren: () =>
      import('./pages/registro/registro.module').then(
        (m) => m.RegistroPageModule
      ),
  },
  {
    path: 'codigo-password',
    loadChildren: () =>
      import('./pages/codigo-password/codigo-password.module').then(
        (m) => m.CodigoPasswordPageModule
      ),
  },
  {
    path: 'reestablecer-password',
    loadChildren: () =>
      import('./pages/reestablecer-password/reestablecer-password.module').then(
        (m) => m.ReestablecerPasswordPageModule
      ),
  },
  {
    path: 'terminos-condiciones',
    loadChildren: () =>
      import(
        './pages/modals/terminos-condiciones/terminos-condiciones.module'
      ).then((m) => m.TerminosCondicionesPageModule),
  },
  {
    path: 'privacidad',
    loadChildren: () =>
      import('./pages/modals/privacidad/privacidad.module').then(
        (m) => m.PrivacidadPageModule
      ),
  },
  {
    path: 'datos-registro',
    loadChildren: () =>
      import('./pages/modals/datos-registro/datos-registro.module').then(
        (m) => m.DatosRegistroPageModule
      ),
  },
  {
    path: 'menu',
    loadChildren: () =>
      import('./pages/modals/menu/menu.module').then((m) => m.MenuPageModule),
  },
  {
    path: 'vehiculos',
    loadChildren: () =>
      import('./pages/vehiculos/vehiculos.module').then(
        (m) => m.VehiculosPageModule
      ),
  },
  {
    path: 'verificaciones',
    loadChildren: () =>
      import('./pages/verificaciones/verificaciones.module').then(
        (m) => m.VerificacionesPageModule
      ),
  },
  {
    path: 'historial-pagos',
    loadChildren: () =>
      import('./pages/historial-pagos/historial-pagos.module').then(
        (m) => m.HistorialPagosPageModule
      ),
  },
  {
    path: 'preguntas',
    loadChildren: () =>
      import('./pages/preguntas/preguntas.module').then(
        (m) => m.PreguntasPageModule
      ),
  },
  {
    path: 'tips',
    loadChildren: () =>
      import('./pages/tips/tips.module').then((m) => m.TipsPageModule),
  },
  {
    path: 'reclamos',
    loadChildren: () =>
      import('./pages/reclamos/reclamos.module').then(
        (m) => m.ReclamosPageModule
      ),
  },
  {
    path: 'notificaciones',
    loadChildren: () =>
      import('./pages/modals/notificaciones/notificaciones.module').then(
        (m) => m.NotificacionesPageModule
      ),
  },
  {
    path: 'detalles-campana',
    loadChildren: () =>
      import('./pages/detalles-campana/detalles-campana.module').then(
        (m) => m.DetallesCampanaPageModule
      ),
  },
  {
    path: 'formulario-aplicacion',
    loadChildren: () =>
      import('./pages/formulario-aplicacion/formulario-aplicacion.module').then(
        (m) => m.FormularioAplicacionPageModule
      ),
  },
  {
    path: 'agregar-vehiculo',
    loadChildren: () =>
      import('./pages/agregar-vehiculo/agregar-vehiculo.module').then(
        (m) => m.AgregarVehiculoPageModule
      ),
  },
  {
    path: 'panel',
    loadChildren: () =>
      import('./pages/panel/panel.module').then((m) => m.PanelPageModule),
  },
  {
    path: 'afiliaciones',
    loadChildren: () =>
      import('./pages/afiliaciones/afiliaciones.module').then(
        (m) => m.AfiliacionesPageModule
      ),
  },
  {
    path: 'recorrido',
    loadChildren: () =>
      import('./pages/recorrido/recorrido.module').then(
        (m) => m.RecorridoPageModule
      ),
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./pages/perfil/perfil.module').then((m) => m.PerfilPageModule),
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'camara-integrada',
    loadChildren: () => import('./pages/camara-integrada/camara-integrada.module').then( m => m.CamaraIntegradaPageModule)
  },

  {
    path: 'vehiculos-modal',
    loadChildren: () => import('./pages/modals/vehiculos-modal/vehiculos-modal.module').then( m => m.VehiculosModalPageModule)
  },
  {
    path: 'qr',
    loadChildren: () => import('./pages/modals/qr/qr.module').then( m => m.QrPageModule)
  },
  {
    path: 'fotopreview',
    loadChildren: () => import('./pages/modals/fotopreview/fotopreview.module').then( m => m.FotopreviewPageModule)
  },
  {
    path: 'detalle-vehiculo',
    loadChildren: () => import('./pages/modals/detalle-vehiculo/detalle-vehiculo.module').then( m => m.DetalleVehiculoPageModule)
  },
  {
    path: 'registro-conductor',
    loadChildren: () => import('./pages/registro-conductor/registro-conductor.module').then( m => m.RegistroConductorPageModule)
  },
  {
    path: 'solicitudes',
    loadChildren: () => import('./pages/solicitudes/solicitudes.module').then( m => m.SolicitudesPageModule)
  },
  {
    path: 'no-tiene-vehiculo',
    loadChildren: () => import('./pages/modals/no-tiene-vehiculo/no-tiene-vehiculo.module').then( m => m.NoTieneVehiculoPageModule)
  },
  {
    path: 'confirmacion',
    loadChildren: () => import('./pages/modals/confirmacion/confirmacion.module').then( m => m.ConfirmacionPageModule)
  },
  {
    path: 'campana-activa',
    loadChildren: () => import('./pages/campana-activa/campana-activa.module').then( m => m.CampanaActivaPageModule)
  },
  {
    path: 'conducir-modal',
    loadChildren: () => import('./pages/modals/conducir-modal/conducir-modal.module').then( m => m.ConducirModalPageModule)
  },
  {
    path: 'nuevo-recorrido',
    loadChildren: () => import('./pages/nuevo-recorrido/nuevo-recorrido.module').then( m => m.NuevoRecorridoPageModule)
  },
  {
    path: 'anular-registro',
    loadChildren: () => import('./pages/modals/anular-registro/anular-registro.module').then( m => m.AnularRegistroPageModule)
  },
  {
    path: 'verificar-recorrido',
    loadChildren: () => import('./pages/verificar-recorrido/verificar-recorrido.module').then( m => m.VerificarRecorridoPageModule)
  },
  {
    path: 'mapa-recorrido',
    loadChildren: () => import('./pages/modals/mapa-recorrido/mapa-recorrido.module').then( m => m.MapaRecorridoPageModule)
  },
  {
    path: 'detalle-marca',
    loadChildren: () => import('./pages/modals/detalle-marca/detalle-marca.module').then( m => m.DetalleMarcaPageModule)
  },
  {
    path: 'contacto',
    loadChildren: () => import('./pages/contacto/contacto.module').then( m => m.ContactoPageModule)
  },
  {
    path: 'terminos-condiciones-principal',
    loadChildren: () => import('./pages/terminos-condiciones-principal/terminos-condiciones-principal.module').then( m => m.TerminosCondicionesPrincipalPageModule)
  },
  {
    path: 'politica-privacidad-principal',
    loadChildren: () => import('./pages/politica-privacidad-principal/politica-privacidad-principal.module').then( m => m.PoliticaPrivacidadPrincipalPageModule)
  },
  {
    path: 'eliminar-cuenta',
    loadChildren: () => import('./pages/modals/eliminar-cuenta/eliminar-cuenta.module').then( m => m.EliminarCuentaPageModule)
  },
  {
    path: 'select-ubicacion',
    loadChildren: () => import('./pages/modals/select-ubicacion/select-ubicacion.module').then( m => m.SelectUbicacionPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
