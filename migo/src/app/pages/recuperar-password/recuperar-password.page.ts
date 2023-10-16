import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.page.html',
  styleUrls: ['./recuperar-password.page.scss'],
})
export class RecuperarPasswordPage implements OnInit {

  emailInvalido:boolean = false;
  formularioCorreo: FormGroup;

  constructor(
    private router: Router,
    public fb: FormBuilder,
  ) {
    this.formularioCorreo = this.fb.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)])),
    });
  }

  cancelar(){
    this.router.navigate(['/login'])

  }

  enviar(){
    var f = this.formularioCorreo.value;
    var inputEmail = f.email;

    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(inputEmail)?this.emailInvalido = true:this.emailInvalido = false;

    if(!this.emailInvalido){
      console.log(inputEmail)
      //Aqui envia el correo


      /** */
    }
  }

  ngOnInit() {
  }

}
