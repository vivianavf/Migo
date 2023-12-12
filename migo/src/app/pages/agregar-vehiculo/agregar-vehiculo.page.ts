import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { VehiculoService } from '../../providers/vehiculo.service';


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

  constructor(servicoVehiculos:VehiculoService) { }

  ngOnInit() {
  }

  submitForm() {
    // Marcamos que se ha intentado enviar el formulario
    this.attemptedSubmit = true;

    const missingFields = this.getMissingFields();

    if (missingFields.length > 0) {
      this.showValidationError = `Debe llenar los campos: ${missingFields.join(', ')}.`;
      return;
    }

    // Aquí puedes agregar la lógica para enviar los datos a tu servidor o realizar otras acciones
    var body = {
      nombre: this.formFields.Nombre,
      telefono: this.formFields.Telefono,
      placa: this.formFields.Placa,
      anio: this.formFields.Anio,
      marca: this.formFields.Marca,
      modelo: this.formFields.Modelo,
    }
    console.log('Formulario enviado:', this.formFields);
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
    console.log(`Picture taken/uploaded for: ${label}`);
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
