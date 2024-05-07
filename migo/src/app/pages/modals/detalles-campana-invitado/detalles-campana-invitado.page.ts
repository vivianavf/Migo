import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Campana } from 'src/app/interfaces/campana';
import { Client } from 'src/app/interfaces/client';
import { Empresa } from 'src/app/interfaces/empresa';
import { EmpresaImages } from 'src/app/interfaces/empresa-images';
import { Sector } from 'src/app/interfaces/sector';
import { TallerBrandeo } from 'src/app/interfaces/taller-brandeo';
import { User } from 'src/app/interfaces/user';
import { CampanaService } from 'src/app/providers/campana.service';
import { ClienteService } from 'src/app/providers/cliente.service';
import { EmpresaImagesService } from 'src/app/providers/empresa-images.service';
import { EmpresaService } from 'src/app/providers/empresa.service';
import { GooglemapsService } from 'src/app/providers/googlemaps.service';
import { SectorService } from 'src/app/providers/sector.service';
import { TallerBrandeoService } from 'src/app/providers/taller-brandeo.service';
import { ToolbarService } from 'src/app/providers/toolbar.service';
import { UsersService } from 'src/app/providers/users.service';

@Component({
  selector: 'app-detalles-campana-invitado',
  templateUrl: './detalles-campana-invitado.page.html',
  styleUrls: ['./detalles-campana-invitado.page.scss'],
})
export class DetallesCampanaInvitadoPage implements OnInit {


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
  ) { }

  abrirFormulario() {
    // pop over
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
    this.googleMapService.createMap(this.sector!.centro, this.sector!.zoom, 'map-detalle-campana', this.mapDetalleCampana!, this.sector!.cerco_virtual);
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
