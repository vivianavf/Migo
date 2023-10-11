import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(
    public fb: FormBuilder
    ) { 

    this.formularioLogin = this.fb.group({
      'email': new FormControl("",Validators.required),
      'contraseña': new FormControl("",Validators.required)
    })

  }

  ingresar(){
    var f = this.formularioLogin.value;

    // Obtener los usuarios de la base de datos
    var usuario = {email: "viviana@gmail.com", contraseña:"1234"}

    if(usuario.email == f.email && usuario.contraseña == f.contraseña){
      console.log(f.email, f.contraseña)
    }else{
      console.log("No se pudo")
    }
  }

  ngOnInit() {
  }

}