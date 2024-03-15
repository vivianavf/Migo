import { Component, OnInit } from '@angular/core';
import { ToolbarService } from 'src/app/providers/toolbar.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(
    private toolbarService: ToolbarService,
  ) { }

  ngOnInit() {
    this.toolbarService.setTexto("PERFIL");
  }

  ionViewWillEnter() {
    this.toolbarService.setTexto("PERFIL");
  }

  modificarContrasena(){}

  eliminarCuenta(){}

}
