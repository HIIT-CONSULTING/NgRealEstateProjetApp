import { Component, OnInit } from "@angular/core";



@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"],
})
export class ProjectComponent  {
  navLinks = [
    { path: 'projectform', label: 'Créer un nouveau projet',icon:'list_alt' },
    { path: 'projectlist', label: 'Liste des projets',icon:'' },
  ];
}
