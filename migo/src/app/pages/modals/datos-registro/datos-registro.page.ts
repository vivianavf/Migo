import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Client } from 'src/app/interfaces/client';
import { User } from 'src/app/interfaces/user';
import { CiudadService } from 'src/app/providers/ciudad.service';
import { ClienteService } from 'src/app/providers/cliente.service';
import { PaisService } from 'src/app/providers/pais.service';
import { UsersService } from 'src/app/providers/users.service';

@Component({
  selector: 'app-datos-registro',
  templateUrl: './datos-registro.page.html',
  styleUrls: ['./datos-registro.page.scss'],
})
export class DatosRegistroPage implements OnInit {
  @Input() cedula: string = '';
  @Input() nombres: string = '';
  @Input() apellidos: string = '';
  @Input() fechaNacimiento: string = '';
  @Input() correo: string = '';
  @Input() password: string = '';
  @Input() telefono: string = '';
  @Input() sexo: string = '';
  @Input() usuario: any;
  @Input() cliente: any;
  @Input() formularioRegistro: any;
  @Input() pais?: number;
  @Input() ciudad?: number;

  ciudadNombre = '';
  paisNombre = '';
  nuevoID!: number;

  public alertButtons = ['OK'];

  clientes: Client[] = [];

  constructor(
    private modalController: ModalController,
    private navCtrl: NavController,
    private clienteService: ClienteService,
    private userService: UsersService,
    private router: Router,
    private paisService: PaisService,
    private ciudadService: CiudadService
  ) {}

  aceptar() {
    this.modalController.dismiss();

    var nuevoID;
    this.userService.crearUsuario(this.usuario).subscribe((respuesta) => {
      this.usuario = respuesta;
      console.log('Usuario registrado con exito', this.usuario);
      nuevoID = this.usuario.id_usuario;
      this.userService.ingresarUsuario(this.usuario);
      var nuevocliente = <any>{
        cedula_cliente: this.cedula,
        nombre: this.nombres,
        apellido: this.apellidos,
        fecha_nacimiento: this.fechaNacimiento,
        email: this.correo,
        sexo: this.cliente.sexo,
        telefono: this.telefono,
        estado: 1,
        id_usuario: nuevoID,
        id_ciudad: this.ciudad,
        id_pais: this.pais,
      };

      this.clienteService.crearCliente(nuevocliente).subscribe((respuesta) => {
        console.log(respuesta);
      });

      this.clienteService.ingresarCliente(nuevocliente);
    });

    this.formularioRegistro.reset();

    this.navCtrl.navigateRoot('/home');
  }

  corregirDatos() {
    this.modalController.dismiss();
  }

  ngOnInit() {
    switch (this.sexo) {
      case '1':
        this.sexo = 'Masculino';
        break;
      case '2':
        this.sexo = 'Femenino';
        break;
      case '3':
        this.sexo = 'Prefiero No Decir';
        break;
    }

    this.ciudadService.getCiudadbyId(this.ciudad).subscribe((ciudad) => {
      this.ciudadNombre = ciudad.nombre;
    });

    this.paisService.getPaisbyId(this.pais).subscribe((pais) => {
      this.paisNombre = pais.nombre;
    });

    this.clientes = this.clienteService.clientesObtenidos;
  }
}
