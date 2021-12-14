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

  livraisonsUrl: string = 'http://localhost:8081/SpringMVC/livraison'

  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) { }

  getAllLivraisons(pageNo: number, pageSize: number, filter: string): Observable < Livraison[] > {
    return this.httpClient.get < Livraison[] > (this.livraisonsUrl+'/retrieve-livraisons'+
    '?pageNo='+pageNo+
    '&pageSize='+pageSize
    +'&filter='+filter
    , this.httpOptions)
  }

  getLivraisonsCountbyLivId(id: number): Observable < any[] > {
    return this.httpClient.get < any[] > (this.livraisonsUrl + '/count/'+id, this.httpOptions);
  }

  assignLivraison(factId: number, livreurId: number): Observable < Livraison > {
    return this.httpClient.post < Livraison > (this.livraisonsUrl 
    + '/add-livraison/'+factId
    +'/livreur/'+livreurId
    , this.httpOptions);
  }

  deleteLivraison(id: number): Observable <any> {
    const url =  this.livraisonsUrl+'/remove-livraison/'+id;
    return this.httpClient.delete < any > (url, this.httpOptions);
  }

  getLivraisonById(id: number): Observable < Livraison > {
    return this.httpClient.get < Livraison > (this.livraisonsUrl + '/retrieve-livraison/' + id);
  }

  updateLivraison(livraison: Livraison): Observable < Livraison > {
    return this.httpClient.put < Livraison > (this.livraisonsUrl + '/modify-livraison',livraison, this.httpOptions);
  }
}
