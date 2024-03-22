import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/providers/users.service';
import { TerminosCondicionesPage } from '../modals/terminos-condiciones/terminos-condiciones.page';
import { PrivacidadPage } from '../modals/privacidad/privacidad.page';
import { DatosRegistroPage } from '../modals/datos-registro/datos-registro.page';
import { Client } from 'src/app/interfaces/client';
import { ClienteService } from 'src/app/providers/cliente.service';
import { RegistroConductorService } from 'src/app/providers/registro-conductor.service';
import { Pais } from 'src/app/interfaces/pais';
import { Ciudad } from 'src/app/interfaces/ciudad';
import { PaisService } from 'src/app/providers/pais.service';
import { CiudadService } from 'src/app/providers/ciudad.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  ionSelectElement!: HTMLIonSelectElement;
  formularioRegistro: FormGroup;

  showPasswordText: boolean = false;

  inputValue: string = '';
  inputType: string = '';

  //mensajes de retroalimentacion
  cedulaNoValida: boolean = false;
  fechaInvalida: boolean = false;
  terminosNoAceptados: boolean = false;
  camposVacios: boolean = false;
  contrasenasIguales: boolean = false;
  usuarioExistente: boolean = false;
  cedulaExistente: boolean = false;
  emailInvalido: boolean = false;

  inputValue2: string = '';
  inputType2: string = '';
  formGroup: any;
  formBuilder: any;
  absenceTypeId: any;

  termsAccepted: any;

  //inputs
  cedulaInput: string = '';
  nombresInput: string = '';
  apellidosInput: string = '';
  fechaInput: string = '';
  correoInput: string = '';
  telefonoInput: string = '';
  sexoInput: string = '';
  paisInput: string = '';
  ciudadInput: string = '';

  users: User[] = [];
  clientes: Client[] = [];
  paises: Pais[] = [];
  ciudades: Ciudad[] = [];
  ciudadesFiltradas: Ciudad[] = [];
  usuario: any;
  cliente: any;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private userService: UsersService,
    private clienteService: ClienteService,
    private modalController: ModalController,
    private regConductorService: RegistroConductorService,
    private paisService: PaisService,
    private ciudadService: CiudadService,
  ) {
    this.formularioRegistro = this.fb.group({
      cedula: new FormControl('', [Validators.required]),
      nombres: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      sexoInput: new FormControl('', Validators.required),
    });
  }

  filtrarCiudades() {
    this.ciudadesFiltradas = [];
    this.ciudades.forEach((ciudad)=>{
      if(ciudad.id_pais == Number(this.paisInput)){
        this.ciudadesFiltradas.push(ciudad);
      }
    })
    // this.ciudadesFiltradas = [];
  }

  cancelar() {
    this.router.navigate(['/login']);
  }

  registrarse(rol: string) {
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      this.correoInput
    )
      ? (this.emailInvalido = true)
      : (this.emailInvalido = false);

    this.cedulaEsValida(this.cedulaInput); //retorna un booolean
    this.camposCompletos();
    this.esMayordeEdad(this.fechaInput);
    this.aceptoTerminos();

    if (
      !this.cedulaExiste() &&
      !this.cedulaNoValida &&
      !this.camposVacios &&
      !this.fechaInvalida &&
      !this.terminosNoAceptados &&
      !this.usuarioExiste() &&
      this.passwordCoincide(this.inputValue, this.inputValue2) &&
      !this.emailInvalido
    ) {
      switch (rol) {
        case 'principal':
          const nuevoIDusuario =
            this.users[this.users.length - 1].id_usuario + 1;
          this.usuario = {
            id_usuario: nuevoIDusuario,
            email: this.correoInput,
            placa: '',
            contrasena: this.inputValue,
            fecha_creacion: new Date().toISOString().split('T')[0],
            fecha_modificacion: new Date().toISOString().split('T')[0],
            estado: 1,
            rol_usuario: 5, //chofer,
            token_notificacion : "eujClc4dQKWglcbqqy_pbj:APA91bEEB78NUOs1ddq23aJ4baILdMDd1CUYiwndetmJhWtUpb2rvMkz048BYqhs2uepxyvMW2mOhoY-W6hrnnblX2hq4d1UU00HNj4u2LGDbiW2yVQU6Iy2B_q-Lv1RfU7sXEXpHNm",
            id_pais: Number(this.paisInput),
            id_ciudad: Number(this.ciudadInput),
          };

          this.cliente = {
            cedula_cliente: this.cedulaInput,
            nombre: this.nombresInput,
            apellido: this.apellidosInput,
            fecha_nacimiento: this.fechaInput,
            email: this.correoInput,
            sexo: this.sexoInput,
            telefono: this.telefonoInput,
            estado: 1,
            id_usuario: nuevoIDusuario,
            id_pais: Number(this.paisInput),
            id_ciudad: Number(this.ciudadInput),
          };
          this.mostrarDatos();
          break;
        case 'conductor':
          const nuevoIDusuario2 =
            this.users[this.users.length - 1].id_usuario + 1;
          this.usuario = {
            id_usuario: nuevoIDusuario2,
            email: this.correoInput,
            placa: '',
            contrasena: this.inputValue,
            fecha_creacion: new Date().toISOString().split('T')[0],
            fecha_modificacion: new Date().toISOString().split('T')[0],
            estado: 1,
            rol_usuario: 2, //cliente
          };
          this.regConductorService.setConductor(this.usuario);
          this.router.navigate(['/registro-conductor']);
          break;
      }
    }
  }

  usuarioExiste() {
    const busquedaEmail = this.users.find(
      ({ email }) => email == this.correoInput
    );

    if (busquedaEmail) {
      this.usuarioExistente = true;
      return true;
    } else {
      this.usuarioExistente = false;
      return false;
    }
  }

  cedulaExiste() {
    const busquedaCedula = this.clientes.find(
      ({ cedula_cliente }) => cedula_cliente == this.cedulaInput
    );

    if (busquedaCedula) {
      this.cedulaExistente = true;
      return true;
    } else {
      this.cedulaExistente = false;
      return false;
    }
  }

  cedulaEsValida(cedula: string): boolean {
    this.cedulaNoValida = false;

    if (/^\d{10}$/.test(cedula)) {
      const digitos: number[] = cedula.split('').map(Number);
      const codigoProvincia: number = Number(cedula.substring(0, 2));

      // Verificar que el código de provincia sea válido
      if (
        (codigoProvincia >= 1 && codigoProvincia <= 24) ||
        codigoProvincia === 30
      ) {
        const digitoVerificador = digitos.pop();

        // Calcular el dígito verificador
        const coeficientes: number[] = [2, 1, 2, 1, 2, 1, 2, 1, 2];

        let suma = 0;
        for (let i = 0; i < digitos.length; i++) {
          let valorActual = digitos[i];
          let coeficiente = coeficientes[i];
          let producto = valorActual * coeficiente;
          if (producto > 9) {
            producto -= 9;
          }
          suma += producto;
        }

        let digitoCalculado: number = 10 - (suma % 10);
        if (digitoCalculado === 10) {
          digitoCalculado = 0;
        }

        return digitoCalculado === digitoVerificador;
      }
    }

    // Establecer cedulaNoValida en true si la cédula no es válida
    this.cedulaNoValida = true;
    return false;
  }

  passwordCoincide(contra1: string, contra2: string) {
    if (contra1 == contra2) {
      this.contrasenasIguales = false;
      return true;
    } else {
      this.contrasenasIguales = true;
      return false;
    }
  }

  esMayordeEdad(fechaInput: string) {
    const fechaNacimientoDate = new Date(fechaInput);
    // Calcula la fecha actual
    const fechaActual = new Date();
    const diferenciaMilisegundos =
      fechaActual.getTime() - fechaNacimientoDate.getTime();

    // Calcula la edad dividiendo la diferencia de tiempo por la cantidad de milisegundos en un año
    const edad = diferenciaMilisegundos / (1000 * 60 * 60 * 24 * 365.25);
    if (edad >= 18) {
      this.fechaInvalida = false;
    } else {
      this.fechaInvalida = true;
    }
    // Comprueba si la persona tiene al menos 18 años
    return edad >= 18;
  }

  camposCompletos() {
    if (
      this.inputValue === undefined ||
      this.inputValue2 === undefined ||
      !this.cedulaInput ||
      !this.nombresInput ||
      !this.apellidosInput ||
      !this.fechaInput ||
      !this.correoInput ||
      !this.inputValue ||
      !this.telefonoInput ||
      !this.sexoInput
    ) {
      this.camposVacios = true;
      return false;
    } else {
      this.camposVacios = false;
      return true;
    }
  }

  aceptoTerminos() {
    if (!this.termsAccepted) {
      this.terminosNoAceptados = true;
      return false;
    } else {
      this.terminosNoAceptados = false;
      return true;
    }
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

  async mostrarDatos() {
    const modal = await this.modalController.create({
      component: DatosRegistroPage,
      cssClass: 'terms',
      componentProps: {
        cedula: this.cedulaInput,
        nombres: this.nombresInput,
        apellidos: this.apellidosInput,
        fechaNacimiento: this.fechaInput,
        correo: this.correoInput,
        password: this.inputValue,
        telefono: this.telefonoInput,
        sexo: this.sexoInput,
        usuario: this.usuario,
        cliente: this.cliente,
        formularioRegistro: this.formularioRegistro,
        pais: Number(this.paisInput),
        ciudad: Number(this.ciudadInput),
      },
    });
    return await modal.present();
  }

  ngOnInit() {
    this.users = this.userService.usersObtenidos;
    this.clientes = this.clienteService.clientesObtenidos;
    this.formularioRegistro.reset();
    this.ciudadService.getCiudades().subscribe((data)=>{this.ciudades = data;})
    this.paisService.getPaises().subscribe((data)=>{this.paises = data;})
  }
}
