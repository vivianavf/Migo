import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MarcaVehiculo } from 'src/app/interfaces/marca-vehiculo';
import { Vehiculo } from 'src/app/interfaces/vehiculo';
import { ClienteService } from 'src/app/providers/cliente.service';
import { MarcaVehiculoService } from 'src/app/providers/marca-vehiculo.service';
import { ModeloVehiculosService } from 'src/app/providers/modelo-vehiculos.service';
import { UsersService } from 'src/app/providers/users.service';
import { VehiculoService } from 'src/app/providers/vehiculo.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.page.html',
  styleUrls: ['./vehiculos.page.scss'],
})
export class VehiculosPage implements OnInit {
  vehiculos: Vehiculo[] = [];
  vehiculoPrincipal?: Vehiculo;
  vehiculosSecundarios: Vehiculo[] = [];
  marcaPrincipal = ""
  modeloPrincipal = ""

  constructor(
    private router: Router,
    private userService: UsersService,
    private clientService: ClienteService,
    private vehiculoService: VehiculoService,
    private marcaService: MarcaVehiculoService,
    private modeloService: ModeloVehiculosService,
  ) {}

 
  obtenerCliente(idCliente: any) {
    console.log("Cliente ***")
    return 'Cliente';
  }

  ngOnInit() {
    var idCliente = this.clientService.clienteActivo().id_cliente;

    if (idCliente) {
      this.vehiculoService.getVehiculos();
      // const busquedaEmail = usuarios.find(({ email }) => email === inputEmail);

      this.vehiculoService.getVehiculos().subscribe((data) => {
        // this.vehiculos = data;
        data.forEach((vehiculo) => {
          if (vehiculo.id_cliente === idCliente) {
            this.vehiculos.push(vehiculo);
          }
        });
        this.vehiculoPrincipal = this.vehiculos[0];
        
        //get Marca
        this.marcaService.getMarcabyId(this.vehiculoPrincipal.id_marca).subscribe((data)=>{
          this.marcaPrincipal = data.nombre;
        });

        //get Modelo
        this.modeloService.getModelobyId(this.vehiculoPrincipal.id_modelo).subscribe((data) => {
          this.modeloPrincipal = data.nombre;
        })

        this.vehiculosSecundarios = this.vehiculos.slice(
          1,
          this.vehiculos.length - 1
        );
      });
    }
  }

  agregarVehiculo() {
    this.router.navigate(['/agregar-vehiculo']);
  }
}
