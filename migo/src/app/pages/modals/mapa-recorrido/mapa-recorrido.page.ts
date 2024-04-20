import { Component, Input, OnInit } from '@angular/core';
import { Campana } from 'src/app/interfaces/campana';
import { RecorridoRealizado } from 'src/app/interfaces/recorrido-realizado';
import { Sector } from 'src/app/interfaces/sector';
import { CampanaService } from 'src/app/providers/campana.service';
import { SectorService } from 'src/app/providers/sector.service';

@Component({
  selector: 'app-mapa-recorrido',
  templateUrl: './mapa-recorrido.page.html',
  styleUrls: ['./mapa-recorrido.page.scss'],
})
export class MapaRecorridoPage implements OnInit {

  @Input() recorrido!: RecorridoRealizado;

  //
  sector!: Sector;
  campana!: Campana;

  //mapa
  map_detalle!: google.maps.Map;

  constructor(
    private sectorService: SectorService,
    private campanaService: CampanaService,
  ) { }

  ngOnInit() {
    const idCampana = this.recorrido.id_campana;

    //se supone que al iniciar la app consulta todas las campanas
    const campanaEncontrada = this.campanaService.campanasObtenidas.find((campana) => idCampana === campana.id_campana);
    if(campanaEncontrada){
      this.campana = campanaEncontrada;
      this.sectorService.getSectorbyId(campanaEncontrada.id_sector).subscribe((sector)=>{
        this.sector = sector;
        this.createMap();
      })
    }
  }

  createMap() {
    var mapOptions = {
      zoom: this.sector!.zoom,
      center: this.sector!.centro,
      streetViewControl: true,
    };
    var mapaDetalleRecorrido = new google.maps.Map(
      document.getElementById('map-detalle-recorrido')!,
      mapOptions
    );
    this.map_detalle = mapaDetalleRecorrido;

    this.crearCercos();
    this.crearRutas();
  }

  async crearCercos() {
    if (this.sector) {
      let createdPolygon: any;

      this.sector.cerco_virtual.forEach((cerco) => {
        if (cerco) {
          createdPolygon = new google.maps.Polygon({
            paths: [cerco],
            strokeColor: '#24FF00',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#24FF00',
            fillOpacity: 0.35,
          });

          createdPolygon.setMap(this.map_detalle);
        }
      });

    }
  }

  async crearRutas(){
    this.recorrido.ubicaciones.forEach((ubicacion: any)=>{
      if(ubicacion){
        console.log(ubicacion)
        new google.maps.Marker({
          position: { lat: ubicacion.lat, lng: ubicacion.lng },
          map: this.map_detalle,
        });
      }
    })

    const flightPath = new google.maps.Polyline({
      path: this.recorrido.ubicaciones,
      geodesic: true,
      strokeColor: '#24FF00',
      strokeOpacity: 1.0,
      strokeWeight: 3,
    });

    flightPath.setMap(this.map_detalle);
  }

}
