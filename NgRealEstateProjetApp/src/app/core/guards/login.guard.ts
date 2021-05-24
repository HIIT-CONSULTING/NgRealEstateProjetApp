import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from '@shared/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(
        private router: Router,
        private loginService: LoginService
    ) { }

  canActivate() {
    if (!this.loginService.isLoggedIn()) {
      this.router.navigate(['/annuaire']);
    }
    return !this.loginService.isLoggedIn();
  }
}
