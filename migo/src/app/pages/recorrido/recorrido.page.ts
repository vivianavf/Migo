import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RecorridoRealizado } from 'src/app/interfaces/recorrido-realizado';
import { CampanaService } from 'src/app/providers/campana.service';
import { RecorridoRealizadoService } from 'src/app/providers/recorrido-realizado.service';
import { ToolbarService } from 'src/app/providers/toolbar.service';
import { MapaRecorridoPage } from '../modals/mapa-recorrido/mapa-recorrido.page';
import { UsersService } from 'src/app/providers/users.service';
import { EmpresaImagesService } from 'src/app/providers/empresa-images.service';
import { EmpresaImages } from 'src/app/interfaces/empresa-images';
import { Campana } from 'src/app/interfaces/campana';

@Component({
  selector: 'app-recorrido',
  templateUrl: './recorrido.page.html',
  styleUrls: ['./recorrido.page.scss'],
})
export class RecorridoPage implements OnInit {
  recorridos: RecorridoRealizado[] = [];
  imagesEmpresas: EmpresaImages[] = [];

  constructor(
    private toolbarService: ToolbarService,
    private recorridoService: RecorridoRealizadoService,
    private campanaService: CampanaService,
    private modalController: ModalController,
    private userService: UsersService,
    private empresaImagesService: EmpresaImagesService,
  ) {}

  getNombreCampana(idCampana: number): string {
    // Se supone que cada que inicia la app obtengo las campanas, entonces estan guardadas
    const campanaEncontrada = this.campanaService.campanasObtenidas.find(
      (campana) => idCampana === campana.id_campana
    );
    if (campanaEncontrada) {
      return campanaEncontrada.nombre_campana;
    }

    return '...';
  }

  getIDEmpresa(idCampana: number) {
    // Se supone que cada que inicia la app obtengo las campanas, entonces estan guardadas
    const campanaEncontrada = this.campanaService.campanasObtenidas.find(
      (campana) => idCampana === campana.id_campana
    );

    if (campanaEncontrada) {
      return campanaEncontrada.id_empresa;
    }

    return '0';
  }

  obtenerFecha(recorrido: RecorridoRealizado){
    return recorrido.fecha_hora_inicio;
  }

  async mostrarMapaRecorrido(recorrido: RecorridoRealizado) {
    const mapaRecorrido = await this.modalController.create({
      component: MapaRecorridoPage,
      componentProps: {
        recorrido: recorrido,
      },
      cssClass: 'mapa-recorrido-modal',
    });

    return await mapaRecorrido.present();
  }
  redondearFloat(numeroFloat: number, decimales: number) {
    const factor = 10 ** decimales;
    return Math.round(numeroFloat * factor) / factor;
  }

  getURL(recorrido: RecorridoRealizado){
    const idCampana = recorrido.id_campana;
    const campana = this.campanaService.campanasObtenidas.find((campana) => idCampana === campana.id_campana)!;
    return this.empresaImagesService.getLogoURLbyEmpresaId(campana.id_empresa, this.imagesEmpresas);
  }

  ngOnInit() {
    this.toolbarService.setTexto('MIS RECORRIDOS');

    const idCiudad = this.userService.usuarioActivo().id_ciudad;
    const idPais = this.userService.usuarioActivo().id_pais;
    const idUsuario = this.userService.usuarioActivo().id_usuario;

    this.recorridoService.getRecorridos().subscribe((data) => {
      data.forEach((recorrido)=>{
        if(recorrido.id_ciudad === idCiudad && recorrido.id_pais === idPais && recorrido.id_usuario === idUsuario){
          this.recorridos.push(recorrido);
        }
      })
    });

    this.empresaImagesService.getImages().subscribe((data)=>{
      this.imagesEmpresas = data;
    })
  }
}
