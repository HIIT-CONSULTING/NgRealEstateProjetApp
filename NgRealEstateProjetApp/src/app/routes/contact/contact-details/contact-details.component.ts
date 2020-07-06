import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Agent, Gender, City, Country, Contact_type, Contact } from '@shared/models/Agent.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../contact.service';
import { SponsorService } from 'app/routes/sponsor/sponsor.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {

 
  constructor(
    private fb: FormBuilder,
    private route:ActivatedRoute,private router:Router,
    private sponsorService:SponsorService,
    private contactService:ContactService
    
            ){}

  
  id:number;
  contact$:Observable<Contact>;
  contact:Contact;
  isMen=false;
 showSpinner=true;
ShowContact:any;

  ngOnInit(){

    this.route.params.subscribe((params)=>{
      this.id=+params['id'];

    }
    )

    this.contact$=this.contactService.getContact(this.id);
    this.contactService.getContact(this.id).pipe(first()).subscribe(res=>
      {console.log(res.address.city.name);
       this.ShowContact=res;
       setTimeout(()=>{    
        this.showSpinner=false;
   }, 100);
      
        
        if(res.gender.name=="Homme"){ this.isMen=true}
        else{ 
          console.log("women111")}
       
      });
     


    }


    form = this.fb.group({
      gender: {id:null,
               name:null
              },
      first_name: null,
      last_name: null,
      birth_day:null,
      telephone: [null, Validators.minLength(10)],
      email: [null, Validators.email],
      address: this.fb.group({
        description: null,
        city: {id:null,
               name:null
              },
        country:{id:null,
                 name:null
                },
      }),
      contact_type:{id:null,
        name:null
       },
    });


    Onclick(){

      this.router.navigate(['/contact/contactlist']);
    }
}
