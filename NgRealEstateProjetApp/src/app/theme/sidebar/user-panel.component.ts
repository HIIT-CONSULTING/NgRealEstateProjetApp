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
      <h4 class="hiit-user-panel-name">
          {{User.firstname}}&nbsp;{{(User.lastname)|uppercase}} <br>
          [ {{ (getUserRole())|uppercase }} ]
      </h4>
     
    </div>
  `,
})
export class UserPanelComponent implements OnInit {

  userRole:string ;

  User:Agent;

  ngOnInit(): void {

   this.User= this.loginService.getCurentUser();
   this.userRole = this.loginService.getRole();
 
  }
  getUserRole():string {
    
    if(this.userRole == 'ROLE_USER'){
      return 'AGENT';
    }

    if(this.userRole == 'ROLE_MANAGER'){
      return 'GESTIONNAIRE';
    }

    return;
  }

  constructor(private loginService:LoginService){}

}