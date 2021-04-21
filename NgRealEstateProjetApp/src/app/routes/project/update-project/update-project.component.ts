import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormControl ,   Validators} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";
import { ActivatedRoute, Router } from "@angular/router";
import { SponsorService } from "@shared/services/sponsor.service";
import { ProjectService } from "@shared/services/project.service";
import { Observable, Subject } from "rxjs";
import { City, Country, Project } from "@shared/models/Agent.model";
import { takeUntil } from "rxjs/operators";
import * as moment from "moment";

@Component({
  selector: "app-update-project",
  templateUrl: "./update-project.component.html",
  styleUrls: ["./update-project.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class UpdateProjectComponent implements OnInit, OnDestroy {
  Project: Project;
  myControl = new FormControl();
  filteredOptions: Observable<City[]>;
  show: any = false;
  id: number;
  city$: Observable<City[]>;
  country$: Observable<Country[]>;
  project$: Observable<Project>;
  showSpinner=true;
  unsubscribe$: Subject<void>;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sponsorService: SponsorService,
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
  ) {
   console.log('kkkkk')
    this.unsubscribe$ = new Subject();
    this.form.get('property').get('hasKey').valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
      value ? this.form.get('property.keysNumber').enable() : this.form.get('property.keysNumber').disable()
    })
  }

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
      isAvailable: [''],
      dateAvailability:[''],
      keysNumber:[{ value: '', disabled: true}],
      hasKey:false,
      estimatedSurface: [''],
      state: [''],
      constructionYear: [''],
      orientation: [''],
      floorsNumber: [''],

      hasGuardian: [''],
      hasIntercom: [''],
      hasElevator: [''],
      hasTerace: [''],
      hasBalcony: [''],
      hasGarage: [''],
      hasParkCar: [''],
      hasBasement: [''],
      hasParkCarOutside: [''],
      hasCellar: [''],

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
          propertyType:project.property.property_type.id,
          minimalPrice: project.property.minimal_price,
          maximumPrice: project.property.maximum_price,
          area: project.property.area,
          room: project.property.room??'',

    isAvailable: project.property.is_available??'',
    dateAvailability: project.property.date_availability??'',
    keysNumber: project.property.keys_number??'',
    hasKey: project.property.has_key??'',
    estimatedSurface: project.property.estimated_surface??'',
    state: project.property.state? project.property.state:'',
    constructionYear: project.property.construction_year??'',
    orientation: project.property.orientation??'',
    floorsNumber: project.property.floors_number?? '',
    hasGuardian: project.property.has_guardian?? '',
    hasIntercom: project.property.has_intercom??'',
    hasElevator: project.property.has_elevator??'',
    hasTerace: project.property.has_terace??'',
    hasBalcony: project.property.has_balcony??'',
    hasGarage: project.property.has_garage??'',
    hasParkCar: project.property.has_park_car??'',
    hasBasement: project.property.has_basement??'',
    hasParkCarOutside: project.property.has_park_car_outside??'',
    hasCellar: project.property.has_cellar??'',


          address: {
            description: project.property.address.description,
            country: project.property.address.country.id,
            city: project.property.address.city.id,
            
          },
        },
        contact:project.contact.id,
      });
    });
  }
  

  handleChange(property:string) {
    this.form.get('property').get(property).setValue('');
  }

  OnCountry(id:number){    
    this.city$ = this.sponsorService.getCitys(id);
   // this.city$.subscribe();
  }
   
  formatDate(){
    
    if (this.form.get("property.constructionYear").value != '') {
      this.form.get("property.constructionYear").setValue(moment(this.form.get("property.constructionYear").value).format("YYYY-MM-DD"));
    }
    if (this.form.get("property.dateAvailability" ).value !='') {
      this.form.get("property.dateAvailability").setValue(moment(this.form.get("property.dateAvailability").value).format("YYYY-MM-DD"));
    }
  }
  onSubmit() {
    this.formatDate()
    this.Project["property"] = this.form.get("property").value;
    this.projectService
      .updateProject(this.form.value, this.id)
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
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
