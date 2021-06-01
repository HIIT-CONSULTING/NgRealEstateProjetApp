import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Candidate, Mandat } from '@shared/models/Agent.model';
import { MandatService } from '@shared/services/mandat.service';
import { SponsorService } from '@shared/services/sponsor.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-mandat',
  templateUrl: './mandat.component.html',
  styleUrls: ['./mandat.component.scss']
})
export class MandatComponent implements OnInit {

  id: number;
  mandat$: Observable<Mandat[]>;
  mandat: Mandat[];
  unsubscribe$: Subject<void>;
  

  displayedColumns = [
    "Id Mandant",
    "Prénom Du Mandant",
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
    private snackBar: MatSnackBar
  ) {
    this.unsubscribe$ = new Subject();
  }
  
  

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.unsubscribe$)).subscribe((params) => {
      this.id = +params["id"];
    });
    if(this.id){
      this.mandatService.getMandats(this.id).pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => {
      this.mandat = res;
    });
    }
    else{
      this.mandatService.getAllMandats({}).pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => {
      this.mandat = res['hydra:member'];
    });
    }
    
  }
  download(id){
    this.mandatService.download(id).pipe(takeUntil(this.unsubscribe$)).subscribe(res=>{
      var file = new Blob([res.body], { type: 'application/pdf' });
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
           // this.loading = !this.loading;
    }); 
  }

  Onpage() { 
  }
  details(id: number) {
    this.router.navigate(["/mandat", id, "details"], { relativeTo: this.route });
  }
  addMandat(id) {
    this.router.navigate(["/mandat", id, "addmandat"], { relativeTo: this.route });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
