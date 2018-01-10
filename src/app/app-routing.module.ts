/**
 * Created by marcelsm on 2017-05-25.
 */
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { ProjectGridComponent }   from './project/project-grid/project-grid.component';
import { ProjectDetail }  from './project/project-detail/project-details.component'
import { EmployeeDetail }  from './employee/employee-detail/employee-detail.component';
import { EmployeeComponent } from './employee/employees/employee.component'
import {NotificationComponent} from "./notification/notifications/notification.component";
import {NotificationDetailsComponent} from "./notification/notification-details/notification-details.component";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: '/projects',
    pathMatch: 'full'
  },
  {
    path: 'projects',
    component: ProjectGridComponent
  },
  {
    path: 'project/:id',
    component: ProjectDetail
  },
  {
    path: 'employee/:id',
    component: EmployeeDetail
  },
  {
    path: 'employees',
    component: EmployeeComponent
  },
  {
    path: 'notifications',
    component: NotificationComponent
  },
  {
    path: 'notification/:id',
    component: NotificationDetailsComponent
  }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
