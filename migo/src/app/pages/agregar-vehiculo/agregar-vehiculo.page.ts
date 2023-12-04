import { Component, OnInit } from '@angular/core';

interface FormFields {
  driverName: string;
  phone: string;
  plate: string;
  year: number;
  brand: string;
  model: string;
}

@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.page.html',
  styleUrls: ['./agregar-vehiculo.page.scss'],
})
export class AgregarVehiculoPage implements OnInit {

  formFields: FormFields = {
    driverName: '',
    phone: '',
    plate: '',
    year: 0,
    brand: '',
    model: '',
  };

    driverName: string = '';
    phone: string = '';
    plate: string = '';
    year: number = 0;
    brand: string = '';
    model: string = '';
    color: string = '';

    attemptedSubmit: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  submitForm() {
    // Marcamos que se ha intentado enviar el formulario
    this.attemptedSubmit = true;

    // Validar que todos los campos estén llenados
    if (this.isAnyFieldEmpty()) {
      console.log('Por favor, complete todos los campos.');
      return;
    }

    // Aquí puedes agregar la lógica para enviar los datos a tu servidor o realizar otras acciones
    console.log('Formulario enviado:', this.formFields);
  }

  cancelForm() {
    // Limpiar los valores en el formulario y restablecer la bandera
    this.formFields = {
      driverName: '',
      phone: '',
      plate: '',
      year: 0,
      brand: '',
      model: '',
    };
    this.attemptedSubmit = false;

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

}
