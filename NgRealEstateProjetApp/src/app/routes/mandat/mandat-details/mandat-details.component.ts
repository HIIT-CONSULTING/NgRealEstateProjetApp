import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Mandat, Project } from '@shared/models/Agent.model';
import { MandatService } from '@shared/services/mandat.service';
import { ProjectService } from '@shared/services/project.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-mandat-details',
  templateUrl: './mandat-details.component.html',
  styleUrls: ['./mandat-details.component.scss']
})
export class MandatDetailsComponent implements OnInit {


  
  mandat:Mandat;
  project: Project;
  project$: Observable<Project>;
  showSpinner=true;
  id:number;
  unsubscribe$: Subject<void>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mandatService: MandatService,
    private projectService: ProjectService,
  ) {

    this.unsubscribe$ = new Subject();
    
}

  ngOnInit(): void { 
    this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe((params) => {
      this.id = +params["id"];
    });
   this.mandatService.getMandat(this.id).pipe(takeUntil(this.unsubscribe$)).subscribe(res =>{ 
     this.mandat = res;
     this.projectService.getProject(this.mandat?.project.id).pipe(takeUntil(this.unsubscribe$)).subscribe((project) => {
      this.project = project;
      if(project!={})
      {
        this.showSpinner=false;
      }
     });
    });
   
   
    
      
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
