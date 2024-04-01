import { Component, OnInit } from '@angular/core';
import { Form } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { Campana } from 'src/app/interfaces/campana';
import { FormularioAplicacion } from 'src/app/interfaces/formulario-aplicacion';
import { CampanaService } from 'src/app/providers/campana.service';
import { FormularioAplicacionService } from 'src/app/providers/formulario-aplicacion.service';
import { ToolbarService } from 'src/app/providers/toolbar.service';
import { UsersService } from 'src/app/providers/users.service';
import { ConfirmacionPage } from '../modals/confirmacion/confirmacion.page';
import { IngresoConductorCampanaService } from 'src/app/providers/ingreso-conductor-campana.service';
import { IngresoConductorCampana } from 'src/app/interfaces/ingreso-conductor-campana';
import { SolicitudesPageModule } from './solicitudes.module';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.page.html',
  styleUrls: ['./solicitudes.page.scss'],
})
export class SolicitudesPage implements OnInit {

  solicitudes: FormularioAplicacion[] = [];
  solicitudesAceptadas: FormularioAplicacion[] = [];
  solicitudesRechazadas: FormularioAplicacion[] = [];
  solicitudesPendientes: FormularioAplicacion[] = [];
  campanas: Campana[] = [];
  solicitudesActivas: IngresoConductorCampana[] = [];

  constructor(
    private toolbarService: ToolbarService,
    private formService: FormularioAplicacionService,
    private campanaService: CampanaService,
    private userService: UsersService,
    private modalCtrl: ModalController,
    private ingresoService: IngresoConductorCampanaService,
    private navCtrl: NavController,
  ) { }

  async aceptarSolicitud(solicitud: FormularioAplicacion) {

    const modal = await this.modalCtrl.create({
      component: ConfirmacionPage,
      cssClass: 'confirmar-solicitud',
      componentProps: {
        solicitud: solicitud,
      },
    });

    modal.present();
  }

  irCampanaActiva(solicitud: IngresoConductorCampana){
    this.campanaService.setInfoCampanaActiva(solicitud.id_campana);
    this.navCtrl.navigateRoot('/campana-activa');
  }

  getCampana(id:number): string{
    var campana = this.campanas.find(
      ({id_campana}) => id_campana === id
    )
    const resultado = campana ? campana.nombre_campana : "...";

    return resultado
  }

  generarDatos(){
    this.toolbarService.setTexto("SOLICITUDES")

    this.ingresoService.getIngresos().subscribe((data)=>{
      
      data.forEach((solicitudActiva)=>{
        if(solicitudActiva.id_ciudad === this.userService.usuarioActivo().id_ciudad &&
        solicitudActiva.id_usuario === this.userService.usuarioActivo().id_usuario){
          this.solicitudesActivas.push(solicitudActiva)
        }
      })
    });

    this.formService.getFormularios().subscribe((data)=>{
      data.forEach((solicitudData)=>{
        if(solicitudData.id_usuario === this.userService.usuarioActivo().id_usuario &&
        solicitudData.id_ciudad === this.userService.usuarioActivo().id_ciudad){
          this.solicitudes.push(solicitudData)
        }
      })
      this.solicitudes.forEach((solicitud)=>{
        switch(solicitud.estado_solicitud){
          case 'pendiente':
            this.solicitudesPendientes.push(solicitud)
            break;
          case 'aceptada':
            this.solicitudesAceptadas.push(solicitud)
            break;
          case 'rechazada':
            this.solicitudesRechazadas.push(solicitud)
            break;
        }
      })
    })

  this.campanaService.getCampanas().subscribe((data)=>{this.campanas = data})
  }

  resetDatos(){
    this.solicitudes = [];
    this.solicitudesAceptadas = [];
    this.solicitudesRechazadas = [];
    this.solicitudesPendientes = [];
    this.solicitudesActivas = [];
  }

  ionViewDidEnter() {
    this.resetDatos();
    this.generarDatos();
  }

  ngOnInit() {
    this.resetDatos();
    this.generarDatos();
  }
}
