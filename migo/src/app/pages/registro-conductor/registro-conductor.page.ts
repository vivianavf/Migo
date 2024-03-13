import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/interfaces/client';
import { User } from 'src/app/interfaces/user';
import { ClienteService } from 'src/app/providers/cliente.service';
import { RegistroConductorService } from 'src/app/providers/registro-conductor.service';
import { UsersService } from 'src/app/providers/users.service';

@Component({
  selector: 'app-registro-conductor',
  templateUrl: './registro-conductor.page.html',
  styleUrls: ['./registro-conductor.page.scss'],
})
export class RegistroConductorPage implements OnInit {

  conductor?: User;
  clientes?: Client[];

  constructor(
    private regConductorService: RegistroConductorService,
    private clientService: ClienteService,
    private userService: UsersService,
  ) { }

  ngOnInit() {
    this.conductor = this.regConductorService.getConductor();
    this.clientService.getClients().subscribe((data) => {
      this.clientes = data;
    });
  }

  buscar(){
    
  }

  irInicio(){
    
  }

}
