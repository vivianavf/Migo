import { Component, Input, OnInit } from '@angular/core';
import { CampanaService } from 'src/app/providers/campana.service';
import { Campana } from 'src/app/interfaces/campana';
import { EmpresaService } from 'src/app/providers/empresa.service';
import { Empresa } from 'src/app/interfaces/empresa';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-campana',
  templateUrl: './campana.component.html',
  styleUrls: ['./campana.component.scss'],
})
export class CampanaComponent  implements OnInit {

  campanas : Campana[] = [];
  empresas_nombres :{ [key: string]: any } = {};
  empresas: Empresa[] = [];

  constructor(
    private campanaService: CampanaService,
    private empresaService: EmpresaService,
    private navCtrl: NavController,
  ) { }

  registrarse( campana: Campana){
    this.campanaService.setCampanaActual(campana);
    this.navCtrl.navigateRoot('detalles-campana')
  }

  ngOnInit() {
    this.campanaService.getCampanas().subscribe((data)=>{
      this.campanas = data;
    })

    this.empresaService.getEmpresas().subscribe((data)=>{
      this.empresas = data;
      data.forEach((empresa) => {
        this.empresas_nombres[empresa.id_empresa] = empresa.nombre;
      })
    })
  }

}
