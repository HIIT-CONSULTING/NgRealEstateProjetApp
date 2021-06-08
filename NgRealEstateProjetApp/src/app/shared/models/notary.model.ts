import { Address } from "node:cluster";
import { Gender } from "./Agent.model";

export interface Notary{
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    telephone: string;
    gender:Gender,
    address: Address;
    birth_day: Date;
  }