import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { GoogleMap, Polygon } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
// import { CapacitorGoogleMaps } from '@capacitor/google-maps/dist/typings/implementation';
import { MenuPage } from '../modals/menu/menu.page';
import { NotificacionesPage } from '../modals/notificaciones/notificaciones.page';
import { GoogleMapsModule } from '@angular/google-maps';
import { ToolbarService } from 'src/app/providers/toolbar.service';
import { SectorService } from 'src/app/providers/sector.service';
import { Sector } from 'src/app/interfaces/sector';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.page.html',
  styleUrls: ['./panel.page.scss'],
})
export class PanelPage implements OnInit {
  // map!: GoogleMap;
  // @ViewChild('mapaPanel') mapRef!: ElementRef<HTMLElement>;
  // polygonId?: string;

  modalController: any;
  userService: any;
  clientService: any;

  sectores: Sector[] = [];
  sector?: Sector;

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

  //
  horarioInicio = '8:23'
  horarioFin = '16:47'

  constructor(
    private toolbarService: ToolbarService,
    private sectorService: SectorService
  ) {}

  //
  //HOY
  // POR COBRAR : ???
  // RECORRIDO:
  // crear un array vacio de campanasHoy = campana[]
  // crear una variable number vacia de contadorKMsHoy = 0
  // tendria que obtener un array de todos los recorridosrealizados[]
  // guardar en una variable la fecha de hoy
  // Luego, recorrer el array de recorridosrealizados[] y comparar la fecha con la de hoy
  // si el recorridorealizado.fecha es igual a la fecha de hoy
  // se obtiene los KMS de ese recorrido 
  // y se suman a la variable contadorKMsHoy
  // con el id_campana obtener la campana
  // agregar esa campana a campanasHoy
  // 
  //
  // HORARIO MONETIZACION:
  // crear array de numbers = horariosInicio ej: [800, 1200, 1259, 900]
  // crear array de number = horariosFin ej: [1600, 1800, 1759, 1000]
  // obtener el minimo de cada array
  // el minimo de horarios de Inicio guardarlo en horarioInicio
  // el minio de horarios de Fin guardarlo en horarioFin

  // TODOS MIS RECORRIDOS
  // KMS TOTALES
  // crear un contador KMSTotales = 0
  // obtener con el servicio todos los recorridos
  // recorrer este array y obtener el km de cada recorrido
  // sumar el km a KMSTotales

  // Tiempo Total


  //

  ngOnInit() {
    //aqui nada
    this.toolbarService.setTexto('PANEL DE CONTROL');
  }

  ionViewWillEnter() {
    try {
      this.createMap();
      this.toolbarService.setTexto('PANEL DE CONTROL');
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
      document.getElementById('map-panel')!,
      mapOptions
    );
    this.map = mapCreado;
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

  verHistorial(){

  }
}
