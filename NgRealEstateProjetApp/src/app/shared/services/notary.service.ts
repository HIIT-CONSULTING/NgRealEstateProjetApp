
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotarayService {

private hosturlname = environment.hostURL;

protected endpointCreate = this.hosturlname.concat('api/v1/addNotary') ;
protected notaryEndpoint =  this.hosturlname.concat('/api/v2/notaries');

constructor(private http: HttpClient) {}

addNotary(formData:any){
    
    return this.http.post(this.endpointCreate,formData);

}

getNotraies():Observable<any[]>{

return this.http.get<any[]>(this.notaryEndpoint);

}

}