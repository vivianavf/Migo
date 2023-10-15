import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit} from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/providers/users.service';

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
  users: User[] = [];
    
  constructor(
    private router: Router,
    public fb: FormBuilder,
    private alertController: AlertController,
    private userService:UsersService,
    private http:HttpClient,
    ) { 

    this.formularioLogin = this.fb.group({
      'email': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required)
    })

  }

ingresar(){
    var f = this.formularioLogin.value;
    var inputEmail = f.email;
    var inputPassword = f.password;

    var admin = {email: "admin", password:"1234"}
    var usuarioCorrecto = this.validarLogin(inputEmail, inputPassword);

    if(usuarioCorrecto){
      this.router.navigate(['/home'])
      this.formularioLogin.reset();
      this.mostrarMensaje = false;

    }else{
      console.log("No se pudo")
      this.mostrarMensaje = true;
    }
  }

validarLogin(inputEmail: string, inputPassword:string){
  var usuarios = this.users;
  const busquedaEmail = usuarios.find(({ email }) => email === inputEmail);
  const busquedaPassword = usuarios.find(({ contrasena }) => contrasena === inputPassword);
  return busquedaEmail&&busquedaPassword?true:false
}

  ingresarInvitado(){
    this.router.navigate(['/invitado'])
  }

  recuperarPassword(){
    this.router.navigate(['/recuperar-password'])

  }

  ngOnInit() {
    this.userService.getUsers().subscribe((data) =>{
      this.users = data;
    })
  }
}