import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CampanaService } from 'src/app/providers/campana.service';
import { Campana } from 'src/app/interfaces/campana';
import { ModalController, NavController } from '@ionic/angular';
import { MenuPage } from '../modals/menu/menu.page';
import { UsersService } from 'src/app/providers/users.service';
import { ClienteService } from 'src/app/providers/cliente.service';
import { NotificacionesPage } from '../modals/notificaciones/notificaciones.page';
import { Empresa } from 'src/app/interfaces/empresa';
import { EmpresaService } from 'src/app/providers/empresa.service';
import { User } from 'src/app/interfaces/user';
import { Client } from 'src/app/interfaces/client';
import { Sector } from 'src/app/interfaces/sector';
// import { Sector } from 'src/app/interfaces/sector';
// import { GoogleMap } from '@capacitor/google-maps';
// import { CapacitorGoogleMaps } from '@capacitor/google-maps/dist/typings/implementation';
// import { GoogleMap, GoogleMaps, GoogleMapOptions, LatLng, Polygon, PolygonOptions } from '@ionic-native/google-maps';

// import { GoogleMap, Polygon } from '@capacitor/google-maps';
import { SectorService } from 'src/app/providers/sector.service';
import { GoogleMapsModule, MapPolygon } from '@angular/google-maps';
import { ToolbarService } from 'src/app/providers/toolbar.service';
import { TallerBrandeo } from 'src/app/interfaces/taller-brandeo';
import { TallerBrandeoService } from 'src/app/providers/taller-brandeo.service';

@Component({
  selector: 'app-detalles-campana',
  templateUrl: './detalles-campana.page.html',
  styleUrls: ['./detalles-campana.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetallesCampanaPage implements OnInit {
  campana!: Campana;
  empresas: Empresa[] = [];
  usuarios: User[] = [];
  clientes: Client[] = [];
  sectores: Sector[] = [];
  sector?: Sector;
  talleresBrandeo: TallerBrandeo[] = [];
  empresaSeleccionada!: Empresa;
  nombreEmpresa = '-';
  correoEncargado = '--@--';

  @ViewChild('map') mapRef!: google.maps.Map;
  map?: google.maps.Map;
  center: google.maps.LatLngLiteral = {
    lat: -2.18982299999999,
    lng: -79.88775,
  };
  zoom = 12;

  source!: google.maps.LatLngLiteral;
  destination!: google.maps.LatLngLiteral;

  ds!: google.maps.DirectionsService;
  dr!: google.maps.DirectionsRenderer;

  //Mapa de Google Maps
  // polygon: any;
  // map!: GoogleMap;
  // @ViewChild('mapElement') mapRef!: ElementRef<HTMLElement>;
  // polygonId?: string;

  constructor(
    private campanaService: CampanaService,
    private modalController: ModalController,
    private userService: UsersService,
    private clientService: ClienteService,
    private empresaService: EmpresaService,
    private sectorService: SectorService,
    private navCtrl: NavController,
    private toolbarService: ToolbarService,
    private tallerBService: TallerBrandeoService,
  ) {}

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

  abrirFormulario() {
    this.navCtrl.navigateRoot('formulario-aplicacion');
  }

  generarDatos() {
    this.campana = this.campanaService.getCampanaActual();
    var idEmpresa = this.campana.id_empresa;
    this.empresaService.getEmpresas().subscribe((data) => {
      this.empresas = data;
      const busquedaEmpresa = this.empresas.find(
        ({ id_empresa }) => id_empresa === idEmpresa
      );
      if (busquedaEmpresa) this.nombreEmpresa = busquedaEmpresa.nombre;
    });

    this.tallerBService.getTalleres().subscribe((data)=>{
      this.talleresBrandeo = data;
    })
    // this.crearSectores();
  }

  crearSectores() {
    this.sectorService.getSectores().subscribe((data) => {
      this.sectores = data;
      this.campana = this.campanaService.getCampanaActual();
      data.forEach((sectorX) => {
        if (sectorX.id_sector == 19) {
          this.sector = sectorX;
          this.crearCercos();
        }
      });
    });
    // this.crearMapa(-2.189822999999990, -79.88775);
  }

  async crearCercos() {
    if (this.sector) {
      let createdPolygon: any;

      this.sector.cerco_virtual.forEach((cerco) => {
        console.log(cerco);
        if (cerco) {
          createdPolygon = new google.maps.Polygon({
            paths: [cerco],
            strokeColor: '#FF0000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF0000',
            fillOpacity: 0.35,
          });

          createdPolygon.setMap(this.map);
        }
      });

    }
  }

  ionViewWillEnter() {
    try {
      this.generarDatos();
      this.createMap();
      this.crearSectores();
    } catch (error) {
      console.log(error);
    }
  }

  createMap() {
    var mapOptions = {
      zoom: this.zoom,
      center: this.center,
      disableDefaultUI: true,
      fullscreenControl: true,
    };
    var mapCreado = new google.maps.Map(
      document.getElementById('map-campana')!,
      mapOptions
    );
    this.map = mapCreado;
  }

  ngOnInit() {
    try {
      this.generarDatos();
      this.toolbarService.setTexto('DETALLES DE CAMPAÑA');
      // this.crearSectores();
      // this.createMap();
    } catch (error) {
      console.log(error);
    }
  }
}
