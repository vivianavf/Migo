import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TerminosCondicionesPrincipalPageRoutingModule } from './terminos-condiciones-principal-routing.module';

import { TerminosCondicionesPrincipalPage } from './terminos-condiciones-principal.page';
import { AdsComponent } from '../components/ads/ads.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TerminosCondicionesPrincipalPageRoutingModule,
    AdsComponent,
  ],
  declarations: [TerminosCondicionesPrincipalPage]
})
export class TerminosCondicionesPrincipalPageModule {}
