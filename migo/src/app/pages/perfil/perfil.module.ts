import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule} from '@angular/google-maps'


import { IonicModule } from '@ionic/angular';

import { PerfilPageRoutingModule } from './perfil-routing.module';

import { PerfilPage } from './perfil.page';
import { BarraNavegacionComponent } from '../components/barra-navegacion/barra-navegacion.component';
import { MapaCambiarUbicacionComponent } from 'src/app/pages/mapa-cambiar-ubicacion/mapa-cambiar-ubicacion.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilPageRoutingModule,
    BarraNavegacionComponent,
    GoogleMapsModule,
    MapaCambiarUbicacionComponent,
  ],
  declarations: [PerfilPage],
})
export class PerfilPageModule {}
