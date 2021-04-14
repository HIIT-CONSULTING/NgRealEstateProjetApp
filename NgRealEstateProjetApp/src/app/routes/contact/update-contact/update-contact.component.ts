import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SponsorService } from "@shared/services/sponsor.service";
import { Observable } from "rxjs";
import { Agent, Gender, City, Country, Contact } from "@shared/models/Agent.model";
import { ContactService } from "@shared/services/contact.service";
import { first } from "rxjs/operators";
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from "@ngx-translate/core";
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: "app-update-contact",
  templateUrl: "./update-contact.component.html",
  styleUrls: ["./update-contact.component.scss"],
})
export class UpdateContactComponent implements OnInit {
  id: number;
  contact$: Observable<Contact>;
  contact: Contact;
  agents$: Observable<Agent[]>;
  agents: Agent[] = [];
  gender$: Observable<Gender[]>;
  city$: Observable<City[]>;
  country$: Observable<Country[]>; 

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private sponsorService: SponsorService,
    private contactService: ContactService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private dateAdapter: DateAdapter<Date>
  )   {this.dateAdapter.setLocale('en-GB');}

  form = this.fb.group({
    gender: { id: null, name: null },
    firstname:[null,[Validators.required,Validators.pattern(/^([a-zA-Z]{1,}\s?'?-?_?[a-zA-Z]{2,}(\s?'?-?_?[a-zA-Z]{2,})?$)/)]],
    lastname: [null,[Validators.required,Validators.pattern(/^([a-zA-Z]{1,}\s?'?-?_?[a-zA-Z]{2,}(\s?'?-?_?[a-zA-Z]{2,})?$)/)]],
    email: [null, Validators.email],
    telephone: [null,[Validators.required,Validators.pattern(/^((\+)212|0)[1-9](\d{2}){4}$/)]],
    birthDay: null,
    address: this.fb.group({
      description: null,
      city: { id: null, name: null },
      country: { id: null, name: null },
    }),
  });


    ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = +params["id"];
    });

    this.gender$ = this.sponsorService.getGender();
    this.country$ = this.sponsorService.getCountry();
    this.sponsorService.getCountry();
    this.contactService.getContact(this.id).pipe(first()).subscribe((user) => {
    this.contact = user;
    this.city$=this.sponsorService.getCitys(user.address.country.id);
       this.form.setValue({
          gender: user.gender.id,
          firstname: user.firstname,
          lastname: user.lastname,
          telephone: user.telephone,
          email: user.email,
          address: 
           {
            description: user.address.description,
            country: user.address.country.id,
            city: user.address.city.id
          },
          birthDay: user.birth_day,
        });

      });
    }



  OnCountry(id:number){    
    this.city$ = this.sponsorService.getCitys(id);
  }

  onSubmit() {
    this.contact["gender"] = this.form.get("gender").value;
    this.contact["firstname"] = this.form.get("firstname").value;
    this.contact["lastname"] = this.form.get("lastname").value;
    this.contact["telephone"] = this.form.get("telephone").value;
    this.contact["email"] = this.form.get("email").value;
    this.contact["address"] = this.form.get("address").value;
    this.contactService
      .updateContact(this.contact, this.id)
      .subscribe(
        (user) => {
          user = user;
          this.snackBar.open('le candidat est modifié avec succès!', '', { duration: 1000 ,panelClass: ['blue-snackbar'] ,  verticalPosition: 'top', horizontalPosition:'end' });
          setTimeout(()=>{  
            this.router.navigate(["/contact/contactlist"]);
       }, 2000);
         
        },
        (error) => {
          this.snackBar.open("veuillez vérifier vos informations!", '', { duration: 1000, panelClass: ['red-snackbar'], verticalPosition: 'top', horizontalPosition:'end'});
  
        }
      );
  }
}
