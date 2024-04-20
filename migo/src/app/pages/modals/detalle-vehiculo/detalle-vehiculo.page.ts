import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Vehiculo } from 'src/app/interfaces/vehiculo';
import { ClienteService } from 'src/app/providers/cliente.service';
import { ModeloVehiculosService } from 'src/app/providers/modelo-vehiculos.service';
import { Client } from 'src/app/interfaces/client';
import { MarcaVehiculo } from 'src/app/interfaces/marca-vehiculo';
import { MarcaVehiculoService } from 'src/app/providers/marca-vehiculo.service';
import { error } from 'console';
import { Chofer } from 'src/app/interfaces/chofer';
import { ChoferService } from 'src/app/providers/chofer.service';
import { UsersService } from 'src/app/providers/users.service';
import { catchError } from 'rxjs';

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

  nombre = '';
  apellido = '';

  choferes: Chofer[] = [];

  /* ruta para peticiones a las imagenes de vehiculos del server */
  imgRuta = 'https://migoadvs.pythonanywhere.com/vehiculos/';

  constructor(
    private modalCtrl: ModalController,
    private marcaService: MarcaVehiculoService,
    private modeloService: ModeloVehiculosService,
    private clienteService: ClienteService,
    private choferService: ChoferService,
    private userService: UsersService
  ) {}

  ngOnInit() {
    // this.src = this.vehiculo!.imagen_frontal;
    this.placa = this.vehiculo.placa;
    this.src = this.getImageSrc('frontal', this.vehiculo);

    this.marcaService.getMarcabyId(this.vehiculo.id_marca).subscribe((data) => {
      this.marca = data.nombre;
    });

    this.modeloService
      .getModelobyId(this.vehiculo.id_modelo)
      .subscribe((data) => {
        this.modelo = data.nombre;
      });
    
    this.choferService.getChoferes().subscribe((data)=>{
      this.choferes = data;
      this.getChofer(this.vehiculo)
    })

    // switch (this.userService.usuarioActivo().rol_usuario) {
    //   case 2: //es chofer
    //     this.nombre = this.choferService.choferActivo().nombre.toString();
    //     this.apellido = this.choferService.choferActivo().apellido.toString();
    //     break;
    //   case 5: // es cliente
    //     this.nombre = this.clienteService.clienteActivo().nombre.toString();
    //     this.apellido = this.clienteService.clienteActivo().apellido.toString();
    //     break;
    // }
  }

  getChofer(vehiculo: Vehiculo){
    const chofer = this.choferes.find((chofer)=> chofer.id_chofer === vehiculo.id_chofer)!;
    console.log(chofer.nombre, chofer.apellido)
    this.nombre = String(chofer.nombre);
    this.apellido = String(chofer.apellido);
  }

  getCategoria(categoria: string) {
    switch (categoria) {
      case 'sedan':
        return 'Sedán';
        break;
      case 'suv':
        return 'SUV';
        break;
      case 'camioneta':
        return 'Camioneta';
        break;
      case 'camion':
        return 'Camión';
        break;
      case 'bus':
        return 'Bus';
        break;
    }

    return '';
  }

  getImageSrc(angulo: string, vehiculo?: Vehiculo) {
    if (vehiculo) {
      const extension = this.getImageExtension(vehiculo);
      return this.imgRuta + vehiculo.placa + angulo + '.' + extension;
    } else {
      return '';
    }
  }

  getImageExtension(vehiculo: Vehiculo) {
    if (vehiculo) {
      const routeName = String(vehiculo.imagen_frontal).split('.');
      const extension = routeName.pop();
      return extension;
    } else {
      return '.jpg';
    }
  }

  cambiarImagen(lado: string) {
    switch (lado) {
      case 'izq':
        // this.src = this.vehiculo.imagen_izq;
        this.src = this.getImageSrc('izq', this.vehiculo);
        break;
      case 'der':
        // this.src = this.vehiculo.imagen_der;
        this.src = this.getImageSrc('derecha', this.vehiculo);
        break;
      case 'frontal':
        // this.src = this.vehiculo.imagen_frontal;
        this.src = this.getImageSrc('frontal', this.vehiculo);
        break;
      case 'trasera':
        // this.src = this.vehiculo.imagen_trasera;
        this.src = this.getImageSrc('trasera', this.vehiculo);
        break;
      case 'techo':
        // this.src = this.vehiculo.imagen_techo;
        this.src = this.getImageSrc('techo', this.vehiculo);
        break;
    }
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }
}
