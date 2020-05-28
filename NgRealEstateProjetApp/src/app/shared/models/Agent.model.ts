import { Role } from './role.model';

export interface Agent{
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    telephone: string;
    subsidiary: string;
    role:Role;
    gender:string,
    address:string;
    age:number;

  }
  export interface Candidate{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    telephone: string;
    gender:string,
    address:string;
    age:number;
    status:string;
  }


  export interface RealEstateAgent{
    id: Agent["id"];
    firstname: Agent["first_name"];
    lastname: Agent["last_name"];
    email: Agent["email"];
    telephone: Agent["telephone"];
    subsidiary: Agent["subsidiary"];
    role:Agent["role"];
    gender:Agent["gender"];
    adresse:Agent["address"];
    age:Agent["age"];
    idC: Candidate["id"];
    firstnameC: Candidate["firstname"];
    lastnameC: Candidate["lastname"];
    emailC: Candidate["email"];
    telephoneC:Candidate["telephone"];
    genderC:Candidate["gender"];
    adresseC:Candidate["address"];
    ageC:Candidate["age"];
    status:Candidate["status"];
  }