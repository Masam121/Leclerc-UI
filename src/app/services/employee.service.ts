/**
 * Created by marcelsm on 2017-08-23.
 */
import { HttpClient  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import {of} from "rxjs/observable/of";
import {MessageService} from "./messageService";

import { EmployeeNetflix } from '../shared/employeeNetflix';
import { EmployeeNetflixDetail } from '../shared/employeeNetflixDetail';
import { TaskInfo } from "../shared/taskInfo";
import { environment } from '../../environments/environment';



@Injectable()
export class EmployeeService {
  private APIUrl = environment.Url + 'employe/';//URL to web API

  //http://localhost:58640/api/employe/
  //http://projet.dev.gbl/api/employe/

  constructor(private http: HttpClient, private messageService : MessageService) { }
  //GET
  getEmployeeTaskInfo(id: number): Observable<TaskInfo> {
    return this.http.get<TaskInfo>(this.APIUrl + String(id) + '/task')
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError<TaskInfo>('getProjectTaskInfo'))
      );
  }

  getEmployee(id: string): Observable<EmployeeNetflixDetail> {
    var url = this.APIUrl + id;
    return this.http.get<EmployeeNetflixDetail>(url)
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError<EmployeeNetflixDetail>('getProjectTaskInfo'))
      );
  }

  getEmployeeRatio(id: number) : Observable<number>{
    return this.http.get<number>(this.APIUrl + String(id) + '/ratio')
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError<number>('getProjectTaskInfo'))
      );
  }

  getOverloadedProjectManager(): Observable<EmployeeNetflix[]> {
    return this.http.get<EmployeeNetflix[]>(this.APIUrl + 'project-manager/overloaded')
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError('getProjectTaskInfo', []))
      );
  }

  refreshEmployees(): Observable<any> {
    return this.http.get<any>(this.APIUrl + 'refresh')
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError('getProjectTaskInfo', []))
      );
  }

  //POST
  postEmployeeRatio(id: number, ratio: string) : Observable<any>{
    let params = new URLSearchParams();
    params.set('ratio', ratio);
    return this.http.post<any>(this.APIUrl + String(id) + '/ratio?ratio='+ ratio, {search : params})
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
