import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SponsorService } from 'app/routes/sponsor/sponsor.service';
import { ProjectService } from '../project.service';
import { ContactService } from 'app/routes/contact/contact.service';
import { Observable } from 'rxjs';
import { City, Country, Contact, Project } from '@shared/models/Agent.model';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent implements OnInit {

  show: any = false;
 id:number;
  city$: Observable<City[]>;
  country$: Observable<Country[]>;

  project$: Observable<Project>;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private sponsorService: SponsorService,
    private projectService: ProjectService,
    private contactService: ContactService
  ) { 
    
  }
  Project:Project;
  myControl = new FormControl();
  filteredOptions: Observable<City[]>;
  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.id=+params['id'];
    })
    this.city$ = this.sponsorService.getCity();
    this.sponsorService.getCity().subscribe();

    this.country$ = this.sponsorService.getCountry();
    this.sponsorService.getCity().subscribe();
 this.project$=this.projectService.getProject(this.id);
 this.projectService.getProject(this.id).subscribe(project=>{
  this.Project=project;
  this.form.setValue({
    property:{
    minimum_price: project.property.minimal_price,
    maximum_price: project.property.maximum_price,
    area: project.property.area,
    room: project.property.room,
    address: {
      description:project.property.address.description,
      city: project.property.address.city,
      country: project.property.address.country,
    },
  }

  })
}
  
  
  
  );


  }


  form= this.fb.group({
    property:this.fb.group({
    minimalPrice: null,
    maximumPrice: null,
    area: null,
    room: null,
    address: this.fb.group({
      description: null,
      city: null,
      country: null,
    }),
  })

})

  onSubmit() { 
    

     this.Project['property']= this.form.get('property').value; 

       console.log('ddd',this.Project);
      
      this.projectService.updateProject(this.Project,this.id).subscribe(user => { 
      user = user; 
      }); 
 
      this.router.navigate(['/project/projectlist'])
 
 
  
    }

}
