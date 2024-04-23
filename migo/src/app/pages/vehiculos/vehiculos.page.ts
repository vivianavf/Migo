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
import { ChoferService } from 'src/app/providers/chofer.service';
import { NavigationService } from 'src/app/providers/navigation.service';
import { EliminarVehiculoComponent } from '../modals/eliminar-vehiculo/eliminar-vehiculo.component';

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
    private localStorageSrvc: LocalstorageService,
    private choferService: ChoferService,
    private navService: NavigationService,
  ) {}

  async verMas(vehiculoSecundario: any) {

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
    const arrayNombreURL = String(vehiculo!.imagen_frontal).split('/');
    const foto = arrayNombreURL[arrayNombreURL.length-1];
    return this.imgRuta+foto;
  }

  async eliminarVehiculo(vehiculo: any) {
    console.log(vehiculo);

    const modal = await this.modalCtrl.create({
      component: EliminarVehiculoComponent,
      cssClass: 'eliminar-vehiculo',
      componentProps: {
        vehiculo: vehiculo,
      }

    });
    modal.present();
    
  }

  obtenerVehiculos(idConductor: number, rol: string) {

    switch (rol) {
      case 'cliente':
        this.vehiculoService.getVehiculos().subscribe((data) => {
          data.forEach((vehiculo) => {
            if (vehiculo.id_cliente === idConductor) {
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
          if (this.vehiculos.length < 1) {
            this.noTieneVehiculos();
          }
        });
        break;
      case 'chofer':
        this.vehiculoService.getVehiculos().subscribe((data) => {
          data.forEach((vehiculo) => {
            if (vehiculo.id_chofer === idConductor) {
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
          if (this.vehiculos.length < 1) {
            this.noTieneVehiculos();
          }
        });
        break;
    }
    
  }

  ionViewDidEnter() {
    this.generarDatos();
    
  }

  generarDatos(){
    const idCliente = this.clientService.clienteActivo().id_cliente;
    const idChofer = this.choferService.choferActivo().id_chofer;

    //Si es cliente --> debe salir el vehiculo
    //si es chofer --> debe salir el mismo vehiculo

    if (idCliente) {
      this.obtenerVehiculos(idCliente, 'cliente');
    }

    if(idChofer){
      this.obtenerVehiculos(idChofer, 'chofer');
    }

    // Si es un chofer, tiene que obtener los vehiculos del chofer
  }

  async noTieneVehiculos() {
    const modal = await this.modalCtrl.create({
      component: NoTieneVehiculoPage,
      cssClass: 'no-tiene-vehiculo',
    });

    modal.present();
  }

  ngOnInit() {

  }

  agregarVehiculo() {
    this.router.navigate(['/agregar-vehiculo']);
    this.navService.setPagina('/vehiculos')
    // this.service
  }
}
