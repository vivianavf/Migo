import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CampanaComponent } from '../campana/campana.component';
import { MarcasComponent } from '../marcas/marcas.component';
import { AdsComponent } from '../components/ads/ads.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    AdsComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports:[MarcasComponent,],
  declarations: [HomePage,CampanaComponent,MarcasComponent],
  providers: [CampanaComponent, MarcasComponent, AdsComponent],
})
export class HomePageModule {}
