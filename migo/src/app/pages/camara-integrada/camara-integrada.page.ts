// src/app/pages/photo.page.ts
import { Component } from '@angular/core';
import { CamaraService } from 'src/app/providers/camara.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-camara-integrada',
  templateUrl: './camara-integrada.page.html',
  styleUrls: ['./camara-integrada.page.scss'],
})
export class CamaraIntegradaPage {
  constructor(private cameraService: CamaraService, private router:Router) {}

  async takePhoto() {
    const photoPath = await this.cameraService.takePhoto();
    this.router.navigate(['/previous-page', { photoPath }]);
  }

}
