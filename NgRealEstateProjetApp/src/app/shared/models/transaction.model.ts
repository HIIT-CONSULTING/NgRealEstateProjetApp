import { Project } from "./Agent.model";
import { Notary } from "./notary.model";

export interface Transaction{
    type: string;
    typologie: string;
    price: number;
    feesPaidBy: number;
    quote: number;
    companyBaseFees: number;
    companyFullFees: number;
    compromiseDate: Date;
    provisionalActDate: Date;
    officialActDate: Date;
    status: string;
    projects: Project;
    notary:Notary;
}