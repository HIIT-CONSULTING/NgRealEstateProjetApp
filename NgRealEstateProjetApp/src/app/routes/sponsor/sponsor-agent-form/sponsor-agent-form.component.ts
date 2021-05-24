import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";
import { Observable, Subject } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Agent, Gender, City, Country } from "@shared/models/Agent.model";
import { SponsorService } from "@shared/services/sponsor.service";
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: "app-sponsor-agent-form",
  templateUrl: "./sponsor-agent-form.component.html",
  styleUrls: ["./sponsor-agent-form.component.scss"],
})
export class SponsorAgentFormComponent implements OnInit {
  form: any;  
  agents$: Observable<Agent[]>;
  agents: Agent[] = [];
  gender$: Observable<Gender[]>;
  city$: Observable<City[]>;
  country$: Observable<Country[]>;
  unsubscribe$: Subject<void>;
    
  constructor(
    private fb: FormBuilder,private snackBar: MatSnackBar,private translate: TranslateService,private route: ActivatedRoute,
    private router: Router,private dateAdapter: DateAdapter<Date>,private sponsorService: SponsorService) {
    this.unsubscribe$ = new Subject<void>();
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }


  createForm() {
    this.form = this.fb.group({
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
      gender: null,
    });
  }

  OnCountry(id:number){    
    this.city$ = this.sponsorService.getCitys(id);
  }

  onSubmit() {
    this.sponsorService.sponsorAgent(this.form).subscribe(
      (data) => {
        this.snackBar.open('Un email a été envoyé pour confirmer votre demande', '', { duration: 3000 ,panelClass: ['blue-snackbar'] ,  verticalPosition: 'top', horizontalPosition:'end' });
        setTimeout(()=>{  
          this.router.navigate(["/sponsorship/list"]);
     }, 3000);
       
      },

      (error) => {
        this.snackBar.open("l'email ou le numéro de téléphone  existe déjà ", '', { duration: 2000, panelClass: ['red-snackbar'], verticalPosition: 'top', horizontalPosition:'end'});

      }
    );
  }
  ngOnInit() {
    this.createForm();
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
  showProgress = false;

  /**
   * Unsubscribe during OnDestroy lifecycle hook.
   */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
