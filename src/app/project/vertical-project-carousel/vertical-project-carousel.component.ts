import {Component, OnInit, ViewChild, ElementRef, Inject, Input} from '@angular/core';
import {PageScrollService, PageScrollInstance} from 'ng2-page-scroll';
import {DOCUMENT} from '@angular/platform-browser'

import { ProjectNetflix } from '../../shared/projectNetflix';

@Component({
  selector: 'app-vertical-project-carousel',
  templateUrl: './vertical-project-carousel.component.html',
  styleUrls: ['./vertical-project-carousel.component.css']
})
export class VerticalProjectCarouselComponent implements OnInit {
  @Input() connexProjects: ProjectNetflix[];
  @ViewChild('ConnexeProjectsContainer') public ConnexeProjectsContainer: ElementRef;
  public gridIndex = 0;
  public elementLeft: number;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private pageScrollService: PageScrollService) { }

  isInvalid(): boolean{
    if(this.gridIndex === 0){
      return true;
    }
    else{
      return false;
    }
  }

  public scrollDown() {
    this.gridIndex = (this.gridIndex + 1);
    let numberOfElementInRow = Math.trunc(this.ConnexeProjectsContainer.nativeElement.offsetHeight/ 250);
    this.elementLeft = this.connexProjects.length - numberOfElementInRow;

    if((this.elementLeft) < this.gridIndex ){
      this.gridIndex = 0;
    }
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({
      document: this.document,
      scrollTarget: '#grid' + this.gridIndex.toString(),
      scrollingViews: [this.ConnexeProjectsContainer.nativeElement],
      pageScrollDuration: 250
    });
    this.pageScrollService.start(pageScrollInstance);
  }

  public scrollUp() {
    this.gridIndex = (this.gridIndex - 1);
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({
      document: this.document,
      scrollTarget: '#grid' + this.gridIndex,
      scrollingViews: [this.ConnexeProjectsContainer.nativeElement],
      pageScrollDuration: 250
    });
    this.pageScrollService.start(pageScrollInstance);

  }

  ngOnInit() {
  }

}
