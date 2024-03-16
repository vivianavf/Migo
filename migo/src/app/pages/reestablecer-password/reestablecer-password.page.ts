import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { ComunicationService } from 'src/app/providers/comunication.service';
import { UsersService } from 'src/app/providers/users.service';
import { sha256 } from 'js-sha256';


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
    private router: Router,
    private modalController: ModalController,
    private alertController: AlertController,
  ) { }

  async actualizar(){
    //verificar que las 2 contraseñas coinciden
    if(this.inputValue==this.inputValue2 && this.inputValue !== undefined && this.inputValue2 !== undefined){
      this.noCoincide = false;
      const usuarioModificar = this.users.find(({ email }) => email === this.emailUser);
      if(usuarioModificar){
        const idUsuario = usuarioModificar.id_usuario
        //transformar con SHA256
        this.inputValue = this.encriptarSHA256(this.inputValue);
        const requestBody = {"contrasena": this.inputValue}

        this.userService.actualizarPassword(idUsuario, requestBody).subscribe((respuesta)=>{
          console.log(respuesta)
        })

        const alert = await this.alertController.create({
          // header: "",
          message: "La contraseña ha sido actualizada con éxito",
          buttons: [{
            text: "Aceptar",
            handler:()=>{ this.router.navigate(["/login"])}
          }],
          cssClass: "passwordAlert",
        })

        await alert.present();
        // this.router.navigate(['/home']);
      }
    }else{
      //Contrasenas no coinciden
      this.noCoincide = true;
    }
    
  }

  encriptarSHA256(inputPassword: any) {
    return sha256(inputPassword);
  }

  irAHome(){
    this.router.navigate(['/home']);
    this.modalController.dismiss();
  }

  ngOnInit() {
    this.communicationService.variable$.subscribe((data) =>{
      this.emailUser = data[0]
    })

    this.users = this.userService.usersObtenidos;
  }

}
