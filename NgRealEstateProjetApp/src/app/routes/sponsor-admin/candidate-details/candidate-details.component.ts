import { Component, OnInit } from '@angular/core';
import { SponsorService } from 'app/routes/sponsor/sponsor.service';
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
  women:"Women";
  men:"Men";
  isMen=false;
  constructor(private route:ActivatedRoute, private router:Router, private sponsorService:SponsorService) { 
    
      this.route.params.subscribe((params)=>{
      this.id=+params['id'];
      this.candidate$=this.sponsorService.getCandidate(this.id);
      this.candidate$.subscribe(res=>
      {console.log(this.isMen);
        if(res.gender=="Men"){ this.isMen=true}
        else{ 
          console.log("women111")}
       
      })}) 
      
  }

 
  ngOnInit(){
     
   
  }
}
