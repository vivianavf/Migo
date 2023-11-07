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

  public alertButtons = ['OK'];

  constructor(
    private modalController: ModalController,
    private navCtrl: NavController,
    private clienteService: ClienteService,
    private userService: UsersService,
    private router: Router,
  ) { }


  aceptar(){
    this.modalController.dismiss();
    
    this.userService.crearUsuario(this.usuario).subscribe((respuesta) =>{})
    this.clienteService.crearCliente(this.cliente).subscribe((respuesta)=>{})
    this.formularioRegistro.reset();
    console.log(this.formularioRegistro);

    //cerrar este modal y abrir otro que diga usuario registrado con éxito
    // this.navCtrl.navigateRoot('/home')
    this.router.navigate(["/home"])
  
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
  }

}
