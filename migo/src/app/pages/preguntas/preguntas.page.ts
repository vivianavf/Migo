import { Component, OnInit } from '@angular/core';
import { ToolbarService } from 'src/app/providers/toolbar.service';

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.page.html',
  styleUrls: ['./preguntas.page.scss'],
})
export class PreguntasPage implements OnInit {

  constructor(
    private toolbarService: ToolbarService,
  ) { }

  ngOnInit() {
    this.toolbarService.setTexto('PREGUNTAS FRECUENTES')
  }

}
