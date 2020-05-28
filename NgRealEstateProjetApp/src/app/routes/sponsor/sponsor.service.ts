import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Candidate, City, Country, Gender } from '@shared/models/Agent.model';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  constructor(private http: HttpClient) { }
  // TODO: add candidate
 
  sponsorAgent(formData:any){
    debugger;
    formData.value.birthDay=formData.value.birthDay.toISOString().replace(/-/gi, '/').substr(0, 10);
    debugger;
   return this.http.post('https://stage.hiitconsulting.com/api/v1/add', formData.value);

  }

  getCandidate(id:number): Observable<Candidate>{
    debugger;
    return this.http.get<Candidate>(`https://stage.hiitconsulting.com/api/v1/getAplicantDetails/${id}`);
    

  }


  getCandidates(page:number,limit:number): Observable<Candidate[]>{
    let params=new HttpParams();
    params=params.append('page',page.toString());
    params=params.append('limit',limit.toString());
    let url='https://stage.hiitconsulting.com/api/v1/getApllicantUser';
    return this.http.get<Candidate[]>(url,{params:params});
  };
  

  getCity(): Observable<City[]>{
    return this.http.get<City[]>(`https://stage.hiitconsulting.com/api/v1/city`);
   /* let items=getMockCity();
    return of(items).pipe(delay(500));*/
  }

  getCountry(): Observable<Country[]>{
    return this.http.get<Country[]>(`https://stage.hiitconsulting.com/api/v1/country`);

  }

  getGender(): Observable<Gender[]> {
 
    return this.http.get<Gender[]>(`https://stage.hiitconsulting.com/api/v1/gender`);

  }


  update(candidate:any,id:number): Observable<any>{
    debugger;
    
    const formatedCandidate={
      firstname:candidate.firstname,
      lastname:candidate.lastname,
      email:candidate.email,
      telephone:candidate.telephone,
      birthDay:candidate.birth_day,
      address:{
        description:candidate.address.description,
        city:candidate.address.city.id,
        country:candidate.address.country.id
      },
      gender:candidate.gender.id,
    }
    formatedCandidate.birthDay=formatedCandidate.birthDay.toString().replace(/-/gi,'/').substr(0,10);

   return this.http.put(`https://stage.hiitconsulting.com/api/v1/update/${id}`, formatedCandidate)
  

  }

  editCandidate(id:number): Observable<Candidate>{
    return this.http.get<Candidate>(`api/leagues/${id}`);
  }

  deleteCandidate(id:number): Observable<any>{
    return this.http.delete(`https://stage.hiitconsulting.com/api/v1/delete/${id}`);
  }
  Vide:{}

  valide(id:number){

   return this.http.post(`https://stage.hiitconsulting.com/api/v1/validApplicant/${id}`,this.Vide);
  }

  reffus(id:number){

    return this.http.post(`https://stage.hiitconsulting.com/api/v1/refuseApplicant/${id}`,this.Vide);
   }
} 
