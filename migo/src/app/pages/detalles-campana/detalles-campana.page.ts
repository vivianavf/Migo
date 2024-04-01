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
  vehiculosAdmisibles : string[] = [];
  empresaSeleccionada!: Empresa;
  nombreEmpresa = '-';
  correoEncargado = '--@--';

  @ViewChild('map') mapRef!: google.maps.Map;
  map?: google.maps.Map;
  // center: google.maps.LatLngLiteral = {
  //   lat: -2.18982299999999,
  //   lng: -79.88775,
  // };
  // zoom = 12;

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

  consultarTalleres(campana: Campana){
    while(this.talleresBrandeo.length !=0){
      this.talleresBrandeo.pop();
    }

    this.tallerBService.getTalleres().subscribe((talleresBrandeoData)=>{
      campana.id_talleres.forEach((id_tallercampana)=>{
        const tallerCampana = talleresBrandeoData.find(({id_taller}) => id_taller === id_tallercampana)!;
        const tallerRepetido = this.talleresBrandeo.find(({id_taller})=> id_taller === id_tallercampana);
        if(!tallerRepetido){
          this.talleresBrandeo.push(tallerCampana!);
        }
      })
    })
  }

  consultarVehiculosAdmisibles(campana: Campana){

    while(this.vehiculosAdmisibles.length !=0){
      this.vehiculosAdmisibles.pop();
    }

    if(campana.sedan_admisible){
      this.vehiculosAdmisibles.push("sedan");
    }
    
    if(campana.suv_admisible){
      this.vehiculosAdmisibles.push("suv");
    }
    
    if(campana.camion_admisible){
      this.vehiculosAdmisibles.push("camion");
    }
    
    if(campana.camioneta_admisible){
      this.vehiculosAdmisibles.push("camioneta");
    }
    
    if(campana.bus_admisible){
      this.vehiculosAdmisibles.push("bus");
    }

    if(this.vehiculosAdmisibles.length == 0){
      this.vehiculosAdmisibles.push("No hay vehiculos admisibles")
    }
  }

  crearSectores() {
    this.sectorService.getSectores().subscribe((data)=>{
      this.sectores = data;
      this.campana = this.campanaService.getCampanaActual();
      data.forEach((sectorObtenido) =>{
        if(sectorObtenido.id_campana == this.campana.id_campana){
          this.sector = sectorObtenido;
          console.log(this.sector)
          this.createMap();
        }
      })
    })
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

          createdPolygon.setMap(this.map);
        }
      });

    }
  }

  ionViewWillEnter() {
    try {
      this.generarDatos();
      this.crearSectores();
      // this.createMap();
    } catch (error) {
      console.log(error);
    }
  }
  
  createMap() {
    var mapOptions = {
      zoom: this.sector!.zoom+2,
      center: this.sector!.centro,
      streetViewControl: true,
    };
    var mapCreado = new google.maps.Map(
      document.getElementById('map-campana')!,
      mapOptions
    );
    this.map = mapCreado;

    this.crearCercos();
  }

  ngOnInit() {
    try {
      this.generarDatos();
      this.toolbarService.setTexto('DETALLES DE CAMPAÑA');
      this.crearSectores();
      // this.createMap();
    } catch (error) {
      console.log(error);
    }
  }
}
