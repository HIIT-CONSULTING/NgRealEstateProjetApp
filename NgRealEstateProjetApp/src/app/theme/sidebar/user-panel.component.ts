import { Component, OnInit } from '@angular/core';
import { LoginService } from '@shared/services/login.service';
import { Agent } from '@shared/models/Agent.model';

@Component({
  selector: 'app-user-panel',
  template: `
    <div class="hiit-user-panel" fxLayout="column" fxLayoutAlign="center center">
      <img
        class="hiit-user-panel-avatar"
        src="assets/images/avatar.jpeg"
        alt="avatar"
        width="64"
      />
      <h4 class="hiit-user-panel-name">{{User.firstname}}&nbsp;{{(User.lastname)|uppercase}}</h4>
     
      
    </div>
  `,
})
export class UserPanelComponent implements OnInit {
  User:Agent;

  ngOnInit(): void {
   this.User= this.loginService.getCurentUser();
  }
  constructor(private loginService:LoginService){}

}
