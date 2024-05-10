import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-tips',
  templateUrl: './tips.page.html',
  styleUrls: ['./tips.page.scss'],
})
export class TipsPage implements OnInit {

  videoURL: any = 'https://www.youtube.com/embed/D0UnqGm_miA'

  constructor(
    private domSnt: DomSanitizer,
  ) { }

  ngOnInit() {
  }
  
  showVideo(video: any){
    return this.domSnt.bypassSecurityTrustResourceUrl(video);
  }

}
