import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoService } from 'src/app/providers/vehiculo.service';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { MarcaVehiculoService } from 'src/app/providers/marca-vehiculo.service';
import { ModeloVehiculosService } from 'src/app/providers/modelo-vehiculos.service';
import { MarcaVehiculo } from 'src/app/interfaces/marca-vehiculo';
import { ModeloVehiculo } from 'src/app/interfaces/modelo-vehiculo';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { FotopreviewPage } from '../modals/fotopreview/fotopreview.page';
import { Email } from 'src/app/interfaces/email';
import { HttpserviceService } from 'src/app/providers/httpservice.service';

import { Filesystem, Directory } from '@capacitor/filesystem';
import { type } from 'os';
import { image } from 'pdfkit';
import { LocalstorageService } from 'src/app/providers/localstorage.service';
import { ClienteService } from 'src/app/providers/cliente.service';
import { ChoferService } from 'src/app/providers/chofer.service';
import { UsersService } from 'src/app/providers/users.service';
import { FechaService } from 'src/app/providers/fecha.service';
import { IonicSelectableComponent } from 'ionic-selectable';

interface FormFields {
  Nombre: string;
  Apellido: String;
  Cedula: number;
  FechaNacimiento: Date;
  Sexo: number;
  Placa: string;
  anio: string;
  Marca: number;
  Modelo: number;
  FotoFrontal: Photo;
  FotoTrasera: Photo;
  FotoIzquierda: Photo;
  FotoDerecha: Photo;
  FotoTecho: Photo;
}

@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.page.html',
  styleUrls: ['./agregar-vehiculo.page.scss'],
})
export class AgregarVehiculoPage implements OnInit {
  formFields: FormFields = {
    Nombre: '',
    Apellido: '',
    Cedula: 0,
    FechaNacimiento: new Date(),
    Sexo: 1,
    Placa: '',
    anio: '',
    Marca: 0,
    Modelo: 0,
    FotoFrontal: { webPath: '', format: '', saved: false },
    FotoTrasera: { webPath: '', format: '', saved: false },
    FotoIzquierda: { webPath: '', format: '', saved: false },
    FotoDerecha: { webPath: '', format: '', saved: false },
    FotoTecho: { webPath: '', format: '', saved: false },
  };

  //selectable
  marcaControl!: FormControl;
  form!: FormGroup;

  public photos: Photo[] = [];

  nuevoIDUsuario: number = 0;
  esMayorEdad: boolean = false;

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
    private modalCtrl: ModalController,
    private _http: HttpserviceService,
    private localStorageSrvc: LocalstorageService,
    private clienteService: ClienteService,
    private choferService: ChoferService,
    private userService: UsersService,
    private fechaService: FechaService,
    private formBuilder: FormBuilder
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

  enviarCorreo(inputEmail: string) {
    var email: Email = {
      code: '',
      message: '',
      subject: 'Un nuevo vehículo ha sido agregado a su cuenta',
      recipient_list: [inputEmail],
    };
    this._http.requestCall(email).subscribe((res) => {
      console.log(res);
    });
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
    }else {
      var userRequest = {
        id_usuario: this.nuevoIDUsuario,
        email: this.formFields.Placa,
        placa: this.formFields.Placa,
        contrasena: this.formFields.Placa,
        token_notificacion:
          'eujClc4dQKWglcbqqy_pbj:APA91bEE-B78NUOs1ddq23aJ4baILdMDd1CUYiwndetmJhWtUpb2rvMkz048BYqhs2uepxyvMW2mOhoY-W6hrnnblX2hq4d1UU00HNj4u2LGDbiW2yVQU6Iy2B_q-Lv1RfU7sXEXpHNm',
        fecha_creacion: new Date().toLocaleString(),
        fecha_modificacion: new Date().toLocaleString(),
        estado: 1,
        rol_usuario: 2, //chofer
      };

      // this.userService.crearUsuario(userRequest).subscribe((response) => {
      //   console.log(response)
      //   if(response){
      //     this.nuevoIDUsuario = this.userService.getIDNuevoUsuario();
      //     console.log(this.nuevoIDUsuario);

      //     var choferRequest = {
      //       cedula_chofer: this.formFields.Cedula.toString(),
      //       nombre: this.formFields.Nombre,
      //       apellido: this.formFields.Apellido,
      //       fecha_nacimiento: this.formFields.FechaNacimiento,
      //       sexo: this.formFields.Sexo,
      //       estado: 1,
      //       id_usuario: this.nuevoIDUsuario,
      //     };

      //     // this.choferService.crearChofer(choferRequest).subscribe((response) => {
      //     //   console.log(response);
      //     // });

      //     // var idChoferActual = this.choferService.getIDNuevoChofer()-1;

      //     var vehiculoRequest = {
      //       id_vehiculo: this.vehiculoService.getIDNuevoVehiculo(),
      //       telefono_conductor: 9999999999,
      //       placa: this.formFields.Placa,
      //       anio: parseInt(this.formFields.anio),
      //       categoria_vehiculo: 'suv', ///////// agregar como ion-select
      //       color_vehiculo: 'Negro', //////////// agregar como ion-select
      //       imagen_izq: this.formFields.FotoIzquierda,
      //       imagen_der: this.formFields.FotoDerecha,
      //       imagen_frontal: this.formFields.FotoFrontal,
      //       imagen_trasera: this.formFields.FotoTrasera,
      //       imagen_techo: this.formFields.FotoTecho,
      //       estado: 1,
      //       id_chofer: idChoferActual, // 
      //       id_cliente: this.clienteService.clienteActivo().id_cliente, // se coloca el ID del cliente con la sesion activa
      //       id_marca: this.formFields.Marca,
      //       id_modelo: this.formFields.Modelo,
      //     };

      //     // this.vehiculoService.crearVehiculo(vehiculoRequest).subscribe((data)=>{console.log(data)});
      //   }
      // });

      HTMLIonLoadingElement
      
      // enviar una notificacion
    }

    // Aquí puedes agregar la lógica para enviar los datos a tu servidor o realizar otras acciones
    this.showValidationError = '';
  }

  private async savePicture(photo: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(photo);

    // Write the file to the data directory
    const fileName = Date.now() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: photo.webPath,
    };
  }

  private async readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();

    return (await this.convertBlobToBase64(blob)) as string;
  }

  private convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  cancelForm() {
    // Limpiar los valores en el formulario y restablecer la bandera
    this.formFields = {
      Nombre: '',
      Apellido: '',
      Cedula: 0,
      FechaNacimiento: new Date(),
      Sexo: 1,
      Placa: '',
      anio: '',
      Marca: 1,
      Modelo: 1,
      FotoFrontal: { webPath: '', format: '', saved: false },
      FotoTrasera: { webPath: '', format: '', saved: false },
      FotoIzquierda: { webPath: '', format: '', saved: false },
      FotoDerecha: { webPath: '', format: '', saved: false },
      FotoTecho: { webPath: '', format: '', saved: false },
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

  marcaChange(event: any) {
    console.log('marca:', event.value);
  }
}
