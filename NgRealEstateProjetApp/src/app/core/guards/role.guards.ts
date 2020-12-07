import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '@core/login.service';
import { Role } from '@shared/models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(
        private router: Router,
        private loginService: LoginService
    ) { }
    
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.loginService.getCurentUser();
      // check if route is restricted by role
      if (route.data.roles && route.data.roles.indexOf(currentUser.roles) === -1) {
          // role not authorised so redirect to home page
          this.router.navigate(['/not-found']);
          return false;
      }

      // authorised so return true
      return true;
  }



}