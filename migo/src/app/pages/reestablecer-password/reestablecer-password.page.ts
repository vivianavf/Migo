import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { ComunicationService } from 'src/app/providers/comunication.service';
import { UsersService } from 'src/app/providers/users.service';


@Component({
  selector: 'app-reestablecer-password',
  templateUrl: './reestablecer-password.page.html',
  styleUrls: ['./reestablecer-password.page.scss'],
})
export class ReestablecerPasswordPage implements OnInit {

  inputType: any;
  inputValue: any;

  inputType2: any;
  inputValue2: any;

  emailUser:string= ""
  noCoincide:boolean = false;

  users : User[] = []

  constructor(
    private communicationService: ComunicationService,
    private userService: UsersService,
  ) { }

  actualizar(){
    //verificar que las 2 contraseñas coinciden
    if(this.inputValue==this.inputValue2 && this.inputValue !== undefined && this.inputValue2 !== undefined){
      this.noCoincide = false;
      const usuarioModificar = this.users.find(({ email }) => email === this.emailUser);
      if(usuarioModificar){
        const idUsuario = usuarioModificar.id_usuario
        const requestBody = {"contrasena": this.inputValue}
        this.userService.actualizarPassword(idUsuario, requestBody).subscribe((respuesta)=>{
          console.log(respuesta)
        })
      }
    }else{
      //Contrasenas no coinciden
      this.noCoincide = true;
    }
    
  }

  ngOnInit() {

    this.communicationService.variable$.subscribe((data) =>{
      this.emailUser = data[0]
    })

    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
    
  }

}
