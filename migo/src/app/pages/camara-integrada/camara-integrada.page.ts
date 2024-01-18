// src/app/pages/photo.page.ts
import { Component } from '@angular/core';
import { CamaraService } from 'src/app/providers/camara.service';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-camara-integrada',
  templateUrl: './camara-integrada.page.html',
  styleUrls: ['./camara-integrada.page.scss'],
})
export class CamaraIntegradaPage {
  constructor(private cameraService: CamaraService, private router:Router) {}

  cameraImage: string | null = null;

  async takePhoto(): Promise<void> {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });

      this.cameraImage = image.webPath ?? null;
    } catch (error) {
      console.error('Error capturing photo', error);
    }
  }

}
