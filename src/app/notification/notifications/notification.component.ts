import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {NotificationService} from "../../services/notification.service";
import {Http} from "@angular/http";
import {Notification} from "../../shared/notification";
import {TranslateService, LangChangeEvent} from '@ngx-translate/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationComponent implements OnInit {
  public rows: Notification[];
  public myFilter : string;
  public filtred : boolean;
  public temp : Notification[];
  public limit : number = 50;
  public limitOptions = [
    {
      key: '5',
      value: 5
    },
    {
      key: '10',
      value: 10
    },
    {
      key: '20',
      value: 20
    },
    {
      key: '50',
      value: 50
    },
    {
      key: '100',
      value: 100
    }
  ];
  public placeholder;
  public rowsPerPagePlaceholder;
  public departments : string[];
  @ViewChild('myTable') table: any;

  constructor(private notificationService: NotificationService,
              private http:Http,
              public translate: TranslateService,
              private router: Router) {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setTranslation(event.lang);
    });
  }

  ngOnInit() {
    this.notificationService.getActiveNotifications().subscribe(
      data => {
        console.log(data);
        this.rows = data;
        this.temp = [...data];
      });
    this.setTranslation(this.translate.currentLang);
  }

  filterNotifications() : void {
    this.notificationService.getDepartementalNotification(encodeURI(this.myFilter))
      .subscribe(notifications => {
        this.rows = notifications;
      });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    this.rows = this.temp.filter(function(d){
      return d.description.toLowerCase().indexOf(val) !== -1 || !val;
    });
    //Set filter
    if (val == ''){
      this.filtred = false;
    }
    else{
      this.filtred = true;
    }
    this.table.offset = 0;
  }

  onSelect({selected}) {
    //this.gotoDetail(selected[0].id);
  }

  getCellClass({ row, column, value }): any {
    return {
      'is-good': value > row.comparator,
      //'is-average': value + 20 > row.comparator < value - 20,
      'is-late': value + 20 < row.comparator,
    };
  }

  getDetailRowHeight(row: any, index : number): number {

   /* console.log(this.rows);*/

    /*if(this.rows[index].partners >= 5) return 200;
    else{
      return (this.rows[index].partners * 45);
    }*/
    return 150;
  }

  gotoDetail(row): void{
    this.router.navigate(['/notification', row.id]);
  }

  public setTranslation(lang : string) : void{
    this.http.get('./assets/i18n/' + lang + '.json').subscribe(res => {
      this.departments = res.json().Project.departments;
      this.placeholder = res.json().Notifications.search;
      this.rowsPerPagePlaceholder = res.json().Notifications.rowsPerPage;
    });
  }
  onPageSizeChanged(event){
    this.table.limit = event;
    this.rows = this.rows.slice();
  }

  toggleExpandRow(row) {

    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }
}
