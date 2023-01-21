import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";

import { environment } from '../../../environments/environment';
import { AuthResponse, User } from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.baseUrl
  private _user!: User;
  
  get user(){
    return { ...this._user };
  }

  constructor( private _http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const url = `${this._baseUrl}/login`
    const body = { email, password };

    return this._http.post<AuthResponse>(url, body).pipe(
      tap( response =>{ 
        if (response.ok) {
          sessionStorage.setItem('token', response.token!)
        }
      }),
      map( response => response.ok ),
      catchError( error => of(error.error.msg) )

    );
  }

  register(name: string, email: string, password: string): Observable<any>{

    const url = `${this._baseUrl}/new`;
    const body = { name, email, password }

    return this._http.post<AuthResponse>(url, body).pipe(
        tap( ({ok, token}) =>{
          if (ok) {
            sessionStorage.setItem('token', token!)
          }
        }),
        map( response => response.ok ),
        catchError( error => of(error.error.msg))
    )

  }


  validateToken():Observable<boolean>{
    const url = `${this._baseUrl}/renew`;
    const headers = new HttpHeaders().set('x-token', sessionStorage.getItem('token') || '');

    return this._http.get<AuthResponse>(url, { headers })
               .pipe(
                  map(({ok, ...response}) => {
                      sessionStorage.setItem('token', response.token!)
                      this._user = { 
                        name: response.name!, 
                        uid: response.uid!, 
                        email: response.email!
                      };
                      return ok
                  }),
                  catchError(error => of(false))
               )
  }

  logout():void {
    sessionStorage.removeItem('token');
  }

}

