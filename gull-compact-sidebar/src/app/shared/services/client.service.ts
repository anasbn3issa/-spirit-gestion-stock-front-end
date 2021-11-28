import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private myHttp : HttpClient) { }
  getClients(): Observable<Client[]> {
    
    return this.myHttp.get<Client[]>('http://localhost:8081/SpringMVC/client/retrieve-all-clients');
    return this.myHttp.get<Client[]>('http://localhost:8089/SpringMVC/client/retrieve-all-clients');
  }
  deleteClient (id:number){
    return this.myHttp.delete('http://localhost:8081/SpringMVC/client/remove-client/'+id);
      //return this.myHttp.delete('http://localhost:8089/SpringMVC/client/delete/'+id);
  }
  addClient(client:Client){
    return this.myHttp.post('http://localhost:8081/SpringMVC/client/add-client',client);
    return this.myHttp.post('http://localhost:8089/SpringMVC/client/add-client',client);
  }
}
