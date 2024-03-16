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

  constructor(
    private toolbarService: ToolbarService,
    private sectorService: SectorService
  ) {}

  ngOnInit() {
    //aqui nada
    this.toolbarService.setTexto('PANEL DE CONTROL');
  }

  ionViewWillEnter() {
    try {
      this.createMap();
      this.crearSectores();
      this.toolbarService.setTexto('PANEL');
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

  setPolyline() {
    var mapOptions = {
      zoom: this.zoom,
      center: this.center,
      disableDefaultUI: true,
      fullscreenControl: true,
    };

    var map = new google.maps.Map(document.getElementById('map')!, mapOptions);

    let request = {
      origin: this.source,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.ds.route(request, (response, status) => {
      this.dr.setMap(this.mapRef);
      this.dr.setOptions({
        suppressPolylines: false,
        map: map,
      });

      if (status == google.maps.DirectionsStatus.OK) {
        this.dr.setDirections(response);
      } else {
        console.log('No se pudo dibujar la ruta', response);
      }
    });
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

  crearSectores() {
    this.sectorService.getSectores().subscribe((data) => {
      this.sectores = data;
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

      // console.log(createdPolygon)
    }
  }
}
