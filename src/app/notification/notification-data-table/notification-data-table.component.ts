import {AfterViewInit, Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Http} from "@angular/http";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {Notification} from "../../shared/notification";

@Component({
  selector: 'app-notification-data-table',
  templateUrl: './notification-data-table.component.html',
  styleUrls: ['./notification-data-table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationDataTableComponent implements OnInit, AfterViewInit {
  @Input() public rows: Notification[] = [];
  @Input() public temp : Notification[];

  private myFilter : string;
  private filtred : boolean;
  private placeholder : string = "search notifications's description...";
  private departments : string[];
  @ViewChild('myTable') table: any;

  constructor(private http:Http,
              public translate: TranslateService,
              private router: Router) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTranslation(event.lang);
    });
  }

  ngOnInit() {
    this.setTranslation(this.translate.currentLang);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.table.recalculate();
      window.dispatchEvent(new Event('resize'));
    }, 250);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    this.rows = this.temp.filter(function(d){
      return d.description.toLowerCase().indexOf(val) !== -1 || !val;
    });
    if (val == ''){
      this.filtred = false;
    }
    else{
      this.filtred = true;
    }
    this.table.offset = 0;
  }

  getCellClass({ row, column, value }): any {
    return {
      'is-good': value > row.comparator,
      'is-late': value + 20 < row.comparator,
    };
  }

  onSelect({selected}) {
    //this.gotoDetail(selected[0].id);
  }

  gotoDetail(row): void{
    this.router.navigate(['/notification', row.id]);
  }

  public setTranslation(lang : string) : void{
    this.http.get('./assets/i18n/' + lang + '.json').subscribe(res => {
      this.departments = res.json().Project.departments;
    });
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }
}
