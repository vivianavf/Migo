import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Platform, ModalController } from '@ionic/angular';
import { FixMeLater } from 'angularx-qrcode';
import { TCreatedPdf } from 'pdfmake/build/pdfmake';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Campana } from 'src/app/interfaces/campana';
import { Client } from 'src/app/interfaces/client';
import { IngresoConductorCampana } from 'src/app/interfaces/ingreso-conductor-campana';
import { TallerBrandeo } from 'src/app/interfaces/taller-brandeo';
import { User } from 'src/app/interfaces/user';
import { Vehiculo } from 'src/app/interfaces/vehiculo';
import { CampanaService } from 'src/app/providers/campana.service';
import { ChoferService } from 'src/app/providers/chofer.service';
import { ClienteService } from 'src/app/providers/cliente.service';
import { ElegirVehiculoService } from 'src/app/providers/elegir-vehiculo.service';
import { EmpresaImagesService } from 'src/app/providers/empresa-images.service';
import { EmpresaService } from 'src/app/providers/empresa.service';
import { FormularioAplicacionService } from 'src/app/providers/formulario-aplicacion.service';
import { GooglemapsService } from 'src/app/providers/googlemaps.service';
import { IngresoConductorCampanaService } from 'src/app/providers/ingreso-conductor-campana.service';
import { MarcaVehiculoService } from 'src/app/providers/marca-vehiculo.service';
import { ModeloVehiculosService } from 'src/app/providers/modelo-vehiculos.service';
import { SectorService } from 'src/app/providers/sector.service';
import { TallerBrandeoService } from 'src/app/providers/taller-brandeo.service';
import { ToolbarService } from 'src/app/providers/toolbar.service';
import { UsersService } from 'src/app/providers/users.service';
import { VehiculoService } from 'src/app/providers/vehiculo.service';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-verificaciones',
  templateUrl: './verificaciones.page.html',
  styleUrls: ['./verificaciones.page.scss'],
})
export class VerificacionesPage implements OnInit {
  @ViewChild('parent', { read: ElementRef }) private parent!: ElementRef;

  user!: User;
  conductor!: any;
  client!: Client;
  campana!: Campana;
  vehiculo!: Vehiculo;
  marca!: string;
  modelo!: string;
  vehiculos: Vehiculo[] = [];

  //
  nombreMarca = '';
  nombreModelo = '';

  datos = '';
  logoData: any;
  pdfObj!: TCreatedPdf;
  base64Image: any;
  ingresos!: IngresoConductorCampana[];
  talleres: TallerBrandeo[] = [];
  talleresCampana: TallerBrandeo[] = [];

  //
  imgSrc = '';

  /* ruta para peticiones a las imagenes de vehiculos del server */
  imgRuta = 'https://migoadvs.pythonanywhere.com/vehiculos/';

  generaQR = false;
  aceptarPlaza = false;
  registroCampana = false;

  //
  nombreCampana = '';
  logoSrc = '';

  constructor(
    private plt: Platform,
    private http: HttpClient,
    private fileOpener: FileOpener,
    private vehiculoElegidoService: ElegirVehiculoService,
    private vehiculoService: VehiculoService,
    private modalQR: ModalController,
    private ingresarCondService: IngresoConductorCampanaService,
    private campanaService: CampanaService,
    private router: Router,
    private tallerService: TallerBrandeoService,
    private marcaVehiculoService: MarcaVehiculoService,
    private modeloVehiculoService: ModeloVehiculosService,
    private renderer: Renderer2,

    private toolbarService: ToolbarService,
    private modalController: ModalController,
    private userService: UsersService,
    private clientService: ClienteService,
    private empresaService: EmpresaService,
    private sectorService: SectorService,
    private tallerBService: TallerBrandeoService,
    private empresaImagesService: EmpresaImagesService,
    private googleMapService: GooglemapsService,
    private choferService: ChoferService,

    private formService: FormularioAplicacionService
  ) {}

  ionViewDidEnter(){
    this.generarDatos();
  }


  ngOnInit() {
    this.generarDatos();
  }

  generarDatos(){
    this.imgSrc = '';

    this.aceptarPlaza = false;
    this.generaQR = false;

    //QR
    this.user = this.userService.usuarioActivo();
    this.conductor = this.userService.esChoferOCliente();

    this.formService.getFormularios().subscribe((formularios) => {
      const formulario = formularios.find(
        (formulario) =>
          formulario.id_usuario === this.user.id_usuario &&
          formulario.id_ciudad === this.user.id_ciudad &&
          formulario.estado_solicitud === 'activa'
      );

      if (formulario) {
        this.ingresarCondService.getIngresos().subscribe((data) => {
          this.ingresos = data;
          const ingresoActual = this.ingresos.find(
            (ingreso) =>
              this.user.id_usuario === ingreso.id_usuario &&
              this.user.id_ciudad === ingreso.id_ciudad &&
              ingreso.estado === 1 &&
              ingreso.id_formulario_registro === formulario.id_formulario
          );

          if (ingresoActual) {
            this.mostrarQR(ingresoActual);
            this.mostrarCampana(ingresoActual);
          } else {
            // el usuario no ha aceptado la plaza de campaña
            this.aceptarPlaza = true;
          }
        });
      } else {
        this.aceptarPlaza = true;
        // el usuario no se ha registrado en nada.
      }
    });
  }

  mostrarQR(ingresoActual: IngresoConductorCampana) {
    const valores = Object.values(ingresoActual);
    const docQR = valores[4];
    const imagenQR = valores[5];
    if (docQR && imagenQR) {
      this.imgSrc = imagenQR.replace('media', 'vehiculos');
      console.log('ruta del QR = ',this.imgSrc)
    } else {
      // No hay nada, el usuario debe generarlo en solicitudes
      this.generaQR = true;
    }
  }

  mostrarCampana(ingresoActual: IngresoConductorCampana) {
    const idCampana = ingresoActual.id_campana;
    this.campanaService.getCampanabyId(idCampana).subscribe((campana) => {
      if (campana) {
        this.nombreCampana = campana.nombre_campana;
        this.empresaImagesService.getImages().subscribe((images) => {
          this.logoSrc = this.empresaImagesService.getLogoURLbyEmpresaId(
            campana.id_empresa,
            images
          );
          this.registroCampana = true;
        });
      } else {
        this.registroCampana = false;
      }
    });
  }

  verificaBrandeo() {
    this.router.navigate(['/verificar-brandeo']);
  }

  verificaRecorrido() {
    this.router.navigate(['/verificar-recorrido']);
  }
}
