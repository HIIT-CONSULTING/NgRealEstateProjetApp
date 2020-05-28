import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import{Agent, Candidate, Gender, City, Country} from '@shared/models/Agent.model';
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

  agents$: Observable<Agent[]>;
  agents: Agent[] = [];
  gender$: Observable<Gender[]>;
  city$: Observable<City[]>;
  country$: Observable<Country[]>;

  ngOnInit(){
debugger;
    this.route.params.subscribe((params)=>{
      this.id=+params['id'];
    }
    )

    debugger;
  
    this.sponsorService.getCandidate(this.id).subscribe(user => {
      console.log('candidate',user);
      this.candidat=user;
    
      this.form.setValue({
        
        firstname: user.firstname,
        lastname:user.lastname,
        email:user.email,
        telephone:user.telephone,
        address:{
          city:{id:user.address.city.id,name:user.address.city.name},
          country:{id:user.address.country.id,name:user.address.country.name},
          description:user.address.description
        },
        birthDay:user.birth_day,
        gender:{id:user.gender.id,name:user.gender.name},


      });
    })

    this.gender$ = this.sponsorService.getGender();
    this.sponsorService.getGender().subscribe((gender) => console.log(gender));

    this.city$ = this.sponsorService.getCity();
    this.sponsorService.getCity().subscribe((city) => console.log(city));

    this.country$ = this.sponsorService.getCountry();
    this.sponsorService.getCountry().subscribe((country) => console.log(country));


    }


    form = this.fb.group({
      firstname: null,
      lastname: null,
      email: [null, Validators.email],
      telephone: [null, Validators.minLength(10)],
      birthDay:null,
      address: this.fb.group({
        description: null,
        city:null,
        country:null
      }),
      gender:null,
    });


  
  

  onSubmit() { 
    
   debugger;
    this.candidat['firstname']= this.form.get('firstname').value; 
    this.candidat['lastname']= this.form.get('lastname').value; 
    this.candidat['email']= this.form.get('email').value; 
    this.candidat['telephone']= this.form.get('telephone').value; 
    this.candidat['birth_day']=this.form.get('birthDay').value;
    this.candidat['address']= this.form.get('address').value; 
    this.candidat['gender']= this.form.get('gender').value; 
debugger;
    this.sponsorService.update(this.candidat,this.id).subscribe(user => { 
      debugger;
     user = user; 

     this.router.navigate(['/sponsorship/list'])
     }); 



 
   }

  
  } 