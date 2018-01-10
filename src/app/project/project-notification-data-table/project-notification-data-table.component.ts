import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Http} from "@angular/http";
import {TranslateService} from "@ngx-translate/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";

import {Notification} from "../../shared/notification";

@Component({
  selector: 'app-project-notification-data-table',
  templateUrl: './project-notification-data-table.component.html',
  styleUrls: ['./project-notification-data-table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProjectNotificationDataTableComponent implements OnInit {
  public rows: Notification[] = [];
  public temp: Notification[];
  public placeholder: string = "Search by description...";
  private filtred : boolean;
  @ViewChild('myTable') table: any;

  constructor(private notificationService: NotificationService,
              private http:Http,
              public translate: TranslateService,
              public route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.getProjectNotifications();
  }

  private getProjectNotifications() {
    this.route.params.switchMap((params: Params) => this.notificationService.getProjectNotifications(params['id'])).subscribe(
      data => {
        console.log(data);
        this.rows = data;
        console.log(this.rows);
        this.temp = [...data];
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
  }

  getCellClass({ row, column, value }): any {
    return {
      'is-good': value > row.comparator,
      'is-late': value + 20 < row.comparator,
    };
  }

  filterStackedBarGraph(myStatus : string, myName : string){
    /*const temp2 = this.temp;
    this.temp = this.temp.filter(function(d){
      return d.inChargeName.toLowerCase().indexOf(myName) !== -1 || !myName;
    });

    this.rows = this.temp.filter(function(d){
      return d.status.toLowerCase().indexOf(myStatus) !== -1 || !myStatus;
    });
    this.filtred = true;
    this.temp = temp2;*/
  }

  public filterCircleGraph(myStatus : string){
    const temp2 = this.temp;
    this.rows = this.temp.filter(function(d){
      return d.status.toLowerCase().indexOf(myStatus) !== -1 || !myStatus;
    });
    this.filtred = true;
    this.temp = temp2;
  }

  public resetFilter() {
    this.rows = this.temp;
    this.filtred = false;
  }

  onSelect({selected}) {
    //this.gotoDetail(selected[0].id);
  }

  toggleExpandRow(row) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  gotoDetail(row): void{
    this.router.navigate(['/notification', row.id]);
  }
}
