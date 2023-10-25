import { HttpClient } from '@angular/common/http';
import { Component, Injectable, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/providers/users.service';
import { PrivacidadPage } from '../modals/privacidad/privacidad.page';
import { TerminosCondicionesPage } from '../modals/terminos-condiciones/terminos-condiciones.page';

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

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private alertController: AlertController,
    private userService: UsersService,
    private http: HttpClient,
    private modalController: ModalController,
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

    // var admin = { email: 'admin@gmail.com', password: '1234' };
    var usuarioCorrecto = this.validarLogin(inputEmail, inputPassword);
    // usuarioCorrecto = true;
    if (usuarioCorrecto) {
      this.router.navigate(['/home']);
      this.formularioLogin.reset();
      this.mostrarMensaje = false;
    } else {
      console.log('No se pudo');
      this.mostrarMensaje = true;
    }
  }

  validarLogin(inputEmail: string, inputPassword: string) {
    var usuarios = this.users;
    
    const busquedaEmail = usuarios.find(({ email }) => email === inputEmail);
    const busquedaPassword = usuarios.find(
      ({ contrasena }) => contrasena === inputPassword
    );
    return busquedaEmail && busquedaPassword ? true : false;
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
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
