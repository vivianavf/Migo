import { Component, OnInit } from '@angular/core';
import { ToolbarService } from 'src/app/providers/toolbar.service';

@Component({
  selector: 'app-recorrido',
  templateUrl: './recorrido.page.html',
  styleUrls: ['./recorrido.page.scss'],
})
export class RecorridoPage implements OnInit {

  constructor(
    private toolbarService: ToolbarService,
  ) { }

  ngOnInit() {
    this.toolbarService.setTexto("MIS RECORRIDOS")
  }

}
