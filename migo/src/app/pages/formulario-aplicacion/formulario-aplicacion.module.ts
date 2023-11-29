import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioAplicacionPageRoutingModule } from './formulario-aplicacion-routing.module';

import { FormularioAplicacionPage } from './formulario-aplicacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioAplicacionPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [FormularioAplicacionPage]
})
export class FormularioAplicacionPageModule {}
