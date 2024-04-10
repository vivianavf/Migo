import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { MarcaVehiculo } from 'src/app/interfaces/marca-vehiculo';
import { Vehiculo } from 'src/app/interfaces/vehiculo';
import { ClienteService } from 'src/app/providers/cliente.service';
import { MarcaVehiculoService } from 'src/app/providers/marca-vehiculo.service';
import { ModeloVehiculosService } from 'src/app/providers/modelo-vehiculos.service';
import { UsersService } from 'src/app/providers/users.service';
import { VehiculoService } from 'src/app/providers/vehiculo.service';
import { DetalleVehiculoPage } from '../modals/detalle-vehiculo/detalle-vehiculo.page';
import { LocalstorageService } from 'src/app/providers/localstorage.service';
import { NoTieneVehiculoPage } from '../modals/no-tiene-vehiculo/no-tiene-vehiculo.page';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.page.html',
  styleUrls: ['./vehiculos.page.scss'],
})
export class VehiculosPage implements OnInit {
  vehiculos: Vehiculo[] = [];
  vehiculoPrincipal?: Vehiculo;
  vehiculosSecundarios: Vehiculo[] = [];
  marcaPrincipal = '';
  modeloPrincipal = '';

  /* */
  vehiculoEliminar!: Vehiculo;

  /* ruta para peticiones a las imagenes de vehiculos del server */
  imgRuta = 'https://migoadvs.pythonanywhere.com/vehiculos/';

  constructor(
    private router: Router,
    private userService: UsersService,
    private clientService: ClienteService,
    private vehiculoService: VehiculoService,
    private marcaService: MarcaVehiculoService,
    private modeloService: ModeloVehiculosService,
    private modalCtrl: ModalController,
    private localStorageSrvc: LocalstorageService
  ) {}

  async verMas(vehiculoSecundario: any) {
    console.log(this.vehiculos);

    const modal = await this.modalCtrl.create({
      component: DetalleVehiculoPage,
      cssClass: 'detalle-vehiculo',
      componentProps: {
        vehiculo: vehiculoSecundario,
      },
    });

    modal.present();
  }

  getImageSrc(angulo: string, vehiculo?: Vehiculo){
    if(vehiculo){
      const extension = this.getImageExtension(vehiculo);
      return this.imgRuta+vehiculo.placa+angulo+"."+extension;
    }else{
      return '';
    }

  }

  getImageExtension(vehiculo: Vehiculo) {
    if (vehiculo) {
      const routeName = String(vehiculo.imagen_frontal).split('.');
      const extension = routeName.pop();
      return extension;
    }else{
      return '.jpg';
    }
  }

  eliminarVehiculo(vehiculo: any) {
    console.log('1', vehiculo);
    this.vehiculoEliminar = vehiculo;
    let index = this.vehiculosSecundarios.indexOf(this.vehiculoEliminar);
    this.vehiculosSecundarios.splice(index, 1);
  }

  eliminarVehiculoDefinitivamente() {
    console.log('2', this.vehiculoEliminar);
    let index = this.vehiculosSecundarios.indexOf(this.vehiculoEliminar);
    this.vehiculosSecundarios.splice(index, 1);
  }

  obtenerVehiculos(idCliente: number) {
    this.vehiculoService.getVehiculos().subscribe((data) => {
      data.forEach((vehiculo) => {
        if (vehiculo.id_cliente === idCliente) {
          if (
            !this.vehiculos.find(
              (carro) => carro.id_vehiculo === vehiculo.id_vehiculo
            )
          ) {
            this.vehiculos.push(vehiculo);
          }
        }
      });

      if (this.vehiculos.length != 0) {
        this.vehiculoPrincipal = this.vehiculos[0];

        //get Marca
        this.marcaService
          .getMarcabyId(this.vehiculoPrincipal.id_marca)
          .subscribe((data) => {
            this.marcaPrincipal = data.nombre;
          });

        //get Modelo
        this.modeloService
          .getModelobyId(this.vehiculoPrincipal.id_modelo)
          .subscribe((data) => {
            this.modeloPrincipal = data.nombre;
          });

        this.vehiculosSecundarios = this.vehiculos.slice(
          1,
          this.vehiculos.length
        );
      }

      console.log(
        'OBTENER VEHICULOS 3 - ID CLIENTE',
        this.vehiculos.length,
        idCliente
      );
      console.log("vehiculos lenght", this.vehiculos.length)
      if (this.vehiculos.length < 1) {
        this.noTieneVehiculos();
      }
    });
  }

  ionViewDidEnter() {
    console.log('DID ENTER 1 - VEHICULOS', this.vehiculos.length);
    var idCliente = this.clientService.clienteActivo().id_cliente;
    console.log(this.clientService.clienteActivo())

    console.log('ID CLIENTE', idCliente);

    if (idCliente) {
      this.obtenerVehiculos(idCliente);
    }
  }

  async noTieneVehiculos() {
    const modal = await this.modalCtrl.create({
      component: NoTieneVehiculoPage,
      cssClass: 'no-tiene-vehiculo',
    });

    modal.present();
  }

  ngOnInit() {
    // var idCliente = this.clientService.clienteActivo().id_cliente;
    // if (idCliente) {
    //   this.obtenerVehiculos(idCliente);
    // }
  }

  agregarVehiculo() {
    this.router.navigate(['/agregar-vehiculo']);
  }
}
