import { Component, OnInit } from '@angular/core';

import { ProjectService } from '../services/project.service';
import {NotificationService} from "../services/notification.service";
import {EmployeeService} from "../services/employee.service";
import {OutlookService} from "../services/outlook.service";

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.css']
})
export class RefreshComponent implements OnInit {

  constructor(private projectService: ProjectService,
              private notificationService: NotificationService,
              private employeeService: EmployeeService,
              private outlookService: OutlookService) { }

  refresh(event): void {
    this.projectService.refreshProjects().subscribe(res => console.log(res));
    this.notificationService.refreshNotifications().subscribe(res => console.log(res));
    this.employeeService.refreshEmployees().subscribe(res => console.log(res));
    this.outlookService.refreshEmployees().subscribe(res => console.log(res));
  }

  ngOnInit() {
    //this.refresh();
  }
}
