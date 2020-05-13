import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { RealEstateAgent } from '@shared/Model/Agent.model';


const exampleData = [
  { id: 112365481,firstnameParrain: 'SaraA1 ',lastnameParrain:'ELKHOULTA1', firstnameCandidate: 'OUmaima1',lastnameCandidate:'Moustafid1',status:"en attente"},
  { id: 112365482,firstnameParrain: 'SaraA2 ',lastnameParrain:'ELKHOULTA2', firstnameCandidate: 'OUmaima2',lastnameCandidate:'Moustafid2',status:"en attente"},
  { id: 112365483,firstnameParrain: 'SaraA3 ',lastnameParrain:'ELKHOULTA3', firstnameCandidate: 'OUmaima3',lastnameCandidate:'Moustafid3',status:"en attente"},
  { id: 112365484,firstnameParrain: 'SaraA4 ',lastnameParrain:'ELKHOULTA4', firstnameCandidate: 'OUmaima1',lastnameCandidate:'Moustafid1',status:"en attente"},
  { id: 112365485,firstnameParrain: 'SaraA5 ',lastnameParrain:'ELKHOULTA5', firstnameCandidate: 'OUmaima2',lastnameCandidate:'Moustafid2',status:"en attente"},
  { id: 112365486,firstnameParrain: 'SaraA6 ',lastnameParrain:'ELKHOULTA6', firstnameCandidate: 'OUmaima3',lastnameCandidate:'Moustafid3',status:"en attente"},

];

@Component({
  selector: 'app-sponsor-agent-list',
  templateUrl: './sponsor-agent-list.component.html',
  styleUrls: ['./sponsor-agent-list.component.scss']
})
export class SponsorAgentListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) pager: MatPaginator;

  displayedColumns = ['Prénom Parrain','Nom Parrain', 'Prénom Candidat','Nom Candidat','Status'];
  paginatedDataSource: PaginatedDataSource;
  
  ngOnInit(): void {
  
    this.paginatedDataSource = new PaginatedDataSource(this.pager);
    
  }
}
export class PaginatedDataSource extends DataSource<RealEstateAgent> {
  dataChange: BehaviorSubject<RealEstateAgent[]> = new BehaviorSubject<RealEstateAgent[]>([]);

  constructor(private paginator: MatPaginator) {
    super();
    this.dataChange.next(exampleData);
  }

  connect(): Observable<RealEstateAgent[]> {
    const displayDataChanges = [this.dataChange, this.paginator.page];

    return merge(...displayDataChanges).pipe(
      map(() => {
        const data = [...exampleData];
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
      })
    );
  }

  disconnect() {}
}
