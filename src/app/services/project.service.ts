/**
 * Created by marcelsm on 2017-06-01.
 */
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { ProjectNetflix } from '../shared/projectNetflix';
import {Contributor} from "../shared/contributor";
import { TaskInfo } from "../shared/taskInfo";
import {MessageService} from "./messageService";
import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable()
export class ProjectService {
  private APIUrl = environment.Url + 'project/';     //URL to web API

  //  http://projet.dev.gbl/api/project/
  //  http://localhost:58640/api/project/

  constructor(private http: HttpClient, private messageService : MessageService) { }
//GET
  getProjectTaskInfo(id: number): Observable<TaskInfo> {
    var url = this.APIUrl + String(id) + '/task';
    return this.http.get<TaskInfo>(url)
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError<TaskInfo>('getProjectTaskInfo'))
      );
  }

  getExceedingBudgetProject(): Observable<ProjectNetflix[]> {
    var url = this.APIUrl + 'exceeding-budget'
    return this.http.get<ProjectNetflix[]>(url)
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError('getProjectTaskInfo', []))
      );
  }

  getOverdueProject(): Observable<ProjectNetflix[]> {
    var url = this.APIUrl + 'overdue';
    return this.http.get<ProjectNetflix[]>(url)
      .pipe(
        tap(projects => this.log(`fetched Overdue Projects`)),
        catchError(this.handleError('getOverdueProject', []))
      );
  }

  getProject(id: number) : Observable<ProjectNetflix>{
    var url = this.APIUrl + String(id);
    return this.http.get<ProjectNetflix>(url)
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError<ProjectNetflix>('getProjectTaskInfo'))
      );
  }

  getProjects() : Observable<ProjectNetflix[]>{
    return this.http.get<ProjectNetflix[]>(this.APIUrl)
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError('getProjectTaskInfo', []))
      );
  }

  getEmployeeProjects(id: string): Observable<ProjectNetflix[]> {
    return this.http.get<ProjectNetflix[]>(this.APIUrl + 'employee/' + id)
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError('getProjectTaskInfo', []))
      );
  }

  getProjectContributor(id: number): Observable<Contributor[]> {
    return this.http.get<Contributor[]>(this.APIUrl + id + '/contributor')
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError('getProjectTaskInfo', []))
      );
  }

  getFilteredProjects(filter1 : string, filter2 : string, filter3 : string): Observable<ProjectNetflix[]> {
    return this.http.get<ProjectNetflix[]>(this.APIUrl + 'filter?facility=' + filter1 + '&axeOrganisationnal=' + filter2 + '&department=' + filter3)
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError('getProjectTaskInfo', []))
      );
  }

  refreshProjects(): Observable<any> {
    return this.http.get<any>(this.APIUrl + 'refresh')
      .pipe(
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
