import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import {FindAgentService } from '../find-agent.service';
import { ActivatedRoute, Router } from '@angular/router';
import{Agent} from '@shared/models/Agent.model';
import{Subsidiary} from '@shared/models/Subsidiary.model';


@Component({
  selector: 'app-find-agent-form',
  templateUrl: './find-agent-form.component.html',
 
})
export class FindAgentFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private findAgentService:FindAgentService,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private route:ActivatedRoute,private router:Router
            ){}

  

  agents$:Observable<Agent[]>;
  agents:Agent[]=[];
  isSearsh=false;
  subsidiary$: Observable<any>;
  subsidiary:Subsidiary[]=[];

  form = this.fb.group({
    firstname: null,
    lastname: null,
    tel: [null,Validators.minLength(10)],
    email: [null, Validators.email],
    subsidiary: null
  });

  onSubmit() {
    
    this.isSearsh=true;
   /* this.findAgentService.searchAgent(this.form.value).subscribe((response: any)=> {
      console.log(response);  
    });*/
    this.agents$=this.findAgentService.getAgents();
    this.findAgentService.getAgents().subscribe(items => (this.agents = items));
  
  }
  ngOnInit(){
 
    this.subsidiary$ = this.findAgentService.getSubsidiary();
    this.findAgentService.getSubsidiary().subscribe(items => console.log(items));
    
  }

  getErrorMessage(form: FormGroup) {
    return form.get('email').hasError('required')
      ? 'enter an email'
      : form.get('email').hasError('email')
      ? this.translate.instant('searchAgent.form.email.error')
      : '';
  }
  showProgress = false;


 OnNavigate(id:number) {
  this.router.navigate(['/annuaire',id]);


  }

}