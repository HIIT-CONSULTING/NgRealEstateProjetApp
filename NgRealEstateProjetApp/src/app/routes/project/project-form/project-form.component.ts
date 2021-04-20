import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators,FormControl } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";
import { Observable, Subject } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Agent, City, Country, Contact } from "@shared/models/Agent.model";
import { SponsorService } from "@shared/services/sponsor.service";
import { ProjectService } from "@shared/services/project.service";
import { ContactService } from "@shared/services/contact.service";
import { DialogContentProjectComponent } from "app/components/dialog-content-project/dialog-content-project.component";
import { MatDialog } from "@angular/material/dialog";
import * as moment from "moment";
import { takeUntil } from "rxjs/operators";


@Component({
  selector: "app-project-form",
  templateUrl: "./project-form.component.html",
  styleUrls: ["./project-form.component.scss"],
})
export class ProjectFormComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<void>;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private sponsorService: SponsorService,
    private projectService: ProjectService,
    private contactService: ContactService,
    private dialog: MatDialog,
  ) {
    this.unsubscribe$ = new Subject();
    this.properties.controls['hasKey'].valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
      value ? this.properties.get('keysNumber').enable() : this.properties.get('keysNumber').disable()
    })
  }
  show: any = false;
  agents$: Observable<Agent[]>;
  agents: Agent[] = [];
  city$: Observable<City[]>;
  country$: Observable<Country[]>;
  choose: boolean;
  selectedPersonId = null;
  contacts$: Observable<Contact[]>;
  contact: Observable<Contact>;
  test : boolean = false;
  valid_result : number =0;
  openDialog() {
    this.dialog
      .open(DialogContentProjectComponent, {
        width: "550px",
        disableClose: true
      })
      .afterClosed()
      .subscribe(() => {
        this.contacts$ = this.contactService.getContacts();       
      });
}
properties = this.fb.group({
  propertyType: ['',Validators.required],
  minimalPrice: ['',Validators.required],
  maximumPrice: ['',Validators.required],
  area: ['',Validators.required],
  room: ['',Validators.required],
  
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
  })
});
form = this.fb.group({
  projectType: [''],
  projectState: [''],
  projectKind: [''],
  contact:  ['', Validators.required],
  property : this.properties
});


  control_adress(control:string) {
   return  this.form.get('property').get('address').get(control) ; 
  }
  
  control_property(control:string) {
    return  this.form.get('property').get(control); 
  }
  valid_form() : boolean
  {
    const country_valid = (this.control_adress('country').valid && this.control_adress('country').value !=' ' &&  this.control_adress('description').touched) ? 1 : 0;
    const city_valid = (this.control_adress('city').valid && this.control_adress('city').value !=' ' &&  this.control_adress('city').touched) ? 1 : 0;
    const description_valid = (this.control_adress('description').valid && this.control_adress('description').value !=' ') ? 1 : 0;   
    const area_valid = (this.control_property('area').valid && this.control_property('area').value ==' ' &&  this.control_adress('city').touched) ? 1 : 0;
    const minimalPrice_valid = (this.control_property('minimalPrice').valid && this.control_property('minimalPrice').value !=' ' &&  this.control_property('minimalPrice').touched) ? 1 : 0;
    const maximumPrice_valid = (this.control_property('maximumPrice').valid && this.control_property('maximumPrice').value !=' ' && this.control_property('maximumPrice').touched) ? 1 : 0;
    const propertyType_valid = (this.control_property('propertyType').valid && this.control_property('propertyType').value !=' ' && this.control_property('propertyType').touched) ? 1 : 0;
    
    this.valid_result= this.valid_result+country_valid+city_valid+description_valid+area_valid+minimalPrice_valid+maximumPrice_valid+propertyType_valid;
    const valid_disabled = (this.valid_result>=7) ?  false :  true;
    return valid_disabled; 
  }
  myControl = new FormControl();
  filteredOptions: Observable<City[]>;
  ngOnInit() {
   // this.city$ = this.sponsorService.getCity();
  //this.sponsorService.getCity().subscribe();
    this.country$ = this.sponsorService.getCountry();
   // this.sponsorService.getCity().subscribe();
    this.contacts$ = this.contactService.getContacts();
    this.contactService.getContacts().subscribe();
  }
  handleChange(property:string) {
    this.properties.get(property).setValue('');
  }

  OnClickTransaction(id: string) {
    this.form.get("projectType").setValue(id);
  }


  OnClickDomain(id: string) {
    this.form.get("projectState").setValue(id);
  }

  OnClickDestination(key: string) {
    if (key == 'Habitation') {
      this.choose =false;
    } else {
      this.choose = true;
    }
    this.form.get("projectKind").setValue(key);
  }

  OnClickProperty(id: number) {
    this.properties.get("propertyType").setValue(id);
  }

  formatDate(){
    
    if (this.properties.get("constructionYear").value != '') {
      this.properties.get("constructionYear").setValue(moment(this.properties.get("constructionYear").value).format("YYYY-MM-DD"));
    }
    if (this.properties.get("dateAvailability" ).value !='') {
      this.properties.get("dateAvailability").setValue(moment(this.properties.get("dateAvailability").value).format("YYYY-MM-DD"));
    }
  }

  save() {
    
    this.formatDate();
    this.projectService.save(this.form.value).subscribe(response=>{
      this.router.navigate(['/project/projectlist'])
    }

    );
  }

  OnClick() {
      if (this.selectedPersonId != null) {
      this.show = true;
      this.contact = this.contactService.getContact(this.selectedPersonId);
      this.contactService.getContact(this.selectedPersonId).subscribe();
    }
    else{this.show = false;}
    
  }

  OnCountry(id:number){    
    this.city$ = this.sponsorService.getCitys(id);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
