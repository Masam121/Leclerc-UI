import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NotificationTaskDataTableComponent} from "../notification-task-data-table/notification-task-data-table.component";
import {NotificationService} from "../../services/notification.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Notification} from "../../shared/notification";

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.css']
})
export class NotificationDetailsComponent implements OnInit {
  @ViewChild("taskDataTable")
  private taskDataTable: NotificationTaskDataTableComponent;
  @ViewChild("container")
  private container: ElementRef;
  public notification : Notification;
  public status: string;
  public name: string;

  constructor(public notificationService: NotificationService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.switchMap((params: Params) => this.notificationService.getNotification(params['id'])).subscribe(
      notification => {
        this.notification = notification;
      })
  }

  filterStackedBarGraphEvent(event){
    this.name = event[0].name.toLowerCase();
    this.status = event[1].toLowerCase();
    this.taskDataTable.filterStackedBarGraph(this.status, this.name);
    this.scrollToBottom();
  }

  filterCircleGraphEvent(event){
    this.status = event.toLowerCase();
    this.taskDataTable.filterCircleGraph(this.status);
    this.scrollToBottom();
  }

  scrollToBottom() : void{
    this.container.nativeElement.scrollDown();
  }

}
