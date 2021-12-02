import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livreur } from '../models/livreur';

@Injectable({
  providedIn: 'root'
})
export class LivreurService {

  livreursUrl: string = '/api/livreurs'

  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json'
    })
  };
  

  constructor(private httpClient: HttpClient) { }

  getAllProducts(pageNo: number, pageSize: number): Observable < Livreur[] > {
    return this.httpClient.get < Livreur[] > ('http://localhost:8081/SpringMVC/livreurs/retrieve-all-livreurs'+
    '?pageNo='+pageNo+
    '&pageSize='+pageSize, this.httpOptions)
  }

  addLivreur(livreur: Livreur): Observable < Livreur > {
    return this.httpClient.post < Livreur > ('http://localhost:8081/SpringMVC/livreurs/add-livreur', livreur, this.httpOptions);
  }

  deleteLivreur(ids: number[]): Observable <any> {
    const url =  'http://localhost:8081/SpringMVC/livreurs/disable-livreurs';
    let body= JSON.stringify(ids);
    return this.httpClient.put < any > (url,ids, this.httpOptions);
  }
}
