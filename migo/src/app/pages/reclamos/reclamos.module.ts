import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReclamosPageRoutingModule } from './reclamos-routing.module';

import { ReclamosPage } from './reclamos.page';
import { AdsComponent } from '../components/ads/ads.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReclamosPageRoutingModule,
    AdsComponent,
  ],
  declarations: [ReclamosPage]
})
export class ReclamosPageModule {}
