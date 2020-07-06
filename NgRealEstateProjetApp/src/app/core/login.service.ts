import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Agent } from '@shared/models/Agent.model';
import { Role } from '@shared/models/role.model';
import { MenuService } from './bootstrap/menu.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly CURRENT_USER = 'CURRENT_USER';

  private loggedUser: string;

  constructor(private http: HttpClient, private menuService: MenuService) {}
/*
  login(user: { username: string, password: string }): Observable<any> {
     return this.http.get('https://jsonplaceholder.typicode.com/posts/1').pipe(switchMap((response: any) => { 
     localStorage.setItem(this.JWT_TOKEN, response.id);
       return this.http.get('https://jsonplaceholder.typicode.com/users/1').pipe((map((user: any) => {
         user.role = 'ROLE_USER';
         localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
         return user;
       })))
     }))
   }
*/

  login(user:any): Observable<any> {
     return this.http.post<any>('https://stage.hiitconsulting.com/api/login_check',user).pipe(switchMap((response: any) => { 
       console.log(response);
     localStorage.setItem(this.JWT_TOKEN, response.token);
       return this.http.get('https://stage.hiitconsulting.com/api/v1/authenticateMe').pipe((map((user: any) => {
         localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));

         //
         const role = this.getRole() === Role.Admin ? 'admin' : 'user'
         return this.http
           .get(`assets/data/menu-${role}.json?_t=` + Date.now())
           .toPromise()
           .then(
             (res: any) => {
               this.menuService.recursMenuForTranslation(res.menu, 'menu');
               this.menuService.set(res.menu);
             }
           );
         //
         return user;
       })))
     }))
   }



  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.JWT_TOKEN);  
  }

  getJwtToken(): any{
    return localStorage.getItem(this.JWT_TOKEN);
  }
  
  getCurentUser(): Agent{
    return JSON.parse(localStorage.getItem(this.CURRENT_USER));
  }

  getRole(): Role {
    return this.getCurentUser()?.roles
  }

 
    logout() {
      // remove user from local storage to log user out
      localStorage.removeItem(this.CURRENT_USER);
      localStorage.removeItem(this.JWT_TOKEN);
     // localStorage.removeItem('currentUser');
     
  }
  
}
