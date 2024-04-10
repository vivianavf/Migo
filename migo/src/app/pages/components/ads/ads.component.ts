import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { MenuPage } from '../../modals/menu/menu.page';
import { ModalController, PopoverController } from '@ionic/angular';
import { UsersService } from 'src/app/providers/users.service';
import { ClienteService } from 'src/app/providers/cliente.service';
import { NotificacionesPage } from '../../modals/notificaciones/notificaciones.page';
import { ToolbarService } from 'src/app/providers/toolbar.service';
import { CommonModule } from '@angular/common';
import { AdsService } from 'src/app/providers/ads.service';
import { Publicidad } from 'src/app/interfaces/publicidad';

@Component({
  standalone: true,
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule,],
})
export class AdsComponent implements OnInit {
  srcBanner = '';
  publicidadesSinFiltrar: Publicidad[] = [];
  publicidades: Publicidad[] = [];

  constructor(
    private adsService: AdsService,
    private userService: UsersService,
  ) {}

  ngOnInit() {
    this.publicidadesSinFiltrar = this.adsService.publicidadesObtenidas;

    var esperaPublicidades = setInterval(()=>{
      if(this.publicidadesSinFiltrar.length > 0){
        this.filtrarPublicidades();
        this.getPublicidadRandom();
        clearInterval(esperaPublicidades);
      }else{
        this.publicidadesSinFiltrar = this.adsService.publicidadesObtenidas;
      }
    }, 100);
  }

  filtrarPublicidades(){
    const ciudad = this.userService.usuarioActivo().id_ciudad;
    const pais = this.userService.usuarioActivo().id_pais;
    this.adsService.publicidadesObtenidas.forEach((publicidad)=>{
      if(publicidad.id_ciudad === ciudad && publicidad.id_pais === pais && publicidad.estado === 1){
        this.publicidades.push(publicidad);
      }
    })
  }

  getPublicidadRandom() {
    this.setSrcRandom();
    var esperaSrc = setInterval(() => {
      this.setSrcRandom();
    }, 5000);
  }

  setSrcRandom() {
    var numRandom = this.generarNumeroRandom(this.publicidades.length - 1);
    if(this.publicidades){
      this.srcBanner = this.publicidades[numRandom].imagen_publicitaria;
    }
    
  }

  generarNumeroRandom(maximo: number, minimo = 0) {
    return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
  }
}
