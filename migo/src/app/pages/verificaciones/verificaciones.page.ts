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

    private formService: FormularioAplicacionService,
  ) {}

  ngOnInit() {

    this.aceptarPlaza = false;
    this.generaQR = false;

    //QR
    this.user = this.userService.usuarioActivo();
    this.conductor = this.userService.esChoferOCliente();

    this.formService.getFormularios().subscribe((formularios)=>{
      const formulario = formularios.find((formulario)=> 
        formulario.id_usuario === this.user.id_usuario &&
        formulario.id_ciudad === this.user.id_ciudad &&
        formulario.estado_solicitud === 'activa'
    )

    if(formulario){
      this.ingresarCondService.getIngresos().subscribe((data) => {
        this.ingresos = data;
        let ingresoActual = this.ingresos.find(
          (ingreso) =>
            this.user.id_usuario === ingreso.id_usuario &&
            this.user.id_ciudad === ingreso.id_ciudad &&
            ingreso.estado === 1 && 
            ingreso.id_formulario_registro === formulario.id_formulario
        );
  
        if (ingresoActual) {
          const valores = Object.values(ingresoActual);
          const docQR = valores[3];
          const imagenQR = valores[4];
  
          if (docQR && imagenQR) {
            console.log('ya hay una imagen y un docQR');
            console.log(docQR, imagenQR)
            // this.imgSrc = imagenQR;
            this.imgSrc = imagenQR.replace("media","vehiculos");
          } else {
            // No hay nada, el usuario debe generarlo en solicitudes
            this.generaQR = true;
          }
        } else {
          // el usuario no ha aceptado la plaza
          // el usuario no se ha registrado en niguna campaña
          this.aceptarPlaza = true;
        }
      });
    }
    })
  }


  mostrarQR() {}

  verificaBrandeo() {}

  verificaRecorrido() {}

}
