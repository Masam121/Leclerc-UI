import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NotificationTaskDataTableComponent} from "../../notification/notification-task-data-table/notification-task-data-table.component";

@Component({
  selector: 'app-project-notificcation-detail',
  templateUrl: './project-notification-detail.component.html',
  styleUrls: ['./project-notification-detail.component.css']
})
export class ProjectNotificcationDetailComponent implements OnInit {
  @ViewChild("taskDataTable")
  private taskDataTable: NotificationTaskDataTableComponent;

  public status: string;
  public name: string;
  public test: string;

  @Input() public projectName: string;

  constructor() { }

  ngOnInit() {
    this.test = this.projectName;
  }

  filterStackedBarGraphEvent(event){
    this.name = event[0].name.toLowerCase();
    this.status = event[1].toLowerCase();
    this.taskDataTable.filterStackedBarGraph(this.status, this.name);
  }

  filterCircleGraphEvent(event){
    this.status = event.toLowerCase();
    this.taskDataTable.filterCircleGraph(this.status);
  }
}
