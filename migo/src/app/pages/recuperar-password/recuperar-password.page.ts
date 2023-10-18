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


@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.page.html',
  styleUrls: ['./recuperar-password.page.scss'],
})
export class RecuperarPasswordPage implements OnInit {
  @Input() users: User[] = [];

  emailInvalido: boolean = false;
  emailNoExiste: boolean = false;
  formularioCorreo: FormGroup;

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private userService: UsersService,
    private _http: HttpserviceService,
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

    if (!this.emailInvalido) {
      //validar que el email exista en la base de datos
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

  enviarCorreo(inputEmail:string){
    var code = Math.floor(Math.random() * (999999 - 111111) + 111111).toString()
    var message = "El código para recuperar su contraseña es "+code
    var subject = "Migo Ads - Recuperación de contraseña"

    var payload: Email = {
      code: code,
      message: message,
      subject: subject,
      toEmail: inputEmail
    }

    // this._http.requestCall(payload)

    this.router.navigate(['/codigo-password']);
  }

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
