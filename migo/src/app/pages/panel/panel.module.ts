import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule} from '@angular/google-maps'

import { IonicModule } from '@ionic/angular';

import { PanelPageRoutingModule } from './panel-routing.module';

import { PanelPage } from './panel.page';
import { BarraNavegacionComponent } from '../components/barra-navegacion/barra-navegacion.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PanelPageRoutingModule,
    GoogleMapsModule,
    BarraNavegacionComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [PanelPage]
})
export class PanelPageModule {}
