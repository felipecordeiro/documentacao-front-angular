import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<any> {
  
  isLoggedIn: boolean = false

  constructor(
    protected http: HttpClient) {
    super(http, 'login');
  }

  logIn(email: string, senha: string): Observable<HttpResponse<Object>> {
    let obj = {
      email: email,
      senha: senha
    }
    return this.http.post<HttpResponse<Object>>(`${this.URL}`, obj, { observe: 'response' })
      .pipe(
        tap(r => {
          this.token = r.body['Authorization']
          this.token ? this.isLoggedIn = true : this.isLoggedIn = false
        }),
        catchError(this.handleError)
      );
  }

  getAuthorizationToken(){
    return this.token
  }

  logOut() {
    this.isLoggedIn = false
    this.token = null
  }
}
