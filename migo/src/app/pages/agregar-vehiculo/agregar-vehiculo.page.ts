import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehiculoService } from 'src/app/providers/vehiculo.service';
import { CamaraService } from 'src/app/providers/camara.service';


interface FormFields {
  Nombre: string;
  Telefono: string;
  Placa: string;
  Anio: string;
  Marca: string;
  Modelo: string;
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
    Marca: '',
    Modelo: '',
  };

    attemptedSubmit: boolean = false;
    showValidationError: string = '';
    servicio = this.servicioVehiculos;

  constructor(private servicioVehiculos:VehiculoService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const photoPath = params['photoPath'];
      // Use the photoPath as needed (e.g., display or store it)
    });
  }

  submitForm() {
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
    "id_marca": Number.parseInt(this.formFields.Marca),
    "id_modelo": Number.parseInt(this.formFields.Modelo)
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
      Marca: '',
      Modelo: '',
    };
    this.attemptedSubmit = false;
    this.showValidationError = '';

    // Puedes agregar lógica adicional si es necesario
    console.log('Formulario cancelado');
  }

  takeOrUploadPicture(label: string) {
    // Add logic to handle taking or uploading pictures based on the button label
    this.router.navigate(['/camara-integrada', { label }]);
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

}
