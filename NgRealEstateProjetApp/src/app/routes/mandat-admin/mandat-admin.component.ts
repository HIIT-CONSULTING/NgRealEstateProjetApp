import { first } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Mandat, TypeMandat } from '@shared/models/Agent.model';
import { MandatService } from '@shared/services/mandat.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-mandat-admin',
  templateUrl: './mandat-admin.component.html',
  styleUrls: ['./mandat-admin.component.scss']
})
export class MandatAdminComponent implements OnInit {

  id: number;
  mandat$: Observable<Mandat[]>;
  typeMandat$:Observable<TypeMandat[]>;
  mandat: Mandat[];
  unsubscribe$: Subject<void>;
  form:FormGroup;
  panelOpenState: boolean =false;
  lastPage: number;
  currentPage: number = 1;
  stateList = [
    {value: '', viewValue: 'Tout'},
    {value: 'accepted', viewValue: 'Accepted'},
    {value: 'in_progress', viewValue: 'In progress'},
    {value: 'refused', viewValue: 'Refused'}
  ];

  typeProjectList = [ 
    {value: '', viewValue: 'Tout'},
    {value: 'Immeuble', viewValue: 'Immeuble'},
    {value: 'Bureau', viewValue: 'Bureau'},
    {value: 'Appartement', viewValue: 'Appartement'},
    {value: 'Terrain', viewValue: 'Terrain'},
    {value: 'Maison', viewValue: 'Maison'},
    {value: 'Murs', viewValue: 'Murs'},
    {value: 'Fond de commerce', viewValue: 'Fond de commerce'}
  ]
  sortList= [
    {value: '', viewValue: '--'},
    {value: 'asc', viewValue: 'Croissant'},
    {value: 'desc', viewValue: 'Décroissant'}];
  displayedColumns = [
    "Date De Création",
    "Prénom Agent",
    "Nom Agent",
    "Prénom Du Mandant",
    "Nom Du Mandant",
    "projectState",
    "projectType",
    "Type",
    "Status",
    "Menu",
  ];


    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private mandatService: MandatService,
      private snackBar: MatSnackBar,
      private fb: FormBuilder,
      private dateAdapter: DateAdapter<Date>
    ) {
      this.unsubscribe$ = new Subject();
      this.form = this.fb.group({
          id: '',
          createdAt: '',
          status: '',
          'type.name': '',
          'project.agent.firstname':'',
          'project.agent.lastname': '',
          'project.property.propertyType.name':'',
          'project.property.maximumPrice':'',
          'project.property.minimalPrice': '',

        });
      }
    
    ngOnInit(): void {
      this.typeMandat$=this.mandatService.getType().pipe(takeUntil(this.unsubscribe$));
      this.mandatService.getAllMandats({}).pipe(takeUntil(this.unsubscribe$))
          .subscribe((res) => {
            this.mandat = res['hydra:member'];
            if(res)
              this.lastPage=res['hydra:view']['hydra:last'].split('=')[1];
            
      });
    }
    onclick(){

      this.mandatService.getAllMandats(this.form.value).pipe(takeUntil(this.unsubscribe$))
          .subscribe((res) => {
            this.mandat = res['hydra:member'];
            if(res)
              this.lastPage=res['hydra:view']['hydra:last'].split('=')[1];
      });
    }

    refus(id: number) {
      this.mandatService.updateMandat({'status':'refused'},id).pipe(takeUntil(this.unsubscribe$))
          .subscribe((res) => {
            this.mandatService.getAllMandats({}).pipe(takeUntil(this.unsubscribe$))
              .subscribe((res) => {
                this.mandat = res['hydra:member'];
                if(res)
                  this.lastPage=res['hydra:view']['hydra:last'].split('=')[1];
      });
            
      });
    }
    
    accept(id: number) {
      this.mandatService.updateMandat({'status':'accepted'},id).pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.mandatService.getAllMandats({}).pipe(takeUntil(this.unsubscribe$))
          .subscribe((res) => {
            this.mandat = res['hydra:member'];
            if(res)
              this.lastPage=res['hydra:view']['hydra:last'].split('=')[1];
      });
        
  });
    }
    
    details(id: number) {
     // this.router.navigate(["/mandat-admin",this.id, "details"]);
      this.router.navigate(["./", id, "details"], { relativeTo: this.route });
    }
   
    onPage(nbrPage:number){
      this.currentPage = nbrPage;
      this.mandatService.getAllMandats({page:this.currentPage}).pipe(takeUntil(this.unsubscribe$))
          .subscribe((res) => {
            this.mandat = res['hydra:member'];
            if(res)
              this.lastPage=res['hydra:view']['hydra:last'].split('=')[1];
            
      });
    
      

    }
    ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }

}
