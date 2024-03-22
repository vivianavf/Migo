import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CampanaComponent } from '../campana/campana.component';
import { MarcasComponent } from '../marcas/marcas.component';
import { BarraNavegacionComponent } from '../barra-navegacion/barra-navegacion.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    BarraNavegacionComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports:[MarcasComponent,],
  declarations: [HomePage,CampanaComponent,MarcasComponent],
  providers: [CampanaComponent, MarcasComponent,],
})
export class HomePageModule {}
