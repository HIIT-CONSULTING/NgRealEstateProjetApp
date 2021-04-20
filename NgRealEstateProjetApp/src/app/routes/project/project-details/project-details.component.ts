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

/** 
 is_available": false,
    "date_availability": "2021-04-14T14:31:37+02:00",

    
    "estimated_surface": 66,

    "state": "New",
    " construction_year": "2021-04-29T00:00:00+02:00",


     "orientation": "IO",
    "keys_number": 2658


    "floors_number": 20,
    
    "has_guardian": true,
    "has_intercom": true,
    "has_elevator": true,
    "has_terace": true,
    "has_balcony": true,
    "has_garage": true,
    "has_park_car": true,
    "has_basement": true,
    "has_park_car_outside": true,
    "has_cellar": true,

    "orientation": "IO",
    "state": "New",
    "keys_number": 2658
    */
