import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import {
  Agent,
  Gender,
  City,
  Country,
  Contact,
} from "@shared/models/Agent.model";
import { SponsorService } from "../../sponsor/sponsor.service";
import { filter, map } from "rxjs/operators";
import { ProjectService } from "./../project.service";
import { ContactService } from "app/routes/contact/contact.service";

@Component({
  selector: "app-project-form",
  templateUrl: "./project-form.component.html",
  styleUrls: ["./project-form.component.scss"],
})
export class ProjectFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private sponsorService: SponsorService,
    private projectService: ProjectService,
    private contactService: ContactService
  ) {}
  show: any = false;
  agents$: Observable<Agent[]>;
  agents: Agent[] = [];
  city$: Observable<City[]>;
  country$: Observable<Country[]>;
  choose: boolean;
  selectedPersonId = null;
  contacts$: Observable<Contact[]>;
  contact: Observable<Contact>;

  form = this.fb.group({
    projectType: "",
    projectState: "",
    projectKind: "",
    contact: "",
    property: this.fb.group({
      propertyType: "",
      minimalPrice: "",
      maximumPrice: "",
      area: "",
      room: "",
      address: this.fb.group({
        description: "",
        city: "",
        country: "",
      }),
    }),
  });
  myControl = new FormControl();
  filteredOptions: Observable<City[]>;
  ngOnInit() {
    this.city$ = this.sponsorService.getCity();
    this.sponsorService.getCity().subscribe();

    this.country$ = this.sponsorService.getCountry();
    this.sponsorService.getCity().subscribe();
    this.contacts$ = this.contactService.getContacts();
    this.contactService.getContacts().subscribe();
  }

  OnClickTransaction(id: string) {
 
    
    this.form.get("projectType").setValue(id);
  
    console.log("1",this.form.get("projectType"));
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
    
    this.form.get("property.propertyType").setValue(id);
  }
  save() {
    console.log(this.form.value);
    this.projectService.save(this.form.value).subscribe(response=>{console.log(response)
      this.router.navigate(['/project/projectlist'])
    }

    );
  }
  OnClick() {
   
    console.log(this.selectedPersonId);
    if (this.selectedPersonId != null) {
      debugger;
      this.show = true;
      this.contact = this.contactService.getContact(this.selectedPersonId);
      this.contactService.getContact(this.selectedPersonId).subscribe();
      console.log(this.contact);
    }
    else{this.show = false;}
    
  }
}
