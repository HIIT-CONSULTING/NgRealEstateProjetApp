import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../project.service';
import { Observable } from 'rxjs';
import { Project } from '@shared/models/Agent.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  project$:Observable<any[]>

  constructor(private projectService:ProjectService,private route:ActivatedRoute,private router:Router,private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    debugger;
  this.project$=this.projectService.getProjects();
  this.project$.subscribe(data=>console.log(data))
  
  }


  
  onClick(){
      this.router.navigate(['/project/projectform'])
    }
  Delete(id:number){
      this.projectService.deleteProject(id).subscribe(
        
        (data) => {
          console.log("success");
          debugger;
          this.snackBar.open('le candidat est supprimé avec succès!', '', { duration: 1000 ,panelClass: ['blue-snackbar'] ,  verticalPosition: 'top', horizontalPosition:'end' });
  
        },
        (error) => {
          console.log('error',error);
          this.snackBar.open("veuillez vérifier vos informations!", '', { duration: 1000, panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition:'end'});
        }

        
        )

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
