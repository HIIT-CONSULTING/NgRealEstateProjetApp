import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { TypeMandat, Mandat } from '@shared/models/Agent.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MandatService {

  
  private hosturlname = environment.hostURL;
  constructor(private http: HttpClient)
 { }

  /**
   * web service using to all types of mandat
   */
  //getType(): Observable<any> {}
  getType(): Observable<TypeMandat[]>{
    return this.http.get<TypeMandat[]>(`${this.hosturlname}api/v2/mandate_types.json`);
   }

  /**
   * web service using to Add a mandat
   * @param formData - mandat
   */
   save(formData:Mandat){
    return this.http.post(`${this.hosturlname}api/v2/mandates`,formData);
 }
 
 /**
  * web service using to get all mandat
  */
 getmandat():Observable<any[]>{
   let page=1;
   let limit=10;
   let params=new HttpParams();  
   params=params.append('page',page.toString());
   params=params.append('limit',limit.toString());
   let url=`${this.hosturlname}api/v1/getProjects`;
   return this.http.get<any[]>(url,{params:params});
 }

 /**
  * web service using to get mandat 
  */
 getMandats(id): Observable<Mandat[]>{
  return this.http.get<Mandat[]>(`${this.hosturlname}api/v2/projects/${id}/mandates.json`);
 }

/**
  * web service using to get mandat by id project
  */
 getMandat(id): Observable<Mandat>{
  return this.http.get<Mandat>(`${this.hosturlname}api/v2/mandates/${id}.json`);
 }

 /**
  * web service using to download the mandate in pdf format
  */
 download(id:number){
  //return this.http.get(`${this.hosturlname}api/v2/mandate/download/${id}`);
  return this.http.get(`${this.hosturlname}api/v2/mandate/download/${id}`, {
    responseType: 'blob',
    observe: 'response'
  }); }
  /**
  * web service using to get all mandat
  */
 getAllMandats(params:any): Observable<Mandat[]>{
   
  return this.http.get<Mandat[]>(`${this.hosturlname}api/v2/mandates.json`,{params});
 }
 /**
   * web service using to Update a mandat 
   * @param status - new updates of the  mandat
   * @param id - mandat's number
   */
  updateMandat(status:any,id:number): Observable<any>{
  
    return this.http.put(`${this.hosturlname}api/v2/mandates/${id}`, status);
  }
 
  
}
