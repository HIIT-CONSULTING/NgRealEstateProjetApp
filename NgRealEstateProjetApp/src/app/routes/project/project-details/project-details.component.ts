import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SponsorService } from "@shared/services/sponsor.service";
import { ContactService } from "@shared/services/contact.service";
import { Observable } from "rxjs";
import { ProjectService } from "@shared/services/project.service";

@Component({
  selector: "app-project-details",
  templateUrl: "./project-details.component.html",
  styleUrls: ["./project-details.component.scss"],
})
export class ProjectDetailsComponent implements OnInit {
  showSpinner=true;
  id: number;
  project$: Observable<any>;
  project:any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sponsorService: SponsorService,
    private contactService: ContactService,
    private projectService: ProjectService
  ) {}
 
  ngOnInit() {
    this.route.params.subscribe((params) => {
    this.id = +params["id"];
    });

    //this.project$ = this.projectService.getProject(this.id);
    this.projectService.getProject(this.id).subscribe((project) => {
      this.project = project;
      if(project!={})
        this.showSpinner=false;
    })
    
    
  }

  Onclick() {
    this.router.navigate(["/contact/projectlist"]);
  }
  Onpage(id:number){
    this.router.navigate(['/mandat',id]);
  }

}