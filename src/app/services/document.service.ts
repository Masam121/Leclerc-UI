/**
 * Created by marcelsm on 2017-09-29.
 */
import { Headers, Http, HttpModule  } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {ProjectDocument} from "../shared/projectDocument";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";
import {MessageService} from "./messageService";
import { environment } from '../../environments/environment';

@Injectable()
export class DocumentService {
  private APIUrl = environment.Url + 'document/';//URL to web API

  //http://projet.dev.gbl/api/document/
  //http://localhost:58640/api/document/

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService : MessageService) {
  }

  //GET
  getProjectDocuments(id: number): Observable<ProjectDocument[]> {
    return this.http.get<ProjectDocument[]>(this.APIUrl + String(id))
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError('getProjectTaskInfo', []))
      );
  }
  //POST
  postDocument(document : ProjectDocument | any) : Observable<any>{
    return this.http.post<ProjectDocument>(this.APIUrl, document, this.httpOptions)
      .pipe(
        tap(TaskInfo => this.log(`fetched project task info`)),
        catchError(this.handleError('getProjectTaskInfo', []))
      );
  }
  //DELETE
  deleteDocument(document : ProjectDocument | any) : Observable<any>{
    return this.http.delete<ProjectDocument>(this.APIUrl + document.id, this.httpOptions)
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
