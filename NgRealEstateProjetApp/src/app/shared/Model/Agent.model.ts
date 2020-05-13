export interface Agent{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    telephone: string;
    subsidiary: string;
    role:string;
    gender:string,
    adresse:string;
    age:number;
  }
  export interface Candidate{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    telephone: string;
    gender:string,
    adresse:string;
    age:number;
    status:string;
  }

  export interface RealEstateAgent{
    id:number;
    firstnameParrain:Agent["firstname"];
    lastnameParrain:Agent["lastname"];
    firstnameCandidate:Candidate["firstname"];
    lastnameCandidate:Candidate["lastname"];
    status:Candidate["status"],
  }