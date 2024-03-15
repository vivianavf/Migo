import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Vehiculo } from 'src/app/interfaces/vehiculo';
import { ClienteService } from 'src/app/providers/cliente.service';
import { MarcaService } from 'src/app/providers/marca.service';
import { ModeloVehiculosService } from 'src/app/providers/modelo-vehiculos.service';
import { Client } from 'src/app/interfaces/client';
import { MarcaVehiculo } from 'src/app/interfaces/marca-vehiculo';
import { MarcaVehiculoService } from 'src/app/providers/marca-vehiculo.service';
import { error } from 'console';
import { Chofer } from 'src/app/interfaces/chofer';
import { ChoferService } from 'src/app/providers/chofer.service';

@Component({
  selector: 'app-detalle-vehiculo',
  templateUrl: './detalle-vehiculo.page.html',
  styleUrls: ['./detalle-vehiculo.page.scss'],
})
export class DetalleVehiculoPage implements OnInit {
  @Input() vehiculo!: Vehiculo;
  placa: string = '-';
  src: string = '-';

  marca: string = '-';
  modelo: string = '-';

  conductorCliente!: Client;
  chofer!: Chofer;
  edadconductorCliente: string = '-';

  constructor(
    private modalCtrl: ModalController,
    private marcaService: MarcaVehiculoService,
    private modeloService: ModeloVehiculosService,
    private clienteService: ClienteService,
    private choferService: ChoferService
  ) {}

  ngOnInit() {
    // this.src = this.vehiculo!.imagen_frontal;
    this.placa = this.vehiculo.placa;
    this.src =
      '../../../../assets/images/vehiculos/' + this.placa + 'frontal.jpg';

    this.marcaService.getMarcabyId(this.vehiculo.id_marca).subscribe((data) => {
      this.marca = data.nombre;
    });

    this.modeloService
      .getModelobyId(this.vehiculo.id_modelo)
      .subscribe((data) => {
        this.modelo = data.nombre;
      });

      console.log(this.vehiculo);

      this.choferService.getChoferbyId(this.vehiculo.id_chofer).subscribe((data)=>{
        this.chofer = data;
        console.log(this.chofer);
      })
  }

  cambiarImagen(lado: string) {
    switch (lado) {
      case 'izq':
        // this.src = this.vehiculo.imagen_izq;
        this.src =
          '../../../../assets/images/vehiculos/' + this.placa + 'izq.jpg';
        break;
      case 'der':
        // this.src = this.vehiculo.imagen_der;
        this.src =
          '../../../../assets/images/vehiculos/' + this.placa + 'derecha.jpg';
        break;
      case 'frontal':
        // this.src = this.vehiculo.imagen_frontal;
        this.src =
          '../../../../assets/images/vehiculos/' + this.placa + 'frontal.jpg';
        break;
      case 'trasera':
        // this.src = this.vehiculo.imagen_trasera;
        this.src =
          '../../../../assets/images/vehiculos/' + this.placa + 'trasera.jpg';
        break;
      case 'techo':
        // this.src = this.vehiculo.imagen_techo;
        this.src =
          '../../../../assets/images/vehiculos/' + this.placa + 'techo.jpg';
        break;
    }
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }
}
