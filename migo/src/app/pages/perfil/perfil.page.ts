import { Component, OnInit } from '@angular/core';
import { ChoferService } from 'src/app/providers/chofer.service';
import { ClienteService } from 'src/app/providers/cliente.service';
import { ToolbarService } from 'src/app/providers/toolbar.service';
import { UsersService } from 'src/app/providers/users.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  perfil : any;

  constructor(
    private toolbarService: ToolbarService,
    private userService: UsersService,
    private clienteService: ClienteService,
    private choferService: ChoferService,
  ) { }


  ngOnInit() {
    this.toolbarService.setTexto("MI PERFIL");
    
    this.perfil = this.userService.esChoferOCliente();
  }

  modificarContrasena(){}

  eliminarCuenta(){}

}
