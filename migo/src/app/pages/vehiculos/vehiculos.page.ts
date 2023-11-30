import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/providers/cliente.service';
import { UsersService } from 'src/app/providers/users.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.page.html',
  styleUrls: ['./vehiculos.page.scss'],
})
export class VehiculosPage implements OnInit {

  constructor(
    private router: Router,
    private userService: UsersService,
    private clientService: ClienteService,
  ) { }

  ngOnInit() {
  }

  agregarVehiculo() {
    this.router.navigate(['/agregar-vehiculo']);
  }

}
