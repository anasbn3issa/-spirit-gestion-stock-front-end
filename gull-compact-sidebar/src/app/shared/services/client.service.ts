import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client';
import { Purchase } from '../models/purchase';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private myHttp : HttpClient) { }
  getClients(): Observable<Client[]> {
    
    return this.myHttp.get<Client[]>('http://localhost:8081/SpringMVC/client/retrieve-all-clients');
    return this.myHttp.get<Client[]>('http://localhost:8089/SpringMVC/client/retrieve-all-clients');
  }
  getClient(id:string): Observable<Client> {
    return this.myHttp.get<Client>('http://localhost:8081/SpringMVC/client/retrieve-client/'+id);
    return this.myHttp.get<Client>('http://localhost:8089/SpringMVC/client/retrieve-client/'+id);
  }
  deleteClient (id:number){
    return this.myHttp.delete('http://localhost:8081/SpringMVC/client/remove-client/'+id);
      //return this.myHttp.delete('http://localhost:8089/SpringMVC/client/delete/'+id);
  }
  addClient(client:Client){
    return this.myHttp.post('http://localhost:8081/SpringMVC/client/add-client',client);
    return this.myHttp.post('http://localhost:8089/SpringMVC/client/add-client',client);
  }

  incomeByClient(id:string){
    return this.myHttp.get('http://localhost:8081/SpringMVC/client/income-from-client/'+id);
    return this.myHttp.get('http://localhost:8089/SpringMVC/client/income-from-client/'+id);
  }

  purchaseHistoryByClient(id:string) : Observable<Purchase[]>{
   // return await this.myHttp.get('http://localhost:8081/SpringMVC/client/purchase-history-client/'+id).toPromise();
    return  this.myHttp.get<Purchase[]>('http://localhost:8081/SpringMVC/client/purchase-history-client/'+id);
    return this.myHttp.get<Purchase[]>('http://localhost:8089/SpringMVC/client/purchase-history-client/'+id);
  }

}
