import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";



@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"],
})
export class ProjectComponent  {
  
  constructor(
    private translate: TranslateService,
  ) {}

  navLinks = [
    { path: 'projectform', label: 'Property.title',icon:'list_alt' },
    { path: 'projectlist', label: 'Property.title-list',icon:'' },
  ];
}
