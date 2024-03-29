import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private hosturlname = environment.hostURL;
  constructor(private http: HttpClient) {}

  /**
   * web service using to Add a project
   * @param formData - project
   */
  save(formData:any){
     return this.http.post(`${this.hosturlname}api/v1/addProject`,formData);
  }
  
  /**
   * web service using to get projects
   */
  getProjects():Observable<any[]>{
    let page=1;
    let limit=10;
    let params=new HttpParams();  
    params=params.append('page',page.toString());
    params=params.append('limit',limit.toString());
    let url=`${this.hosturlname}api/v1/getProjects`;
    return this.http.get<any[]>(url,{params:params});
  }
  
  /**
   * web service using to Delete a project 
   * @param id - project's number
   */
  deleteProject(id:number){
    return this.http.delete(`${this.hosturlname}api/v1/deleteProject/${id}`);
  }

  /**
   * web service using to Get the informations of  a project 
   * @param id - project's number
   */
  getProject(id:number): Observable<any>{
    return this.http.get<any>(`${this.hosturlname}api/v1/getprojectDetails/${id}`);
  }

  /**
   * web service using to Update a project 
   * @param project - new updates of the  project
   * @param id - project's number
   */
  updateProject(project:any,id:number): Observable<any>{
  
    return this.http.put(`${this.hosturlname}api/v1/updateProject/${id}`, project);
  }
 
} 
