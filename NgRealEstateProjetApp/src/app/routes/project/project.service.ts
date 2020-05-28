import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Project } from '@shared/models/Agent.model';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  save(formData:any){
    debugger;
      this.http.post('https://￼stage.hiitconsulting.com/api/v1/addProject',formData);
  }
  getProjects():Observable<any[]>{
    debugger;
    let page=1;
    let limit=6
    let params=new HttpParams();
  
    params=params.append('page',page.toString());
    params=params.append('limit',limit.toString());
    console.log(params);
    let url='https://stage.hiitconsulting.com/api/v1/getProjects';
    return this.http.get<any[]>(url,{params:params});

  }

  deleteProject(id:number){
    return this.http.delete(`https://￼stage.hiitconsulting.com/api/v1/deleteProject/${id}`);
  }
  


 

  getProject(id:number): Observable<any>{
  return this.http.get<any>(`https://￼stage.hiitconsulting.com/api/v1/getprojectDetails/${id}`);
  

  }


  updateProject(project:Project,id:number): Observable<any>{
    debugger;
    
    const formatedProject={
      projectType:project.projectType,
      projectState:project.projectState,
      projectKind:project.projectKind,
     contact:project.contact.id,
      property:{
        address:{
        description:project.property.address.description,
        city:project.property.address.city.id,
        country:project.property.address.country.id
      },
      area:project.property.area,
      propertyType:project.property.propertyType.id_realestate,
      mimimalPrice:project.property.minimalPrice,
      maximumPrice:project.property.maximumPrice,
      room:project.property.room,
    }
  }
  console.log(formatedProject);

    return this.http.put(`https://￼stage.hiitconsulting.com/api/v1/updateProject/${id}`, formatedProject);
 
   }
 
} 

