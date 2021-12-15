import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Facture } from '../models/facture';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  livreursUrl: string = 'http://localhost:8081/SpringMVC/facture'
  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }

  getOpenFactures(): Observable < Facture[] > {
    return this.httpClient.get < Facture[] > (this.livreursUrl + '/retrieve-open-factures/', this.httpOptions);
  }
}
