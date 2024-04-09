import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CampanaActivaPageRoutingModule } from './campana-activa-routing.module';

import { CampanaActivaPage } from './campana-activa.page';
import { BarraNavegacionComponent } from '../components/barra-navegacion/barra-navegacion.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampanaActivaPageRoutingModule,
    BarraNavegacionComponent
  ],
  declarations: [CampanaActivaPage]
})
export class CampanaActivaPageModule {}
