import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { Email } from 'src/app/interfaces/email';
import { UsersService } from 'src/app/providers/users.service';
import { HttpserviceService } from 'src/app/providers/httpservice.service';
import { ComunicationService } from 'src/app/providers/comunication.service';
import { ModalController } from '@ionic/angular';
import { ClienteService } from 'src/app/providers/cliente.service';
import { Client } from 'src/app/interfaces/client';


@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.page.html',
  styleUrls: ['./recuperar-password.page.scss'],
})
export class RecuperarPasswordPage implements OnInit {
  @Input() users: User[] = [];
  @Input() clientes: Client[] = [];

  emailInvalido: boolean = false;
  emailNoExiste: boolean = false;
  formularioCorreo: FormGroup;

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private userService: UsersService,
    private _http: HttpserviceService,
    private communicationService : ComunicationService,
    private clientService: ClienteService,
    private modalController: ModalController,
  ) {
    this.formularioCorreo = this.fb.group({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ])
      ),
    });
  }

  cancelar() {
    this.router.navigate(['/login']);
  }

  enviar() {
    var f = this.formularioCorreo.value;
    var inputEmail = f.email;

    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      inputEmail
    )
      ? (this.emailInvalido = true)
      : (this.emailInvalido = false);

      // this.enviarCorreo(inputEmail);

      //validar que el email esta registrado en la base de datos
    if (!this.emailInvalido) {
      const busquedaEmail = this.users.find(
        ({ email }) => email === inputEmail
      );
      if (busquedaEmail) {
        this.enviarCorreo(inputEmail);
      } else {
        this.emailNoExiste = true;
      }
    }


  }

  findIdByEmail(emailToFind: string): string {
    for (let i = 0; i < this.clientes.length; i++) {
      if (this.clientes[i].email === emailToFind) {
        console.log("mail match: "+ this.clientes[i].email + " to: " + emailToFind);
        return this.clientes[i].nombre + " " + this.clientes[i].apellido; // Found the index
      }
    }
    
    return "no existe"; // Email not found in the array
  }

  enviarCorreo(inputEmail:string){
    // console.log("buscar id cliente del correo: " + inputEmail);
    var nombreCompleto = this.findIdByEmail(inputEmail);
    // console.log("nombres:");
    // console.log(nombreCompleto);
    
    var code = Math.floor(Math.random() * (999999 - 111111) + 111111).toString()
    var message = code
    var subject = nombreCompleto

    var email: Email = {
      code: code,
      message: message,
      subject: subject,
      recipient_list : [inputEmail]
    }

    this.communicationService.sendVariable([inputEmail, code]);
    this._http.requestCall(email).subscribe((res) => {
      console.log(res);
    });
    this.router.navigate(['/codigo-password']);
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
    this.clientService.getClients().subscribe((data) => {
      this.clientes = data;
      // console.log("clientes:");
      // console.log(this.clientes);
    });
  }
}
