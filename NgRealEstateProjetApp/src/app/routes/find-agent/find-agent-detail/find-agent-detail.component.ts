import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FindAgentService } from '../find-agent.service';
import{Agent} from '@shared/Model/Agent.model';
import{Subsidiary} from '@shared/Model/Subsidiary.model';


@Component({
  selector: 'app-find-agent-detail',
  templateUrl: './find-agent-detail.component.html'
})
export class FindAgentDetailComponent implements OnInit {
  id:number;
  agent$:Observable<Agent>;
  women:"Women";
  men:"Men";
  isMen=false;
  constructor(private route:ActivatedRoute, private router:Router, private findAgentService:FindAgentService) { 
    
      this.route.params.subscribe((params)=>{
      this.id=+params['id'];
      this.agent$=this.findAgentService.getAgent(this.id);
      this.agent$.subscribe(res=>
      {console.log(this.isMen);
        if(res.gender=="Men"){ this.isMen=true}
        else{ 
          console.log("women111")}
       
      })}) 
      
  }

 
  ngOnInit(){
     
   
  }

}
