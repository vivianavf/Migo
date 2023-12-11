import { HttpClient } from '@angular/common/http';
import { Component, Injectable, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { Client } from 'src/app/interfaces/client';
import { UsersService } from 'src/app/providers/users.service';
import { PrivacidadPage } from '../modals/privacidad/privacidad.page';
import { TerminosCondicionesPage } from '../modals/terminos-condiciones/terminos-condiciones.page';
import { ClienteService } from 'src/app/providers/cliente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formularioLogin: FormGroup;
  showPasswordText: boolean = false;
  
  inputValue: string = '';
  inputType: string = '';
  mostrarMensaje: boolean = false;
  emailInvalido: boolean = false;
  users: User[] = [];
  clients: Client[] = [];

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private alertController: AlertController,
    private userService: UsersService,
    private http: HttpClient,
    private modalController: ModalController,
    private clientService : ClienteService,
    private navCtrl: NavController,
  ) {
    this.formularioLogin = this.fb.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])),
      password: new FormControl('', Validators.required),
    });
  }

  ingresar() {
    var f = this.formularioLogin.value;
    var inputEmail = f.email;
    var inputPassword = f.password;

    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(inputEmail)?this.emailInvalido = true:this.emailInvalido = false;

    //validar login
    var usuarios = this.users;
    const busquedaEmail = usuarios.find(({ email }) => email === inputEmail);
    const busquedaPassword = usuarios.find(
      ({ contrasena }) => contrasena === inputPassword
    );
    const clientBusqueda = this.clients.find(({ email }) => email === inputEmail);
    
    if (busquedaEmail && busquedaPassword && clientBusqueda) {
      this.userService.ingresarUsuario(busquedaEmail);
      this.clientService.ingresarCliente(clientBusqueda);
  
      // this.router.navigate(['/home']);
      this.navCtrl.navigateRoot('/home');
      this.formularioLogin.reset();
      this.mostrarMensaje = false;
    } else {
      this.mostrarMensaje = true;
    }
  }

  ingresarInvitado() {
    this.router.navigate(['/invitado']);
  }

  recuperarPassword() {
    this.router.navigate(['/recuperar-password']);
  }

  registro() {
    this.router.navigate(['/registro']);
  }

  async mostrarTerminos(){
    const modal = await this.modalController.create({
      component: TerminosCondicionesPage,
      cssClass: 'terms',
    });

    return await modal.present();
  }

  async mostrarPoliticas(){
    const modal = await this.modalController.create({
      component: PrivacidadPage,
      cssClass: 'terms',
    });

    return await modal.present();
  }

  ngOnInit() {
    this.users = this.userService.usersObtenidos;
    this.clients = this.clientService.clientesObtenidos;
  }
}
