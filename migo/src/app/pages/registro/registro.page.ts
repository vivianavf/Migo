import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { ClienteService } from 'src/app/providers/cliente.service';
import { UsersService } from 'src/app/providers/users.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  showPasswordText: boolean = false;

  inputValue: string = '';
  inputType: string = '';
  mostrarMensaje: boolean = false;
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

  noCoincide: boolean = false;

  users: User[] = [];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private userService: UsersService,
    private clienteService: ClienteService
  ) {}
  cancelar() {
    this.router.navigate(['/login']);
  }

  registrarse() {
    if (
      this.termsAccepted &&
      this.inputValue == this.inputValue2 &&
      this.inputValue !== undefined &&
      this.inputValue2 !== undefined &&
      this.cedulaInput &&
      this.nombresInput &&
      this.apellidosInput &&
      this.fechaInput &&
      this.correoInput &&
      this.inputValue &&
      this.telefonoInput
    ) {
      const usuario = {
        id_usuario: this.users.length + 6,
        email: this.correoInput,
        placa: '',
        contrasena: this.inputValue,
        fecha_creacion: new Date().toISOString().split('T')[0],
        fecha_modificacion: new Date().toISOString().split('T')[0],
        estado: 1,
        rol_usuario: 2, //chofer
      };

      //validar que el usuario no exista
      this.userService.crearUsuario(usuario).subscribe((respuesta) => {
        console.log(respuesta);
      });
      const cliente = {
        cedula_cliente: this.cedulaInput,
        nombre: this.nombresInput,
        apellido: this.apellidosInput,
        fecha_nacimiento: this.fechaInput,
        email: this.correoInput,
        sexo: +this.sexoInput,
        telefono: this.telefonoInput,
        estado: 1,
      };

      //validar que el cliente no exista en la DB Clientes

      this.clienteService.crearCliente(cliente).subscribe((respuesta) => {
        console.log(respuesta);
      });

      this.router.navigate(['/home']);
    } else {
      this.noCoincide = true;
      console.log('No me puedo registrar');
      console.log(this.fb);
    }
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
