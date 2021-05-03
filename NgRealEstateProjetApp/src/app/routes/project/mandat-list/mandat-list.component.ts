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
  selector: 'app-mandat-list',
  templateUrl: './mandat-list.component.html',
  styleUrls: ['./mandat-list.component.scss']
})
export class MandatListComponent implements OnInit {

  page = 1;
  limit = 5;
  paginatedDataSource: any;
  id: number;
  mandat$: Observable<Mandat[]>;
  mandat: Mandat[];
  unsubscribe$: Subject<void>;

  displayedColumns = [
    "Date De Création",
    "Prénom Du Mandant",
    "Nom Du Mandant",
    "Type",
    "Status",
    "Telecharger",
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
    this.mandatService.getMandats(this.id).pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => {
      this.mandat = res;
      this.paginatedDataSource = this.mandat;
    });
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

  Update(id: number) {
   
  }
  
  Delete(id: number) {
  }

  onClick() {
    this.router.navigate(['/project',this.id,'addmandat']);
  }

  details(id: number) {
    this.router.navigate(["/project",this.id, "mandatdetails"]);
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
