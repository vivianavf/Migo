import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-fotopreview',
  templateUrl: './fotopreview.page.html',
  styleUrls: ['./fotopreview.page.scss'],
})
export class FotopreviewPage implements OnInit {

  @Input() FotoURL: any;

  constructor(
    private modalCtrl: ModalController,
  ) { }

  ngOnInit() {
  }

  cerrarModal(){
    this.modalCtrl.dismiss();
  }

}
