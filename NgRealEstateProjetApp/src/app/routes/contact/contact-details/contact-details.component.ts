import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Contact } from '@shared/models/Agent.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '@shared/services/contact.service';
import { SponsorService } from '@shared/services/sponsor.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {

  
  id:number;
  contact$:Observable<Contact>;
  contact:Contact =null;
  isMen : boolean;
  showSpinner=true;
  ShowContact:any;

  constructor(
    private route:ActivatedRoute,private router:Router,
    private sponsorService:SponsorService,
    private contactService:ContactService)
    {}

  
  ngOnInit(){
    this.route.params.subscribe((params)=>{
      this.id=+params['id'];
  })

  this.contact$=this.contactService.getContact(this.id);
  this.contactService.getContact(this.id).pipe(first()).subscribe(res=>
    {
        this.ShowContact=res;
        setTimeout(()=>{    
        this.showSpinner=false; }, 50);
        this.isMen=res.gender.name=="Homme" ? true : false ;
       });
    }
    
  Onclick(){
      this.router.navigate(['/contact/contactlist']);
    }
    
}
