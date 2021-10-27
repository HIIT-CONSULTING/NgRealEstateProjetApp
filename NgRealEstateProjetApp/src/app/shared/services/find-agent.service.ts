import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Agent } from "../../shared/models/Agent.model";
import { Subsidiary } from "../../shared/models/Subsidiary.model";
import { environment } from '@env/environment';

@Injectable({
  providedIn: "root",
})
export class FindAgentService {
  private hosturlname = environment.hostURL;
  constructor(private http: HttpClient) {}
 
  /**
   * web service using to Get the agents 
   */
  getSubsidiary(): Observable<Subsidiary[]> {
    return this.http.get<Subsidiary[]>(`${this.hosturlname}api/v1/subsidiary`);
  }

  /**
   * web service using to Search the agents 
   * @param params - filtre of search
   */
  getAgents(params:any): Observable<Agent[]> {
    return this.http.get<Agent[]>(`${this.hosturlname}api/v1/searchAgent`,{params});
  }
  
  /**
   * web service using to Get the detail of agent by id 
   * @param id - agent's number
   */
  getAgent(id: number): Observable<Agent> {
    return this.http.get<Agent>(`${this.hosturlname}api/v1/getAgentDetails/${id}`);
  }

}

