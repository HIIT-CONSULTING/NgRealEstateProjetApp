import { Component } from '@angular/core';

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
      <span class="hiit-username" fxHide.lt-sm>Sara</span>
    </button>

    <mat-menu #menu="matMenu">
      <a routerLink="/profile/overview" mat-menu-item>
        <mat-icon>account_circle</mat-icon>
        <span>{{ 'user.profile' | translate }}</span>
      </a>

      <a routerLink="/login" mat-menu-item>
        <mat-icon>exit_to_app</mat-icon>
        <span>{{ 'user.logout' | translate }}</span>
      </a>
    </mat-menu>
  `,
})
export class UserComponent {}
