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
    birthDay:Date;
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
      birthDay:Agent['birthDay'];
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
    projectType: string,
    projectState: string,
    projectKind: string,
    contact:Contact,
    property:{
      id:number,
      area:string,
      minimalPrice: string,
      maximumPrice: string,
      room: String

      orientation?: string,
      key?: number,
      roomsNumber?: number,
      estimatedSurface?: number,
      constructionYear?: Date,
      state?: string;
      floorsNumber?: number,
      dateAvailability?: Date,
      isAvailable?: boolean,
      hasGuardian? : boolean,
      hasIntercom?: boolean,
      hasElevator? : boolean,
      hasTerace? :  boolean,
      hasBalcony? : boolean,
      hasGarage? : boolean,
      hasParkCar?: boolean,
      sousSol?: boolean,
      exterieur?: boolean,
      cave?: boolean,
    
      propertyType:{
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

