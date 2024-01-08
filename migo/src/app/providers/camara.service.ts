import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class CamaraService {
  async takePhoto(): Promise<string> {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100
      });

      return image.webPath ?? '';
    } catch (error) {
      console.error('Error capturing photo', error);
      return ''; // Handle error as needed
    }
  }
}