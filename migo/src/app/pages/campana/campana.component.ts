import { Component, Input, OnInit } from '@angular/core';
import { CampanaService } from 'src/app/providers/campana.service';
import { Campana } from 'src/app/interfaces/campana';
import { EmpresaService } from 'src/app/providers/empresa.service';
import { Empresa } from 'src/app/interfaces/empresa';
import { NavController } from '@ionic/angular';
import { Sector } from 'src/app/interfaces/sector';
import { SectorService } from 'src/app/providers/sector.service';
import { PaisService } from 'src/app/providers/pais.service';
import { CiudadService } from 'src/app/providers/ciudad.service';
import { UsersService } from 'src/app/providers/users.service';
import { Ciudad } from 'src/app/interfaces/ciudad';
import { Pais } from 'src/app/interfaces/pais';
import { FormularioAplicacionService } from 'src/app/providers/formulario-aplicacion.service';
import { FormularioAplicacion } from 'src/app/interfaces/formulario-aplicacion';
import { EmpresaImagesService } from 'src/app/providers/empresa-images.service';
import { EmpresaImages } from 'src/app/interfaces/empresa-images';

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

  ciudadActiva?: Ciudad;
  paisActivo?: Pais;

  //ascendente
  ordenamientoActual: string = 'ascendente';
  ordenAscendente: boolean = true;

  formularios: FormularioAplicacion[] = [];
  formularioUsuario!: FormularioAplicacion;
  nombreCampanaRegistro = '';

  imagesEmpresas: EmpresaImages[] = [];

  //promesas
  campanasPromise!: Promise<any>;
  campanasCargadas: boolean = false;

  constructor(
    private campanaService: CampanaService,
    private empresaService: EmpresaService,
    private navCtrl: NavController,
    private sectorService: SectorService,
    private paisService: PaisService,
    private ciudadService: CiudadService,
    private userService: UsersService,
    private formService: FormularioAplicacionService,
    private empresaImagesService: EmpresaImagesService,
  ) {}

  registrarse(campana: Campana) {
    this.campanaService.setCampanaActual(campana);
    this.navCtrl.navigateRoot('detalles-campana');
  }

  //ordenar campana
  ordenarAscendente() {
    this.campanas.sort((a, b) => {
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

  //ordenar campana
  ordenarDescendente() {
    this.campanas.sort((a, b) => {
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
      this.campanas = this.campanaService.campanasObtenidas.sort((a, b) => 
        a.tarifa_base - b.tarifa_base);

  }

  ordenarTarifaDescendente() {
    console.log(this.campanas)
    this.campanas = this.campanaService.campanasObtenidas.sort((a, b) => 
      b.tarifa_base - a.tarifa_base);
  }

  ordenarSectorAscendente() {
    this.campanas.sort((a, b) => {
      const sectorA = this.sectores.find(
        (sector) => sector.id_sector === a.id_sector
      )?.nombre!;
      const sectorB = this.sectores.find(
        (sector) => sector.id_sector === b.id_sector
      )?.nombre!;
      return sectorA.localeCompare(sectorB);
    });
  }

  ordenarSectorDescendente() {}

  revisarRegistrosCampana(campana: Campana) {
    /* Las campañas ya están filtradas por pais y ciudad */
    let registroCampana: boolean;
    const usuario = this.userService.usuarioActivo();
    if (this.formularios.length>0) {
      const formularioEncontrado = this.formularios.find((form) => form.id_usuario === usuario.id_usuario && (form.estado_solicitud === 'activa' || form.estado_solicitud==='pendiente'))
      this.formularioUsuario = formularioEncontrado!;
      this.nombreCampanaRegistro = formularioEncontrado?campana.nombre_campana:'';
      formularioEncontrado? registroCampana = true: registroCampana= false;
    } else {
      registroCampana = false;
    }
    return registroCampana;
  }

  revisarFormulario(){
    return this.formularioUsuario;
  }

  generarDatos() {
    var paisUsuario = this.userService.usuarioActivo().id_pais;
    var ciudadUsuario = this.userService.usuarioActivo().id_ciudad;
    
    this.campanas = this.campanaService.campanasObtenidas.filter(campana => campana.id_ciudad === ciudadUsuario);

    this.ciudadService.getCiudadbyId(ciudadUsuario).subscribe((ciudad) => {
      this.ciudadActiva = ciudad;
    });

    this.paisService.getPaisbyId(paisUsuario).subscribe((pais) => {
      this.paisActivo = pais;
    });

    this.formService.getFormularios().subscribe((data) => {
      this.formularios = data;
    });

    this.empresaService.getEmpresas().subscribe((data) => {
      // this.empresas = data;
      data.forEach((empresa) => {
        if (empresa.id_pais === paisUsuario) {
          this.empresas.push(empresa);
          this.empresas_nombres[empresa.id_empresa] = empresa.nombre;
        }
      });
    });

    this.sectorService.getSectores().subscribe((data) => {
      // this.sectores = data;
      data.forEach((sector) => {
        if (sector.id_ciudad === ciudadUsuario) {
          this.sectores.push(sector);
        }
      });
    });

    this.empresaImagesService.getImages().subscribe((data)=>{
      this.imagesEmpresas = data;
    })

    // campanasCargadas = document.getElementById('')
  }

  getURL(campana: Campana){
    return this.empresaImagesService.getLogoURLbyEmpresaId(campana.id_empresa, this.imagesEmpresas);
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

  ngOnInit() {
    this.generarDatos();
  }
}
