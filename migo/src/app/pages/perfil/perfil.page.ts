import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { ComunicationService } from 'src/app/providers/comunication.service';
import { RecuperarPasswordPage } from '../recuperar-password/recuperar-password.page';

interface Perfil{
  nombre: string,
  apellido: string,
  email: string,
  cedula: string,
  fecha_nacimiento: string,
  telefono: string,
  sexo: string,
  fecha_creacion: string,
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  perfil!: Perfil;

  paises: Pais[] = [];
  ciudades: Ciudad[] = [];
  ciudadesFiltradas: Ciudad[] = [];

  paisInput: string = '';
  ciudadInput: string = '';

  meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  constructor(
    private toolbarService: ToolbarService,
    private userService: UsersService,
    private clienteService: ClienteService,
    private choferService: ChoferService,
    private modalCtrl: ModalController,
    private paisService: PaisService,
    private ciudadService: CiudadService,
    private navCtrl: NavController,
    private communicationService: ComunicationService,
  ) {}

  ngOnInit() {
    this.generarDatos();
  }

  generarDatos(){
    this.toolbarService.setTexto('MI PERFIL');

    this.paisService.getPaises().subscribe((data) => {
      this.paises = data;
    });
    this.ciudadService.getCiudades().subscribe((data) => {
      this.ciudades = data;
    });

    this.perfil = this.userService.esChoferOCliente();
    const fechaN = new Date(this.perfil.fecha_nacimiento)
    const fechaC = new Date(this.perfil.fecha_creacion)
    console.log(this.perfil)
    this.perfil.fecha_nacimiento = (fechaN.getDate()+1)+' '+this.meses[fechaN.getMonth()]+' '+fechaN.getFullYear();
    this.perfil.fecha_creacion = (fechaC.getDate()+1)+' '+this.meses[fechaC.getMonth()]+' '+fechaC.getFullYear();

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

  modificarContrasena() {
    this.communicationService.sendVariable([this.userService.usuarioActivo().email, 1234]);
    this.navCtrl.navigateRoot('/reestablecer-password');
  }

  eliminarCuenta() {}
}
