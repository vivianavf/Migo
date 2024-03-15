import { Component, OnInit } from '@angular/core';
import { ToolbarService } from 'src/app/providers/toolbar.service';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.page.html',
  styleUrls: ['./solicitudes.page.scss'],
})
export class SolicitudesPage implements OnInit {

  constructor(
    private toolbarService: ToolbarService,
  ) { }

  ngOnInit() {
    this.toolbarService.setTexto("SOLICITUDES")
  }
}
