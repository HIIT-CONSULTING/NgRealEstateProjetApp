import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { FindAgentService } from '@shared/services/find-agent.service';
import { Agent } from '@shared/models/Agent.model';

@Component({
  selector: 'app-find-agent-detail',
  templateUrl: './find-agent-detail.component.html'
})
export class FindAgentDetailComponent implements OnInit {
  id:number;
  agent:Agent;
  isMen=false;
  constructor(private route:ActivatedRoute, private router:Router, private findAgentService:FindAgentService,
        private translate: TranslateService) { 
    
      this.route.params.subscribe((params)=>{
      this.id=+params['id'];
      this.findAgentService.getAgent(this.id).subscribe(res=>
      {
        this.agent=res;
        if(res.gender.name=="Homme"){ this.isMen=true}      
      })}) 
      
  }
  
  ngOnInit(){
  }
  

}
