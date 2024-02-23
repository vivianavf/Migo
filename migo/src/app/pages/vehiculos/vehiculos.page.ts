import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehiculo } from 'src/app/interfaces/vehiculo';
import { ClienteService } from 'src/app/providers/cliente.service';
import { UsersService } from 'src/app/providers/users.service';
import { VehiculoService } from 'src/app/providers/vehiculo.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.page.html',
  styleUrls: ['./vehiculos.page.scss'],
})
export class VehiculosPage implements OnInit {

  vehiculos : Vehiculo[] = [];
  vehiculoPrincipal?: Vehiculo;
  vehiculosSecundarios : Vehiculo[] = [];

  constructor(
    private router: Router,
    private userService: UsersService,
    private clientService: ClienteService,
    private vehiculoService: VehiculoService,
  ) { }

  ngOnInit() {
    
    var idCliente = this.clientService.clienteActivo().id_cliente;

    if(idCliente){
      this.vehiculoService.getVehiculos();
      // const busquedaEmail = usuarios.find(({ email }) => email === inputEmail);

      this.vehiculoService.getVehiculos().subscribe((data)=>{
        this.vehiculos = data;
        this.vehiculos.forEach((vehiculo) => {
          if(vehiculo.id_cliente === idCliente){
            this.vehiculos.push(vehiculo)
            

          }
        })
        this.vehiculoPrincipal = this.vehiculos[0]
        this.vehiculosSecundarios = this.vehiculos.slice(1, this.vehiculos.length-1);
      });
      
    }
    
  }

  agregarVehiculo() {
    this.router.navigate(['/agregar-vehiculo']);
  }

}
