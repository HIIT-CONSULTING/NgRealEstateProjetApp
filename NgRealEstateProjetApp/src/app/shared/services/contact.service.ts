import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Contact } from '../../shared/models/Agent.model';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  page=1;
  limit=6;  
  private hosturlname = environment.hostURL;
  constructor(private http: HttpClient) { }
  
  /**
   * web service using to Add contact
   * @param formData - new contact
   */
  addContact(formData:any ){
      return this.http.post(`${this.hosturlname}api/v1/addContact`,formData)
  }

  /**
   * web service using to Get the contacts 
   */
  getContacts():Observable<any[]>{
    let params=new HttpParams();
    params=params.append('page',this.page.toString());
    params=params.append('limit',this.limit.toString());
    let url=`${this.hosturlname}api/v1/getContacts`;
    return this.http.get<any[]>(url,{params:params});
  }
  
  /**
   * web service using to Delete a contact 
   * @param id - contact's number
   */
  deleteContact(id:number):Observable<Contact>{
   return this.http.delete<Contact>(`${this.hosturlname}api/v1/deleteContact/${id}`)
  }
 
  /**
   * web service using to Get the informations of a contact 
   * @param id - contact's number
   */
  getContact(id:number): Observable<Contact>{
   return this.http.get<Contact>(`${this.hosturlname}api/v1/getcontactDetails/${id}`);
  }

  /**
   * web service using to Update a contact 
   * @param contact - the updates
   * @param id - contact's number
   */
  updateContact(contact:any,id:number): Observable<any>{
    
    return this.http.put(`${this.hosturlname}api/v1/updateContact/${id}`, contact);
   }

} 
