
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    
private hosturlname = environment.hostURL;
protected transactionEndpoint =  this.hosturlname.concat('/api/v2/transactions');

constructor(private http: HttpClient) {}

addTransaction(formData:any){
    
return this.http.post(this.transactionEndpoint,formData);

}

getTransactions():Observable<any[]>{

    let page=1;
    let limit=10;
    let params=new HttpParams();
    
    params=params.append('page',page.toString());
    params=params.append('limit',limit.toString());
    
    return this.http.get<any[]>(this.transactionEndpoint,{params:params});
    
    }

}