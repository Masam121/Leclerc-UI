import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "./messageService";
import {Observable} from "rxjs/Observable";
import {of} from "rxjs/observable/of";
import {catchError, tap} from "rxjs/operators";
/**
 * Created by marcelsm on 2018-01-10.
 */

@Injectable()
export class OutlookService {
  private APIUrl = environment.Url + 'outlook/';//URL to web API

  constructor(private http: HttpClient, private messageService : MessageService) { }
  //GET

  refreshEmployees(): Observable<any> {
    return this.http.get<any>(this.APIUrl + 'refresh')
      .pipe(
        tap(TaskInfo => this.log(`refresh outlook tasks`)),
        catchError(this.handleError('refreshOutlookTask', []))
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
