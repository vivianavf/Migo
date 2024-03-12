import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FotopreviewPageRoutingModule } from './fotopreview-routing.module';

import { FotopreviewPage } from './fotopreview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FotopreviewPageRoutingModule
  ],
  declarations: [FotopreviewPage]
})
export class FotopreviewPageModule {}
