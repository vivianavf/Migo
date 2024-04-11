import { Component, OnInit } from '@angular/core';
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
import { VehiculoService } from 'src/app/providers/vehiculo.service';
import { Vehiculo } from 'src/app/interfaces/vehiculo';

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
  vehiculos: Vehiculo[] = [];
  solicitudesActivas: FormularioAplicacion[] = [];
  estado = '';

  constructor(
    private toolbarService: ToolbarService,
    private formService: FormularioAplicacionService,
    private campanaService: CampanaService,
    private userService: UsersService,
    private modalCtrl: ModalController,
    private ingresoService: IngresoConductorCampanaService,
    private navCtrl: NavController,
    private vehiculoService: VehiculoService,
  ) {}

  async aceptarSolicitud(solicitud: FormularioAplicacion) {
    const modal = await this.modalCtrl.create({
      component: ConfirmacionPage,
      cssClass: 'solicitudConfirmar',
      componentProps: {
        solicitud: solicitud,
      },
    });

    modal.present();
  }

  irCampanaActiva(solicitud: FormularioAplicacion) {
    this.campanaService.getCampanabyId(solicitud.id_campana).subscribe((response)=>{
      this.campanaService.setInfoCampanaActiva(response, solicitud);
      this.navCtrl.navigateRoot('/campana-activa');
    })
    
  }

  getCampana(id: number): string {
    const campana = this.campanas.find(({ id_campana }) => id_campana === id);
    const resultado = campana ? campana.nombre_campana : '...';

    return resultado;
  }

  getEstado(solicitud: FormularioAplicacion){
    return solicitud.brandeo ?'Brandeado': 'Pendiente de brandeo';
  }

  generarDatos() {
    this.formService.getFormularios().subscribe((data) => {
      data.forEach((solicitudData) => {
        if (
          solicitudData.id_usuario ===
            this.userService.usuarioActivo().id_usuario &&
          solicitudData.id_ciudad === this.userService.usuarioActivo().id_ciudad
        ) {
          solicitudData.estado_solicitud==='anulada'?console.log(''):this.solicitudes.push(solicitudData);
        }
      });
      this.solicitudes.forEach((solicitud) => {
        switch (solicitud.estado_solicitud) {
          case 'pendiente':
            this.solicitudesPendientes.push(solicitud);
            break;
          case 'aceptada':
            this.solicitudesAceptadas.push(solicitud);
            break;
          case 'rechazada':
            this.solicitudesRechazadas.push(solicitud);
            break;
          case 'activa':
            this.solicitudesActivas.push(solicitud);
            break;
          case 'anulada':
            break;
        }
      });
    });

    this.campanaService.getCampanas().subscribe((data) => {
      this.campanas = data;
    });

    this.vehiculoService.getVehiculos().subscribe((data)=>{
      this.vehiculos = data;
    })
  }

  resetDatos() {
    this.solicitudes = [];
    this.solicitudesAceptadas = [];
    this.solicitudesRechazadas = [];
    this.solicitudesPendientes = [];
    this.solicitudesActivas = [];
  }

  ionViewDidEnter() {
    this.toolbarService.setTexto('SOLICITUDES');
    this.generarDatos();
  }

  ionViewDidLeave() {
    this.resetDatos();
  }

  ngOnInit() {
    this.toolbarService.setTexto('SOLICITUDES');
  }
}
