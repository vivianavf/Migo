import { Component, OnInit} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  showPasswordText:boolean = false;
  inputValue:string = '';
  inputType: string = '';
  mostrarMensaje:boolean=false;
    
  constructor(
    private router: Router,
    public fb: FormBuilder,
    private alertController: AlertController,
    ) { 

    this.formularioLogin = this.fb.group({
      'email': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
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
      this.formularioLogin.reset();
      this.mostrarMensaje = false;

    }else{
      console.log("No se pudo")
      this.mostrarMensaje = true;
    }
  }

  ingresarInvitado(){
    this.router.navigate(['/invitado'])
  }

  recuperarPassword(){
    this.router.navigate(['/recuperar-password'])

  }



  ngOnInit() {
    
  }

}