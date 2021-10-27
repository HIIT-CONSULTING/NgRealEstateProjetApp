import { Component, OnInit } from '@angular/core';
import { SponsorService } from '@shared/services/sponsor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Candidate } from '@shared/models/Agent.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-candidate-details',
  templateUrl: './candidate-details.component.html',
  styleUrls: ['./candidate-details.component.scss']
})
export class CandidateDetailsComponent implements OnInit {

  id:number;
  candidate$:Observable<Candidate>;
  candidate: Candidate;
  women:"Women";
  men:"Men";
  isMen=false;
  inProgress=false;
  constructor(private route:ActivatedRoute, private router:Router, private sponsorService:SponsorService) { 
    
      this.route.params.subscribe((params)=>{
      this.id=+params['id'];
      this.candidate$=this.sponsorService.getCandidate(this.id);
      this.candidate$.subscribe(res=>
      {
        this.candidate =res;
        if(res.gender.name=="Men"){ this.isMen=true}
   
          if(res.status==="in_progress"){
            this.inProgress=true;
          }
          
      
      })}) 
      
  }

 
  ngOnInit(){
     
   
  }
}
