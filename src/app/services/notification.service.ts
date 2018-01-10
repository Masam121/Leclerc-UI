/**
 * Created by marcelsm on 2017-10-13.
 */
import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import {Notification} from "../shared/notification";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./messageService";
import {WorkloadData} from "../shared/workloadData";
import {EmployeeMonthlyWorkloadData} from "../shared/employeeMonthlyWorkloadData";
import { environment } from '../../environments/environment';

@Injectable()
export class NotificationService {
  private APIUrl = environment.Url + 'notification/';

  //http://projet.dev.gbl/api/notification/
  //http://localhost:58640/api/notification/
  constructor(private http: HttpClient, private messageService : MessageService) { }

  getNotification(id :string): Observable<Notification> {
    return this.http.get<Notification>(this.APIUrl + id )
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError<Notification>('getProjectTaskInfo'))
      );
  }

  getNotifications(): Observable<Notification[]>{
    return this.http.get<Notification[]>(this.APIUrl)
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError('getProjectTaskInfo', []))
      );
  }

  getActiveNotifications(): Observable<Notification[]>{
    return this.http.get<Notification[]>(this.APIUrl + "active")
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError('getProjectTaskInfo', []))
      );
  }

  getDepartementalNotification(departmentId: string): Observable<Notification[]>{
    return this.http.get<Notification[]>(this.APIUrl + 'department/' + departmentId)
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError('getProjectTaskInfo', []))
      );
  }

  getProjectNotifications(projectId: string): Observable<Notification[]>{
    return this.http.get<Notification[]>(this.APIUrl + "project/" + projectId)
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError('getProjectTaskInfo', []))
      );
  }

  getEmployeeNotifications(employeeId: string): Observable<Notification[]>{
    return this.http.get<Notification[]>(this.APIUrl + "employee/" + employeeId)
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError('getProjectTaskInfo', []))
      );
  }

  getEmployeeNotificationsForSpecifiedMonth(employeeId: string, month: string): Observable<Notification[]>{
    return this.http.get<Notification[]>(this.APIUrl + "employee/" + employeeId + "/" + month)
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError('getProjectTaskInfo', []))
      );
  }

  getEmployeeNotificationsWorkload(id :number): Observable<WorkloadData> {
    return this.http.get<WorkloadData>(this.APIUrl + 'employee/' + id + '/workload')
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError<WorkloadData>('getProjectTaskInfo'))
      );
  }

  getEmployeesNotificationsWorkload(): Observable<EmployeeMonthlyWorkloadData> {
    return this.http.get<EmployeeMonthlyWorkloadData>(this.APIUrl + 'employee/workload')
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError<EmployeeMonthlyWorkloadData>('getProjectTaskInfo'))
      );
  }

  refreshNotifications(): Observable<any> {
    return this.http.get<any>(this.APIUrl + 'refresh')      .pipe(
      tap(TaskInfo => this.log(`fetched project task info`)),
      catchError(this.handleError('getProjectTaskInfo', []))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }
}
