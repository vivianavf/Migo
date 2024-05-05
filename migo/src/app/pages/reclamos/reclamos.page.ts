import { Component, OnInit } from '@angular/core';
import { ToolbarService } from 'src/app/providers/toolbar.service';

@Component({
  selector: 'app-reclamos',
  templateUrl: './reclamos.page.html',
  styleUrls: ['./reclamos.page.scss'],
})
export class ReclamosPage implements OnInit {

  constructor(
    private toolbarService: ToolbarService,
  ) { }

  ngOnInit() {
    this.toolbarService.setTexto('RECLAMOS Y SOPORTE')
  }

}
