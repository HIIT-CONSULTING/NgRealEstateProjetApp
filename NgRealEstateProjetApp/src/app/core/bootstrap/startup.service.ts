import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuService } from './menu.service';
import { LoginService } from '@core/login.service';
import { Role } from '@shared/models/role.model';

@Injectable()
export class StartupService {
  constructor(private menuService: MenuService, private http: HttpClient, private loginService: LoginService) {}

  load(): Promise<any> {
      debugger;
      const role = this.loginService.getRole() === Role.Admin ? 'admin' : 'user'
      return this.http
        .get(`assets/data/menu-${role}.json?_t=` + Date.now())
        .toPromise()
        .then(
          (res: any) => {
            this.menuService.recursMenuForTranslation(res.menu, 'menu');
            this.menuService.set(res.menu);
          }
        );
  }
}
