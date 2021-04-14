import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Agent, Gender, City, Country, Contact_type } from "@shared/models/Agent.model";
import { SponsorService } from "@shared/services/sponsor.service";
import { ContactService } from '@shared/services/contact.service';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  
  agents$: Observable<Agent[]>;
  agents: Agent[] = [];
  gender$: Observable<Gender[]>;
  city$: Observable<City[]>;
  country$: Observable<Country[]>;
  contact_type$:Observable<Contact_type[]>;

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private sponsorService: SponsorService,
    private contactService:ContactService,
    private snackBar: MatSnackBar,
    private dateAdapter: DateAdapter<Date>
    ) 
  {this.dateAdapter.setLocale('en-GB');}
 
  form = this.fb.group({
    gender: {
      id:null,
      name:null
    },
    firstname:[null,[Validators.required,Validators.pattern(/^([a-zA-Z]{1,}\s?'?-?_?[a-zA-Z]{2,}(\s?'?-?_?[a-zA-Z]{2,})?$)/)]],
    lastname: [null,[Validators.required,Validators.pattern(/^([a-zA-Z]{1,}\s?'?-?_?[a-zA-Z]{2,}(\s?'?-?_?[a-zA-Z]{2,})?$)/)]],
    email: [null, Validators.email],
    telephone: [null,[Validators.required,Validators.pattern(/^((\+)212|0)[1-9](\d{2}){4}$/)]],
    birthDay: null,
    address: this.fb.group({
      description: null,
      city: null,
      country: null,
    }),
  });

  onSubmit() {
    this.contactService
      .addContact(this.form.value)
      .subscribe(
        (data) => {
          this.snackBar.open('le contact est ajouté avec succès!', '', { duration: 1000 ,panelClass: ['blue-snackbar'] ,  verticalPosition: 'top', horizontalPosition:'end' });
       setTimeout(()=>{  
            this.router.navigate(['/contact/contactlist'])
       }, 2000);
         
      },
        (error) => {
          this.snackBar.open("l'email ou le numéro de téléphone  existe déjà", '', { duration: 2000, panelClass: ['red-snackbar'], verticalPosition: 'top', horizontalPosition:'end'});  
        }
      );
  }

  OnCountry(id:number){
    this.city$ = this.sponsorService.getCitys(id);
  }

  ngOnInit() {
    this.gender$ = this.sponsorService.getGender();
    this.country$ = this.sponsorService.getCountry();
  }

  getErrorMessage(form: FormGroup) {
    return form.get("email").hasError("required")
      ? "enter an email"
      : form.get("email").hasError("email")
      ? this.translate.instant("searchAgent.form.email.error")
      : "";
  }
  
}
