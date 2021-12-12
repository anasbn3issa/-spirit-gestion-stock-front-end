import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livreur } from '../models/livreur';

@Injectable({
  providedIn: 'root'
})
export class LivraisonService {

  livreursUrl: string = 'http://localhost:8081/SpringMVC/livraison'

  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json'
    })
  };
  

  constructor(private httpClient: HttpClient) { }
  getLivraisonsCountbyLivId(id: number): Observable < any[] > {
    return this.httpClient.get < any[] > (this.livreursUrl + '/count/'+id, this.httpOptions);
  }
}
