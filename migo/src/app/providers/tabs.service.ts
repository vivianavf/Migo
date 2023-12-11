import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabsService {

  public showTab: boolean = false;

  constructor() { }

  showTabs(){
    this.showTab = true;
  }

  hideTabs(){
    this.showTab = false;
  }

}
