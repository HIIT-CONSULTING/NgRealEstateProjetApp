import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";
import { Observable, Subject } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Agent, Gender, City, Country } from "@shared/models/Agent.model";
import { SponsorService } from "../sponsor.service";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-sponsor-agent-form",
  templateUrl: "./sponsor-agent-form.component.html",
  styleUrls: ["./sponsor-agent-form.component.scss"],
})
export class SponsorAgentFormComponent implements OnInit {
  form:any
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private sponsorService: SponsorService
  ) { this.unsubscribe$ = new Subject<void>();}

  agents$: Observable<Agent[]>;
  agents: Agent[] = [];
  gender$: Observable<Gender[]>;
  city$: Observable<City[]>;
  country$: Observable<Country[]>;
  unsubscribe$: Subject<void>;

  createForm(){
  this.form = this.fb.group({
    firstname: null,
    lastname: null,
    email: [null, Validators.email],
    telephone: [null, Validators.minLength(10)],
    birthDay: null,
    address: this.fb.group({
      description: null,
      city: null,
      country: null,
    }),
    gender: null,
  });
 
}

  onSubmit() {
    console.log("response", this.form);
    this.sponsorService.sponsorAgent(this.form).subscribe((response: any) => {
      console.log("response", response);
      this.router.navigate(['/sponsorship/list'])
    });
  
  }
  ngOnInit() {
    this.createForm();
    this.gender$ = this.sponsorService.getGender();
    this.gender$.subscribe((gender) => console.log(gender));

    this.city$ = this.sponsorService.getCity();
    this.city$.subscribe((city) => console.log(city));

    this.country$ = this.sponsorService.getCountry();
    this.country$.subscribe((country) => console.log(country));
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
