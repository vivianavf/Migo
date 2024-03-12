import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoService } from 'src/app/providers/vehiculo.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { MarcaVehiculoService } from 'src/app/providers/marca-vehiculo.service';
import { ModeloVehiculosService } from 'src/app/providers/modelo-vehiculos.service';
import { MarcaVehiculo } from 'src/app/interfaces/marca-vehiculo';
import { ModeloVehiculo } from 'src/app/interfaces/modelo-vehiculo';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { FotopreviewPage } from '../modals/fotopreview/fotopreview.page';


interface FormFields {
  Nombre: string;
  Telefono: string;
  Placa: string;
  anio: string;
  Marca: number;
  Modelo: number;
  FotoFrontal: string | Photo;
  FotoTrasera: string | Photo;
  FotoIzquierda: string | Photo;
  FotoDerecha: string | Photo;
  FotoTecho: string | Photo;
}


@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.page.html',
  styleUrls: ['./agregar-vehiculo.page.scss'],
})
export class AgregarVehiculoPage implements OnInit {
  formFields: FormFields = {
    Nombre: '',
    Telefono: '',
    Placa: '',
    anio: '',
    Marca: 0,
    Modelo: 0,
    FotoFrontal: '',
    FotoTrasera: '',
    FotoIzquierda: '',
    FotoDerecha: '',
    FotoTecho: '',
  };

  attemptedSubmit: boolean = false;
  showValidationError: string = '';
  valoresMarcas: MarcaVehiculo[] = [];
  valoresModelos: ModeloVehiculo[] = [];

  fotoIzquierdaTomada: boolean = false;
  fotoDerechaTomada: boolean = false;
  fotoAereaTomada: boolean = false;
  fotoTraseraTomada: boolean = false;
  fotoFrontalTomada: boolean = false;

  srcIzquierda: string = '';
  srcDerecha: string = '';
  srcAerea: string = '';
  srcTrasera: string = '';
  srcFrontal: string = '';

  srcMostrarFoto: string = '';

  alertButtons = ['OK'];
  alertInputs = [{ label: 'Red', type: 'radio', value: 'red' }];

  constructor(
    private modeloService: ModeloVehiculosService,
    private marcaService: MarcaVehiculoService,
    private vehiculoService: VehiculoService,
    private router: Router,
    private route: ActivatedRoute,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const photoPath = params['photoPath'];
      // Use the photoPath as needed (e.g., display or store it)
    });

    this.marcaService.getMarcas().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        this.valoresMarcas.push(data[i]);
      }
    });
    this.modeloService.getModelos().subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        this.valoresModelos.push(data[i]);
      }
    });
  }

  async abrirModal() {
    console.log('ABRIRMODAL', this.srcMostrarFoto);
    const modal = await this.modalCtrl.create({
      component: FotopreviewPage,
      cssClass: 'fotopreview',
      componentProps: {
        FotoURL: this.srcMostrarFoto,
      },
    });

    modal.present();
  }

  submitForm() {
    // Marcamos que se ha intentado enviar el formulario
    this.attemptedSubmit = true;

    const missingFields = this.getMissingFields();

    if (missingFields.length > 0) {
      this.showValidationError = `Debe llenar los campos: ${missingFields.join(
        ', '
      )}.`;
      return;
    } else {
      var body = {
        telefono_conductor: Number.parseInt(this.formFields.Telefono),
        placa: this.formFields.Placa,
        anio: Number.parseInt(this.formFields.anio),
        categoria_vehiculo: 1, /////////
        color_vehiculo: 1, ////////////
        imagen_izq: this.srcIzquierda,
        imagen_der: this.srcDerecha,
        imagen_frontal: this.srcFrontal,
        imagen_trasera: this.srcTrasera,
        imagen_techo: this.srcAerea,
        estado: 1,
        id_cliente: 1, //////////
        id_marca: this.formFields.Marca,
        id_modelo: this.formFields.Modelo,
      };

      console.log(body);

      this.vehiculoService.crearVehiculo(body).subscribe((response=>{
        console.log(response);
      }));

      // this.servicio.crearVehiculo(body).subscribe((data) => {
      //   console.log(data);
      // });
      console.log('Formulario enviado:', this.formFields);
    }

    // Aquí puedes agregar la lógica para enviar los datos a tu servidor o realizar otras acciones
    this.showValidationError = '';
  }

  cancelForm() {
    // Limpiar los valores en el formulario y restablecer la bandera
    this.formFields = {
      Nombre: '',
      Telefono: '',
      Placa: '',
      anio: '',
      Marca: 1,
      Modelo: 1,
      FotoFrontal: '',
      FotoTrasera: '',
      FotoIzquierda: '',
      FotoDerecha: '',
      FotoTecho: '',
    };
    this.attemptedSubmit = false;
    this.showValidationError = '';

    // Puedes agregar lógica adicional si es necesario
    console.log('Formulario cancelado');
  }

  isInvalidField(fieldName: keyof FormFields): boolean {
    return this.attemptedSubmit && this.isFieldEmpty(fieldName);
  }

  isFieldEmpty(fieldName: keyof FormFields): boolean {
    return !this.formFields[fieldName];
  }

  isAnyFieldEmpty(): boolean {
    return Object.keys(this.formFields).some((key) =>
      this.isFieldEmpty(key as keyof FormFields)
    );
  }

  getMissingFields(): string[] {
    const missingFields: string[] = [];

    Object.keys(this.formFields).forEach((key) => {
      if (this.isFieldEmpty(key as keyof FormFields)) {
        missingFields.push(key);
      }
    });

    return missingFields;
  }

  selectedMarcaId: number | undefined;
  filteredModelos: ModeloVehiculo[] = [];

  cameraImage?: File;
  

  async takePhoto(label: string): Promise<void> {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });

      // this.guardarFoto(image);
      // GQB720

      switch (label) {
        case 'Aerea':
          if (image.webPath) {
            this.fotoAereaTomada = true;
            this.srcAerea = image.webPath!.toString();
            this.srcMostrarFoto = image.webPath!.toString();
            this.formFields.FotoTecho = image;
          }
          break;

        case 'Frontal':
          if (image.webPath) {
            this.fotoFrontalTomada = true;
            this.srcFrontal = image.webPath!.toString();
            this.srcMostrarFoto = image.webPath!.toString();
            this.formFields.FotoFrontal = image;
          }
          break;

        case 'Trasera':
          if (image.webPath) {
            this.fotoTraseraTomada = true;
            this.srcTrasera = image.webPath!.toString();
            this.srcMostrarFoto = image.webPath!.toString();
            this.formFields.FotoTrasera = image;
          }
          break;

        case 'Derecha':
          if (image.webPath) {
            this.fotoDerechaTomada = true;
            this.srcDerecha = image.webPath!.toString();
            this.srcMostrarFoto = image.webPath!.toString();
            this.formFields.FotoDerecha = image;
          }
          break;

        case 'Izquierda':
          if (image.webPath) {
            this.fotoIzquierdaTomada = true;
            this.srcIzquierda = image.webPath!.toString();
            this.srcMostrarFoto = image.webPath!.toString();
            this.formFields.FotoIzquierda = image;
          }
          break;
      }
    } catch (error) {
      console.error('Error capturing photo', error);
    }
  }


}
