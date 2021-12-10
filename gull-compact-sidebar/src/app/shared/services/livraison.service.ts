import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Facture } from '../models/facture';
import { Livraison } from '../models/livraison';
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

  assignLivraison(factId: number, livreurId: number): Observable < Livraison > {
    return this.httpClient.post < Livraison > (this.livreursUrl 
    + '/add-livraison/'+factId
    +'/livreur/'+livreurId
    , this.httpOptions);
  }
}
