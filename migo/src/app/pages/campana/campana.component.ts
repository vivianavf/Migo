import { Component, Input, OnInit } from '@angular/core';
import { CampanaService } from 'src/app/providers/campana.service';
import { Campana } from 'src/app/interfaces/campana';
import { EmpresaService } from 'src/app/providers/empresa.service';
import { Empresa } from 'src/app/interfaces/empresa';
import { NavController } from '@ionic/angular';
import { Sector } from 'src/app/interfaces/sector';
import { SectorService } from 'src/app/providers/sector.service';

@Component({
  selector: 'app-campana',
  templateUrl: './campana.component.html',
  styleUrls: ['./campana.component.scss'],
})
export class CampanaComponent implements OnInit {
  campanas: Campana[] = [];
  // campanasObtenidas = t
  empresas_nombres: { [key: string]: any } = {};
  empresas: Empresa[] = [];

  sector!: Sector;
  sectores: Sector[] = [];

  //ascendente
  ordenamientoActual: string = 'ascendente';
  ordenAscendente: boolean = true;

  constructor(
    private campanaService: CampanaService,
    private empresaService: EmpresaService,
    private navCtrl: NavController,
    private sectorService: SectorService
  ) {}

  registrarse(campana: Campana) {
    console.log('Envio la campana', campana);
    this.campanaService.setCampanaActual(campana);
    this.navCtrl.navigateRoot('detalles-campana');
  }

  ordenarAscendente() {
    this.campanaService.campanasObtenidas.sort((a, b) => {
      const nameA = a.nombre_campana.toLowerCase();
      const nameB = b.nombre_campana.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  ordenarDescendente() {
    this.campanaService.campanasObtenidas.sort((a, b) => {
      const nameA = a.nombre_campana.toLowerCase();
      const nameB = b.nombre_campana.toLowerCase();
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
    });
  }

  ordenarTarifaAscendente() {
    this.campanaService.campanasObtenidas.sort((a, b) => {
      return a.tarifa_base - b.tarifa_base;
    });
  }

  ordenarTarifaDescendente() {
    this.campanaService.campanasObtenidas.sort((a, b) => {
      return b.tarifa_base - a.tarifa_base;
    });
  }

  ordenarSectorAscendente() {
    console.log(this.sectores)
    this.campanas.sort((a, b) => {
      const sectorA = this.sectores.find(sector => sector.id_sector === a.id_sector)?.nombre!;
      const sectorB = this.sectores.find(sector => sector.id_sector === b.id_sector)?.nombre!;
      console.log(this.sectores)
      return sectorA.localeCompare(sectorB);
    });
  }

  ordenarSectorDescendente() {
    
  }

  ngOnInit() {
    this.campanas = this.campanaService.campanasObtenidas;

    this.empresaService.getEmpresas().subscribe((data) => {
      this.empresas = data;
      data.forEach((empresa) => {
        this.empresas_nombres[empresa.id_empresa] = empresa.nombre;
      });
    });

    this.sectorService.getSectores().subscribe((data) => {
      this.sectores = data;
    });

    // campanasCargadas = document.getElementById('')
  }

  obtenerNombreSector(idSector: number) {
    var busquedaSector = this.sectores.find(
      ({ id_sector }) => id_sector === idSector
    );
    if (busquedaSector) {
      return busquedaSector.nombre;
    } else {
      return '--';
    }
  }
}
