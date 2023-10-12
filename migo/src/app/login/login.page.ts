import { Component, OnInit} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  inputType : any;
  inputValue : string | undefined;
  
  //TODO: Arreglar tipo Undefined
  
  constructor(
    private router: Router,
    public fb: FormBuilder,
    ) { 

    this.formularioLogin = this.fb.group({
      'email': new FormControl("",Validators.required),
      'contraseña': new FormControl("",Validators.required)
    })

  }

  ingresar(){
    var f = this.formularioLogin.value;
    console.log(f.email, f.password)

    // Obtener los usuarios de la base de datos
    var usuario = {email: "viviana@gmail.com", password:"1234"}

    if(usuario.email == f.email && usuario.password == f.password){
      console.log(f.email, f.password)
      this.router.navigate(['/home'])
    }else{
      console.log("No se pudo")
    }
  }

  ngOnInit() {
  }

}