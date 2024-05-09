import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {Location} from '@angular/common';
import { ToolbarService } from 'src/app/providers/toolbar.service';

@Component({
  standalone: true,
  selector: 'app-back-buttons',
  templateUrl: './back-buttons.component.html',
  styleUrls: ['./back-buttons.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule,],
})
export class BackButtonsComponent  implements OnInit {

  textoToolbar = ""

  constructor(
    private toolbarService: ToolbarService,
    private location: Location,
  ) { }

  ngOnInit() {
    // console.log('ON INIT BACK BUTTON')
    this.textoToolbar = this.toolbarService.getTexto();
    // this.irAtras();
    // <app-back-buttons></app-back-buttons>
  }

  irAtras(){
    this.location.back();
  }

}
