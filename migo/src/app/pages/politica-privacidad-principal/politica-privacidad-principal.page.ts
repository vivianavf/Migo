import { Component, OnInit } from '@angular/core';
import { ToolbarService } from 'src/app/providers/toolbar.service';

@Component({
  selector: 'app-politica-privacidad-principal',
  templateUrl: './politica-privacidad-principal.page.html',
  styleUrls: ['./politica-privacidad-principal.page.scss'],
})
export class PoliticaPrivacidadPrincipalPage implements OnInit {

  constructor(
    private toolbarService: ToolbarService,
  ) { }

  ngOnInit() {
    this.toolbarService.setTexto('POLÍTICA Y PRIVACIDAD');
  }

}
