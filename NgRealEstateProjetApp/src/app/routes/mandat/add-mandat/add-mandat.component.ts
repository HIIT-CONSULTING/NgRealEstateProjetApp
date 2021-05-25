import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, TypeMandat } from '@shared/models/Agent.model';
import { MandatService } from '@shared/services/mandat.service';
import { ProjectService } from '@shared/services/project.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-mandat',
  templateUrl: './add-mandat.component.html',
  styleUrls: ['./add-mandat.component.scss']
})
export class AddMandatComponent implements OnInit {


  
  project: Project;
  project$: Observable<Project>;
  showSpinner=true;
  id:number;
  unsubscribe$: Subject<void>;
  form :FormGroup;
  typeMandat$: Observable<TypeMandat[]>;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private mandatService: MandatService,
    private projectService: ProjectService,
    private snackBar: MatSnackBar
  ) {

    this.unsubscribe$ = new Subject();
    this.form = this.fb.group({
    project: [null],
    type: [null,Validators.required],
  });
}

  ngOnInit(): void { 
    this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe((params) => {
      this.id = +params["id"];
    });
   //this.mandatService.getType().subscribe(res =>{ res = this.typeMandat});
   this.typeMandat$ = this.mandatService.getType();
   //this.project$ = this.projectService.getProject(this.id);
   this.projectService.getProject(this.id).pipe(takeUntil(this.unsubscribe$)).subscribe((project) => {
     this.project = project;
     if(project!={})
     {
       this.showSpinner=false;
     }
    });
    
      
  }
  onSubmit() {
   
    this.form.get('project').setValue(`/api/v2/projects/${this.id}`);
    this.form.get('type').setValue(`/api/v2/mandate_types/${this.form.get('type').value}`);
    
    this.mandatService.save(this.form.value).pipe(takeUntil(this.unsubscribe$)).subscribe(response=>{
      this.snackBar.open('le mandat est ajouté avec succès!', '', { duration: 1000 ,panelClass: ['blue-snackbar'] ,  verticalPosition: 'top', horizontalPosition:'end' });
      setTimeout(()=>{  
        this.router.navigate(['/mandat', this.id])
      }, 2000); },
    (error) => {
      this.snackBar.open("veuillez vérifier vos informations!", '', { duration: 1000, panelClass: ['red-snackbar'], verticalPosition: 'top', horizontalPosition:'end'});
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
