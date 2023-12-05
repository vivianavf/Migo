import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Client } from 'src/app/interfaces/client';
import { User } from 'src/app/interfaces/user';
import { ClienteService } from 'src/app/providers/cliente.service';
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

  nuevoID!: number;

  public alertButtons = ['OK'];

  clientes: Client[] = [];

  constructor(
    private modalController: ModalController,
    private navCtrl: NavController,
    private clienteService: ClienteService,
    private userService: UsersService,
    private router: Router,
  ) { }


  aceptar(){
    this.modalController.dismiss();

    var nuevoID;
    this.userService.crearUsuario(this.usuario).subscribe((respuesta) =>{
      this.usuario = respuesta
      console.log("Usuario registrado con exito", this.usuario)
      nuevoID = this.usuario.id_usuario;
      console.log(nuevoID)
      this.userService.ingresarUsuario(this.usuario)

          var nuevocliente = <any>{ 
          cedula_cliente: this.cedula,
          nombre: this.nombres,
          apellido: this.apellidos,
          fecha_nacimiento: this.fechaNacimiento,
          email: this.correo,
          sexo: Number(this.cliente.sexo),
          telefono: this.telefono,
          estado: 1,
          id_usuario: Number(nuevoID),
    }

      this.clienteService.crearCliente(nuevocliente).subscribe((respuesta)=>{
      console.log(respuesta)

    })

    this.clienteService.ingresarCliente(nuevocliente)

    // const clientBusqueda = this.clientes.find(({ email }) => email === this.correo);
    // if(clientBusqueda){this.clienteService.ingresarCliente(clientBusqueda) }

    })

    // this.userService.ingresarUsuario(actualUsuario)

    // var nuevoIDUsuario2 = localStorage.getItem("id_usuario")
    // console.log(this.nuevoID);
    // console.log(this.usuario)
    // console.log(this.sexo) //Femenino

    // var nuevocliente = <any>{ 
    //       cedula_cliente: this.cedula,
    //       nombre: this.nombres,
    //       apellido: this.apellidos,
    //       fecha_nacimiento: this.fechaNacimiento,
    //       email: this.correo,
    //       sexo: Number(this.sexo),
    //       telefono: this.telefono,
    //       estado: 1,
    //       id_usuario: Number(nuevoIDUsuario2),
    // }
    
    // console.log(nuevocliente)

    // this.clienteService.crearCliente(nuevocliente).subscribe((respuesta)=>{
    //   console.log(respuesta)
    // })
    // this.clienteService.ingresarCliente(nuevocliente)

    //buscar el nuevo cliente en la database
    // const clientBusqueda = this.clientes.find(({ email }) => email === this.correo);
    // if(clientBusqueda){this.clienteService.ingresarCliente(clientBusqueda) }
    
    this.formularioRegistro.reset();

    this.navCtrl.navigateRoot('/home')
  }

  corregirDatos(){
    this.modalController.dismiss()
  }

  ngOnInit() {
    switch(this.sexo){
      case '1':
        this.sexo = "Masculino";
        break;
      case '2':
        this.sexo = "Femenino";
        break;
      case '3':
        this.sexo = "Prefiero No Decir";
        break;
    }

    this.clienteService.getClients().subscribe((data)=>{
      this.clientes = data;
    })
  }

}
