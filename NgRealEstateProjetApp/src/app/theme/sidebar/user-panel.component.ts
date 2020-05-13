import { Component } from '@angular/core';

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
      <h4 class="hiit-user-panel-name">Sara ELKHOULTA</h4>
     
      
    </div>
  `,
})
export class UserPanelComponent {}
