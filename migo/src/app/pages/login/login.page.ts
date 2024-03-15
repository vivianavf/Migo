import { HttpClient } from '@angular/common/http';
import { Component, Injectable, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { Client } from 'src/app/interfaces/client';
import { UsersService } from 'src/app/providers/users.service';
import { PrivacidadPage } from '../modals/privacidad/privacidad.page';
import { TerminosCondicionesPage } from '../modals/terminos-condiciones/terminos-condiciones.page';
import { ClienteService } from 'src/app/providers/cliente.service';
import { TabsService } from 'src/app/providers/tabs.service';
import { sha256 } from 'js-sha256';
import { ChoferService } from 'src/app/providers/chofer.service';
import { Chofer } from 'src/app/interfaces/chofer';

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
  logearse: boolean = false;
  emailInvalido: boolean = false;
  users: User[] = [];
  clients: Client[] = [];
  choferes: Chofer[] = [];

  regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))|([A-Z]{3}[0-9]{3,4})$/;

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private alertController: AlertController,
    private userService: UsersService,
    private http: HttpClient,
    private modalController: ModalController,
    private clientService: ClienteService,
    private navCtrl: NavController,
    private tabService: TabsService,
    private choferService: ChoferService
  ) {
    this.formularioLogin = this.fb.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(this.regex),
        ])
      ),
      password: new FormControl('', Validators.required),
    });
  }

  ingresar() {
    var f = this.formularioLogin.value;
    var inputEmail = f.email;
    var inputPassword = f.password;

    !this.regex.test(inputEmail)
      ? (this.emailInvalido = true)
      : (this.emailInvalido = false);

    //validar login
    var usuarios = this.users;
    const busquedaEmail = usuarios.find(({ email }) => email === inputEmail);

    //transformar con SHA256
    inputPassword = this.encriptarSHA256(inputPassword);

    // const clientBusqueda = this.clients.find(({ email }) => email === inputEmail);
    if (busquedaEmail && (busquedaEmail.contrasena === inputPassword)) {
      this.userService.ingresarUsuario(busquedaEmail);
      switch (busquedaEmail.rol_usuario) {
        case 2: //es chofer
          const busquedaChofer = this.choferes.find(
            ({ id_usuario }) => id_usuario === busquedaEmail.id_usuario
          );
          if (busquedaChofer) this.choferService.ingresarChofer(busquedaChofer);
          break;
        case 5: // es un cliente
          const busquedaCliente = this.clients.find(
            ({ id_usuario }) => id_usuario === busquedaEmail.id_usuario
          );
          if (busquedaCliente)
            this.clientService.ingresarCliente(busquedaCliente);
          break;
      }
      this.formularioLogin.reset();
      this.mostrarMensaje = false;
      this.logearse = true;
    } else {
      this.mostrarMensaje = true;
      console.log(inputPassword);
    }
    console.log('logearse: ', this.logearse);
    if (this.logearse) {
      console.log('entro');
      this.tabService.showTabs();
      this.navCtrl.navigateRoot('/home');
    }
  }

  encriptarSHA256(inputPassword: any) {
    return sha256(inputPassword);
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

  async mostrarTerminos() {
    const modal = await this.modalController.create({
      component: TerminosCondicionesPage,
      cssClass: 'terms',
    });

    return await modal.present();
  }

  async mostrarPoliticas() {
    const modal = await this.modalController.create({
      component: PrivacidadPage,
      cssClass: 'terms',
    });

    return await modal.present();
  }

  ngOnInit() {
    this.tabService.hideTabs();

    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });

    this.clientService.getClients().subscribe((data) => {
      this.clients = data;
    });

    this.choferService.getChoferes().subscribe((data) => {
      this.choferes = data;
    });
  }
}
