import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay, map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Agent, Country, Search } from "@shared/models/Agent.model";
import { Subsidiary } from "@shared/models/Subsidiary.model";
import { Role } from "@shared/models/role.model";

@Injectable({
  providedIn: "root",
})
export class FindAgentService {
  constructor(private http: HttpClient) {}
  getSubsidiary(): Observable<Subsidiary[]> {
    
    return this.http.get<Subsidiary[]>('https://stage.hiitconsulting.com/api/v1/subsidiary');
   
    }

    getAgents(params:any): Observable<Agent[]> {
      debugger;
      return this.http.get<Agent[]>('https://stage.hiitconsulting.com/api/v1/searchAgent',{params});

    }


  getAgent(id: number): Observable<Agent> {

    return this.http.get<Agent>(`https://stage.hiitconsulting.com/api/v1/getAgentDetails/${id}`);
  }

}

