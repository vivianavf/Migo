import { Component, Input, OnInit } from '@angular/core';
import { Campana } from 'src/app/interfaces/campana';
import { RecorridoRealizado } from 'src/app/interfaces/recorrido-realizado';
import { Sector } from 'src/app/interfaces/sector';
import { CampanaService } from 'src/app/providers/campana.service';
import { GooglemapsService } from 'src/app/providers/googlemaps.service';
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
  mapDetalleRecorrido!: google.maps.Map;

  constructor(
    private sectorService: SectorService,
    private campanaService: CampanaService,
    private googleMapService: GooglemapsService,
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
    this.googleMapService.createMap(this.sector!.centro, this.sector!.zoom, 'map-detalle-recorrido', this.mapDetalleRecorrido, this.sector!.cerco_virtual, this.recorrido.ubicaciones, true);
  }

}
