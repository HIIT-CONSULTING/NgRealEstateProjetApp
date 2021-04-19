import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Agent,Gender, City,Country, Contact_type} from '@shared/models/Agent.model';
import { ContactService } from '@shared/services/contact.service';
import { MatDialogRef } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { SponsorService } from "@shared/services/sponsor.service";
import * as moment from 'moment';

@Component({
  selector: 'app-dialog-content-project',
  templateUrl: './dialog-content-project.component.html',
  styleUrls: ['./dialog-content-project.component.scss']
})
export class DialogContentProjectComponent {

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private sponsorService: SponsorService,
    private contactService:ContactService,
    private snackBar: MatSnackBar,
    private dateAdapter: DateAdapter<Date>,
    private matDialogRef: MatDialogRef<DialogContentProjectComponent>
  ) {
    this.dateAdapter.setLocale('en-GB');//dd/MM/yyyy
  }

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
    firstname:[null,Validators.pattern(/^([a-zA-Z]{1,}\s?'?-?_?[a-zA-Z]{2,}(\s?'?-?_?[a-zA-Z]{2,})?$)/)],
    lastname: [null,Validators.pattern(/^([a-zA-Z]{1,}\s?'?-?_?[a-zA-Z]{2,}(\s?'?-?_?[a-zA-Z]{2,})?$)/)],
    birthDay:null,
    telephone:[null,Validators.pattern(/^((\+)212|0)[1-9](\d{2}){4}$/)],
    email: [null, Validators.email],
    societe: null,
    channelType: null,
    notes: null,
    address: this.fb.group({
      description: null,
      city: null,
      country: null,
    }),
  });
  formatDate(){
    this.form.get("birthDay").setValue(moment(this.form.get("birthDay").value).format("YYYY-MM-DD"));
  }

  onSubmit() {
    this.formatDate();
    this.contactService
      .addContact(this.form.value)
      .subscribe(
        (data) => {
          this.snackBar.open('le contact est ajouté avec succès!', '', { duration: 1000 ,panelClass: ['blue-snackbar'] ,  verticalPosition: 'top', horizontalPosition:'end' });
       setTimeout(()=>{  
            //this.router.navigate(['/contact/contactlist'])
       }, 2000);

       this.matDialogRef.disableClose = true;
       this.matDialogRef.close(); 
         
        },
  
        (error) => {
          this.snackBar.open("l'email ou le numéro de téléphone déjà existent ", "", { duration: 2000, panelClass: ["blue-snackbar"], verticalPosition: "top", horizontalPosition:"end"});
  
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
    return form.get('email').hasError('required')
      ? 'enter an email'
      : form.get('email').hasError('email')
      ? this.translate.instant('searchAgent.form.email.error')
      : '';
  }

}
