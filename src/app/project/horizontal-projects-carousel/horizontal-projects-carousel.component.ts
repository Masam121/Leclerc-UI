/**
 * Created by marcelsm on 2017-06-16.
 */
import {Component, ViewChild, ElementRef, Inject, Input, AfterViewInit, OnInit} from '@angular/core';
import {PageScrollService, PageScrollInstance} from 'ng2-page-scroll';
import {DOCUMENT} from '@angular/platform-browser'

import { ProjectNetflix } from '../../shared/projectNetflix';

@Component({
  selector: 'horizontal-carousel',
  templateUrl: './horizontal-projects-carousel.component.html',
  styleUrls: [ './horizontal-projects-carousel.component.css' ],
})

export class HorizontalProjectsCarousel implements AfterViewInit, OnInit{
  @Input() projectsList: ProjectNetflix[];
  @Input() carouselHeaderName : string;
  @ViewChild('horizontalCarouselContainer') public horizontalCarouselContainer: ElementRef;
  @ViewChild('row') public row: ElementRef;
  public gridIndex: number;
  public elementLeft: number;
  public scroll: boolean;
  public isSingle: boolean;
  public timeoutHandler;

  constructor(@Inject(DOCUMENT) private document: any, private pageScrollService: PageScrollService) {
    this.gridIndex = 0;
    this.elementLeft = 0;
    this.scroll = false;
    this.isSingle =false;
  }

  onResize(event) {
    this.scroll = this.isVisible();
  }

  isVisible(): boolean{
    if(this.row.nativeElement.offsetWidth >= this.horizontalCarouselContainer.nativeElement.offsetWidth){
      return true;
    }
  }

  isInvalid(): boolean{
    if(this.gridIndex === 0){
      return true;
    }
    else{
      return false;
    }
  }

  public scrollDown() {
    this.gridIndex++;
    let numberOfElementInRow = Math.trunc(this.row.nativeElement.offsetWidth/ 280);
    this.elementLeft = this.projectsList.length - numberOfElementInRow;
    if((this.elementLeft) < this.gridIndex ){
      this.gridIndex = 0;
    }
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({
      document: this.document,
      scrollTarget: '#tile' + this.gridIndex.toString(),
      scrollingViews: [this.row.nativeElement],
      verticalScrolling: false,
      pageScrollDuration: 250
    });
    this.pageScrollService.start(pageScrollInstance);
  }

  public scrollDownHold() {
    this.timeoutHandler = setInterval(() => {
      console.log("called");
      this.scrollDown();
    }, 300);
  }

  public scrollUpHold() {
    this.timeoutHandler = setInterval(() => {
      console.log("called");
      this.scrollUp();
    }, 300);
  }

  public mouseUp(){
    clearInterval(this.timeoutHandler);
  }

  public scrollUp() {
    this.gridIndex--
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({
      document: this.document,
      scrollTarget: '#tile' + this.gridIndex,
      scrollingViews: [this.row.nativeElement],
      verticalScrolling: false,
      pageScrollDuration: 250
    });
    this.pageScrollService.start(pageScrollInstance);

  }

  ngOnInit() {
    if (this.projectsList.length <= 1){
      this.isSingle = true;
    };
  }

  ngAfterViewInit(){
    setTimeout(_=> {
      this.scroll = this.isVisible();
    });
  }
}
