import { Role } from './role.model';
import { Subsidiary } from './Subsidiary.model';

export interface Agent{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    telephone: string;
    address:Address;
    gender:Gender,
    birth_day:Date;
    subsidiary: Subsidiary;
    roles:Role;
    
    

  }
  export interface Candidate{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    telephone: string;
    address:Address;
    gender:Gender,
    created_at:Date;
    birth_day:Date;
    status:string;
    sponsor:{
      id: Agent['id'];
      firstname: Agent['firstname'];
      lastname: Agent['lastname'];
      email: Agent['email'];
      telephone: Agent['telephone'];
      address:Agent['address'];
      gender:Agent['gender'],
      birthDay:Agent['birth_day'];
    }
    
    
  }

  export interface Contact{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    telephone: string;
    gender:Gender,
    address: Address;
    birth_day: Date;
    channel_type?: string;
    societe?: string;
    notes?: string;

  }



  export interface Address{
    description:string;
    city:City
    country:Country;
  }

  export interface City{
   id:number;
   name:string;
  }
  export interface Contact_type{
    id:number;
    name:string;
   }

  export interface Country{
    id:number;
    name:string;
   }

   export interface Gender{
    id:number;
    name:string;
   }

   export interface Project{
    id:number,
    project_type: string,
    project_state: string,
    project_kind: string,
    contact:Contact,
    property:{
      id:number,
      area:string,
      minimal_price: string,
      maximum_price: string,
      room: String

      orientation?: string,
      key?: number,
      rooms_number?: number,
      estimated_surface?: number,
      construction_year?: Date,
      state?: string;
      floors_number?: number,
      date_availability?: Date,
      is_available?: boolean,
      has_guardian? : boolean,
      has_intercom?: boolean,
      has_elevator? : boolean,
      has_terace? :  boolean,
      has_balcony? : boolean,
      has_garage? : boolean,
      has_park_car?: boolean,
      sous_sol?: boolean,
      exterieur?: boolean,
      cave?: boolean,
    
      property_type:{
        id:number,
        name:String,
      },
      address:{
        description:string,
        city: {id:number,name:string},
        country: {id:number,name:string},
      },
    },
    
  
   }
   export interface Search{
    firstname: string,
    lastname: string,
    tel:string,
    email: string,
    subsidiary: number
   }

