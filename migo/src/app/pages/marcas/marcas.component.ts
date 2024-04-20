import { Component, OnInit } from '@angular/core';
import { Campana } from 'src/app/interfaces/campana';
import { Ciudad } from 'src/app/interfaces/ciudad';
import { Empresa } from 'src/app/interfaces/empresa';
import { EmpresaImages } from 'src/app/interfaces/empresa-images';
import { Pais } from 'src/app/interfaces/pais';
import { CampanaService } from 'src/app/providers/campana.service';
import { CiudadService } from 'src/app/providers/ciudad.service';
import { EmpresaImagesService } from 'src/app/providers/empresa-images.service';
import { EmpresaService } from 'src/app/providers/empresa.service';
import { GlobalServiceService } from 'src/app/providers/global-service.service';
import { PaisService } from 'src/app/providers/pais.service';
import { UsersService } from 'src/app/providers/users.service';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss'],
})
export class MarcasComponent implements OnInit {
  empresas: Empresa[] = [];
  campanas: Campana[] = [];

  pais?: Pais;
  ciudad?: Ciudad;

  imagesEmpresas: EmpresaImages[] = [];

  constructor(
    private empresaService: EmpresaService,
    private campanaService: CampanaService,
    private userService: UsersService,
    private paisService: PaisService,
    private ciudadService: CiudadService,
    private globalService: GlobalServiceService,
    private empresaImagesService: EmpresaImagesService,
  ) {}

  verMas(empresa: Empresa) {
    //Mostrar info de la empresa
  }

  contarCampanasActivas(idEmpresa: any) {
    const idCiudad = this.userService.usuarioActivo().id_ciudad;

    const campanasEmpresa = this.campanas.filter(
      (campana) => (campana.id_empresa === idEmpresa && campana.id_ciudad === idCiudad)
    );
    return campanasEmpresa.length;
  }

  rangoTarifas(idEmpresa: any) {
    const campanasEmpresa = this.campanas.filter(
      (campana) => campana.id_empresa === idEmpresa
    );

    var tarifaBase: number[] = [];
    if (campanasEmpresa.length > 0) {
      campanasEmpresa.forEach((campana) => {
        tarifaBase.push(campana.tarifa_base);
      });
    }
    let rangoTarifa: number[] = [];

    if (tarifaBase.length > 0) {
      var minimo = Math.min(...tarifaBase);
      var maximo = Math.max(...tarifaBase);
      rangoTarifa.push(minimo);
      rangoTarifa.push(maximo);
    } else {
      rangoTarifa.push(0);
      rangoTarifa.push(0);
    }
    return rangoTarifa;
  }

  cleanDatos() {
    var paisUsuario = 0;
    var ciudadUsuario = 0;

    this.paisService.getPaisbyId(paisUsuario).subscribe((pais) => {
      this.pais = pais;
    });
    this.ciudadService.getCiudadbyId(ciudadUsuario).subscribe((ciudad) => {
      this.ciudad = ciudad;
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
    var ciudadUsuario = this.userService.usuarioActivo().id_ciudad;

    this.paisService.getPaisbyId(paisUsuario).subscribe((pais) => {
      this.pais = pais;
    });
    this.ciudadService.getCiudadbyId(ciudadUsuario).subscribe((ciudad) => {
      this.ciudad = ciudad;
    });

    this.empresaService.getEmpresas().subscribe((data) => {
      data.forEach((empresa) => {
        if (empresa.id_pais === paisUsuario) {
          this.empresas.push(empresa);
        }
      });
    });
    this.campanas = this.campanaService.campanasObtenidas;

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
    this.globalService.getObservable().subscribe((data) => {
      console.log(data);
    });
  }
}
