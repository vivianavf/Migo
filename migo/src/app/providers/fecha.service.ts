import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FechaService {

  constructor() { }

  esMayordeEdad(fechaInput: Date): boolean{
    const fechaNacimientoDate = fechaInput;
    // Calcula la fecha actual
    const fechaActual = new Date();
    const diferenciaMilisegundos =
      new Date(fechaActual).getTime() - new Date(fechaNacimientoDate).getTime();

    // Calcula la edad dividiendo la diferencia de tiempo por la cantidad de milisegundos en un año
    const edad = diferenciaMilisegundos / (1000 * 60 * 60 * 24 * 365.25);

    // Comprueba si la persona tiene al menos 18 años
    return edad >= 18;
  }
}
