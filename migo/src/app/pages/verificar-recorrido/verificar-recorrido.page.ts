import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { CampanaService } from 'src/app/providers/campana.service';
import { UsersService } from 'src/app/providers/users.service';
import { VerificacionService } from 'src/app/providers/verificacion.service';
import { Verificacion } from 'src/app/interfaces/verificacion';
import { Router } from '@angular/router';
import { Timer, Time, TimerOptions } from 'timer-node';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-verificar-recorrido',
  templateUrl: './verificar-recorrido.page.html',
  styleUrls: ['./verificar-recorrido.page.scss'],
})
export class VerificarRecorridoPage implements OnInit {

  @ViewChild(IonModal) modalVerificacion!: IonModal;


  src = ''
  fotoTomada = false;
  foto = new Blob();
  mostrarMensaje = false;

  //timer
  currentTimeVerificacion: Time = {d: 0, h: 0, m: 1, s: 0, ms: 0};
  timerVerificacion!: Timer;
  intervalVerificacion: any;

  constructor(
    private verificacionSrvce: VerificacionService,
    private campanaService: CampanaService,
    private userService: UsersService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.startTimer();
  }

  startTimer(){
    this.timerVerificacion = new Timer({ startTimestamp: new Date().getTime() });
    this.currentTimeVerificacion
    this.timerVerificacion.start();
    this.intervalVerificacion = setInterval(() => {
      this.currentTimeVerificacion = this.timerVerificacion.time();
      //si el contador llega a cero, poner algo que no alcanzó a hacer su verificación
    }, 1000);
  }

  enviarVerificacion(){
    if(this.fotoTomada){
      this.mostrarMensaje = false;
      
      console.log("campana Nombre", this.campanaService.getInfoCampanaActiva()[0].nombre_campana)
      console.log("campana ID", this.campanaService.getInfoCampanaActiva()[0].id_campana)
      console.log("cedula conductor", this.userService.esChoferOCliente().cedula)
      console.log("fecha registro", new Date())

      let verificacion: Verificacion = {
        cedula_conductor: Number(this.userService.esChoferOCliente().cedula),
        fecha_registro: new Date(),
        tipo_verificacion: '',
        imagen_evidencia: this.foto,
        estado: 1,
        id_campana: this.campanaService.getInfoCampanaActiva()[0].id_campana,
      }

      console.log("enviando.....")

      setTimeout(()=>{
        this.modalVerificacion.dismiss();
        this.router.navigate(['/nuevo-recorrido']);
      }, 3000);

      // try {
      //   this.verificacionSrvce.createVerificacion(verificacion).subscribe((response)=>{
      //     console.log("verificacion-response", response)
      //     console.log("enviado!!! ")
      //     this.cerrarModal();
      //     // this.router
      //   })
      // } catch (error) {
      //   console.log(error)
      // }

      
    }else{
      this.mostrarMensaje = true;
    }

  }

  async takePhoto(): Promise<void>{
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
    });

    this.src = "data:image/jpeg;base64,"+image.base64String;

    if(image){
      this.fotoTomada = true;
      this.foto = this.b64toBlob(image.base64String);
    }
  }

  b64toBlob(b64Data: any, contentType = '', sliceSize = 512){
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    console.log("BLOB", blob)
    return blob;
  }

}
