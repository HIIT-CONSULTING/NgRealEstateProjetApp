import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormControl ,   Validators} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SponsorService } from "@shared/services/sponsor.service";
import { ProjectService } from "@shared/services/project.service";
import { Observable } from "rxjs";
import { City, Country, Project } from "@shared/models/Agent.model";

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
      minimalPrice: ['',Validators.required],
      maximumPrice: ['',Validators.required],
      area: ['',Validators.required],
      room: null,
      address: this.fb.group({
        description: ['',Validators.required],
        city: ['',Validators.required],
        country: ['',Validators.required],
      }),
    }),
  });

    ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params["id"];
    });
    
   // this.city$ = this.sponsorService.getCity();
    //this.sponsorService.getCity().subscribe();
    this.country$ = this.sponsorService.getCountry();
    //this.sponsorService.getCity().subscribe();
    this.project$ = this.projectService.getProject(this.id);
    this.projectService.getProject(this.id).subscribe((project) => {
      this.Project = project;
      this.city$ = this.sponsorService.getCitys(project.property.address.country.id);
      if(project!={})
      {
        this.showSpinner=false;
      }
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
          room: project.property.room,
          address: {
            description: project.property.address.description,
            country: project.property.address.country.id,
            city: project.property.address.city.id,
            
          },
        },
        contact:project.contact,
      });
    });
  }
  



  OnCountry(id:number){    
    this.city$ = this.sponsorService.getCitys(id);
   // this.city$.subscribe();
  }
   
  onSubmit() {
    this.Project["property"] = this.form.get("property").value;
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
          this.snackBar.open("veuillez vérifier vos informations!", '', { duration: 1000, panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition:'end'});
        }
);
    this.router.navigate(["/project/projectlist"]);
  }
}
