import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Livreur } from '../models/livreur';

@Injectable({
  providedIn: 'root'
})
export class LivreurService {

  livreursUrl: string = 'http://localhost:8081/SpringMVC/livreurs'

  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json'
    })
  };
  

  constructor(private httpClient: HttpClient) { }

  getAllLivreurs(pageNo: number, pageSize: number, filter: string): Observable < Livreur[] > {
    return this.httpClient.get < Livreur[] > (this.livreursUrl+'/retrieve-all-livreurs'+
    '?pageNo='+pageNo+
    '&pageSize='+pageSize
    +'&filter='+filter
    , this.httpOptions)
  }

  getActiveLivreurs(): Observable < Livreur[] > {
    return this.httpClient.get < Livreur[] > (this.livreursUrl+'/retrieve-active-livreurs', this.httpOptions)
  }

  getLivreurById(id: number): Observable < Livreur > {
    return this.httpClient.get < Livreur > (this.livreursUrl + '/retrieve-livreur/' + id);
  }

  addLivreur(livreur: Livreur): Observable < Livreur > {
    return this.httpClient.post < Livreur > (this.livreursUrl+'/add-livreur', livreur, this.httpOptions);
  }

  deleteLivreur(ids: number[]): Observable <any> {
    const url =  this.livreursUrl+'/disable-livreurs';
    let body= JSON.stringify(ids);
    return this.httpClient.put < any > (url,ids, this.httpOptions);
  }

  updateLivreur(livreur: Livreur): Observable < Livreur > {
    return this.httpClient.put < Livreur > (this.livreursUrl + '/modify-livreur',livreur, this.httpOptions);
  }
}
