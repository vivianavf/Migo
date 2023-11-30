import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-vehiculo',
  templateUrl: './agregar-vehiculo.page.html',
  styleUrls: ['./agregar-vehiculo.page.scss'],
})
export class AgregarVehiculoPage implements OnInit {

    driverName: string = '';
    phone: string = '';
    plate: string = '';
    year: number = 0;
    brand: string = '';
    model: string = '';
    color: string = '';

  constructor() { }

  ngOnInit() {
  }

  submitForm() {
    // Aquí puedes agregar la lógica para enviar los datos a tu servidor o realizar otras acciones
    console.log('Formulario enviado:', {
      driverName: this.driverName,
      phone: this.phone,
      plate: this.plate,
      year: this.year,
      brand: this.brand,
      model: this.model,
      color: this.color
    });
  }

}
