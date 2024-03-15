import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule} from '@angular/google-maps'

import { IonicModule } from '@ionic/angular';

import { DetallesCampanaPageRoutingModule } from './detalles-campana-routing.module';

import { DetallesCampanaPage } from './detalles-campana.page';
import { BarraNavegacionComponent } from '../barra-navegacion/barra-navegacion.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesCampanaPageRoutingModule,
    GoogleMapsModule,
    BarraNavegacionComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [DetallesCampanaPage]
})
export class DetallesCampanaPageModule {}