import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Http} from "@angular/http";
import {LangChangeEvent, TranslateService} from "@ngx-translate/core";
import {ActivatedRoute, Params, Router} from "@angular/router";

import {TaskService} from "../../services/task.service";
import {Task} from "../../shared/task";

@Component({
  selector: 'app-notification-task-data-table',
  templateUrl: './notification-task-data-table.component.html',
  styleUrls: ['./notification-task-data-table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationTaskDataTableComponent implements OnInit {
  public rows: Task[] = [];
  public temp: Task[];
  public placeholder: string = "Search by name...";
  public filtred : boolean;

  constructor(private taskService: TaskService,
              private http:Http,
              public translate: TranslateService,
              public route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.getTasks();
  }

  private getTasks() {
    this.route.params.switchMap((params: Params) => this.taskService.getNotificationTasks(params['id'])).subscribe(
      data => {
        this.rows = data;
        console.log(this.rows)
        this.temp = [...data];
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    // filter our data
    this.rows = this.temp.filter(function(d){
      return d.inChargeName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    //Set filter
    if (val == ''){
      this.filtred = false;
    }
    else{
      this.filtred = true;
    }
  }

  filterStackedBarGraph(myStatus : string, myName : string){
    const temp2 = this.temp;
    this.temp = this.temp.filter(function(d){
      return d.inChargeName.toLowerCase().indexOf(myName) !== -1 || !myName;
    });

    this.rows = this.temp.filter(function(d){
      return d.status.toLowerCase().indexOf(myStatus) !== -1 || !myStatus;
    });
    this.filtred = true;
    this.temp = temp2;
  }

  public filterCircleGraph(myStatus : string){
    const temp2 = this.temp;
    this.rows = this.temp.filter(function(d){
      return d.status.toLowerCase().indexOf(myStatus) !== -1 || !myStatus;
    });
    this.filtred = true;
    this.temp = temp2;
  }

  public resetFilter(){
    this.rows = this.temp;
    this.filtred = false;
  }
}
