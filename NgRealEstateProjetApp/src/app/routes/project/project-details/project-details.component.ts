import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SponsorService } from "app/routes/sponsor/sponsor.service";
import { ContactService } from "app/routes/contact/contact.service";
import { Observable } from "rxjs";
import { Contact, Project } from "@shared/models/Agent.model";
import { ProjectService } from "../project.service";

@Component({
  selector: "app-project-details",
  templateUrl: "./project-details.component.html",
  styleUrls: ["./project-details.component.scss"],
})
export class ProjectDetailsComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sponsorService: SponsorService,
    private contactService: ContactService,
    private projectService: ProjectService
  ) {}
  showSpinner=true;
  id: number;
  project$: Observable<any>;
  project:any;

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params["id"];
    });


    this.project$ = this.projectService.getProject(this.id);
    this.projectService.getProject(this.id).subscribe((project) => {
      this.project = project;
      if(project!={})
      {
        this.showSpinner=false;
      }
  
  })
  }

  Onclick() {
    this.router.navigate(["/contact/contactlist"]);
  }
}
