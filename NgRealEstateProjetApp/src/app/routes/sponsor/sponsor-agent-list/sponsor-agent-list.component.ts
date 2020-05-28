import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import {  Candidate} from '@shared/models/Agent.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SponsorService } from '../sponsor.service';


@Component({
  selector: 'app-sponsor-agent-list',
  templateUrl: './sponsor-agent-list.component.html',
  styleUrls: ['./sponsor-agent-list.component.scss']
})
export class SponsorAgentListComponent implements OnInit {
constructor(private route:ActivatedRoute,private router:Router,private sponsorService:SponsorService){}

page=1;
limit=5;
paginatedDataSource:any
  @ViewChild(MatPaginator, { static: true }) pager: MatPaginator;
  candidates$:Observable<Candidate[]>
  candidates:Candidate[];

  displayedColumns = ['Date De Création','Prénom Parrain','Nom Parrain', 'Prénom Candidat','Nom Candidat','Status',"Menu"];

  
  ngOnInit(): void {
    debugger;
    this.candidates$=this.sponsorService.getCandidates(this.page,this.limit);
    debugger;
    this.candidates$.subscribe(candidate=>{this.candidates=candidate;
    console.log('cc',this.candidates);
    this.paginatedDataSource = this.candidates; 
    
  })
    

    
  }


  Onpage(){
    this.page=this.page+1;

    this.candidates$=this.sponsorService.getCandidates(this.page,this.limit);
    debugger;
    this.candidates$.subscribe(candidate=>{this.candidates=candidate;
    console.log('cc',this.candidates);
    this.paginatedDataSource = this.candidates; 
  })
    
    }
      
  Update(id:number){
    
    //this.router.navigate(['/sponsorship/list',id,'update'])
    //this.router.navigate([`${id}/update`], { relativeTo: this.route });
    this.router.navigate(['/sponsorship',id,'update']);
  }
  Delete(id:number){
    this.sponsorService.deleteCandidate(id).subscribe((data)=>{
      console.log("success");})
      this.candidates$=this.sponsorService.getCandidates(this.page,this.limit);
      debugger;
      this.candidates$.subscribe(candidate=>{this.candidates=candidate;
      console.log('cc',this.candidates);
      this.paginatedDataSource = this.candidates; 
    })
  }

  onClick(){
    this.router.navigate(['/sponsorship/form'])
  }

  details(id: number) {

    this.router.navigate(['/sponsorship',id,'details']);
  }

}


