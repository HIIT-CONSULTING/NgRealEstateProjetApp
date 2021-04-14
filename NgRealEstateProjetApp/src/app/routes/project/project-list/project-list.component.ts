import { Component, OnInit } from '@angular/core';
import { ProjectService } from '@shared/services/project.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  project$:Observable<any[]>

  constructor(private projectService:ProjectService,private route:ActivatedRoute,private router:Router,private snackBar: MatSnackBar) 
   { }

  ngOnInit(): void {
    this.project$=this.projectService.getProjects();
  }

  onClick(){
    this.router.navigate(['/project/projectform'])
  }
  
  Delete(id:number){
      this.projectService.deleteProject(id).subscribe( 
        (data) => {
          this.snackBar.open('le candidat est supprimé avec succès!', '', { duration: 1000 ,panelClass: ['blue-snackbar'] ,  verticalPosition: 'top', horizontalPosition:'end' });
        },
        (error) => {
          this.snackBar.open("veuillez vérifier vos informations!", '', { duration: 1000, panelClass: ['blue-snackbar'], verticalPosition: 'top', horizontalPosition:'end'});
        }
      )  
    this.project$=this.projectService.getProjects();
  }

  Update(id:number){
    this.router.navigate(['/project',id,'update']);
  }
    
  details(id:number) {
    this.router.navigate(['/project',id,'details']);   
  }
  
  

}
