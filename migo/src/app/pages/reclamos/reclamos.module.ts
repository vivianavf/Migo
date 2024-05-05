import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReclamosPageRoutingModule } from './reclamos-routing.module';

import { ReclamosPage } from './reclamos.page';
import { AdsComponent } from '../components/ads/ads.component';
import { BackButtonsComponent } from '../components/back-buttons/back-buttons.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReclamosPageRoutingModule,
    AdsComponent,
    BackButtonsComponent,
  ],
  declarations: [ReclamosPage]
})
export class ReclamosPageModule {}
