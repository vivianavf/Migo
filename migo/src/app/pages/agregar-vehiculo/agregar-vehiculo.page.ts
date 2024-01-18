import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoService } from 'src/app/providers/vehiculo.service';
import { CamaraService } from 'src/app/providers/camara.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { MarcaVehiculoService } from 'src/app/providers/marca-vehiculo.service';
import { ModeloVehiculosService } from 'src/app/providers/modelo-vehiculos.service';
import { MarcaVehiculo } from 'src/app/interfaces/marca-vehiculo';
import { ModeloVehiculo } from 'src/app/interfaces/modelo-vehiculo';
import { Observable } from 'rxjs';

interface FormFields {
  Nombre: string;
  Telefono: string;
  Placa: string;
  Anio: string;
  Marca: number;
  Modelo: number;
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
    Anio: '',
    Marca: 0,
    Modelo: 0,
  };

    attemptedSubmit: boolean = false;
    showValidationError: string = '';
    servicio = this.servicioVehiculos;
    valoresMarcas: MarcaVehiculo[] = [];
    valoresModelos: ModeloVehiculo[] = [];

  constructor(private modeloService: ModeloVehiculosService, private marcaService: MarcaVehiculoService, private cameraService: CamaraService, private servicioVehiculos:VehiculoService, private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const photoPath = params['photoPath'];
      // Use the photoPath as needed (e.g., display or store it)
    });
    this.marcaService.getMarcas().subscribe((data)=>{
      for (let i = 0; i < data.length; i++) {
        this.valoresMarcas.push(data[i]);
      }
    });
    this.modeloService.getModelos().subscribe((data)=>{
      for (let i = 0; i < data.length; i++) {
        this.valoresModelos.push(data[i]);
      }
    });
  }

  submitForm() {
    console.log("aqui empieza los logs");
    console.log(this.valoresMarcas);
    console.log(this.valoresModelos);
    // Marcamos que se ha intentado enviar el formulario
    this.attemptedSubmit = true;

    const missingFields = this.getMissingFields();

    if (missingFields.length > 0) {
      this.showValidationError = `Debe llenar los campos: ${missingFields.join(', ')}.`;
      return;
    } else {
      var body = {
    "telefono_conductor": Number.parseInt(this.formFields.Telefono),
    "placa": this.formFields.Placa,
    "anio": Number.parseInt(this.formFields.Anio),
    "categoria_vehiculo": 1,
    "color_vehiculo": 1,
    "imagen_izq": '',
    "imagen_der": '',
    "imagen_frontal": '',
    "imagen_trasera": '',
    "imagen_techo": '',
    "estado": 1,
    "id_cliente": 1,
    "id_marca": this.formFields.Marca,
    "id_modelo": this.formFields.Modelo
}
      this.servicio.crearVehiculo(body).subscribe((data)=>{
        console.log(data);
      });
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
      Anio: '',
      Marca: 1,
      Modelo: 1,
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
    return Object.keys(this.formFields).some((key) => this.isFieldEmpty(key as keyof FormFields));
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

  cameraImage: string | null = null;

  async takePhoto(label: string): Promise<void> {
    console.log('takePhoto', label);
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });

      this.cameraImage = image.webPath ?? null;
    } catch (error) {
      console.error('Error capturing photo', error);
    }
  }

}
