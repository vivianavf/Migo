import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RecorridoRealizado } from 'src/app/interfaces/recorrido-realizado';
import { RecorridoRealizadoService } from 'src/app/providers/recorrido-realizado.service';

@Component({
  selector: 'app-finalizando-recorrido',
  templateUrl: './finalizando-recorrido.page.html',
  styleUrls: ['./finalizando-recorrido.page.scss'],
})
export class FinalizandoRecorridoPage implements OnInit {
  @Input() recorrido!: RecorridoRealizado;

  constructor(
    private recorridoService: RecorridoRealizadoService,
    private modalCtrl: ModalController,
    private router: Router
  ) {}

  ngOnInit() {
    this.recorridoService
      .crearRecorrido(this.recorrido)
      .subscribe((response) => {
        setTimeout(() => {
          this.modalCtrl.dismiss();
          location.reload();
          this.router.navigate(['/home']);
        }, 3000);
      });
  }
}
