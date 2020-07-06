import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Observable } from 'rxjs';
import { Project } from '@shared/models/Agent.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  project$:Observable<any[]>

  constructor(private projectService:ProjectService,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    debugger;
  this.project$=this.projectService.getProjects();
  this.project$.subscribe(data=>console.log(data))
  
  }


  
  onClick(){
      this.router.navigate(['/project/projectform'])
    }
  Delete(id:number){
      this.projectService.deleteProject(id).subscribe((data)=>{
        console.log("success");})
        this.project$=this.projectService.getProjects();
        this.project$.subscribe(data=>console.log(data))
    }

    Update(id:number){
    debugger;

      this.router.navigate(['/project',id,'update']);
    }
    details(id:number){
      debugger;
        this.router.navigate(['/project',id,'details']);
        
       
      }
  


}
