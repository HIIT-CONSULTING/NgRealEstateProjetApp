import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from '@shared/models/Agent.model';
import { Router, ActivatedRoute } from '@angular/router';
import { SponsorService } from '@shared/services/sponsor.service';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.scss']
})
export class CandidateDetailsComponent implements OnInit {

  id:number;
  candidate$:Observable<Candidate>;
  isMen=false;
  inProgress=false;
  accepted=false;
  refused=false;
  constructor(private route:ActivatedRoute, private router:Router, private sponsorService:SponsorService,private translate: TranslateService) { 
    
      this.route.params.subscribe((params)=>{
      this.id=+params['id'];
      this.candidate$=this.sponsorService.getCandidate(this.id);
      this.candidate$.subscribe(res=>
      {
        if(res.gender.name=="Men"){ this.isMen=true}

          if(res.status==="in_progress"){
            this.inProgress=true;
          }
          if(res.status==="accepted"){
            this.accepted=true;
          }

          if(res.status==="refused"){
            this.refused=true;
          }
       
      })}) 
      
  }

 
  ngOnInit(){   
  }
}
