import { Component, OnInit } from '@angular/core';
import { Campana } from 'src/app/interfaces/campana';
import { CampanaService } from 'src/app/providers/campana.service';
import { ToolbarService } from 'src/app/providers/toolbar.service';

@Component({
  selector: 'app-campana-activa',
  templateUrl: './campana-activa.page.html',
  styleUrls: ['./campana-activa.page.scss'],
})
export class CampanaActivaPage implements OnInit {
  
  campana!: Campana;

  constructor(
    private toolbarService: ToolbarService,
    private campanaService: CampanaService,
  ) { }

  generarDatos(){
    this.toolbarService.setTexto("CAMPAÑA ACTIVA")
    this.campana = this.campanaService.getInfoCampanaActiva();
  }

  ngOnInit() {
    this.generarDatos();
  }

}
