import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidate } from '@shared/models/Agent.model';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  constructor(private http: HttpClient) { }
  // TODO: add candidate
  sponsorAgent(formData:any){
   return this.http.post('https://api.monsite.com/auth', formData);
  }

  getCandidate(id:number): Observable<Candidate>{
    let items = getMockCandidate();
   
    for(let  i=0;i<=items.length;i++){
      if( items[i].id==id){
        console.log(items[i].id);
      return of(items[i]);
    }} 

  }


  update(candidate:Candidate,id:number): Observable<any>{

   return this.http.put(`http://localhost:8000/api/blog-update/${id}`, candidate);

  }

  editCandidate(id:number): Observable<Candidate>{
    return this.http.get<Candidate>(`api/leagues/${id}`);
  }

  deleteCandidate(id:number): Observable<any>{
    return this.http.delete(`api/leagues/${id}`);
  }
} 

  function getMockCandidate() {
    //return this.http.get<Agent>("url");
      return [
        {
          id: 112399489,
          firstname: 'Oumaima ',
          lastname:'Moustafid',
          email: 'oumaima@gmail.com',
          telephone: '0667692006',
          gender:'Women',
          address:"Agadir",
          age:24,
          status:"en attente"
        },
        {
          id: 112399664,
          firstname: 'Oumaima ',
          lastname:'Moustafid',
          email: 'oumaima@gmail.com',
          telephone: '0667692006',
          gender:'Women',
          address:"Agadir",
          age:24,
          status:"en attente"
        },
        {
          id: 112399774,
          firstname: 'Oumaima ',
          lastname:'Moustafid',
          email: 'oumaima@gmail.com',
          telephone: '0667692006',
          gender:'Women',
          address:"Agadir",
          age:24,
          status:"en attente"
        },
 
       
      ];
    }

