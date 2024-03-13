import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class RegistroConductorService {

  conductor?: User;

  constructor() { }

  setConductor(conductor: User){
    this.conductor = conductor;
  }

  getConductor(){
    return this.conductor;
  }

}
