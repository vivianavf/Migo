import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Campana } from 'src/app/interfaces/campana';
import { Client } from 'src/app/interfaces/client';
import { Empresa } from 'src/app/interfaces/empresa';
import { Sector } from 'src/app/interfaces/sector';
import { TallerBrandeo } from 'src/app/interfaces/taller-brandeo';
import { User } from 'src/app/interfaces/user';
import { CampanaService } from 'src/app/providers/campana.service';
import { ClienteService } from 'src/app/providers/cliente.service';
import { EmpresaService } from 'src/app/providers/empresa.service';
import { SectorService } from 'src/app/providers/sector.service';
import { TallerBrandeoService } from 'src/app/providers/taller-brandeo.service';
import { ToolbarService } from 'src/app/providers/toolbar.service';
import { UsersService } from 'src/app/providers/users.service';
import { NotificacionesPage } from '../modals/notificaciones/notificaciones.page';
import { MenuPage } from '../modals/menu/menu.page';
import { QrPage } from '../modals/qr/qr.page';
import { VehiculoService } from 'src/app/providers/vehiculo.service';
import { Vehiculo } from 'src/app/interfaces/vehiculo';
import { ConducirModalPage } from '../modals/conducir-modal/conducir-modal.page';
import { AnularRegistroPage } from '../modals/anular-registro/anular-registro.page';
import { FormularioAplicacion } from 'src/app/interfaces/formulario-aplicacion';

@Component({
  selector: 'app-campana-activa',
  templateUrl: './campana-activa.page.html',
  styleUrls: ['./campana-activa.page.scss'],
})
export class CampanaActivaPage implements OnInit {
  campana!: Campana;
  empresas: Empresa[] = [];
  usuarios: User[] = [];
  clientes: Client[] = [];
  sectores: Sector[] = [];
  sector?: Sector;
  talleresBrandeo: TallerBrandeo[] = [];
  vehiculosAdmisibles: string[] = [];
  empresaSeleccionada!: Empresa;
  nombreEmpresa = '-';
  correoEncargado = '--@--';
  vehiculo!: Vehiculo;
  brandeo?: boolean;
  
  //anular registro
  solicitud!: FormularioAplicacion;

  @ViewChild('map-campanaActiva') mapRef!: google.maps.Map;
  map_campana?: google.maps.Map;

  constructor(
    private toolbarService: ToolbarService,
    private campanaService: CampanaService,
    private modalController: ModalController,
    private userService: UsersService,
    private clientService: ClienteService,
    private empresaService: EmpresaService,
    private sectorService: SectorService,
    private navCtrl: NavController,
    private tallerBService: TallerBrandeoService,
    private vehiculoService: VehiculoService
  ) {}

  ngOnInit() {
    try {
      this.generarDatos();
      this.toolbarService.setTexto('CAMPAÑA ACTIVA');
      this.crearSectores();
      // this.createMap();
    } catch (error) {
      console.log(error);
    }
  }

  ionViewDidEnter(){
    let solicitud = this.campanaService.getInfoCampanaActiva()[1];
    this.obtenerVehiculo(solicitud.id_vehiculo)
    this.brandeo = solicitud.brandeo;
  }

  generarDatos() {
    this.solicitud = this.campanaService.getInfoCampanaActiva()[1];
    // this.obtenerVehiculo(this.solicitud.id_vehiculo);
    this.brandeo = this.solicitud.brandeo;

    this.campana = this.campanaService.getInfoCampanaActiva()[0];
    this.consultarVehiculosAdmisibles(this.campana);
    this.consultarTalleres(this.campana);
    var idEmpresa = this.campana.id_empresa;
    this.empresaService.getEmpresas().subscribe((data) => {
      this.empresas = data;
      const busquedaEmpresa = this.empresas.find(
        ({ id_empresa }) => id_empresa === idEmpresa
      );
      if (busquedaEmpresa) this.nombreEmpresa = busquedaEmpresa.nombre;
    });
  }

