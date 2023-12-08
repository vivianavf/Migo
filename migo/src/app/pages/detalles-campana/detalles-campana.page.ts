import { Component, ElementRef, OnInit } from '@angular/core';
import { CampanaService } from 'src/app/providers/campana.service';
import { Campana } from 'src/app/interfaces/campana';
import { ModalController, NavController } from '@ionic/angular';
import { MenuPage } from '../modals/menu/menu.page';
import { UsersService } from 'src/app/providers/users.service';
import { ClienteService } from 'src/app/providers/cliente.service';
import { NotificacionesPage } from '../modals/notificaciones/notificaciones.page';
import {GoogleMap, Marker} from '@capacitor/google-maps'
import { Empresa } from 'src/app/interfaces/empresa';
import { EmpresaService } from 'src/app/providers/empresa.service';
import { User } from 'src/app/interfaces/user';
import { Client } from 'src/app/interfaces/client';

@Component({
  selector: 'app-detalles-campana',
  templateUrl: './detalles-campana.page.html',
  styleUrls: ['./detalles-campana.page.scss'],
})

export class DetallesCampanaPage implements OnInit {

  campana!: Campana;
  empresas: Empresa[] = [];
  usuarios: User[] = [];
  clientes: Client[] = [];
  empresaSeleccionada !: Empresa;
  nombreEmpresa = "-";
  correoEncargado = "--@--";

  constructor(
    private campanaService: CampanaService,
    private modalController: ModalController,
    private userService: UsersService,
    private clientService: ClienteService,
    private empresaService: EmpresaService,
    private navCtrl: NavController,
  ) { }

  async mostrarNotificaciones(){
    const modal = await this.modalController.create({
    component: NotificacionesPage,
    componentProps:{

    },
    cssClass: 'notificaciones,'
    })
  }

  async mostrarMenu(){
    const modal = await this.modalController.create({
      component: MenuPage,
      componentProps:{
        user: this.userService.usuarioActivo(),
        client: this.clientService.clienteActivo(),
      },
      cssClass: 'menu',
    })

    return await modal.present();
  }

  async loadMap(){

  }

  abrirFormulario(){
    this.navCtrl.navigateRoot('formulario-aplicacion');
  }

  ngOnInit() {
    console.log(this.campanaService.getCampanaActual())
    this.campana = this.campanaService.getCampanaActual()
    var idEmpresa = this.campana.id_empresa;
    this.empresaService.getEmpresas().subscribe((data)=>{
      this.empresas = data;
      const busquedaEmpresa = this.empresas.find(({ id_empresa }) => id_empresa === idEmpresa);
      if(busquedaEmpresa)this.nombreEmpresa = busquedaEmpresa.nombre;
    });

    this.clientService.getClients().subscribe((data)=>{
      this.clientes = data;
      const busquedaCliente = this.clientes.find(({ nombre }) => nombre === this.campana.nombre_responsable);
      if(busquedaCliente){
        this.correoEncargado = busquedaCliente.email;
        }
    });
    
    this.loadMap();

  }

}
