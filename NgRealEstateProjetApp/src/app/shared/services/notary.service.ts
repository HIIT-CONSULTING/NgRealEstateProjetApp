import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { omitBy, isNull } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class NotaryService {
  private hosturlname = environment.hostURL;
  
  constructor(private http: HttpClient) { }
  /**
   * web service using to get the all notary 
   */
   getAllNotary(): Observable<any[]> {
    return this.http.get<any[]>(`${this.hosturlname}api/v2/notaries`);
  }
  /**
   * web service using to get the notary by id 
   */
   getNotary(id): Observable<any> {
    return this.http.get<any>(`${this.hosturlname}api/v2/notaries/${id}`);
  }
  /**
   * web service using to add the notary
   */
  addNotary(formData:any){
    let data :any = omitBy(formData, isNull);
    return this.http.post(`${this.hosturlname}api/v1/addNotary`, data);
  }
}