  consultarVehiculosAdmisibles(campana: Campana) {
    while (this.vehiculosAdmisibles.length != 0) {
      this.vehiculosAdmisibles.pop();
    }

    if (campana.sedan_admisible) {
      this.vehiculosAdmisibles.push('sedan');
    }

    if (campana.suv_admisible) {
      this.vehiculosAdmisibles.push('suv');
    }

    if (campana.camion_admisible) {
      this.vehiculosAdmisibles.push('camion');
    }

    if (campana.camioneta_admisible) {
      this.vehiculosAdmisibles.push('camioneta');
    }

    if (campana.bus_admisible) {
      this.vehiculosAdmisibles.push('bus');
    }

    if (this.vehiculosAdmisibles.length == 0) {
      this.vehiculosAdmisibles.push('No hay vehiculos admisibles');
    }
  }

  consultarTalleres(campana: Campana) {
    while (this.talleresBrandeo.length != 0) {
      this.talleresBrandeo.pop();
    }

    this.tallerBService.getTalleres().subscribe((talleresBrandeoData) => {
      campana.id_talleres.forEach((id_tallercampana) => {
        const tallerCampana = talleresBrandeoData.find(
          ({ id_taller }) => id_taller === id_tallercampana
        )!;
        const tallerRepetido = this.talleresBrandeo.find(
          ({ id_taller }) => id_taller === id_tallercampana
        );
        if (!tallerRepetido) {
          this.talleresBrandeo.push(tallerCampana!);
        }
      });
    });
  }

  crearSectores() {
    this.sectorService.getSectores().subscribe((data) => {
      this.sectores = data;
      this.campana = this.campanaService.getInfoCampanaActiva()[0];
      data.forEach((sectorObtenido) => {
        if (sectorObtenido.id_campana == this.campana.id_campana) {
          this.sector = sectorObtenido;
          this.createMap();
        }
      });
    });
  }

  async crearCercos() {
    if (this.sector) {
      let createdPolygon: any;

      this.sector.cerco_virtual.forEach((cerco) => {
        if (cerco) {
          createdPolygon = new google.maps.Polygon({
            paths: [cerco],
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
          });

          createdPolygon.setMap(this.map_campana);
        }
      });
    }
  }

  createMap() {
    var mapOptions = {
      zoom: this.sector!.zoom,
      center: this.sector!.centro,
      streetViewControl: true,
    };
    var mapCampanaActiva = new google.maps.Map(
      document.getElementById('campanaActiva')!,
      mapOptions
    );
    this.map_campana = mapCampanaActiva;

    this.crearCercos();
  }

  async mostrarNotificaciones() {
    const modal = await this.modalController.create({
      component: NotificacionesPage,
      componentProps: {},
      cssClass: 'notificaciones,',
    });
  }

  async mostrarMenu() {
    const modal = await this.modalController.create({
      component: MenuPage,
      componentProps: {
        user: this.userService.usuarioActivo(),
        client: this.clientService.clienteActivo(),
      },
      cssClass: 'menu',
    });

    return await modal.present();
  }

  brandearVehiculo() {
    this.mostrarQR();
  }

  obtenerVehiculo(id:number ){
    this.vehiculoService.getVehiculobyId(id).subscribe((vehiculo)=>{
      this.vehiculo = vehiculo;
      this.brandeo = false;
      // this.brandeo = vehiculo.brandeo!;
    });
  }

  async mostrarQR() {
    const modalQR = await this.modalController.create({
      component: QrPage,
      componentProps: {
        user: this.userService.usuarioActivo(),
        conductor: this.userService.esChoferOCliente(),
        campana: this.campana,
        vehiculo: this.vehiculo,
        marca: this.vehiculo.id_marca,
        modelo: this.vehiculo.id_modelo,
      },
      cssClass: 'qr-modal',
    });

    return await modalQR.present();
  }

  async conducirVehiculo() {
    const modal = await this.modalController.create({
      component: ConducirModalPage,
      cssClass: 'conducirModal',
      componentProps: {
        campana: this.campana,
        vehiculo: this.vehiculo,
      },
    });

    modal.present();
  }

  async anularRegistro(){
    const modal = await this.modalController.create({
      component: AnularRegistroPage,
      cssClass: 'anularRegistroModal',
      componentProps: {
        campana: this.campana,
        vehiculo: this.vehiculo,
        solicitud: this.solicitud,
      },
    });

    modal.present();
  }
}
