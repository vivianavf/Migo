import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';

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

  customAlertOptions = {
    header: 'Pizza Toppings',
    subHeader: 'Select your favorite topping',
    message: 'Choose only one',
    translucent: true,
  };

  constructor(
    public fb: FormBuilder,
    private router: Router,
  ) {
  }

  cancelar(){
    this.router.navigate(['/login']);
  }

  registrarse(){
    if(this.termsAccepted){
      console.log("me puedo registrar")
      console.log(this.fb)
      this.router.navigate(['/home'])
    }

  }

  ngOnInit() {

  }

}
