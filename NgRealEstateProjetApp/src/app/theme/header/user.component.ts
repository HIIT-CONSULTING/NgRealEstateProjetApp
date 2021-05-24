import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '@shared/services/login.service';
import { Agent } from '@shared/models/Agent.model';

@Component({
  selector: 'app-user',
  template: `
    <button
      mat-button
      class="hiit-toolbar-button hiit-avatar-button"
      href="javascript:void(0)"
      [matMenuTriggerFor]="menu"
    >
      <img class="hiit-avatar" src="assets/images/avatar.jpeg" width="32" alt="avatar" />
      <span class="hiit-username" fxHide.lt-sm>{{User.firstname}}</span>
    </button>

    <mat-menu #menu="matMenu">
      <a routerLink="/profil" mat-menu-item>
        <mat-icon>account_circle</mat-icon>
        <span>{{ 'user.profile' | translate }}</span>
      </a>

      <a (click)="logout()" mat-menu-item>
        <mat-icon>exit_to_app</mat-icon>
        <span>{{ 'user.logout' | translate }}</span>
      </a>
    </mat-menu>
  `,
})
export class UserComponent {

  constructor(
   
    private route:ActivatedRoute,private router:Router,
    private loginService:LoginService
            ){}
     logout(){
      this.loginService.logout();
      this.router.navigate(['/login']);

     }

     User:Agent;

     ngOnInit(): void {
      this.User= this.loginService.getCurentUser();
     }
  

}
