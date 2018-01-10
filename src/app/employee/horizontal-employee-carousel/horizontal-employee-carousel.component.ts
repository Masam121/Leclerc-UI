import {Component, OnInit, ViewChild, ElementRef, Inject, Input, AfterViewInit,} from '@angular/core';
import {PageScrollService, PageScrollInstance} from 'ng2-page-scroll';
import {DOCUMENT} from '@angular/platform-browser'

import {EmployeeNetflix} from "../../shared/employeeNetflix";

@Component({
  selector: 'app-horizontal-employee-carousel',
  templateUrl: './horizontal-employee-carousel.component.html',
  styleUrls: ['./horizontal-employee-carousel.component.css']
})

export class HorizontalEmployeeCarouselComponent implements AfterViewInit {
  @Input() employeesList: EmployeeNetflix[];
  @Input() carouselHeaderName : string;
  @ViewChild('horizontalCarouselContainer') public horizontalCarouselContainer: ElementRef;
  @ViewChild('row') public row: ElementRef;
  public gridIndex: number;
  public elementLeft: number;
  public scroll: boolean;
  public isSingle: boolean;

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
    let numberOfElementInRow = Math.trunc(this.row.nativeElement.offsetWidth/ 250);
    this.elementLeft = this.employeesList.length - numberOfElementInRow;

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
    if (this.employeesList.length <= 1){
      this.isSingle = true;
    };
  }

  ngAfterViewInit(){
    setTimeout(_=> this.scroll = this.isVisible());
  }
}
