import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import{Agent, Candidate} from '@shared/models/Agent.model';
import { SponsorService } from '../../sponsor.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-update-candidate',
  templateUrl: './update-candidate.component.html',
  styleUrls: ['./update-candidate.component.scss']
})
export class UpdateCandidateComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private route:ActivatedRoute,private router:Router,
    private sponsorService:SponsorService,
    
            ){}

  
  id:number;
  candidate$:Observable<Candidate>;
  candidate:Candidate;
  candidat:Candidate;

  ngOnInit(){

    this.route.params.subscribe((params)=>{
      this.id=+params['id'];
      this.candidate$=this.sponsorService.getCandidate(this.id);
      this.candidate$.subscribe();
    }
    )

    this.sponsorService.getCandidate(this.id).pipe(first()).subscribe(user => {
      console.log(user);
      this.candidat=user;
     // user = user;
      this.form.setValue({
        gender: user.gender,
        firstname: user.firstname,
        lastname:user.lastname,
        telephone:user.telephone,
        email:user.email,
        address:user.address

      });
    });


    }


  form = this.fb.group({
    gender:null,
    firstname: null,
    lastname: null,
    telephone: [null,Validators.minLength(10)],
    email: [null, Validators.email],
    address:null,
  });


  
  

  onSubmit() { 
    
   this.candidat['gender']= this.form.get('gender').value; 
    this.candidat['firstname']= this.form.get('firstname').value; 
    this.candidat['lastname']= this.form.get('lastname').value; 
    this.candidat['telephone']= this.form.get('telephone').value; 
    this.candidat['email']= this.form.get('email').value; 
    this.candidat['address']= this.form.get('address').value; 
      
     
     this.sponsorService.update(this.candidat,this.id).subscribe(user => { 
     user = user; 
     }); 
 
   }

  
  } 