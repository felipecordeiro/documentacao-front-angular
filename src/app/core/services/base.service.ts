import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, tap } from 'rxjs/operators';
import { environment } from "src/environments/environment";

export class BaseService<T> {

  protected URL: string
  protected token: string

  constructor(protected http: HttpClient, protected endpoint: string) {

    this.URL = `${environment.DEV_API}${this.endpoint}`

  }

  getObjects(): Observable<T[]> {
    return this.http.get<T[]>(`${this.URL}`)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  get(id: number): Observable<T> {
    return this.http.get<T>(`${this.URL}${id}`)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  put(id: number, obj: T): Observable<T> {
    return this.http.put<T>(`${this.URL}/${id}`, obj)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  post(obj: T): Observable<T> {
    return this.http.post<T>(`${this.URL}`, obj)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  delete(id: number): Observable<T> {
    return this.http.delete<T>(`${this.URL}${id}`)
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  protected handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
