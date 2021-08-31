import { Component, OnInit } from '@angular/core';
import { LoginService } from '@shared/services/login.service';
import { Agent } from '@shared/models/Agent.model';
import { Role } from '@shared/models/role.model';

@Component({
  selector: 'app-user-panel',
  template: `
    <div
      class="hiit-user-panel"
      fxLayout="column"
      fxLayoutAlign="center center"
    >
      <img
        class="hiit-user-panel-avatar"
        src="assets/images/avatar.jpeg"
        alt="avatar"
        width="64"
      />
      <h3 class="hiit-user-panel-name">
        {{ User.firstname }}&nbsp;{{ User.lastname | uppercase }}<br />
        <h4 style="text-align: center;">{{ role | translate }}</h4>
      </h3>
    </div>
  `,
})
export class UserPanelComponent implements OnInit {
  User: Agent;
  role: string;

  ngOnInit(): void {
    this.User = this.loginService.getCurentUser();
    this.role =
      this.loginService.getRole() === Role.User
        ? 'user.user'
        : this.loginService.getRole() === Role.Admin
        ? 'user.admin'
        : '';
  }
  constructor(private loginService: LoginService) {}
}
