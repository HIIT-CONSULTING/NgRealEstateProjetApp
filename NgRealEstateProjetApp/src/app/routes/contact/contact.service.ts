import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Candidate, City, Country, Gender, Contact, Contact_type } from '@shared/models/Agent.model';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
    page=1;
     limit=6
  constructor(private http: HttpClient) { }
  
  addContact(formData:any ){
      return this.http.post('https://stage.hiitconsulting.com/api/v1/addContact',formData)
  }



  getContacts():Observable<any[]>{
    debugger;
 
    let params=new HttpParams();
  
    params=params.append('page',this.page.toString());
    params=params.append('limit',this.limit.toString());
    console.log(params);
    let url='https://stage.hiitconsulting.com/api/v1/getContacts';
    return this.http.get<any[]>(url,{params:params});
  }


  deleteContact(id:number):Observable<Contact>{
    return this.http.delete<Contact>(`https://stage.hiitconsulting.com/api/v1/deleteContact/${id}`)
  }
 

  getContact(id:number): Observable<Contact>{

return this.http.get<Contact>(`https://stage.hiitconsulting.com/api/v1/getcontactDetails/${id}`);
  }


  updateContact(contact:any,id:number): Observable<any>{
     
    const formatedCandidate={
      firstname:contact.firstname,
      lastname:contact.lastname,
      email:contact.email,
      telephone:contact.telephone,
      birthDay:contact.birth_day,
      address:{
        description:contact.address.description,
        city:contact.address.city.id,
        country:contact.address.country.id
      },
      gender:contact.gender.id,
    }
    formatedCandidate.birthDay=formatedCandidate.birthDay.toString().replace(/-/gi,'/').substr(0,10);

    return this.http.put(`https://stage.hiitconsulting.com/api/v1/updateContact/${id}`, formatedCandidate);
 
   }

} 
