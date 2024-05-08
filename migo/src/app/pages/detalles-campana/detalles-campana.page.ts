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
import { SectorService } from 'src/app/providers/sector.service';
import { ToolbarService } from 'src/app/providers/toolbar.service';
import { TallerBrandeo } from 'src/app/interfaces/taller-brandeo';
import { TallerBrandeoService } from 'src/app/providers/taller-brandeo.service';
import { EmpresaImagesService } from 'src/app/providers/empresa-images.service';
import { EmpresaImages } from 'src/app/interfaces/empresa-images';
import { GooglemapsService } from 'src/app/providers/googlemaps.service';

interface parteBrandeable{
  nombre: string,
  costo: number,
}

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

  mapDetalleCampana?: google.maps.Map;

  imagesEmpresas: EmpresaImages[] = [];

  partesBrandeables: parteBrandeable[] = [];

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
    private empresaImagesService: EmpresaImagesService,
    private googleMapService: GooglemapsService,
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

  redondearFloat(numeroFloat: number, decimales: number) {
    const factor = 10 ** decimales;
    return Math.round(numeroFloat * factor) / factor;
  }

  generarDatos() {
    this.campana = this.campanaService.getCampanaActual();

    this.partesBrandeables = [];
    const puertas = [
      { nombre: "carroceria_capo", valor: this.campana.carroceria_capo },
      { nombre: "carroceria_techo", valor: this.campana.carroceria_techo },
      { nombre: "puerta_conductor", valor: this.campana.puerta_conductor },
      { nombre: "puerta_pasajero", valor: this.campana.puerta_pasajero },
      { nombre: "puerta_trasera_iz", valor: this.campana.puerta_trasera_iz },
      { nombre: "puerta_trasera_der", valor: this.campana.puerta_trasera_der },
      { nombre: "puerta_maletero", valor: this.campana.puerta_maletero }
  ];
  
  puertas.forEach(puerta => {
    const parteExiste = this.partesBrandeables.find((parte)=> parte.nombre === puerta.nombre)
      if (puerta.valor !== 0.0 && !parteExiste) {
        switch (puerta.nombre) {
          case "carroceria_capo":
            this.partesBrandeables.push({nombre: 'Capó', costo: puerta.valor});
            break;
          case "carroceria_techo":
            this.partesBrandeables.push({nombre: 'Techo', costo: puerta.valor});
            break;
          case "puerta_conductor":
            this.partesBrandeables.push({nombre: 'Puerta conductor', costo: puerta.valor});
            break;
          case "puerta_pasajero":
            this.partesBrandeables.push({nombre: 'Puerta copiloto', costo: puerta.valor});
            break;
          case "puerta_trasera_iz":
            this.partesBrandeables.push({nombre: 'Puerta trasera izq.', costo: puerta.valor});
            break;
          case "puerta_trasera_der":
            this.partesBrandeables.push({nombre: 'Puerta trasera der.', costo: puerta.valor});
            break;
          case "puerta_maletero":
            this.partesBrandeables.push({nombre: 'Maletero', costo: puerta.valor});
            break;
      }
      }
  });

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

    this.empresaImagesService.getImages().subscribe((data)=>{
      this.imagesEmpresas = data;
    })
    
  }

  getBannerURL(campana: Campana){
    const idEmpresa = campana.id_empresa;
    return this.empresaImagesService.getBannerURLbyEmpresaId(idEmpresa, this.imagesEmpresas);
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
        if(this.campana.id_sector == sectorObtenido.id_sector && sectorObtenido.id_campana == this.campana.id_campana){
          this.sector = sectorObtenido;
        }
      })
      this.createMap();
    })
  }

  ionViewWillEnter() {
    try {
      this.generarDatos();
      this.crearSectores();
    } catch (error) {
      console.log(error);
    }
  }
  
  createMap() {
    this.googleMapService.createMap(this.sector!.centro, this.sector!.zoom, 'map-campana', this.mapDetalleCampana!, this.sector!.cerco_virtual);
  }

  ngOnInit() {
    try {
      this.generarDatos();
      this.toolbarService.setTexto('DETALLES DE CAMPAÑA');
      this.crearSectores();
    } catch (error) {
      console.log(error);
    }
  }
}
