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
import { ToolbarService } from 'src/app/providers/toolbar.service';
import { Campana } from 'src/app/interfaces/campana';
import { FormularioAplicacion } from 'src/app/interfaces/formulario-aplicacion';

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

  //timer inicializado con 30 minutos
  currentTimeVerificacion: Time = {d: 0, h: 0, m: 30, s: 0, ms: 0};
  timerVerificacion!: Timer;
  intervalVerificacion: any;

  constructor(
    private verificacionSrvce: VerificacionService,
    private campanaService: CampanaService,
    private userService: UsersService,
    private router: Router,
    private toolbarService: ToolbarService,
  ) { }
  

  ngOnInit() {

    this.toolbarService.setTexto('VERIFICAR RECORRIDO');
    this.countdownTimer();
    // this.verificarFormularioRegistro();
    
  }

  verificarFormularioRegistro(){
    const formulario :FormularioAplicacion = JSON.parse(localStorage.getItem('formulario-registro')!);
    const campana: Campana = JSON.parse(localStorage.getItem('campana-registro')!);
    
    if(campana && formulario.brandeo && formulario.estado_solicitud === 'activa'){

    }else{
      // El usuario no está recorriendo para ninguna campaña
    }
  }


  mostrarTiempo(numero: number){
    if(numero < 10){
      return '0'+String(numero);
    }

    return String(numero);
  }

  countdownTimer() {
    const timer = setInterval(() => {
      if (this.currentTimeVerificacion.s === 0 && this.currentTimeVerificacion.m === 0) {
          this.acaboTiempo();
          clearInterval(timer);
      } else {
          if (this.currentTimeVerificacion.s === 0) {
              if (this.currentTimeVerificacion.m > 0) {
                  this.currentTimeVerificacion.m--;
                  this.currentTimeVerificacion.s = 59;
              } else {
                  clearInterval(timer); // Contador llegó a 0, detener el temporizador
                  this.acaboTiempo();
              }
          } else {
              this.currentTimeVerificacion.s--;
          }
      }
  }, 1000);
  }

  acaboTiempo(){
    console.log('se acabo el tiempo');
    //mostrar un modal de que se acabó el tiempo
  }

  enviarVerificacion(){
    if(this.fotoTomada){
      this.mostrarMensaje = false;
      const f = new Date().toLocaleDateString().split('/');
      const fechaEnvio = f[2] + '-' + f[1] + '-' + f[0];
      const campana: Campana = JSON.parse(localStorage.getItem('campana-registro')!);

      if(campana){

        // se debe sacar la metadata de la foto para obtener la ubicacion y la hora
        // en que la foto fue tomada
        const verificacion: Verificacion = {
          cedula_conductor: Number(this.userService.esChoferOCliente().cedula),
          fecha_registro: fechaEnvio,
          tipo_verificacion: 'foto',
          imagen_evidencia: this.foto,
          estado: 1,
          id_campana: campana.id_campana,
        }

        setTimeout(()=>{
          this.modalVerificacion.dismiss();
          this.resetDatos();
          // this.router.navigate(['/nuevo-recorrido']);
        }, 3000);

        //corregir esto

      // this.verificacionSrvce.createVerificacion(verificacion).subscribe((data)=>{
      //   console.log('verificacion', data);
        
      // })
      }else{
        // el usuario no se ha registrado en ninguna campaña
        // por lo tanto, no puede verificar
        // ningún recorrido
        // El usuario no está recorriendo para ninguna campaña
        console.log('no.')
      }
    }else{
      this.mostrarMensaje = true;
    }
  }

  resetDatos(){
    this.fotoTomada = false;
    this.src = '';
    // this.currentTimeVerificacion = {d: 0, h: 0, m: 15, s: 0, ms: 0};
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
