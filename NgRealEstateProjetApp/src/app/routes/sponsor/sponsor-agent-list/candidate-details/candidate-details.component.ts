import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Candidate } from '@shared/models/Agent.model';
import { Router, ActivatedRoute } from '@angular/router';
import { SponsorService } from '../../sponsor.service';

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
  inProgress=false;
  constructor(private route:ActivatedRoute, private router:Router, private sponsorService:SponsorService) { 
    
      this.route.params.subscribe((params)=>{
      this.id=+params['id'];
      this.candidate$=this.sponsorService.getCandidate(this.id);
      this.candidate$.subscribe(res=>
      {console.log(this.isMen);
        debugger;
        if(res.gender.name=="Men"){ this.isMen=true}
        else{ 
          console.log("women111")
        }
          if(res.status==="in_progress"){
            console.log('cc',res.status)
            this.inProgress=true;
          }
          
       
      })}) 
      
  }

 
  ngOnInit(){
     
   
  }
}
