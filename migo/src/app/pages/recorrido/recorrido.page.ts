import { Component, OnInit } from '@angular/core';
import { RecorridoRealizado } from 'src/app/interfaces/recorrido-realizado';
import { RecorridoRealizadoService } from 'src/app/providers/recorrido-realizado.service';
import { ToolbarService } from 'src/app/providers/toolbar.service';

@Component({
  selector: 'app-recorrido',
  templateUrl: './recorrido.page.html',
  styleUrls: ['./recorrido.page.scss'],
})
export class RecorridoPage implements OnInit {

  recorridos: RecorridoRealizado[] = [];

  constructor(
    private toolbarService: ToolbarService,
    private recorridoService: RecorridoRealizadoService,
  ) { }

  ngOnInit() {
    this.toolbarService.setTexto("MIS RECORRIDOS");
    this.recorridoService.getRecorridos().subscribe((data)=>{
      this.recorridos = data;
    })
  }

}
