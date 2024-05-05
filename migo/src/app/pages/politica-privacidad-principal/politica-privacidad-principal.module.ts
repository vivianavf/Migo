import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoliticaPrivacidadPrincipalPageRoutingModule } from './politica-privacidad-principal-routing.module';

import { PoliticaPrivacidadPrincipalPage } from './politica-privacidad-principal.page';
import { AdsComponent } from '../components/ads/ads.component';
import { BackButtonsComponent } from '../components/back-buttons/back-buttons.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoliticaPrivacidadPrincipalPageRoutingModule,
    AdsComponent,
    BackButtonsComponent,
  ],
  declarations: [PoliticaPrivacidadPrincipalPage]
})
export class PoliticaPrivacidadPrincipalPageModule {}
