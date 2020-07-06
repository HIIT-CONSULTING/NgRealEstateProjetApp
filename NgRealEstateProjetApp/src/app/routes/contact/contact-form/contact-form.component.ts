import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Agent, Gender, City, Country, Contact_type } from "@shared/models/Agent.model";
import { SponsorService } from "../../sponsor/sponsor.service";
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private sponsorService: SponsorService,
    private contactService:ContactService,
    private snackBar: MatSnackBar,
  ) {}

  agents$: Observable<Agent[]>;
  agents: Agent[] = [];
  gender$: Observable<Gender[]>;
  city$: Observable<City[]>;
  country$: Observable<Country[]>;
  contact_type$:Observable<Contact_type[]>;

  form = this.fb.group({
    gender: {
      id:null,
      name:null
    },
    firstname: null,
    lastname: null,
    birthDay:null,
    telephone: [null, Validators.minLength(10)],
    email: [null, Validators.email],
    address: this.fb.group({
      description: null,
      city: null,
      country: null,
    }),
  });

  onSubmit() {
    console.log("response",this.form.value);
    this.contactService
      .addContact(this.form.value)
      .subscribe(
        (data) => {
          console.log("data", data);
          this.snackBar.open('le contact est ajouté avec succès!', '', { duration: 1000 ,panelClass: ['blue-snackbar'] ,  verticalPosition: 'top', horizontalPosition:'end' });
          setTimeout(()=>{  
            this.router.navigate(['/contact/contactlist'])
       }, 2000);
         
        },
  
        (error) => {
          console.log('error',error);
          this.snackBar.open("l'email ou le numéro de téléphone déjà existent ", '', { duration: 2000, panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition:'end'});
  
        }
      );
  }

  OnCountry(id:number){
    
    this.city$ = this.sponsorService.getCitys(id);
    this.city$.subscribe((city) => console.log(city));
  }
  ngOnInit() {
    this.gender$ = this.sponsorService.getGender();
    this.sponsorService.getGender().subscribe((gender) => console.log(gender));

   
    this.country$ = this.sponsorService.getCountry();
    this.sponsorService.getCity().subscribe((country) => console.log(country));


  }

  getErrorMessage(form: FormGroup) {
    return form.get("email").hasError("required")
      ? "enter an email"
      : form.get("email").hasError("email")
      ? this.translate.instant("searchAgent.form.email.error")
      : "";
  }
  
}
