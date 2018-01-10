import {Component, Input, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {NotificationService} from "../../services/notification.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Notification} from "../../shared/notification";

@Component({
  selector: 'app-employee-task-detail-container',
  templateUrl: './employee-task-detail-container.component.html',
  styleUrls: ['./employee-task-detail-container.component.css']
})
export class EmployeeTaskDetailContainerComponent implements OnInit {
  public rows : Notification[]= [];
  @Input() public filter: string = "";

  constructor(private notificationService: NotificationService,public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.notificationService.getEmployeeNotifications(params['id'])).subscribe(
      notifications => {
        this.rows = notifications;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    const filter: SimpleChange = changes.filter;
    this.route.params.switchMap((params: Params) => this.notificationService.getEmployeeNotificationsForSpecifiedMonth(params['id'], filter.currentValue)).subscribe(
      notifications => {
        this.rows = notifications;
      });
  }
}
