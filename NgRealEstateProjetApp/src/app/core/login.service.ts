import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly CURRENT_USER = 'CURRENT_USER';

  private loggedUser: string;

  constructor(private http: HttpClient) {}
//fake login
  login(user: { username: string, password: string }): Observable<any> {
   debugger;
    return this.http.get('https://jsonplaceholder.typicode.com/posts/1').pipe(switchMap((response: any) => { 
    localStorage.setItem(this.JWT_TOKEN, response.id);
      return this.http.get('https://jsonplaceholder.typicode.com/users/1').pipe((map((user: any) => {
        user.role = 'ROLE_ADMIN';
        localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
        return user;
      })))
    }))
  }

//Login
/*
  login(user: { username: string, password: string }): Observable<any> {
    debugger;
     return this.http.post<any>('https://jsonplaceholder.typicode.com/posts/1').pipe(switchMap((response: any) => { 
     localStorage.setItem(this.JWT_TOKEN, response.id);
       return this.http.get('https://jsonplaceholder.typicode.com/users/1').pipe((map((user: any) => {
         localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
         return user;
       })))
     }))
   }
*/

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.JWT_TOKEN);  
  }

  getJwtToken(): any{
    return localStorage.getItem(this.JWT_TOKEN);
  }
  
  getCurentUser(): any {
    return JSON.parse(localStorage.getItem(this.CURRENT_USER));
  }
}
