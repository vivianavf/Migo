import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ChoferService } from 'src/app/providers/chofer.service';
import { ClienteService } from 'src/app/providers/cliente.service';
import { ToolbarService } from 'src/app/providers/toolbar.service';
import { UsersService } from 'src/app/providers/users.service';
import { PaisService } from 'src/app/providers/pais.service';
import { CiudadService } from 'src/app/providers/ciudad.service';
import { Pais } from 'src/app/interfaces/pais';
import { Ciudad } from 'src/app/interfaces/ciudad';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  perfil: any;

  paises: Pais[] = [];
  ciudades: Ciudad[] = [];
  ciudadesFiltradas: Ciudad[] = [];

  paisInput: string = '';
  ciudadInput: string = '';

  constructor(
    private toolbarService: ToolbarService,
    private userService: UsersService,
    private clienteService: ClienteService,
    private choferService: ChoferService,
    private modalCtrl: ModalController,
    private paisService: PaisService,
    private ciudadService: CiudadService,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {
    this.toolbarService.setTexto('MI PERFIL');

    this.paisService.getPaises().subscribe((data) => {
      this.paises = data;
    });
    this.ciudadService.getCiudades().subscribe((data) => {
      this.ciudades = data;
    });

    this.perfil = this.userService.esChoferOCliente();
  }

  filtrarCiudades() {
    this.ciudadesFiltradas = [];
    this.ciudades.forEach((ciudad) => {
      if (ciudad.id_pais == Number(this.paisInput)) {
        this.ciudadesFiltradas.push(ciudad);
      }
    });
    // this.ciudadesFiltradas = [];
  }

  modificarContrasena() {}

  eliminarCuenta() {}

  async cambiarUbicacion() {
    const id_usuario = this.userService.usuarioActivo().id_usuario;

    this.userService
      .actualizarPais(id_usuario, Number(this.paisInput))
      .subscribe((response: User) => {
        this.userService.ingresarPais(this.paisInput);
      });
    this.userService
      .actualizarCiudad(id_usuario, Number(this.ciudadInput))
      .subscribe((response) => {
        this.userService.ingresarCiudad(this.ciudadInput);
      });

    this.modalCtrl.dismiss();
    this.navCtrl.navigateRoot('/home');
  }
}
