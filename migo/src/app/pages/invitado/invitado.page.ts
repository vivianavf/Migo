import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, PopoverController } from '@ionic/angular';

import { MenuPage } from '../modals/menu/menu.page';
import { NotificacionesPage } from '../modals/notificaciones/notificaciones.page';
import { UsersService } from 'src/app/providers/users.service';
import { ClienteService } from 'src/app/providers/cliente.service';
import { ToolbarService } from 'src/app/providers/toolbar.service';
import { Campana } from 'src/app/interfaces/campana';
import { CampanaService } from 'src/app/providers/campana.service';
import { SelectUbicacionPage } from '../modals/select-ubicacion/select-ubicacion.page';
import { Ciudad } from 'src/app/interfaces/ciudad';
import { EmpresaImagesService } from 'src/app/providers/empresa-images.service';
import { EmpresaImages } from 'src/app/interfaces/empresa-images';
import { EmpresaService } from 'src/app/providers/empresa.service';
import { Pais } from 'src/app/interfaces/pais';
import { Empresa } from 'src/app/interfaces/empresa';
import { SectorService } from 'src/app/providers/sector.service';
import { Sector } from 'src/app/interfaces/sector';


@Component({
  selector: 'app-invitado',
  templateUrl: './invitado.page.html',
  styleUrls: ['./invitado.page.scss'],
})
export class InvitadoPage implements OnInit {

  empresas_nombres: { [key: string]: any } = {};
  empresas: Empresa[] = [];
  empresasFiltradas: Empresa[] = [];

  campanasObtenidas: Campana[] = [];
  campanasFiltradas: Campana[] = [];

  imagesEmpresas: EmpresaImages[] = [];

  sector!: Sector;
  sectores: Sector[] = [];

  constructor(
    private popOverCtrl: PopoverController,
    private modalCtrl: ModalController,
    private userService: UsersService,
    private clienteService: ClienteService,
    private toolbarService: ToolbarService,
    private campanaService: CampanaService,
    private navCtrl: NavController,
    private empresaImagesService: EmpresaImagesService,
    private empresaService: EmpresaService,
    private sectorService: SectorService,
  ) { }

  ngOnInit() {
    this.abrirModal();
    this.toolbarService.setTexto('MODO INVITADO')
    this.campanasObtenidas = this.campanaService.campanasObtenidas;

    this.empresaService.getEmpresas().subscribe((data) => {
      this.empresas = data;
      data.forEach((empresa) => {
          this.empresas_nombres[empresa.id_empresa] = empresa.nombre;
      });
    });

    this.empresaImagesService.getImages().subscribe((data)=>{
      this.imagesEmpresas = data;
    })

    this.sectorService.getSectores().subscribe((data) => {
      this.sectores = data;
    });

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

  eligioUbicacion(){
    if(localStorage.getItem('invitado')){
      const ciudadUsuario: Ciudad = JSON.parse(localStorage.getItem('invitado-ciudad')!);
      const paisUsuario: Pais = JSON.parse(localStorage.getItem('invitado-pais')!);
      if(ciudadUsuario){
        console.log(ciudadUsuario.id_ciudad)
        this.campanasFiltradas = this.campanasObtenidas.filter((campana) => campana.id_ciudad === ciudadUsuario.id_ciudad);
        
      }
      
    }
    return localStorage.getItem('invitado')
  }


  ionViewDidLeave() {
    localStorage.removeItem('invitado');
    localStorage.removeItem('invitado-pais');
    localStorage.removeItem('invitado-ciudad');
    this.campanasFiltradas = [];
  }

  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: SelectUbicacionPage,
      cssClass: 'select-ubicacion',
      componentProps: {

      },
      backdropDismiss: false
    });

    modal.present();
  }

  actualizarOrden(orden: string) {
    this.popOverCtrl.dismiss();
    switch (orden) {
      case 'tarif-ascendente':
        // this.campanaComponent.ordenarTarifaAscendente();
        break;
      case 'tarif-descendente':
        // this.campanaComponent.ordenarTarifaDescendente();
        break;
      case 'ascendente': //ordenar campana
        // this.campanaComponent.ordenarAscendente();
        break;
      case 'descendente': //ordenar campana
        // this.campanaComponent.ordenarDescendente();
        break;
      case 'sect-ascendente':
        // this.campanaComponent.ordenarSectorAscendente();
        break;
      case 'sect-descendente':
        // this.campanaComponent.ordenarSectorDescendente();
        break;
    }
  }

  registrarse(campana: Campana){
    this.campanaService.setCampanaActual(campana);
    // this.navCtrl.navigateRoot('detalles-campana');
  }

  getURL(campana: Campana){
    return this.empresaImagesService.getLogoURLbyEmpresaId(campana.id_empresa, this.imagesEmpresas);
  }

}
