import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Campana } from 'src/app/interfaces/campana';
import { Empresa } from 'src/app/interfaces/empresa';
import { EmpresaImages } from 'src/app/interfaces/empresa-images';
import { Pais } from 'src/app/interfaces/pais';
import { CampanaService } from 'src/app/providers/campana.service';
import { EmpresaImagesService } from 'src/app/providers/empresa-images.service';
import { EmpresaService } from 'src/app/providers/empresa.service';
import { GlobalServiceService } from 'src/app/providers/global-service.service';
import { PaisService } from 'src/app/providers/pais.service';
import { UsersService } from 'src/app/providers/users.service';
import { DetalleMarcaPage } from '../modals/detalle-marca/detalle-marca.page';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss'],
})
export class MarcasComponent implements OnInit {
  empresas: Empresa[] = [];
  campanas: Campana[] = [];

  pais?: Pais;


  imagesEmpresas: EmpresaImages[] = [];

  constructor(
    private empresaService: EmpresaService,
    private campanaService: CampanaService,
    private userService: UsersService,
    private paisService: PaisService,
    private globalService: GlobalServiceService,
    private empresaImagesService: EmpresaImagesService,
    private modalController: ModalController,
  ) {}

  async verMas(empresa: Empresa) {
    //Mostrar info de la empresa
    const modal = await this.modalController.create({
      component: DetalleMarcaPage,
      cssClass: 'detalleMarcaModal',
      componentProps: {
        empresa: empresa,
        pais: this.pais,
        bannerURL: this.getURL(empresa),
      },
    })

    return modal.present();
  }

  contarCampanasActivas(idEmpresa: number) {
    const campanasEmpresa = this.campanas.filter(
      (campana) => (campana.id_empresa === idEmpresa)
    );
    return campanasEmpresa.length;
  }

  tarifaMinima(idEmpresa: number) {
    const campanasEmpresa = this.campanas.filter(
      (campana) => (campana.id_empresa === idEmpresa)
    );
    let tarifas = campanasEmpresa.map(campana => campana.tarifa_min);
    let valorMinimo = Math.min(...tarifas);
    return valorMinimo===Infinity?0:valorMinimo;
  }

  busAdmisible(idEmpresa: number): boolean{
    const campanasEmpresa = this.campanas.filter(
      (campana) => (campana.id_empresa === idEmpresa && campana.bus_admisible)
    );
    return campanasEmpresa.length>0?true:false;
  }

  camionAdmisible(idEmpresa: number): boolean{
    const campanasEmpresa = this.campanas.filter(
      (campana) => (campana.id_empresa === idEmpresa && campana.camion_admisible)
    );
    return campanasEmpresa.length>0?true:false;
  }

  camionetaAdmisible(idEmpresa: number): boolean{
    const campanasEmpresa = this.campanas.filter(
      (campana) => (campana.id_empresa === idEmpresa && campana.camioneta_admisible)
    );
    return campanasEmpresa.length>0?true:false;
  }

  suvAdmisible(idEmpresa: number): boolean{
    const campanasEmpresa = this.campanas.filter(
      (campana) => (campana.id_empresa === idEmpresa && campana.suv_admisible)
    );
    return campanasEmpresa.length>0?true:false;
  }


  cleanDatos() {
    var paisUsuario = 0;

    this.paisService.getPaisbyId(paisUsuario).subscribe((pais) => {
      this.pais = pais;
    });

    this.empresaService.getEmpresas().subscribe((data) => {
      data.forEach((empresa) => {
        if (empresa.id_pais === paisUsuario) {
          this.empresas.push(empresa);
        }
      });
    });
    this.campanas = this.campanaService.campanasObtenidas;

    this.empresas = [];
    this.campanas = [];
  }

  generarDatos() {
    var paisUsuario = this.userService.usuarioActivo().id_pais;

    this.paisService.getPaisbyId(paisUsuario).subscribe((pais)=>{
      this.pais = pais;
    })

    this.empresaService.getEmpresas().subscribe((data) => {
      this.empresas = data.filter(empresa => empresa.id_pais === paisUsuario && empresa.estado === 1)
    });
    this.campanas = this.campanaService.campanasObtenidas.filter((campana) => campana.id_pais === paisUsuario && campana.estado === 1);

    this.empresaImagesService.getImages().subscribe((data)=>{
      this.imagesEmpresas = data;
    })
  }

  getURL(empresa: Empresa){
    const idEmpresa = empresa.id_empresa;
    return this.empresaImagesService.getBannerURLbyEmpresaId(empresa.id_empresa, this.imagesEmpresas);
  }

  handleRefresh() {}

  ngOnInit() {
    this.generarDatos();
    this.globalService.getObservable().subscribe();
  }
}
