import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Ciudad } from 'src/app/interfaces/ciudad';
import { Pais } from 'src/app/interfaces/pais';
import { CiudadService } from 'src/app/providers/ciudad.service';
import { PaisService } from 'src/app/providers/pais.service';
import { InvitadoPage } from '../../invitado/invitado.page';

@Component({
  selector: 'app-select-ubicacion',
  templateUrl: './select-ubicacion.page.html',
  styleUrls: ['./select-ubicacion.page.scss'],
})
export class SelectUbicacionPage implements OnInit {
  paises: Pais[] = [];
  ciudades: Ciudad[] = [];
  ciudadesFiltradas: Ciudad[] = [];

  paisInput!: string;
  ciudadInput!: string;

  showSpinner = false;

  constructor(
    private paisService: PaisService,
    private ciudadService: CiudadService,
    private modalCtrl: ModalController,
  ) {}

  ngOnInit() {
    this.paisService.getPaises().subscribe((data) => {
      this.paises = data;
    });

    this.ciudadService.getCiudades().subscribe((data) => {
      this.ciudades = data;
    });
  }

  paisChange(e: any) {
    this.filtrarCiudades(e.detail.value);
    this.paisInput = e.detail.value;
  }

  ciudadChange(e: any) {
    this.ciudadInput = e.detail.value;
  }

  filtrarCiudades(id: number) {
    this.ciudadesFiltradas = [];
    this.ciudades.forEach((ciudad) => {
      if (ciudad.id_pais == id) {
        this.ciudadesFiltradas.push(ciudad);
      }
    });
    // this.ciudadesFiltradas = [];
  }

  ionViewDidLeave() {

  }

  cambiarUbicacion() {
    if (this.ciudadInput && this.paisInput) {
      this.showSpinner = true;
      localStorage.setItem('invitado', 'true');

      this.paisService.getPaisbyId(Number(this.paisInput)).subscribe((data) => {
        localStorage.setItem('invitado-pais', JSON.stringify(data));
        this.ciudadService
          .getCiudadbyId(Number(this.ciudadInput))
          .subscribe((data) => {
            localStorage.setItem('invitado-ciudad', JSON.stringify(data));
            this.modalCtrl.dismiss();
          });
      });
    }
  }
}
