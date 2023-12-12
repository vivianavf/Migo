import { ElementRef, Injectable, ViewChild } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabsService {

  public showTab: boolean = false;
  // @ViewChild('tabBar', { read: ElementRef, static: true })
  // tabBar!: ElementRef;

  constructor(
    // private renderer: Renderer2,
  ) { }

  showTabs(){
    const tabBar = document.getElementById('tabBar');
    if(tabBar){
      tabBar.style.display = 'flex';
    }
  }

  hideTabs(){
    const tabBar = document.getElementById('tabBar');
    if(tabBar){
      tabBar.style.display = 'none';
    }
    // const tabBar = this.tabBar.nativeElement;
    // this.renderer.setAttribute(tabBar,'display', "none")
  }

}
