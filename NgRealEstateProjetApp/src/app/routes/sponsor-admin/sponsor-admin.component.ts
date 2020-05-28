import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { RealEstateAgent ,Agent,Candidate} from '@shared/models/Agent.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SponsorService } from '../sponsor/sponsor.service';
import { Role } from '@shared/models/role.model';


const exampleData:RealEstateAgent[]= [
  {
    id: 112365489,
    firstname: 'Sara ',
    lastname:'ELKHOULTA',
    email: 'saraelkhoulta@gmail.com',       
    telephone: '0696174563',
    subsidiary: 'Maroc',
    role:Role.Admin,
    gender:'Women',
    adresse:"Mouhammedia",
    age:24,
    idC: 112399489,
    firstnameC: 'Oumaima ',
    lastnameC:'Moustafid',
    emailC: 'oumaima@gmail.com',
    telephoneC: '0667692006',
    genderC:'Women',
    adresseC:"Agadir",
    ageC:24,
    status:"en attente"
  },
  {
    id: 112365455,
    firstname: 'Sara ',
    lastname:'ELKHOULTA',
    email: 'saraelkhoulta@gmail.com',       
    telephone: '0696174563',
    subsidiary: 'Maroc',
    role:Role.User,
    gender:'Women',
    adresse:"Mouhammedia",
    age:24,
    idC: 112399664,
    firstnameC: 'Oumaima ',
    lastnameC:'Moustafid',
    emailC: 'oumaima@gmail.com',
    telephoneC: '0667692006',
    genderC:'Women',
    adresseC:"Agadir",
    ageC:24,
    status:"en attente"
  },
  {
    id: 112365455,
    firstname: 'Sara ',
    lastname:'ELKHOULTA',
    email: 'saraelkhoulta@gmail.com',       
    telephone: '0696174563',
    subsidiary: 'Maroc',
    role:Role.Admin,
    gender:'Women',
    adresse:"Mouhammedia",
    age:24,
    idC: 112399774,
    firstnameC: 'Oumaima ',
    lastnameC:'Moustafid',
    emailC: 'oumaima@gmail.com',
    telephoneC: '0667692006',
    genderC:'Women',
    adresseC:"Agadir",
    ageC:24,
    status:"en attente"
  }
];


@Component({
  selector: 'app-sponsor-admin',
  templateUrl: './sponsor-admin.component.html',
  styleUrls: ['./sponsor-admin.component.scss']
})
export class SponsorAdminComponent implements OnInit {

  constructor(private route:ActivatedRoute,private router:Router,private sponsorService:SponsorService){}
  @ViewChild(MatPaginator, { static: true }) pager: MatPaginator;

  displayedColumns = ['Prénom Parrain','Nom Parrain', 'Prénom Candidat','Nom Candidat','Status',"Menu"];
  paginatedDataSource: PaginatedDataSource;
  candidat:Candidate;
  
  ngOnInit(): void {
  
    this.paginatedDataSource = new PaginatedDataSource(this.pager);
    
  }

  Accept(id:number){
      
      this.sponsorService.getCandidate(id).subscribe(user=>{
        console.log(user);
      user['status']="accepted"
      console.log(user);
      this.sponsorService.update(user,id).subscribe(user => { 
      user = user; 
      }); 
    })
  
  }
  Reffus(id:number){
    this.sponsorService.getCandidate(id).subscribe(user=>{
      console.log(user);
    user['status']="reffused"
    console.log(user);
    this.sponsorService.update(user,id).subscribe(user => { 
    user = user; 
    }); 
  })
  }

  details(id:number){
   
    this.router.navigate(['./',id, 'details'], { relativeTo: this.route });

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