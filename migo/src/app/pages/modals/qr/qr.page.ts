import { Component, Input, OnInit } from '@angular/core';
import { Campana } from 'src/app/interfaces/campana';
import { Client } from 'src/app/interfaces/client';
import { User } from 'src/app/interfaces/user';
import { QRCodeModule } from 'angularx-qrcode';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ModalController, Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ElegirVehiculoService } from 'src/app/providers/elegir-vehiculo.service';
import { Vehiculo } from 'src/app/interfaces/vehiculo';
import { IngresoConductorCampanaService } from 'src/app/providers/ingreso-conductor-campana.service';
import { CampanaService } from 'src/app/providers/campana.service';
import { IngresoConductorCampana } from 'src/app/interfaces/ingreso-conductor-campana';
import { TCreatedPdf } from 'pdfmake/build/pdfmake';
import { CampanaActivaPage } from '../../campana-activa/campana-activa.page';
import { VehiculoService } from 'src/app/providers/vehiculo.service';
import { Router } from '@angular/router';


(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  @Input() user!: User;
  @Input() client!: Client;
  @Input() campana!: Campana;
  @Input() vehiculo!: Vehiculo;
  @Input() marca!: string;
  @Input() modelo!: string;

  datos = '';
  logoData: any;
  pdfObj!: TCreatedPdf;
  base64Image: any;
  ingresos!: IngresoConductorCampana[];

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
  ) {}

  crearQR() {
    if(this.datos) return
    this.datos = 'MIGO ADS _ INFO';
    this.loadLocalAssetToBase64();
    this.crearPDF();
    
  }

  crearPDF() {
    // let vehiculo = this.vehiculoElegidoService.vehiculoElegido;
    // console.log(this.user, this.client, this.campana);
    let logo = { image: this.logoData, width: 50 };

    const docDefinition = {
      watermark: {
        text: 'Migo Ads',
        color: 'yellow',
        opacity: 0.2,
        bold: true,
      },
      content: [
        { text: 'Migo Ads - Orden de Brandeo', style: 'header' },
        { text: 'Generado en: 8/01/2024', style: 'subheader' },
        { text: '\nTaller ' + "this.campana.taller_brandeo", style: 'header' },
        { text: 'Direccion del taller', style: 'subheader' },
        { text: '\nDatos de Cliente y Vehiculo', style: 'header' },
        {
          columns: [
            {
              style: 'tableExample',
              table: {
                body: [
                  ['Cliente', ''],
                  ['Nombre', this.client.nombre],
                  ['Apellido', this.client.apellido],
                  ['Cedula', this.client.cedula_cliente],
                  ['Fecha de Nacimiento', this.client.fecha_nacimiento],
                  ['Telefono', this.client.telefono],
                ],
              },
            },
            {
              style: 'tableExample',
              table: {
                body: [
                  ['Vehiculo', ''],
                  ['Placa', this.vehiculo.placa],
                  ['Año', this.vehiculo.anio],
                  ['Marca', this.marca],
                  ['Modelo', this.modelo],
                  ['Color',this.vehiculo.color_vehiculo],
                  ['Categoria', this.vehiculo.categoria_vehiculo],
                ],
              },
            },
          ],
        },
        { text: '\nImagenes del Vehiculo\n', style: 'header' },
        { text: '\nInformacion del Brandeo\n', style: 'header' },
        {
          style: 'tableExample',
          table: {
            body: [
              ['Nombre de Campaña', this.campana.nombre_campana],
              ['Nombre del responsable', this.campana.nombre_responsable],
              ['Correo del responsable', this.campana.correo_responsable],
              ['Fecha de inicio', this.campana.fecha_inicio],
              ['Fecha de Fin', this.campana.fecha_fin],
              ['Vehiculos Admisibles', 'Sedan, SUV, Camión, Camioneta, Bus'],
            ],
          },
        },
        { text: '\nBrandeo: '+this.campana.tipo_brandeo, style: 'header' },
        {
          ul: [
            'Capo',
            'Puerta Conductor',
            'Puerta Pasajero',
            'Puerta Trasera Izquierda',
          ],
        },
      ],
      styles: {
        header: {
          bold: true,
          fontSize: 15,
        },
      },
      defaultStyle: {
        fontSize: 12,
        columnGap: 10,
      },
    };

    this.pdfObj = pdfMake.createPdf(docDefinition);
    // this.pdfObj.download();

    // console.log(this.pdfObj.getStream());


    
  }

  loadLocalAssetToBase64() {
    this.http
      .get('../../../../assets/images/migo_logo.png', { responseType: 'blob' })
      .subscribe((res) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.logoData = reader.result;
        };
        reader.readAsDataURL(res);
      });
  }

  aceptar(){
    this.modalQR.dismiss();
    // this.vehiculo.brandeo = true;
    console.log("BRANDEO = TRUE");
    this.vehiculoService.setBrandeo(this.vehiculo.id_vehiculo!, true).subscribe((response)=>{console.log(response)})
    this.router.navigate(['/solicitudes']);
  }

  ngOnInit() {
    this.ingresarCondService.getIngresos().subscribe((data)=>{
      this.ingresos = data;
    })
  }
}
