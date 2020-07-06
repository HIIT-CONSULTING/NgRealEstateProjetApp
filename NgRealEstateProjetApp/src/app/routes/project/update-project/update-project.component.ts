import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SponsorService } from "app/routes/sponsor/sponsor.service";
import { ProjectService } from "../project.service";
import { ContactService } from "app/routes/contact/contact.service";
import { Observable } from "rxjs";
import { City, Country, Contact, Project } from "@shared/models/Agent.model";

@Component({
  selector: "app-update-project",
  templateUrl: "./update-project.component.html",
  styleUrls: ["./update-project.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class UpdateProjectComponent implements OnInit {
  Project: Project;
  myControl = new FormControl();
  filteredOptions: Observable<City[]>;
  show: any = false;
  id: number;
  city$: Observable<City[]>;
  country$: Observable<Country[]>;
  project$: Observable<Project>;
showSpinner=true;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sponsorService: SponsorService,
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
  ) {}

  form = this.fb.group({
    projectType: null,
    projectState: null,
    projectKind: null,
    contact:null,
    property: this.fb.group({
      propertyType: null,
      minimalPrice: null,
      maximumPrice: null,
      area: null,
      room: null,
      address: this.fb.group({
        description: null,
        city: null,
        country: null,
      }),
    }),
  });

  ngOnInit(): void {

    
    this.route.params.subscribe((params) => {
      this.id = +params["id"];
    });
    this.city$ = this.sponsorService.getCity();
    this.sponsorService.getCity().subscribe();

    this.country$ = this.sponsorService.getCountry();
    this.sponsorService.getCity().subscribe();
debugger;
    this.project$ = this.projectService.getProject(this.id);
    this.projectService.getProject(this.id).subscribe((project) => {
      this.Project = project;
      debugger;
      if(project!={})
      {
        this.showSpinner=false;
      }
      console.log(project);
      debugger;
      this.form.setValue({
        
        projectType:project.project_type,
        projectState:project.project_state,
        projectKind:project.project_kind,
        property: {
          propertyType:
          {id:project.property.property_type.id,
          name:project.property.property_type.name},
          minimalPrice: project.property.minimal_price,
          maximumPrice: project.property.maximum_price,
          area: project.property.area,
          room: "6",
          address: {
            description: project.property.address.description,
            city: project.property.address.city,
            country: project.property.address.country,
          },
        },
        contact:project.contact,
      });
    });
  }



  onSubmit() {
    debugger;  
    this.Project["property"] = this.form.get("property").value;
    console.log("ddd", this.Project);

    this.projectService
      .updateProject(this.Project, this.id)
      .subscribe(
        
        (user) => {
          user = user;
          this.snackBar.open('le projet est modifié avec succès!', '', { duration: 1000 ,panelClass: ['blue-snackbar'] ,  verticalPosition: 'top', horizontalPosition:'end' });
          setTimeout(()=>{  
            this.router.navigate(["/project/projectlist"]);
          }, 2000);
         
        },
  
        (error) => {
          console.log('error',error);
          this.snackBar.open("veuillez vérifier vos informations!", '', { duration: 1000, panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition:'end'});
  
        }
);

    this.router.navigate(["/project/projectlist"]);
  }
}
