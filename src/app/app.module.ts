import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';

import {AppRoutingModule} from './app-routing.module'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTooltipModule, MatSelectModule, MatGridListModule, MatIconModule, MatSliderModule, MatTabsModule, MatCardModule, MatInputModule, MatProgressBarModule, MatProgressSpinnerModule} from '@angular/material';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PaginationModule } from 'ngx-bootstrap';
import { Ng2CompleterModule } from "ng2-completer";
import { ChartModule } from 'angular2-highcharts';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import * as highcharts from 'highcharts';

import 'hammerjs';

import { VerticalProjectCarouselComponent } from './project/vertical-project-carousel/vertical-project-carousel.component';
import { SearchComponent } from './search/search.component';
import { EmployeeComponent } from './employee/employees/employee.component';
import { SliderComponent } from './slider/slider.component';
import { HorizontalEmployeeCarouselComponent } from './employee/horizontal-employee-carousel/horizontal-employee-carousel.component';
import { EmployeeCardComponent } from './employee/employee-card/employee-card.component';
import { ProjectCardComponent } from './project/project-card/project-card.component';
import { ManagerCardComponent } from './project/manager-card/manager-card.component';
import { AppComponent } from './app.component';
import { DashboardComponent }  from './dashboard/dashboard.component';
import { ProjectGridComponent }  from './project/project-grid/project-grid.component';
import { ProjectDetail}  from './project/project-detail/project-details.component';
import { EmployeeDetail }  from './employee/employee-detail/employee-detail.component';
import { HorizontalProjectsCarousel} from './project/horizontal-projects-carousel/horizontal-projects-carousel.component'
import { ContributorGridComponent } from './project/contributor-grid/contributor-grid.component';
import { DrawerComponent } from './drawer/drawer.component';
import { DocumentComponent } from './project/document/document.component';
import { RefreshComponent } from './refresh/refresh.component';
import { NotificationComponent } from './notification/notifications/notification.component';
import { NotificationDetailsComponent } from './notification/notification-details/notification-details.component';
import { NotificationCircleGraphComponent } from './notification/notification-circle-graph/notification-circle-graph.component';
import { NotificationDataTableComponent } from './notification/notification-data-table/notification-data-table.component';
import { NotificationTaskDataTableComponent } from './notification/notification-task-data-table/notification-task-data-table.component';
import { NotificationStackedBarChartComponent } from './notification/notification-stacked-bar-chart/notification-stacked-bar-chart.component';
import { ProjectNotificcationDetailComponent } from './project/project-notification-detail/project-notification-detail.component';
import { ProjectNotificationDataTableComponent } from './project/project-notification-data-table/project-notification-data-table.component';
import { ProjectNotificationsTasksCircleGraphComponent } from './project/project-notifications-tasks-circle-graph/project-notifications-tasks-circle-graph.component';
import { ProjectNotificationTasksStackedBarChartComponent } from './project/project-notification-tasks-stacked-bar-chart/project-notification-tasks-stacked-bar-chart.component';
import { EmployeeTaskDetailContainerComponent } from './employee/employee-task-detail-container/employee-task-detail-container.component';
import { WorkflowGraphComponent } from './employee/workflow-graph/workflow-graph.component';
import { EmployeeWorkloadDataTableComponent } from './employee/employee-workload-data-table/employee-workload-data-table.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';

export function highchartsFactory() {
  return highcharts;
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProjectGridComponent,
    ProjectDetail,
    EmployeeDetail,
    HorizontalProjectsCarousel,
    ContributorGridComponent,
    VerticalProjectCarouselComponent,
    SearchComponent,
    EmployeeComponent,
    SliderComponent,
    HorizontalEmployeeCarouselComponent,
    EmployeeCardComponent,
    ProjectCardComponent,
    ManagerCardComponent,
    DrawerComponent,
    DocumentComponent,
    RefreshComponent,
    NotificationComponent,
    NotificationDetailsComponent,
    NotificationCircleGraphComponent,
    NotificationDataTableComponent,
    NotificationTaskDataTableComponent,
    NotificationStackedBarChartComponent,
    ProjectNotificcationDetailComponent,
    ProjectNotificationDataTableComponent,
    ProjectNotificationsTasksCircleGraphComponent,
    ProjectNotificationTasksStackedBarChartComponent,
    EmployeeTaskDetailContainerComponent,
    WorkflowGraphComponent,
    EmployeeWorkloadDataTableComponent,
    ProgressSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatSelectModule,
    MatGridListModule,
    MatIconModule,
    MatTabsModule,
    HttpModule,
    MatProgressBarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    Ng2CompleterModule,
    AppRoutingModule,
    NgxDatatableModule,
    ChartModule,
    MatSliderModule,
    Ng2PageScrollModule.forRoot(),
    PaginationModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    },
    { provide: 'Window',
      useValue: window
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
