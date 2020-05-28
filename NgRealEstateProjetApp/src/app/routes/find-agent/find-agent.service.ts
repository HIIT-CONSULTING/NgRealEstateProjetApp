import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import{Agent} from '@shared/models/Agent.model';
import{Subsidiary} from '@shared/models/Subsidiary.model';
import { Role } from '@shared/models/role.model';

@Injectable({
  providedIn: 'root'
})
export class FindAgentService {

  constructor(private http: HttpClient) {}
  getSubsidiary(): Observable<any> {
    /*let items = getMockSubsidiary();
   
    return of(items).pipe(delay(500));*/
    return this.http.get(`https://stage.hiitconsulting.com/subsidiary`);
  }

  getAgents():Observable<Agent[]>{
    let items = getMockAgents();
   
    return of(items);
  }
  getAgent(id:number):Observable<Agent>{
    let items = getMockAgents();
    for(let  i=0;i<=items.length;i++){
      if( items[i].id==id){
        console.log(items[i].id);
      return of(items[i]);
    }} 
  }

  searchAgent(formData:any){
   return this.http.post('https://api.monsite.com/auth', formData);
  }
}

function getMockSubsidiary() {
//return this.http.get<Subsidiary>("url");
  return [
    {
      id: '1',
      name: 'Maroc',
      
    },
    {
      id: '2',
      name: 'France',
    },
    {
      id: '3',
      name: 'Espagne',
    },
    
  ];
}

function getMockAgents() {
//return this.http.get<Agent>("url");
  return [
    {
      id: 112365489,
      first_name: 'Sara ',
      last_name:'ELKHOULTA',
      email: 'saraelkhoulta@gmail.com',       
      telephone: '0696174563',
      subsidiary: 'Maroc',
      role:Role.Admin,
      gender:'Women',
      address:"Mouhammedia",
      age:24,
      username:"Sara",
      password:"1459"
    },
    {
      id: 112399489,
      first_name: 'Oumaima ',
      last_name:'Moustafid',
      email: 'oumaima@gmail.com',
      telephone: '0667692006',
      subsidiary: 'France',
      role:Role.User,
      gender:'Women',
      address:"Agadir",
      age:24,
      username:"oumaima",
      password:"1459"
    },
    {
      id: 992365489,
      first_name: 'Asmâa ',
      last_name:'ElOuerkhaou',
      email: 'asmaa@gmail.com',
      telephone: '0696174563',
      subsidiary: 'Espagne',
      role:Role.Admin,
      gender:'Women',
      address:"Rabat",
      age:24,
      username:"asmaa",
      password:"1459"
    },
    {
      id: 112365455,
      first_name: 'Mouad ',
      last_name:'ennaciri',
      email: 'mouad@gmail.com',
      telephone: '0667692006',
      subsidiary: 'Maroc',
      role:Role.User,
      gender:'Men',
      address:"Casa Blanca",
      age:24,
      username:"Mouad32",
      password:"1459"

    },
   
  ];
}
