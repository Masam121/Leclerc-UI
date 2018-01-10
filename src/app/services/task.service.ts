/**
 * Created by marcelsm on 2017-10-31.
 */
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import {Task} from "../shared/task";
import {EffortStatus} from "../shared/effortStatus";
import {Serie} from "../shared/serie";
import {Distribution} from "../shared/Distribution";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";
import {MessageService} from "./messageService";
import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment';


@Injectable()
export class TaskService {
  private APIUrl = environment.Url + 'task/';

  //http://projet.dev.gbl/api/task/
  //http://localhost:58640/api/task/

  constructor(private http: HttpClient, private messageService : MessageService) {
  }

  getNotificationTasks(notificationId: string): Observable<Task[]> {
    return this.http.get<Task[]>(this.APIUrl + "notification/" + notificationId)
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError('getProjectTaskInfo', []))
      );
  }

  getNotificationTasksEffortStatus(notificationId: string): Observable<EffortStatus[]> {
    return this.http.get<EffortStatus[]>(this.APIUrl + "notification/" + notificationId + "/effort")
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError('getProjectTaskInfo', []))
      );
  }

  getNotificationTasksDistribution(notificationId: string): Observable<Distribution> {
    return this.http.get<Distribution>(this.APIUrl + "notification/" + notificationId + "/distribution")
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError<Distribution>('getProjectTaskInfo'))
      );
  }

  getProjectNotificationsTasksEffortStatus(projectId: string): Observable<EffortStatus[]> {
    return this.http.get<EffortStatus[]>(this.APIUrl + "project/" + projectId + "/effort")
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError('getProjectTaskInfo', []))
      );
  }

  getProjectNotificationsTasksDistribution(projectId: string): Observable<Distribution> {
    return this.http.get<Distribution>(this.APIUrl + "project/" + projectId + "/distribution")
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError<Distribution>('getProjectTaskInfo'))
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
