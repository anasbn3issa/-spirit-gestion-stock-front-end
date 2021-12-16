import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckProgressDTO } from '../dto/checkProgressDTO';
import { Facture } from '../models/facture';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  livreursUrl: string = 'http://localhost:8081/SpringMVC/facture'
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }

  getOpenFactures(): Observable<Facture[]> {
    return this.httpClient.get<Facture[]>(this.livreursUrl + '/retrieve-open-factures/', this.httpOptions);
  }
  getFactures(): Observable<Facture[]> {

    return this.httpClient.get<Facture[]>('http://localhost:8081/SpringMVC/facture/retrieve-all-factures');
  }

  saveFacture(facture, id?) {
    if (facture.idFacture) {
      return this.httpClient.put<Facture>('http://localhost:8081/SpringMVC/facture/modify-facture', facture);
    } else {
      return this.httpClient.post<Facture>('http://localhost:8081/SpringMVC/facture/add/' + id, facture);
    }
  }

  getFacture(id: string): Observable<Facture> {
    return this.httpClient.get<Facture>('http://localhost:8081/SpringMVC/facture/retrieve-facture/' + id);
  }

  deleteFacture(id: number) {
    return this.httpClient.delete('http://localhost:8081/SpringMVC/facture/remove-facture/' + id);
  }

  addFacture(facture: Facture, id: number) {
    return this.httpClient.post('http://localhost:8081/SpringMVC/facture/add/' + id, facture);
  }

  updateFacture(facture: Facture) {
    return this.httpClient.put('http://localhost:8081/SpringMVC/facture/modify-facture', facture);
  }

  checkCompanyProgress(checkProgressDTO: CheckProgressDTO) {
    return this.httpClient.post('http://localhost:8081/SpringMVC/facture/progression', checkProgressDTO);
  }

  cancelFacture(id: number) {
    return this.httpClient.get('http://localhost:8081/SpringMVC/facture/cancel-facture/' + id);
  }

}
