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
import { Options, LabelType } from '@angular-slider/ngx-slider';


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
  sortValue: string = 'asc';
  minValue: number = 0;
  maxValue: number = 500000;
  stateList = [
    {value: '', viewValue: 'Tout'},
    {value: 'accepted', viewValue: 'Accepté'},
    {value: 'in_progress', viewValue: 'En cours'},
    {value: 'refused', viewValue: 'Refusé'}
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
  typeMandatList= [
    {value: '', viewValue: 'Tout'},
    {value: 'Simple', viewValue: 'Simple'},
    {value: 'Exclusif', viewValue: 'Exclusif'}];
  displayedColumns = [
    "Date De Création",
    "Nom Agent",
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
      private fb: FormBuilder,
    ) 
    {
      this.unsubscribe$ = new Subject();
      this.form = this.fb.group({
          page: 1,
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
            this.lastPage=res['hydra:view']['hydra:last']?res['hydra:view']['hydra:last'].split('page=')[1]:1;
            
      });
    }
    onclick(){
      this.currentPage = 1;
      this.form.get('page').setValue(this.currentPage );
      this.mandatService.getAllMandats(this.form.value).pipe(takeUntil(this.unsubscribe$))
          .subscribe((res) => {
            this.mandat = res['hydra:member'];
            this.lastPage=res['hydra:view']['hydra:last']?res['hydra:view']['hydra:last'].split('page=')[1]:1;
            console.log(res['hydra:view']['hydra:last'])
      });
    }
    sort(){
      this.currentPage = 1;
      this.form.get('page').setValue(this.currentPage );
      this.sortValue = this.sortValue ==='asc'? 'desc':'asc';
      this.form.get('createdAt').setValue(this.sortValue);
      this.mandatService.getAllMandats(this.form.value).pipe(takeUntil(this.unsubscribe$))
          .subscribe((res) => {
            this.mandat = res['hydra:member'];
            this.lastPage=res['hydra:view']['hydra:last']?res['hydra:view']['hydra:last'].split('page=')[1]:1;
            
      });
    }

    refus(id: number) {
      this.mandatService.updateMandat({'status':'refused'},id).pipe(takeUntil(this.unsubscribe$))
          .subscribe((res) => {
            this.mandatService.getAllMandats(this.form.value).pipe(takeUntil(this.unsubscribe$))
              .subscribe((res) => {
                this.mandat = res['hydra:member'];
                this.lastPage=res['hydra:view']['hydra:last']?res['hydra:view']['hydra:last'].split('page=')[1]:1;
       });   
      });
    }
    
    accept(id: number) {
      this.mandatService.updateMandat({'status':'accepted'},id).pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.mandatService.getAllMandats(this.form.value).pipe(takeUntil(this.unsubscribe$))
          .subscribe((res) => {
            this.mandat = res['hydra:member'];
            this.lastPage=res['hydra:view']['hydra:last']?res['hydra:view']['hydra:last'].split('page=')[1]:1;
        });
        
      });
    }
  
    details(id: number) {
     // this.router.navigate(["/mandat-admin",this.id, "details"]);
      this.router.navigate(["./", id, "details"], { relativeTo: this.route });
    }
   
    onPage(nbrPage:number){
      this.currentPage = nbrPage;
      this.form.get('page').setValue(nbrPage);
      this.mandatService.getAllMandats(this.form.value).pipe(takeUntil(this.unsubscribe$))
          .subscribe((res) => {
            this.mandat = res['hydra:member'];
            this.lastPage=res['hydra:view']['hydra:last']?res['hydra:view']['hydra:last'].split('page=')[1]:1;
      });
    }
    valueChange(){
      this.form.patchValue({
        'project.property.minimalPrice': this.minValue,
        'project.property.maximumPrice' : this.maxValue
     });

    }
    ngOnDestroy(): void {
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    }
    
    options: Options = {
      floor: 0,
      ceil: 500000,
      translate: (value: number, label: LabelType): string => {
        switch (label) {
          case LabelType.Low:
            
            return '<b>Min:</b> €' + value;
          case LabelType.High:
            
            return '<b>Max:</b> €' + value;
          default:
            return '€' + value;
        }
      }
    
    };
}
