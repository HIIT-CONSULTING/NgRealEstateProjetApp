import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import{Agent} from '@shared/Model/Agent.model';
import{Subsidiary} from '@shared/Model/Subsidiary.model';




@Injectable({
  providedIn: 'root'
})
export class FindAgentService {

  constructor(private http: HttpClient) {}
  getSubsidiary(): Observable<Subsidiary[]> {
    let items = getMockSubsidiary();
   
    return of(items).pipe(delay(500));
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

  /*searchAgent(formData:any){
   return this.http.post('https://api.monsite.com/auth', formData);
  }*/
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
      firstname: 'Sara ',
      lastname:'ELKHOULTA',
      email: 'saraelkhoulta@gmail.com',       
      telephone: '0696174563',
      subsidiary: 'Maroc',
      role:'Gestionnaire',
      gender:'Women',
      adresse:"Mouhammedia",
      age:24,
    },
    {
      id: 112399489,
      firstname: 'Oumaima ',
      lastname:'Moustafid',
      email: 'oumaima@gmail.com',
      telephone: '0667692006',
      subsidiary: 'France',
      role:'Conseiller',
      gender:'Women',
      adresse:"Agadir",
      age:24,
    },
    {
      id: 992365489,
      firstname: 'Asmâa ',
      lastname:'ElOuerkhaou',
      email: 'asmaa@gmail.com',
      telephone: '0696174563',
      subsidiary: 'Espagne',
      role:'Gestionnaire',
      gender:'Women',
      adresse:"Rabat",
      age:24,
    },
    {
      id: 112365455,
      firstname: 'Mouad ',
      lastname:'ennaciri',
      email: 'mouad@gmail.com',
      telephone: '0667692006',
      subsidiary: 'Maroc',
      role:'Conseiller',
      gender:'Men',
      adresse:"Casa Blanca",
      age:24,

    },
   
  ];
}
