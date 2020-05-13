import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import{Agent} from '@shared/Model/Agent.model';
import{Subsidiary} from '@shared/Model/Subsidiary.model';


@Component({
  selector: 'app-sponsor-agent-form',
  templateUrl: './sponsor-agent-form.component.html',
  styleUrls: ['./sponsor-agent-form.component.scss']
})
export class SponsorAgentFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private route:ActivatedRoute,private router:Router
            ){}

  

  agents$:Observable<Agent[]>;
  agents:Agent[]=[];



  form = this.fb.group({
    gender:null,
    firstname: null,
    lastname: null,
    telephone: [null,Validators.minLength(10)],
    email: [null, Validators.email],
    address:null,
  });

  onSubmit() {
    
   
   /* this.findAgentService.searchAgent(this.form.value).subscribe((response: any)=> {
      console.log(response);  
    });*/
    
  }
  ngOnInit(){
 
   
    
  }

  getErrorMessage(form: FormGroup) {
    return form.get('email').hasError('required')
      ? 'enter an email'
      : form.get('email').hasError('email')
      ? this.translate.instant('searchAgent.form.email.error')
      : '';
  }
  showProgress = false;



}
