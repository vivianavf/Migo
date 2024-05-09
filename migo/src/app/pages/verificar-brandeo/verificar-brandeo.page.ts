import { Component, OnInit } from '@angular/core';
import { FormularioAplicacionService } from 'src/app/providers/formulario-aplicacion.service';
import { ToolbarService } from 'src/app/providers/toolbar.service';
import { UsersService } from 'src/app/providers/users.service';
import { FotopreviewPage } from '../modals/fotopreview/fotopreview.page';
import { ModalController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { EnviarBrandeoPage } from '../modals/enviar-brandeo/enviar-brandeo.page';

interface Brandeo{
  nombre: string,
  fotoTomada: boolean,
  srcFoto: string,
  foto: Blob,
}

@Component({
  selector: 'app-verificar-brandeo',
  templateUrl: './verificar-brandeo.page.html',
  styleUrls: ['./verificar-brandeo.page.scss'],
})
export class VerificarBrandeoPage implements OnInit {

  partesBrandeadas: Brandeo[] = [];

  constructor(
    private toolbarService: ToolbarService,
    private formService: FormularioAplicacionService,
    private userService: UsersService,
    private modalCtrl: ModalController,
  ) { }

  ionViewDidEnter(){
    this.partesBrandeadas = [];
    this.toolbarService.setTexto('VERIFICAR BRANDEO');
    const usuarioActivo = this.userService.usuarioActivo();
    this.formService.getFormularios().subscribe((forms)=>{
      const formActivo = forms.find((formulario)=> formulario.id_usuario === usuarioActivo.id_usuario && formulario.estado_solicitud === 'activa' && !formulario.brandeo)

      if(formActivo){
        if(formActivo.carroceria_capo)this.partesBrandeadas.push({
          nombre: 'Capó',
          fotoTomada: false,
          srcFoto: '',
          foto: new Blob(),
        });
        if(formActivo.carroceria_techo)this.partesBrandeadas.push({
          nombre: 'Techo',
          fotoTomada: false,
          srcFoto: '',
          foto: new Blob(),
        });
        if(formActivo.puerta_conductor)this.partesBrandeadas.push({
          nombre: 'Puerta Conductor',
          fotoTomada: false,
          srcFoto: '',
          foto: new Blob(),
        });
        if(formActivo.puerta_pasajero)this.partesBrandeadas.push({
          nombre: 'Puerta Copiloto',
          fotoTomada: false,
          srcFoto: '',
          foto: new Blob(),
        });
        if(formActivo.puerta_maletero)this.partesBrandeadas.push({
          nombre: 'Puerta Maletero',
          fotoTomada: false,
          srcFoto: '',
          foto: new Blob(),
        });
        if(formActivo.puerta_trasera_der)this.partesBrandeadas.push({
          nombre: 'Puerta Trasera Derecha',
          fotoTomada: false,
          srcFoto: '',
          foto: new Blob(),
        });
        if(formActivo.puerta_trasera_iz)this.partesBrandeadas.push({
          nombre: 'Puerta Trasera Izquierda',
          fotoTomada: false,
          srcFoto: '',
          foto: new Blob(),
        });
      }else{
        // el usuario no se ha registrado en ninguna campaña
        // o no ha brandeado el vehículo
      }
    })
  }

  ngOnInit() {
    this.toolbarService.setTexto('VERIFICAR BRANDEO');
    
  }

  async abrirModal(srcFoto: string){
      const modal = await this.modalCtrl.create({
        component: FotopreviewPage,
        cssClass: 'fotopreview',
        componentProps: {
          FotoURL: srcFoto,
        },
      });
  
      modal.present();
  }

  async enviarBrandeo(){
    const modal = await this.modalCtrl.create({
      component: EnviarBrandeoPage,
      cssClass: 'enviarBrandeo',
      componentProps: {
        ////
      },
      backdropDismiss: false,
    });

    modal.present();
}

  async takePhoto(parte: Brandeo): Promise<void> {
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
    });

    parte.srcFoto = "data:image/jpeg;base64,"+image.base64String;

    parte.fotoTomada = true;
    parte.foto = this.b64toBlob(image.base64String);
  }

  b64toBlob(b64Data: any, contentType = '', sliceSize = 512) {
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
