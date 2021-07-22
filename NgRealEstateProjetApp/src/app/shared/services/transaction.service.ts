import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Project } from '@shared/models/Agent.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private hosturlname = environment.hostURL;
  constructor(private http: HttpClient) {}

  /**
   * web service using to get projects
   */
   getProjects(type:string):Observable<Project[]>{

    return this.http.get<Project[]>(`${this.hosturlname}api/v2/projects?projectType=${type}`);
  }
   /**
   * web service using to get transaction  by id
   */
    getTransaction(id:number):Observable<any>{

      return this.http.get<any>(`${this.hosturlname}api/v2/transactions/${id}`);
    }
    /**
     * web service using to get list of transaction  
     */
     getAllTransaction():Observable<any[]>{
  
      return this.http.get<any[]>(`${this.hosturlname}api/v2/transactions`);
    }
   /**
   * web service using to Add a transaction
   * @param formData - transaction
   */
    save(formData){
      
      return this.http.post(`${this.hosturlname}api/v2/transactions`,formData);
   }
    /**
   * web service using to Update transaction 
   * @param status - new updates of the  transaction
   * @param id - transaction's number
   */
  updatTransaction(status:any,id:number): Observable<any>{
  
    return this.http.put(`${this.hosturlname}api/v2/transactions/${id}`, status);
  }
}
