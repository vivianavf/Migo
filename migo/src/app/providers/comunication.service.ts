import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ComunicationService {

  private variableSubject = new BehaviorSubject<any>(null);
  variable$: Observable<any> = this.variableSubject.asObservable();

  constructor() { }

  sendVariable(data:any){
    this.variableSubject.next(data)
  }

}
