import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Input() showToggle = true;
  
  @Input() toggleChecked = false;

  @Output() toggleCollapsed = new EventEmitter<void>();

  constructor() {}
}
