import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmpresaImages } from '../interfaces/empresa-images';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaImagesService {

  private baseURL =
    'https://migoadvs.pythonanywhere.com/Database/Database/empresaimages/';
  private formato = '?format=json';
  public empresaImagesObtenidas : EmpresaImages[] = [];
  private rutaLogos = 'https://migoadvs.pythonanywhere.com/logos/';
  private rutaBanners = 'https://migoadvs.pythonanywhere.com/banners/';

  constructor(
    private http: HttpClient,
  ) { }

  getImages(): Observable<EmpresaImages[]> {
    const respuesta = this.http.get<EmpresaImages[]>(this.baseURL+this.formato);
    respuesta.forEach((images)=>{
      this.empresaImagesObtenidas = images;
    })
    return respuesta;
  }

  getImagebyId(id?: number): Observable<EmpresaImages> {
    return this.http.get<EmpresaImages>(this.baseURL + id + '/' + this.formato);
  }

  getLogoURLbyEmpresaId(idEmpresa: number, images: EmpresaImages[]): string{
    const image = images.find((image)=> idEmpresa === image.id_empresa && image.estado === 1)
    const arrayURL = String(image?.logo).split('/')
    const URL = arrayURL[arrayURL.length-1]
    return image?this.rutaLogos+URL:'';
  }

  getBannerURLbyEmpresaId(idEmpresa: number, images: EmpresaImages[]): string{
    const image = images.find((image)=> idEmpresa === image.id_empresa && image.estado === 1)
    const arrayURL = String(image?.banner).split('/')
    const URL = arrayURL[arrayURL.length-1]
    return image?this.rutaBanners+URL:'';
  }


}
