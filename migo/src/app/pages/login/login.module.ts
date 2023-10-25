import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule} from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { Router, RouterModule } from '@angular/router';
import { TerminosCondicionesPageModule } from '../modals/terminos-condiciones/terminos-condiciones.module';
import { PrivacidadPageModule } from '../modals/privacidad/privacidad.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    TerminosCondicionesPageModule,
    PrivacidadPageModule,
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
