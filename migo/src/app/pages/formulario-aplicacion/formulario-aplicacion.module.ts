import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormularioAplicacionPageRoutingModule } from './formulario-aplicacion-routing.module';

import { FormularioAplicacionPage } from './formulario-aplicacion.page';
import { BarraNavegacionComponent } from '../barra-navegacion/barra-navegacion.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormularioAplicacionPageRoutingModule,
    ReactiveFormsModule,
    BarraNavegacionComponent,
  ],
  declarations: [FormularioAplicacionPage]
})
export class FormularioAplicacionPageModule {}
